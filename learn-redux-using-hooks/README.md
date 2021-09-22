# Redux with `useSelector` , `useDispatch` 

## 들어가기 전에,

### 📍리덕스 개발자 도구 연동

1. 크롬 웹 스토어에서 확장 프로그램 설치 -> Redux DevTools
2. 프로젝트에 redux-devtools-extension 설치
`$ yarn add redux-devtools-extension`
3. index.js 수정
```javascript
import { createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools());
// composeWithDevTools를 사용하여 리덕스 개발자 도구 활성화
```

## useSelector, useDispatch 사용하기
```javascript
  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
  }));

  const dispatch = useDispatch();
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = (diff) => dispatch(setDiff(diff));
```

이전 예시에서는 `mapStateToProps` 와  `mapDispatchToProps`를 사용하였지만, 여기서는 `useSelector`, `useDispatch` hook을 사용하였다.
* `useSelector` -> `mapStateToProps`와 비슷한 느낌
    - 스토어의 상태를 조회해서 어떤 것들을 props로 넣어줄지 정의한다.
    - 기본적으로 useSelector는 리덕스 스토어의 상태를 조회해서 만약 상태가 바뀌지 않으면 리렌더링 하지 않는다.
* `useDispatch` -> `mapDispatchToProps` 와 같은 기능을 하는 것 같다.

두 hook을 사용하면서 connect 함수를 쓰지 않게 되었다.