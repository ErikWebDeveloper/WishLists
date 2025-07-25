import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  GiftOutlined,
  CopyOutlined,
  FormOutlined
} from "@ant-design/icons";
import { Tag, Tooltip, Button, List, Space, message } from "antd";

// Layout
import { EmpyText, Header, ItemTitle } from "../layouts/TableLayout";

// Utils
import { getDomain } from "../utils/domain";

const URL = "/list";
const URL_SHARED = "/shared";
const URL_BACK = "/dashboard";

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

  function handleCopy(text: string, label: string) {
    navigator.clipboard.writeText(text).then(() => {
      message.success(`${label} copied to clipboard`);
    });
  }

  return (
    <List
      itemLayout="vertical"
      loading={loading}
      dataSource={data}
      header={
        <Header
          title={!loading ? "Your wish lists" : "Loading ..."}
          url_back={URL_BACK}
          tag={data.length.toString()}
        />
      }
      locale={{
        emptyText: (
          <EmpyText
            title="No wishes found"
            subtitle={<>Start creating your lists by clicking the <FormOutlined/> button.</>}
          />
        ),
      }}
      renderItem={(item) => (
        <List.Item
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
              <ItemTitle
                title={item.name}
                tag={
                  <>
                    <GiftOutlined /> {item.items} items
                  </>
                }
              />
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
            <div className="mb-3">
              <Space direction="horizontal">
                <Button
                  size="small"
                  icon={<CopyOutlined />}
                  onClick={() =>
                    handleCopy(
                      `https://${getDomain()}${URL_SHARED}/${item.id}`,
                      "URL"
                    )
                  }
                >
                  Copy Share URL
                </Button>

                <Button
                  size="small"
                  icon={<CopyOutlined />}
                  onClick={() => handleCopy(item.id, "ID")}
                >
                  Copy List ID
                </Button>
              </Space>
            </div>
          )}
          <Tag color={item.is_public ? "success" : "error"}>
            {item.is_public ? "Public" : "Private"}
          </Tag>
        </List.Item>
      )}
    />
  );
}
