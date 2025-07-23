import { useState } from "react";
import { Button, Form, Input, Typography, Card, App } from "antd";
//import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabase";

const { Title, Text, Link } = Typography;

export default function LoginPage() {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  //const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (error) {
          message.error(error.message);
          return;
        }

        message.success("Login successful! Redirecting...");
        //navigate("/list");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
        });

        if (error) {
          message.error(error.message);
          return;
        }

        if (data?.user) {
          message.success(
            "Signup successful! Check your email to confirm your account."
          );
          setIsLogin(true);
        } else {
          message.warning(
            "Signup complete, but no user returned. Please verify your email."
          );
        }
      }
    } catch (err: any) {
      message.error(err?.message || "Unexpected error.");
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1em",
        background: "#000",
      }}
    >
      <Card style={{ width: "100%", maxWidth: 400 }}>
        <Title level={3} style={{ textAlign: "center" }}>
          {isLogin ? "Login" : "Sign Up"}
        </Title>

        <Form name="auth" layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input placeholder="you@example.com" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="••••••••" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {isLogin ? "Log in" : "Sign up"}
            </Button>
          </Form.Item>

          <Text
            type="secondary"
            style={{ display: "block", textAlign: "center" }}
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign up" : "Log in"}
            </Link>
          </Text>
        </Form>
      </Card>
    </div>
  );
}
