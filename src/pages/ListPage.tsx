import { useState, useEffect } from "react";

// Components
import { FormOutlined } from "@ant-design/icons";
import { Drawer, Form, FloatButton, Tooltip, message } from "antd";

import ListForm from "../components/ListForm";
import ListTable from "../components/ListsTable";

// Hooks
import { useLists } from "../hooks/useLists";

export default function ListPage() {
  const {
    lists,
    loading,
    loadingCRUD,
    error,
    clearErrors,
    addList,
    deleteList,
    updateList,
  } = useLists();

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [listSelected, setListSelected] = useState<List | null>(null);

  const onFinish = async (values: any) => {
    if (!isEdit) {
      await addList(values?.list);
    }
    if (isEdit) {
      const updatedList = { ...listSelected, ...values?.list };
      await updateList(updatedList);
    }

    onClose();
  };

  const onEdit = (list: List) => {
    setListSelected(list);
    form.setFieldsValue({
      list: { ...list },
    });
    setIsEdit(true);
    setOpen(true);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setIsEdit(false);
    setListSelected(null);
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
    <>
      {contextHolder}
      {/** Float Button  */}
      <Tooltip title="Create a new wish list">
        <FloatButton
          style={{ display: open ? "none" : "" }}
          shape="square"
          type="primary"
          onClick={showDrawer}
          icon={<FormOutlined />}
        />
      </Tooltip>

      {/** Cards container */}
      <section className="list-section">
        <ListTable
          loading={loading}
          loadingCRUD={loadingCRUD}
          data={lists}
          onDelete={deleteList}
          onEdit={onEdit}
        />
      </section>

      {/* Offcanvas */}
      <Drawer
        title={!isEdit ? "Create a wish list" : "Edit wish list"}
        closable={{ "aria-label": "Close Button" }}
        onClose={onClose}
        open={open}
      >
        <ListForm
          formHook={form}
          onFinish={onFinish}
          isEdit={isEdit}
          onLoad={loadingCRUD}
        />
      </Drawer>
    </>
  );
}
