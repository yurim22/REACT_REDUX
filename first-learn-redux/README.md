# 💡 How to use `Redux`

## 들어가기 전에,

### 📍 리액트에서 리덕스를 사용하기 위해 필요한 라이브러리

- `redux` : 리덕스 모듈
- `react-redux` : 리액트 컴포넌트에서 리덕스를 사용하기 위한 유용한 도구들 포함
- `redux-actions`

### 📍Duck 패턴

🐦특정 기능을 구현하기 위하여 필요한 액션과, 액션 생성함수와, 초깃값과, 리듀서 함수가 들어있는 파일로 만드는 패턴

- action을 위한 파일과 reducer를 위한 파일을 따로 작성하는 것이 아니라 하나의 파일로 작성하여 관리하게 됨.

## 알록달록 카운터 만들기

### ✏️ coutner 모듈 만들기

특정 기능을 구현하기위하여 필요한 액션과, 액션생성함수와, 초깃값과, 리듀서함수가 들어있는 파일을 우리는 모듈 이라고 부릅니다. 그리고 이 파일은 src/store/modules 경로에 저장한다.

### ✏️ 1. 액션 타입 저장하기 (src/store/modules/counter.js)

우리가 카운터 쪽에 사용할 액션들을 작성해준다.

```javascript
// 액션 타입 정의
const CHANGE_COLOR = "counter/CHANGE_COLOR";
const INCREMENT = "counter/INCREMENT";
const DECREMENT = "counter/DECREMENT";
```

Ducks 패턴을 사용 할 땐 위와 같이 액션 이름을 지을 때 문자열의 앞부분에 모듈 이름을 넣습니다. 이는, 다른 모듈에서 작성하게 될 수도 있는 액션들과 충돌되지 않게 하기 위함입니다.

### ✏️ 2. 액션 생성함수 정의하기 (src/store/modules/counter.js)

위에서 정의했던 액션 타입에 따라 액션 생성함수를 만들어 준다.

```javascript
// 액션 생성함수 정의
export const changeColor = (color) => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
```

액션 생성함수를 정의할 땐 위와같이 꼭 앞에 `export`를 붙여주어야 한다.
여기서 만든 한수들은 나중에 우리가 컴포넌트에 리덕스를 연동하고 불러와서 사용하게 된다.

### ✏️ 3. 초기상태(initialState)와 리듀서 정의 (src/store/modules/counter.js)

```javascript
// 초기상태 정의
const initialState = {
    color: 'red',
    number: 0,
}

// 리듀서함수 작성
// 리듀서함수에는 파라미터로 (이전상태, 액션객체)를 받는다.
export default function counter(state=initialState, action ) {
    switch (action.type) {
        case CHANGE_COLOR:
            return {
                ...state,
                color: action.color,
            };
        case INCREMENT:
            return {
                ...state,
                number: state.number + 1;
            }
        case DECREMENT:
            return {
                ...state,
                number: state.number - 1;
            }
        default:
            return state
    }
}
```

리듀서 함수의 경우엔, 꼭 `export default`를 해주어야 한다. 나중에 스토어를 만들때, 이 함수를 필요로 합니다.

### ✏️ 4. combineReducers로 리듀서 합치rl (src/store/modules/index.js)

- 리듀서가 여러개일때는 redux의 내장함수인 combineReducers를 사용하여 리듀서를 하나로 합치는 작업을 합니다. 여러개로 나뉘어진 리듀서들을 `서브리듀서`라고 부르고, 하나로 합쳐진 리듀서를 `루트리듀서`라고 부릅니다.

```javascript
// src/store/modules/index.js
import { combineReducers } from "redux";
import counter from "./counter";

export default combineReducers({
  counter,
  // 다른 리듀서를 만들게되면 여기에 넣어줌..
});
```

이렇게 리듀서를 합치게 되면, 루트 리듀서의 초깃값은 다음과 같은 구조로 됩니다.

```
{
    counter : {
        color : 'red',
        number : 0,
    },
    // ... 다른 리듀서에서 사용하는 초깃값들
}
```

### ✏️ 5. store 만들기 (src/index.js)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

// (1) createStore와 루트리듀서 불러오기
import { createStore } from 'redux';
import rootReducer from './store/modules';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// (2) store를 만들고 현재 값 확인해보기
const store = createStore(rootReducer);
console.log(store.getState());
// 결과
// { counter: { color: 'red', number: 0 }}

ReactDOM.render(
    <App />
  document.getElementById('root')
);
registerServiceWorker();

```

### ✏️ 6. 리덕스 개발자 도구 적용하기 ('src/index.js')

- 크롬 웹스토어에서 설치 가능 => Redux Devtools (크롬 확장프로그램)
- 설치 후에 스토어를 만들 때 다음과 같이 코드를 수정해주면 적용된다.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import rootReducer from './store/modules';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// 리덕스 개발자도구 적용
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);
console.log(store.getState());

ReactDOM.render(
    <App />
  document.getElementById('root')
);
registerServiceWorker();
```

### ✏️ 7. `Provider` 을 사용하여 리액트 프로젝트에 스토어 연동 (src/index.js)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import rootReducer from './store/modules';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// (1) Provider 불러오기
import { Provider } from 'react-redux';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);
console.log(store.getState());

// (2) Provider 랜더링해서 기존의 APP 감싸주기
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
  document.getElementById('root')
);
registerServiceWorker();
```

### ✏️ 8. `connect`함수를 사용하여 컴포넌트에 스토어 연동하기 ('src/containers/PaletteContainer.js')

- 컴포넌트에 리덕스 스토어 안에 있는 값이나 액션 함수들을 연동해주어야 하는데, 이렇게 리덕스와 연동된 컴포넌트를 우리는 컨테이너 컴포넌트라고 부른다. 그리고 단순히 props를 전달해주면 그대로 보여주는 컴포넌트를 `프리젠테이셔널 컴포넌트`라고 부른다.
  - `프리젠테이셔널 컴포넌트` : UI의 모양새에만 집중 할 수 있다
  - `컨테이너 컴포넌트` : 유저 인터렉션쪽에 집중 할 수 있다.

```javascript
//src/containers/PaletteContainer.js

import React from "react";
import { connect } from "react-redux";
import Palette from "../components/Palette";
import { changeColor } from "../store/modules/counter";

// props로 넣어줄 스토어 상태값
const mapStateToProps = (state) => ({
  color: state.counter.color,
});

// props로 넣어줄 액션생성함수
const mapDispatchToProps = (dispatch) => ({
  changeColor: (color) => dispatch(changeColor(color)),
});

const PaletteContainer = (props) => {
  // 위의 두 함수를 통해 생성된 props
  const { changeColor, color } = props;
  console.log(props);
  // 결과
  // {color: "red", changeColor: ƒ changeColor()}
  const handleSelect = (color) => {
    console.log("what");
    changeColor(color);
  };

  return <Palette onSelect={handleSelect} selected={color} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(PaletteContainer);
```

컨테이너 컴포넌트를 만들땐, react-redux안에 들어있는 `connect`라는 함수를 사용합니다.
`connect` 안에 들어있는

- `mapStateToProps` : 스토어 안에 들어있는 값을 props로 전달해주고,
- `mapDispatchToProps` : 액션 생성함수들을 props로 전달해준다.

  - 액션 생성함수는, 호출한다고 해서 상태에 변화가 일어나는 것이 아니다. 그 대신에 액션 객체를 생성해낸다.
  - 그 액션 객체를 스토어한테 전달해주어야 상태에 변화가 발생한다.

  - 여기 있는 mapDispatchToProps는 `color`를 파라미터로 받아와서, 그 값을 가지고 `CHANGE_COLOR` 액션 객체를 생성한 다음에 스토어한테 디스패치 하는 함수를 컴포넌트의 props로 전달해주는 것이다.

`connect` 함수가 호출되면, 반환하는 값은 특정 컴포넌트에 설정된 props를 전달해주는 함수이다.


<참고>
* https://velog.io/@velopert/Redux-3-%EB%A6%AC%EB%8D%95%EC%8A%A4%EB%A5%BC-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%99%80-%ED%95%A8%EA%BB%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-nvjltahf5e#%EC%95%A1%EC%85%98-%ED%83%80%EC%9E%85-%EC%A0%95%EC%9D%98%ED%95%98%EA%B8%B0-1