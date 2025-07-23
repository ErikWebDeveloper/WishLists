import { Button, Typography, Layout, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#000" }}>
      <Content style={{ padding: "0 2rem" }}>
        <Row
          justify="center"
          align="middle"
          style={{ minHeight: "100vh", maxWidth: "1200px", margin: "0 auto" }}
        >
          <Col xs={24} md={12} style={{ padding: "1rem" }}>
            <Title
              style={{ color: "#fff", fontSize: "3rem", lineHeight: "1.2" }}
            >
              Organize your wishes.
              <br />
              Share them effortlessly.
            </Title>

            <Paragraph style={{ color: "#b1b1b1", fontSize: "1.2rem" }}>
              <strong style={{ color: "white" }}>WishList</strong> is a free
              platform where you can create wishlists and share them via URL
              without any hassle.
            </Paragraph>

            <div style={{ marginTop: "2rem" }}>
              <Button
                type="primary"
                size="large"
                style={{ marginRight: "1rem" }}
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/login")} // Replace with /signup if needed
              >
                Sign up
              </Button>
            </div>

            <Text
              style={{ display: "block", marginTop: "2rem", color: "#555" }}
            >
              No ads. No cost. No complications.
            </Text>
          </Col>

          <Col xs={0} md={12} style={{ padding: "1rem", textAlign: "center" }}>
            <div className="card-3d">
              <img
                src="/Screenshoot.png"
                alt="wishlist illustration"
                className="card-image"
              />
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
