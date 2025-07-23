import { createRoot } from "react-dom/client";
import "./assets/css/styles.css";
import "antd/dist/reset.css";
import { ConfigProvider, theme, App } from "antd";
import AppRouter from "./Router.tsx";

createRoot(document.getElementById("root")!).render(
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
      components: {
        Rate: { starColor: "#c53232" },
      },
    }}
  >
    <App>
      <AppRouter />
    </App>
  </ConfigProvider>
);
