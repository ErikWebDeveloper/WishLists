import React, { useEffect, useState } from "react";
import { Layout, Drawer, FloatButton, Tooltip, Form, message } from "antd";

type GenericDrawerPageProps<T, TableProps extends object> = {
  icon: React.ReactNode;
  tooltip: string;
  drawerTitle: string;
  drawerTitleEdit: string;
  table: React.ReactElement<TableProps>;
  formComponent: React.ReactElement<{
    formHook: any;
    onFinish: (values: any) => void;
    isEdit: boolean;
    onLoad: boolean;
  }>;
  error: any;
  clearErrors: () => void;
  loadingCRUD: boolean;
  onSubmit: (values: any, isEdit: boolean, item?: T) => Promise<void>;
  fieldKey: string;
  getItemId?: (item: T) => string; // opcional para mejoras
};

export default function GenericDrawerPage<T, TableProps extends object>({
  icon,
  tooltip,
  drawerTitle,
  drawerTitleEdit,
  table,
  formComponent,
  error,
  clearErrors,
  loadingCRUD,
  onSubmit,
  fieldKey,
}: GenericDrawerPageProps<T, TableProps>) {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const showDrawer = () => setOpen(true);

  const onClose = () => {
    setOpen(false);
    setIsEdit(false);
    setSelectedItem(null);
    form.resetFields();
  };

  const onEdit = (item: T) => {
    setSelectedItem(item);
    setIsEdit(true);
    setOpen(true);
    form.setFieldsValue({ [fieldKey]: item });
  };

  const onFinish = async (values: any) => {
    await onSubmit(values, isEdit, selectedItem || undefined);
    onClose();
  };

  useEffect(() => {
    if (error?.message) {
      messageApi.error(error.message);
      clearErrors();
    }
  }, [error]);

  return (
    <Layout style={{ minHeight: "100vh", paddingTop: "1rem" }}>
      {contextHolder}

      <Tooltip title={tooltip}>
        <FloatButton
          style={{ display: open ? "none" : "" }}
          shape="square"
          type="primary"
          onClick={showDrawer}
          icon={icon}
        />
      </Tooltip>

      <section className="list-section">
        {React.cloneElement(table, {
          ...(table.props as TableProps),
          onEdit,
        })}
      </section>

      <Drawer
        title={!isEdit ? drawerTitle : drawerTitleEdit}
        onClose={onClose}
        open={open}
      >
        {React.cloneElement(formComponent, {
          formHook: form,
          onFinish,
          isEdit,
          onLoad: loadingCRUD,
        })}
      </Drawer>
    </Layout>
  );
}
