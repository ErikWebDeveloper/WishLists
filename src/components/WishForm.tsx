import { Form, Input, Button, type FormInstance, Rate } from "antd";
import { SyncOutlined, HeartOutlined } from "@ant-design/icons";

type Props = {
  formHook: FormInstance;
  isEdit: boolean;
  onLoad: boolean;
  onFinish: (values: any) => void;
};

export default function WishForm({
  formHook,
  onFinish,
  isEdit,
  onLoad,
}: Props) {
  return (
    <Form
      name="wish-form"
      form={formHook}
      onFinish={onFinish}
      layout="vertical"
    >
      <Form.Item
        name={["wish", "name"]}
        label="Wish"
        rules={[{ required: true }]}
      >
        <Input placeholder="Hope birthday gifs" />
      </Form.Item>

      <Form.Item name={["wish", "image_url"]} label="Image URL">
        <Input placeholder="https://amazon-image-example.com/..." />
      </Form.Item>

      <Form.Item
        name={["wish", "hope"]}
        label="Hope"
        rules={[{ required: true }]}
      >
        <Rate character={<HeartOutlined />} allowHalf />
      </Form.Item>

      <Form.Item name={["wish", "url"]} label="URL">
        <Input placeholder="https://amazon.com/..." />
      </Form.Item>

      <Form.Item name={["wish", "description"]} label="Description">
        <Input.TextArea
          rows={4}
          placeholder="I want the ballon with the color blue ..."
        />
      </Form.Item>

      {/*<Form.Item
        name={["wish", "price"]}
        label={<strong>Price</strong>}
        rules={[{ required: true }]}
      >
        <InputNumber min={1} step={0.01} placeholder="35.78" />
      </Form.Item>*/}

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
