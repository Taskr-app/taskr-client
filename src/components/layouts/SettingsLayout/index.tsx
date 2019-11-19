import React from "react";
import { Menu } from "antd";
import Layout from "../Layout";

const SettingsLayout: React.FC = ({ children }) => {
  return (
    <Layout
      sider={
        <>
          <Menu style={{ height: "100%" }}>
            <Menu.Item>User settings</Menu.Item>
          </Menu>
        </>
      }
    >
      {children}
    </Layout>
  );
};

export default SettingsLayout;
