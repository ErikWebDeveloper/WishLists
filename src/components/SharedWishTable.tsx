import {
  GiftOutlined,
  HeartOutlined,
  DatabaseOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { List, Rate, Typography, Tag, Button, Tooltip } from "antd";
import ModalLink from "./ModalLink";
import { useState } from "react";

type Props = {
  loading: boolean;
  data: Wish[];
  listName: string | null;
};

export default function SharedWishTable({ loading, data, listName }: Props) {
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
        header={
          <header
            style={{ display: "flex", alignItems: "center", opacity: 0.5 }}
          >
            <Typography.Title style={{ flex: 1 }} level={2}>
              {listName}
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
          <List.Item style={{ padding: "1.5em" }}>
            <List.Item.Meta
              title={
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  {item.image_url && (
                    <img
                      src={item.image_url}
                      width={150}
                      style={{ borderRadius: "5px" }}
                    />
                  )}
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
            <div style={{ display: "flex", alignItems: "center" }}>
              <Rate
                style={{ flex: 1 }}
                character={<HeartOutlined />}
                allowHalf
                value={item.hope}
                disabled
              />
              <Tooltip title="Go to wish link">
                <Button
                  disabled={item.url ? false : true}
                  variant="link"
                  color="primary"
                  onClick={() => {
                    setUrl(item.url || ""), setShow(true);
                  }}
                  icon={<LinkOutlined key={"link"} />}
                >
                  Go to link
                </Button>
              </Tooltip>
            </div>
          </List.Item>
        )}
      />
    </>
  );
}
