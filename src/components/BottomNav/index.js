import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./index.scss";

const menu = [
  {
    key: "home",
    title: "首页",
    link: "/",
    icon: "shouye",
  },
  {
    key: "login",
    title: "登陆",
    link: "/login",
    icon: "fenlei",
  },

  {
    key: "user",
    title: "我的淘宝",
    link: "/user",
    icon: "wode",
  },
];

export default class BottomNav extends Component {
  componentDidMount() {
    console.log("BottomNav:componentDidMount"); //sy-log
  }
  render() {
    return (
      <ul className="bottomNav">
        {menu.map((item) => (
          <MenuItem key={item.key} {...item} />
        ))}
      </ul>
    );
  }
}

function MenuItem(props) {
  return (
    <li className="menuItem">
      <span className={"iconfont icon-" + props.icon}></span>
      <Link to={props.link}>{props.title}</Link>
    </li>
  );
}
