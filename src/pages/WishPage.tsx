import { useState, useEffect } from "react";
import { Layout, Drawer, Form, FloatButton, Tooltip, message } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import { useWishes } from "../hooks/useWishes";
import WishForm from "../components/WishForm";
import WishTable from "../components/WishTable";

export default function WishPage() {
  const {
    listName,
    wishes,
    addWish,
    deleteWish,
    updateWish,
    error,
    clearErrors,
    loading,
    loadingCRUD,
  } = useWishes();

  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [wishSelected, setWishSelected] = useState<Wish | null>(null);

  const onFinish = async (values: any) => {
    if (!isEdit) {
      await addWish(values?.wish);
    }
    if (isEdit) {
      const updatedWish = { ...wishSelected, ...values?.wish };
      await updateWish(updatedWish);
    }
    onClose();
  };

  const onEdit = (wish: Wish) => {
    setWishSelected(wish);
    form.setFieldsValue({
      wish: { ...wish },
    });
    setIsEdit(true);
    setOpen(true);
  };

  const onDelete = async (id: string) => {
    await deleteWish(id);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setIsEdit(false);
    setWishSelected(null);
    form.resetFields();
  };

  const showErrorMessage = (error: string) => {
    messageApi.error(error);
  };

  useEffect(() => {
    if (error && error.message) {
      showErrorMessage(error.message);
      clearErrors();
    }
  }, [error]);

  return (
    <Layout style={{ minHeight: "100vh", paddingTop: "1rem" }}>
      {contextHolder}

      {/** Float Button Create List */}
      <Tooltip title="Create a new wish">
        <FloatButton
          style={{ display: open ? "none" : "" }}
          shape="square"
          type="primary"
          onClick={showDrawer}
          icon={<GiftOutlined />}
        />
      </Tooltip>

      {/** Data display */}
      <section className="list-section">
        <WishTable
          listName={listName}
          loading={loading}
          data={wishes}
          loadingCRUD={loadingCRUD}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </section>

      {/* Offcanvas */}
      <Drawer
        title={!isEdit ? "Create a wish" : "Edit a wish"}
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
      >
        <WishForm
          formHook={form}
          onFinish={onFinish}
          onLoad={loadingCRUD}
          isEdit={isEdit}
        />
      </Drawer>
    </Layout>
  );
}
