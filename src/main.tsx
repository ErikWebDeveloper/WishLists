// main.tsx

import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import "./assets/css/styles.css";
import "antd/dist/reset.css";
import { ConfigProvider, theme, App, Modal } from "antd";
import AppRouter from "./Router.tsx";

// Mostrar mensaje cuando hay una nueva versión
const updateSW = registerSW({
  onNeedRefresh() {
    Modal.confirm({
      title: "Update Available",
      content: "A new version is available. Do you want to update now?",
      okText: "Update",
      cancelText: "Later",
      onOk: () => updateSW && updateSW(),
    });
  },
  onOfflineReady() {
    console.log("App is ready to work offline.");
  },
});

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
