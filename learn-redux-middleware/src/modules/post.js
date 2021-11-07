// 액션 타입
import axios from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import {
  reducerUtils,
  handleAsyncActions,
  handleAsyncActionsById,
} from "../lib/asyncUtils";

const getPostsAPI = async () => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts`
  );
  return response.data;
};
const getPostByIdAPI = async (id) => {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return response.data;
};

// 포스트 여러개 조회
const GET_POSTS = "GET_POSTS"; // 요청 시작
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS"; //요청 성공
const GET_POSTS_ERROR = "GET_POSTS_ERROR";

// 포스트 하나 조회
const GET_POST = "GET_POST"; // 요청 시작
const GET_POST_SUCCESS = "GET_POST_SUCCESS"; //요청 성공
const GET_POST_ERROR = "GET_POST_ERROR"; // 요청 실패

// 액션 생성함수
export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id }); //payload: 파라미터 용도

// saga 함수
function* getPostsSaga() {
  try {
    // call : 특정 함수를 호출하고, 결과가 반환 될 때까지 기다려준다.
    const posts = yield call(getPostsAPI);
    yield put({
      type: GET_POSTS_SUCCESS,
      payload: posts,
    }); // 성공 액션 디스패치
  } catch (e) {
    yield put({
      type: GET_POSTS_ERROR,
      error: true,
      payload: e,
    }); //실패 액션 디스패치
  }
}

// 액션이 지니고 있는 값을 조회하고 싶다면, action을 파라미터로 받아와서 사용 할 수 있습니다.
function* getPostSaga(action) {
  const param = action.payload;
  const id = action.meta;
  try {
    // call : 특정 함수를 호출하고, 결과가 반환 될 때까지 기다려준다.
    // API 함수에 넣어주고 싶은 인자는 call 함수의 두번째 인자부터 순서대로 넣어주면 된다.
    const post = yield call(getPostByIdAPI, param);
    yield put({
      type: GET_POST_SUCCESS,
      payload: post,
      meta: id,
    }); // 성공 액션 디스패치
  } catch (e) {
    yield put({
      type: GET_POST_ERROR,
      error: true,
      payload: e,
      meta: id,
    }); //실패 액션 디스패치
  }
}

// 사가들을 합치기
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
}

// 3번째 인자를 사용하면 withExtraArgument 에서 넣어준 값들을 사용 할 수 있습니다.
export const goToHome = () => (dispatch, getState, { history }) => {
  history.push("/");
};

// initialState 쪽도 반복되는 코드를 initial() 함수를 사용해서 리팩토링 했습니다.
const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial(),
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, "posts", true)(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActionsById(GET_POST, "post", true)(state, action);
    default:
      return state;
  }
}
