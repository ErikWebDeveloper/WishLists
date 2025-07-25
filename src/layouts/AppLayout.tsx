import { Layout } from "antd";
import Navbar from "./AppNavbar";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;

export default function AppLayout() {
  return (
    <Layout className="min-h-screen">
      {/* Header con Ant Design y contenido personalizado */}
      <Header className="flex !px-4">
        <Navbar />
      </Header>

      {/* Contenido central responsive */}
      <Content className="py-6">
        <div className="max-w-[1000px] w-full mx-auto">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}
