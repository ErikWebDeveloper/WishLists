import {
  EditOutlined,
  DeleteOutlined,
  GiftOutlined,
  HeartOutlined,
  DatabaseOutlined,
  LinkOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Tooltip, Button, List, Rate, Typography, Tag } from "antd";
import ModalLink from "./ModalLink";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  loading: boolean;
  loadingCRUD: boolean;
  data: Wish[];
  listName: string | null;
  onDelete: (id: string) => Promise<void>;
  onEdit: (wish: Wish) => void;
};

const URL_HOME_APP = "/dashboard";
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
  const navigate = useNavigate();

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
        header={
          <header
            style={{ display: "flex", alignItems: "center", opacity: 0.5 }}
          >
            <Typography.Title
              style={{ flex: 1, display: "flex", alignItems: "center" }}
              level={2}
            >
              <Button
                icon={<ArrowLeftOutlined />}
                style={{ marginRight: "1rem", aspectRatio: "1/1" }}
                onClick={() => {
                  navigate(URL_HOME_APP);
                }}
              />{" "}
              {!loading ? listName : "Loading ..."}
            </Typography.Title>

            <Tag>
              <GiftOutlined /> {data.length} items
            </Tag>
          </header>
        }
        locale={{
          emptyText: (
            <div className="list-empty">
              <h1>
                <DatabaseOutlined />
              </h1>
              <p>No wishes found</p>
              <h3>
                Start creating your first list by clicking the button{" "}
                <GiftOutlined />.
              </h3>
            </div>
          ),
        }}
        loading={loading}
        itemLayout="vertical"
        loadMore={null}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            style={{ padding: "1.5em" }}
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
                <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
                  {item.image_url && <img src={item.image_url} width={150} style={{borderRadius: "5px"}}/>}
                  <strong style={{ fontSize: "24px" }}>{item.name}</strong>
                </div>
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
