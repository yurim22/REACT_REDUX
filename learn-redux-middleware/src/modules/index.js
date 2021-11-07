import { combineReducers } from "redux";
import counter, { counterSaga } from "./counter";
import posts, { postsSaga } from "./post";
import { all } from "redux-saga/effects";

const rootReducer = combineReducers({ counter, posts });
export function* rootSaga() {
  yield all([counterSaga(), postsSaga()]);
}
export default rootReducer;
