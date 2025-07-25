import {
  EditOutlined,
  DeleteOutlined,
  GiftOutlined,
  HeartOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Tooltip, Button, List, Rate } from "antd";
import ModalLink from "./ModalLink";
import { useState } from "react";

// Layout
import { EmpyText, Header, ItemTitle } from "../layouts/TableLayout";

type Props = {
  loading: boolean;
  loadingCRUD: boolean;
  data: Wish[];
  listName: string | null;
  onDelete: (id: string) => Promise<void>;
  onEdit: (wish: Wish) => void;
};

const URL_BACK = "/list";

export default function WishTable({
  loading,
  loadingCRUD,
  data,
  onDelete,
  onEdit,
  listName,
}: Props) {
  const [show, setShow] = useState(false);
  const [url, setUrl] = useState("");

  const handleOk = () => {
    window.open(url, "_blank", "noopener,noreferrer");
    setShow(false);
    setUrl("");
  };

  const handleCancel = () => {
    setShow(false);
    setUrl("");
  };
  return (
    <>
      <ModalLink
        show={show}
        url={url}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />

      <List
        itemLayout="vertical"
        loading={loading}
        dataSource={data}
        header={
          <Header
            title={!loading ? listName : "Loading ..."}
            url_back={URL_BACK}
            tag={
              <>
                <GiftOutlined /> {data.length} items
              </>
            }
          />
        }
        locale={{
          emptyText: (
            <EmpyText
              title="No wishes found"
              subtitle={
                <>
                  Start creating your first list by clicking the button{" "}
                  <GiftOutlined />.
                </>
              }
            />
          ),
        }}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Tooltip title="Edit wish">
                <Button
                  style={{ opacity: 0.5 }}
                  type="text"
                  onClick={() => onEdit(item)}
                  icon={<EditOutlined key="edit" />}
                ></Button>
              </Tooltip>,
              <Tooltip title="Go to wish link">
                <Button
                  disabled={item.url ? false : true}
                  variant="link"
                  color="primary"
                  onClick={() => {
                    setUrl(item.url || ""), setShow(true);
                  }}
                  icon={<LinkOutlined key={"link"} />}
                ></Button>
              </Tooltip>,
              <Tooltip title="Delete wish">
                <Button
                  color="danger"
                  variant="text"
                  onClick={() => onDelete(item.id)}
                  loading={loadingCRUD}
                  disabled={loadingCRUD}
                  icon={<DeleteOutlined key="delete" />}
                ></Button>
              </Tooltip>,
            ]}
          >
            <List.Item.Meta
              title={
                <ItemTitle title={item.name}>
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      width={150}
                      className="rounded-sm mb-3"
                    />
                  )}
                </ItemTitle>
              }
              description={
                item.description ? (
                  item.description
                ) : (
                  <i>No description provided ...</i>
                )
              }
            />

            <Rate
              character={<HeartOutlined />}
              allowHalf
              value={item.hope}
              disabled
            />
          </List.Item>
        )}
      />
    </>
  );
}
