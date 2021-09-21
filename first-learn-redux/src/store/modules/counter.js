// Ducks 패턴
// 특정 기능을 구현하기 위해 필요한
// 액션, 액션생성함수, 초기값, 리듀서 함수를 한 파일에 넣는다

// 액션 타입 정의
const CHANGE_COLOR = "counter/CHANGE_COLOR";
const INCREMENT = "counter/INCREMENT";
const DECREMENT = "counter/DECREMENT";

// 액션 생성함수 정의
export const changeColor = (color) => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });

// 초기상태 정의
const initialState = {
  color: "red",
  number: 0,
};

// ****** 리듀서 작성
// 리듀서함수에는 파라미터로 (이전상태, 액션객체)를 받는다.
export default function counter(state = initialState, action) {
  switch (action.type) {
    case CHANGE_COLOR:
      return {
        ...state,
        color: action.color,
      };
    case INCREMENT:
      return {
        ...state,
        number: state.number + 1,
      };
    case DECREMENT:
      return {
        ...state,
        number: state.number - 1,
      };
    default:
      return state;
  }
}
