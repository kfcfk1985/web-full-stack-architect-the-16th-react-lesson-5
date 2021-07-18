import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import BasicLayout from "../../layout/BasicLayout/";
import { loginAction } from "../../action/login";
import "./index.scss";

export default connect(({ user }) => ({ user }), {
  login: (userInfo) => (dispatch) => {
    loginAction(dispatch, userInfo);
  },
})(
  class LoginPage extends Component {
    constructor(props) {
      super(props);
      this.state = { name: "" };
    }
    render() {
      const { login, user, location } = this.props;
      const { isLogin, loading, err, tip } = user;
      if (isLogin) {
        const { redirect = "/" } = location.state || {};
        return <Redirect to={redirect} />;
      }
      const { name } = this.state;
      return (
        <div>
          <h3>LoginPage</h3>
          <input
            type="text"
            value={name}
            onChange={(event) => this.setState({ name: event.target.value })}
          />
          <p className="red">{err.msg}</p>
          <button onClick={() => login({ name })}>
            {loading ? "登录中..." : "登录"}
          </button>
          <p className="green">{tip.msg}</p>
        </div>
      );
    }
  }
);
