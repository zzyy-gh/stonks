import React from "react";
import { Layout, Menu } from "antd";
import { navigate } from "gatsby";

const { Header, Content } = Layout;

const MainLayout = ({ children, path }) => {
  const handleClick = (e) => {
    navigate(e.key.toString());
  };

  return (
    <Layout className="layout">
      <Header
        style={{ position: "fixed", zIndex: 1, width: "100%", height: "50px" }}
      >
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[path]}
          onClick={handleClick}
          style={{ height: "100%" }}
        >
          <Menu.Item key="/">Daily</Menu.Item>
          <Menu.Item key="/alltime">All Time</Menu.Item>
          <Menu.Item key="/testapi">Test API</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "60px 16px 16px 16px" }}>{children}</Content>
    </Layout>
  );
};

export default MainLayout;
