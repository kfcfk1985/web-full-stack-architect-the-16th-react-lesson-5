import LoginService from "../service/login";

export async function loginAction(dispatch, userInfo) {
  dispatch({ type: "LOGIN_REQUEST" }); //!展示loading

  //!登陆
  const res1 = await login(dispatch, userInfo);

  if (res1.err) {
  } else {
    //! 上一个请求之后，进行下一个异步请求:获取用户信息
    getMoreUserInfo(dispatch, res1);
  }
}

function login(dispatch, userInfo) {
  return LoginService.login(userInfo).then(
    (res) => {
      return res;
    },
    (err) => {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
      return err;
    }
  );
}

function getMoreUserInfo(dispatch, userInfo) {
  LoginService.getMoreUserInfo(userInfo).then(
    (res) => {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { ...res, ...userInfo }, //!把登陆和获取用户信息的数据合并
      });
    },
    (err) => {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  );
}
