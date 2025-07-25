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
import GenericTable from "../layouts/GenericTable";
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
    <GenericTable<List>
      data={data}
      loading={loading}
      loadingCRUD={loadingCRUD}
      headerTitle="Your wish lists"
      onEdit={onEdit}
      onDelete={onDelete}
      renderTitle={(item) => (
        <Typography.Title level={3}>
          {item.name}{" "}
          <Tag>
            <GiftOutlined /> {item.items} items
          </Tag>
        </Typography.Title>
      )}
      renderDescription={(item) =>
        item.description || <i>No description provided...</i>
      }
      renderExtraActions={(item) => [
        <Tooltip title="Add wishes">
          <Button
            icon={<GiftOutlined />}
            style={{ opacity: 0.7 }}
            onClick={() => navigate(`/list/${item.id}`)}
          />
        </Tooltip>,
        <Tooltip title="Edit list">
          <Button
            icon={<EditOutlined />}
            style={{ opacity: 0.7 }}
            onClick={() => onEdit(item)}
          />
        </Tooltip>,
        <Tooltip title="Delete list">
          <Button
            icon={<DeleteOutlined />}
            style={{ opacity: 0.7 }}
            onClick={() => onDelete(item.id)}
            loading={loadingCRUD}
            disabled={loadingCRUD}
          />
        </Tooltip>,
      ]}
    />
  );
}
