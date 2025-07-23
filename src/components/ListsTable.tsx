import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  GiftOutlined,
  DatabaseOutlined,
  FormOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { Tag, Tooltip, Flex, Button, List, Typography } from "antd";
import { getDomain } from "../utils/domain";

const URL = "/list";
const URL_SHARED = "/shared";


const actionStyle = { opacity: 0.7 };

type Props = {
  loading: boolean;
  loadingCRUD: boolean;
  data: List[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (list: List) => void;
};

export default function ListTable({
  loading,
  loadingCRUD,
  data,
  onDelete,
  onEdit,
}: Props) {
  const navigate = useNavigate();

  return (
    <List
      loading={loading}
      header={
        <header style={{ display: "flex", alignItems: "center", opacity: 0.5 }}>
          <Typography.Title style={{ flex: 1 }} level={2}>
            Your wish lists
          </Typography.Title>

          <Tag>{data.length}</Tag>
        </header>
      }
      itemLayout="vertical"
      dataSource={data}
      locale={{
        emptyText: (
          <div className="list-empty">
            <h1>
              <DatabaseOutlined />
            </h1>
            <p>No lists found</p>
            <h3>
              Start creating your first list by clicking the button{" "}
              <FormOutlined />.
            </h3>
          </div>
        ),
      }}
      renderItem={(item) => (
        <List.Item
          style={{ padding: "1.5em" }}
          actions={[
            <Tooltip title="Add wishes">
              <Button
                style={actionStyle}
                type="text"
                onClick={() => navigate(`${URL}/${item.id}`)}
                icon={<GiftOutlined key="add-wishes" />}
              ></Button>
            </Tooltip>,
            <Tooltip title="Edit list">
              <Button
                style={actionStyle}
                type="text"
                onClick={() => onEdit(item)}
                icon={<EditOutlined key="edit" />}
              ></Button>
            </Tooltip>,
            <Tooltip title="Delete list">
              <Button
                style={actionStyle}
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
              <Flex align="center">
                <Typography.Title level={3} style={{ flex: 1 }}>
                  {item.name}
                </Typography.Title>
                <Tag style={{ opacity: 0.5 }}>
                  <GiftOutlined /> {item.items} items
                </Tag>
              </Flex>
            }
            description={
              item.description ? (
                item.description
              ) : (
                <i>No description provided...</i>
              )
            }
          />
          {item.is_public && (
            <>
              <Typography.Paragraph className="share-btn">
                <ShareAltOutlined /> Share URL
              </Typography.Paragraph>
              <Typography.Paragraph type="secondary" copyable>
                {`https://${getDomain()}${URL_SHARED}/${item.id}`}
              </Typography.Paragraph>
            </>
          )}
          <Tag color={item.is_public ? "success" : "error"}>
            {item.is_public ? "Public" : "Private"}
          </Tag>
        </List.Item>
      )}
    />
  );
}
