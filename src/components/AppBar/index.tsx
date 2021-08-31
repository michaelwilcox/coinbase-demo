import React from "react";
import { Button, Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";

export const AppBar = (props: { left?: JSX.Element; right?: JSX.Element }) => {
  return (
    <div className="App-Bar-right">
      <Popover
        placement="topRight"
        title="Settings"
        content={<div></div>}
        trigger="click"
      >
        <Button
          shape="circle"
          size="large"
          type="text"
          icon={<SettingOutlined />}
        />
      </Popover>
    </div>
  );
};
