import { useNavigate } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  GiftOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Card, Row, Col, Tag, Empty, Tooltip, Flex, Button } from "antd";

const URL = "/list";
function EmptyData() {
  return (
    <Row style={{ margin: "auto" }} justify={"center"} align={"middle"}>
      <Col span={24}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <>
              <p>No data found ...</p>
              <h3>
                Start adding your wish lists clicking on the bottom button.
                <br />
                <FormOutlined />
              </h3>
            </>
          }
        />
      </Col>
    </Row>
  );
}

function LoadingCard() {
  const repeatCount = 3;
  return (
    <Row gutter={[16, 16]}>
      {Array.from({ length: repeatCount }).map((_, i) => (
        <Col key={`load-card-${i}`} xs={24} sm={12} md={8} lg={6}>
          <Card
            loading={true}
            title={<span style={{ opacity: 0.2 }}>Loading ...</span>}
          >
            <Card.Meta
              description={
                <>
                  <p className="clamp-2-lines" style={{ minHeight: "2.75rem" }}>
                    <i>No description provided ...</i>
                  </p>
                </>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}

type Props = {
  loading: boolean;
  loadingCRUD: boolean;
  data: List[];
  onDelete: (id: string) => Promise<void>;
  onEdit: (list: List) => void;
};

export default function ListsCards({
  loading,
  loadingCRUD,
  data,
  onDelete,
  onEdit,
}: Props) {
  const navigate = useNavigate();

  const setActions = (list: List) => {
    return [
      <Tooltip title="Add wishes">
        <Button
          style={{ opacity: 0.5 }}
          type="text"
          onClick={() => navigate(`${URL}/${list.id}`)}
          icon={<GiftOutlined />}
        />
      </Tooltip>,
      <Tooltip title="Edit list">
        <Button
          style={{ opacity: 0.5 }}
          type="text"
          onClick={() => onEdit(list)}
          icon={<EditOutlined key="edit" />}
        />
      </Tooltip>,
      <Tooltip title="Delete list">
        <Button
          color="danger"
          variant="text"
          onClick={() => onDelete(list.id)}
          loading={loadingCRUD}
          disabled={loadingCRUD}
          icon={<DeleteOutlined key="delete" />}
        />
      </Tooltip>,
    ];
  };

  return (
    <Flex
      style={{
        flex: 1,
        //border: "1px solid red",
        overflow: "hidden",
        padding: "0.7rem 0.5rem",
      }}
      wrap
      vertical
    >
      {/* No Data */}
      {data.length === 0 && !loading && <EmptyData />}

      {/** Cards Loading */}
      {loading && <LoadingCard />}

      {/* Data Cards */}
      {data.length > 0 && !loading && (
        <Row gutter={[16, 16]}>
          {data.map(({ id, name, description, items }, index) => (
            <Col key={id} xs={24} sm={12} md={8} lg={6}>
              <Card
                loading={loading}
                actions={setActions(data[index])}
                title={name}
                extra={
                  <Tag style={{ opacity: 0.5 }}>
                    <GiftOutlined /> {items} items
                  </Tag>
                }
              >
                <Card.Meta
                  description={
                    <p
                      className="clamp-2-lines"
                      style={{ minHeight: "2.75rem" }}
                    >
                      {description ? (
                        description
                      ) : (
                        <i>No description provided ...</i>
                      )}
                    </p>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Flex>
  );
}
