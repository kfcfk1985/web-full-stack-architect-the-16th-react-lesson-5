import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "../pages/HomePage/";
import LoginPage from "../pages/LoginPage/";
import UserPage from "../pages/UserPage/";
import TopBar from "../components/TopBar/";
import BottomNav from "../components/BottomNav/";
import BasicLayout from "../layout/BasicLayout/";
import PrivateRoute from "./PrivateRoute";

const bottomNav = {};

const routes = [
  {
    path: "/",
    title: "首页",
    props: { exact: true },
    component: HomePage,
  },
  {
    path: "/login",
    title: "登录",
    component: LoginPage,
  },
  {
    path: "/user",
    title: "用户中心",
    component: UserPage,
  },
];

// todo 实现topBar的顶部title显示，注意优化，不要重复渲染
export default function Routes(props) {
  return (
    <Router>
      <BasicLayout>
        <TopBar />

        <Switch>
          {routes.map((item) => {
            if (item.path === "/user") {
              //!为用户界面，需要登陆，用路由拦截
              return (
                <PrivateRoute key={item.path}>
                  <Route
                    {...item.props}
                    path={item.path}
                    key={item.path}
                    component={item.component}
                  />
                </PrivateRoute>
              );
            } else {
              return (
                <Route
                  {...item.props}
                  path={item.path}
                  key={item.path}
                  component={item.component}
                />
              );
            }
          })}
        </Switch>

        {/* //!不设置path，则都会渲染(因为每个页面都会用到这组件) */}
        {/* <Route component={BottomNav} /> */}
        {/* //!其实用下面的方式更佳 */}
        <BottomNav />
      </BasicLayout>
    </Router>
  );
}
