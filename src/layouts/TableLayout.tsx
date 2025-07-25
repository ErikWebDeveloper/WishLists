import { Typography, Button, Tag, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import { DatabaseOutlined, ArrowLeftOutlined } from "@ant-design/icons";

type PropsEmptyText = {
  title: string;
  subtitle: string | React.ReactNode;
};

export const EmpyText = ({ title, subtitle }: PropsEmptyText) => {
  return (
    <div className="list-empty">
      <h1>
        <DatabaseOutlined />
      </h1>
      <p>{title}</p>
      <h3>{subtitle}</h3>
    </div>
  );
};

type PropsHeader = {
  title: string | null;
  url_back: string;
  tag: string | React.ReactNode;
};

export const Header = ({ title, url_back, tag }: PropsHeader) => {
  const navigate = useNavigate();
  return (
    <header style={{ display: "flex", alignItems: "center", opacity: 0.5 }}>
      <Typography.Title
        style={{ flex: 1, display: "flex", alignItems: "center" }}
        level={3}
      >
        <Button
          icon={<ArrowLeftOutlined />}
          style={{ marginRight: "1rem", aspectRatio: "1/1" }}
          onClick={() => {
            navigate(url_back);
          }}
        />{" "}
        {title}
      </Typography.Title>

      <Tag>{tag}</Tag>
    </header>
  );
};

type PropsItemTitle = {
  title: string;
  children?: React.ReactNode;
  tag?: React.ReactNode;
};
export const ItemTitle = ({ title, tag, children }: PropsItemTitle) => {
  return (
    <>
      {children}
      <Flex align="center">
        <Typography.Title level={4} style={{ flex: 1 }}>
          {title}
        </Typography.Title>
        <Tag style={{ opacity: 0.5 }}>{tag}</Tag>
      </Flex>
    </>
  );
};

