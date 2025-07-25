import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Layout, Modal, Typography, Button, Form, Input } from "antd";
import { useLists } from "../hooks/useLists";
import { useSavedLists } from "../hooks/useSavedLists";
import { DeleteOutlined } from "@ant-design/icons";
import { isValidUUID } from "../utils/uuid";

const URL_LIST = "/list";
const URL_LIST_SHARED = "/shared";

export default function Dashboard() {
  const { lists, loading } = useLists();
  const {
    savedLists,
    loading: savedListsLoading,
    loadingCRUD: CRUDSavedList,
    saveList,
    unsaveList,
  } = useSavedLists();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinish = async (values: any) => {
    const listId = values?.saved_lists?.list_id;
    if (!listId || !isValidUUID(listId)) {
      console.error("Invalid UUID");
      return;
    }
    await saveList(listId);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };
  return (
    <Layout style={{ minHeight: "100vh", padding: "1rem" }}>
      <Modal
        title="Add a public list"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="saved_lists"
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name={["saved_lists", "list_id"]}
            label="List ID"
            rules={[{ required: true }]}
          >
            <Input
              placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
              pattern="[a-fA-F0-9\-]{36}"
              maxLength={36}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <main className="list-section">
        <Typography.Title level={2} className="opacity-50">
          Welcome back!
        </Typography.Title>
        <section className="flex flex-col md:flex-row gap-3">
          <Card
            title="Enjoy your lists"
            extra={
              <Button variant="text" color="primary">
                <Link to={URL_LIST}>View</Link>
              </Button>
            }
            className="flex-1"
            loading={loading}
          >
            {!loading &&
              lists.length > 0 &&
              lists.map((list) => (
                <Link key={list.id} to={`${URL_LIST}/${list.id}`}>
                  {list.name}
                </Link>
              ))}
          </Card>

          <Card
            title="Save public lists"
            extra={
              <Button
                variant="text"
                color="primary"
                onClick={() => {
                  showModal();
                }}
              >
                Add
              </Button>
            }
            className="flex-1"
            loading={loading}
          >
            {!savedListsLoading && savedLists.length > 0 ? (
              savedLists.map((list) => (
                <div
                  key={list.list_id}
                  className="flex items-center gap-2 py-1"
                >
                  <Link
                    to={`${URL_LIST_SHARED}/${list.list_id}`}
                    className="flex-1 hover:underline"
                  >
                    {JSON.stringify(list.lists)}
                  </Link>
                  <Button
                    loading={CRUDSavedList}
                    variant="text"
                    color="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => unsaveList(list.list_id)}
                    disabled={CRUDSavedList}
                  />
                </div>
              ))
            ) : (
              <p>
                <i className="opacity-50">
                  You don't have any list saved. Start adding a list
                </i>
              </p>
            )}
          </Card>
        </section>
      </main>
    </Layout>
  );
}
