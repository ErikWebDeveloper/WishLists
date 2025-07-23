import { Form, Input, Button, Switch, type FormInstance } from "antd";
import { SyncOutlined } from "@ant-design/icons";

type Props = {
  formHook: FormInstance;
  isEdit: boolean;
  onLoad: boolean;
  onFinish: (values: any) => void;
};

export default function ListForm({
  formHook,
  onFinish,
  isEdit,
  onLoad,
}: Props) {
  return (
    <Form
      name="list-form"
      form={formHook}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name={["list", "name"]}
        label="List name"
        rules={[{ required: true }]}
      >
        <Input placeholder="Hope birthday gifs" />
      </Form.Item>

      <Form.Item
        name={["list", "description"]}
        label="Description"
      >
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item name={["list", "is_public"]} label="Set Public list">
        <Switch/>
      </Form.Item>

      {!isEdit ? (
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!onLoad ? false : true}
            loading={!onLoad ? undefined : { icon: <SyncOutlined spin /> }}
          >
            {!onLoad ? "Create" : "Loading ..."}
          </Button>
        </Form.Item>
      ) : (
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            disabled={!onLoad ? false : true}
            loading={!onLoad ? undefined : { icon: <SyncOutlined spin /> }}
          >
            {!onLoad ? "Save changes" : "Loading ..."}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
}
