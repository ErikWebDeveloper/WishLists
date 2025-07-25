import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

export default function Navbar() {
  return (
    <nav className="max-w-[1000px] w-full mx-auto shadow flex items-center justify-between">
      {/* App Name */}
      <div className="text-xl font-semibold">Wish List</div>

      {/* Logout Button */}
      <Button
        variant="filled"
        color="default"
        icon={<LogoutOutlined />}
        //onClick={onLogout}
      >
        Logout
      </Button>
    </nav>
  );
}
