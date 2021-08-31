import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import { AppBar } from "../AppBar";

const { Header, Content } = Layout;

export const AppLayout = React.memo(({ children }) => {
  return (
      <div className="App">
        <Layout title="App">
          <Header className="App-Bar">
            <Link to="/">
              <div className="app-title">
                <h2>Coinbase Demo</h2>
              </div>
            </Link>
            <AppBar />
          </Header>
          <Content style={{ padding: "0 50px" }}>{children}</Content>
        </Layout>
      </div>
  );
});
