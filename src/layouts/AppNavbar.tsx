import { Link } from "react-router-dom";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const URL_LOGO="/dashboard"

export default function Navbar() {
  return (
    <nav className="max-w-[1000px] w-full mx-auto shadow flex items-center justify-between">
      {/* App Name */}
      <div className="text-xl font-semibold">
        <Link to={URL_LOGO} className="!text-white">
        <span className="text-purple-500">Wish</span>List
        </Link>
      </div>

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
