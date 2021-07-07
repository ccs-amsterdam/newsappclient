import React from "react";
import { Menu, Sidebar } from "semantic-ui-react";
import { Link, withRouter, useLocation } from "react-router-dom";

const HeaderMenu = ({ items, children }) => {
  const location = useLocation();
  const visible = location.pathname !== "/";
  console.log(visible);

  const menuItems = items.map((item, index) => {
    return (
      <Menu.Item
        key={"item-" + index}
        index={index}
        as={Link}
        to={item.path}
        header={index === 0}
        disabled={false}
        active={item.path === location.pathname}
      >
        {item.label}
      </Menu.Item>
    );
  });

  return (
    <Sidebar.Pushable>
      <Sidebar as={Menu} inverted animation="overlay" visible={true} direction={"top"} size="mini">
        {menuItems}
      </Sidebar>
      <Sidebar.Pusher>{children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default withRouter(HeaderMenu);
