import { Card, Layout, Typography } from "antd";

export default function Dashboard() {
  return (
    <Layout style={{ minHeight: "100vh", padding: "1rem" }}>
      <Typography.Title level={2}>Welcome back!</Typography.Title>
      <main>
        <Card
          title="Share your lists"
          extra={<a href="#">More</a>}
          style={{ width: 300 }}
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </main>
    </Layout>
  );
}
