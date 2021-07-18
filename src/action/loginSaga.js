//! 做监听:用 takeEvery 或 take
//! 状态更新:用 put （相当于 dispatch ）
//! 调用异步操作：阻塞用 call（相当于async/await，会等待执行完才会继续往下走)；不阻塞用 fork，不会等待
//!

import { call, fork, put, take, takeEvery } from "redux-saga/effects";
import LoginService from "../service/login";

//!叫： worker saga(干活的工人)
function* loginHandle(action) {
  console.log("action", action); //sy-log

  //!状态更新:用 put （相当于 dispatch ）
  yield put({ type: "LOGIN_REQUEST" }); //!展示loading
  try {
    //!登陆
    //! 调用异步操作：用 call（相当于async/await;
    const res1 = yield call(LoginService.login, action.payload);

    //! 上一个请求之后，进行下一个异步请求:获取用户信息
    const res2 = yield call(LoginService.getMoreUserInfo, res1);

    yield put({ type: "LOGIN_SUCCESS", payload: { ...res2, ...res1 } });
  } catch (err) {
    yield put({ type: "LOGIN_FAILURE", payload: err });
  }
}

//!叫： watcher saga
function* loginSaga(params) {
  //! 监听 loginSaga ，一旦监听到，执行 loginHandle
  yield takeEvery("loginSaga", loginHandle);

  //! 和上面的等效
  const action = yield take("loginSaga");
  yield call(loginHandle, action);
  console.log("res", action); //sy-log
}

export default loginSaga;

// const takeEvery = (pattern, saga, ...args) =>
//   fork(function* () {
//     while (true) {
//       const action = yield take(pattern);
//       yield fork(saga, ...args.concat(action));
//     }
//   });
