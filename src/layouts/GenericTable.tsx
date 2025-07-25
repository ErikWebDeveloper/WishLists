import { List, Typography, Tag, Button, Tooltip } from "antd";
import { ArrowLeftOutlined, DatabaseOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import React from "react";

type GenericTableProps<T> = {
  data: T[];
  loading: boolean;
  loadingCRUD?: boolean;
  listName?: string;
  headerTitle?: string;
  backUrl?: string;
  onEdit: (item: T) => void;
  onDelete: (id: string) => Promise<void>;
  renderTitle: (item: T) => React.ReactNode;
  renderDescription: (item: T) => React.ReactNode;
  renderExtraActions?: (item: T) => React.ReactNode[];
};

export default function GenericTable<T>({
  data,
  loading,
  loadingCRUD = false,
  listName,
  headerTitle,
  backUrl,
  onEdit,
  onDelete,
  renderTitle,
  renderDescription,
  renderExtraActions,
}: GenericTableProps<T>) {
  const navigate = useNavigate();

  const actionStyle = { opacity: 0.7 };

  return (
    <List
      loading={loading}
      header={
        <header
          style={{
            display: "flex",
            alignItems: "center",
            opacity: 0.5,
          }}
        >
          <Typography.Title
            level={2}
            style={{ flex: 1, display: "flex", alignItems: "center" }}
          >
            {backUrl && (
              <Button
                icon={<ArrowLeftOutlined />}
                style={{
                  marginRight: "1rem",
                  aspectRatio: "1 / 1",
                  ...actionStyle,
                }}
                onClick={() => navigate(backUrl)}
              />
            )}
            {listName || headerTitle || "Items"}
          </Typography.Title>

          <Tag>{data.length}</Tag>
        </header>
      }
      locale={{
        emptyText: (
          <div className="list-empty">
            <h1>
              <DatabaseOutlined />
            </h1>
            <p>No items found</p>
            <h3>
              Start creating your first item by clicking the button{" "}
              <Button icon={<DatabaseOutlined />} size="small" />.
            </h3>
          </div>
        ),
      }}
      itemLayout="vertical"
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          style={{ padding: "1.5em" }}
          actions={renderExtraActions ? renderExtraActions(item) : undefined}
        >
          <List.Item.Meta
            title={renderTitle(item)}
            description={renderDescription(item)}
          />
        </List.Item>
      )}
    />
  );
}
