import { useEffect } from "react";
import { Layout, message } from "antd";

import { useWishes } from "../hooks/useWishes";

import SharedWishTable from "../components/SharedWishTable";

export default function SharedWishPage() {
  const { listName, wishes, error, clearErrors, loading } = useWishes();

  const [messageApi, contextHolder] = message.useMessage();

  const showErrorMessage = (error: string) => {
    messageApi.error(error);
  };

  useEffect(() => {
    if (error && error.message) {
      showErrorMessage(error.message);
      clearErrors();
    }
  }, [error]);

  return (
    <Layout style={{ minHeight: "100vh", paddingTop: "1rem" }}>
      {contextHolder}

      {/** Data display */}
      <section className="list-section">
        <SharedWishTable listName={listName} loading={loading} data={wishes} />
      </section>
    </Layout>
  );
}
