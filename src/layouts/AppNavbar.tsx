import { Layout, Menu, Avatar, Dropdown, Typography } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

const { Header } = Layout;
const { Title } = Typography;

export default function AppNavbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      style={{
        background: "#000",
        padding: "0 1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 1px 2px #333",
      }}
    >
      <Title level={4} style={{ margin: 0 }}>
        🎁 WishList App
      </Title>

      <Dropdown overlay={menu} placement="bottomRight" arrow>
        <Avatar
          size="large"
          icon={<UserOutlined />}
          style={{ cursor: "pointer", backgroundColor: "#393939ff" }}
        />
      </Dropdown>
    </Header>
  );
}
