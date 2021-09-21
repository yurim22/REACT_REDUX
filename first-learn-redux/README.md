# 💡 How to use `Redux`

## 들어가기 전에,

### 📍 리액트에서 리덕스를 사용하기 위해 필요한 라이브러리

* `redux` : 리덕스 모듈
* `react-redux` : 리액트 컴포넌트에서 리덕스를 사용하기 위한 유용한 도구들 포함
* `redux-actions` 

### 📍Duck 패턴

🐦특정 기능을 구현하기 위하여 필요한 액션과, 액션 생성함수와, 초깃값과, 리듀서 함수가 들어있는 파일로 만드는 패턴

- action을 위한 파일과 reducer를 위한 파일을 따로 작성하는 것이 아니라 하나의 파일로 작성하여 관리하게 됨.

## 알록달록 카운터 만들기

### ✏️ coutner 모듈 만들기
특정 기능을 구현하기위하여 필요한 액션과, 액션생성함수와, 초깃값과, 리듀서함수가 들어있는 파일을 우리는 모듈 이라고 부릅니다. 그리고 이 파일은 src/store/modules 경로에 저장한다.

### ✏️ 1. 액션 타입 저장하기 (src/store/modules/counter.js)
우리가 카운터 쪽에 사용할 액션들을 작성해준다.
``` javascript
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
export const changeColor = color => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
```

액션 생성함수를 정의할 땐 위와같이 꼭 앞에 `export`를 붙여주어야 한다.
여기서 만든 한수들은 나중에 우리가 컴포넌트에 리덕스를 연동하고 불러와서 사용하게 된다.

### ✏️ 3. 초기상태(initialState)와 리듀서 정의  (src/store/modules/counter.js)

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

### ✏️ 4. combinReducers로 리듀서 합치rl (src/store/modules/index.js)

* 리듀서가 여러개일때는 redux의 내장함수인 combinReducers를 사용하여 리듀서를 하나로 합치는 작업을 합니다. 여러개로 나뉘어진 리듀서들을 `서브리듀서`라고 부르고, 하나로 합쳐진 리듀서를 `루트리듀서`라고 부릅니다.

```javascript
// src/store/modules/index.js
import { combinReducers } from 'redux';
import counter from './counter';

export default combinReducers({
    counter,
    // 다른 리듀서를 만들게되면 여기에 넣어줌..
})
```
이렇게 리듀서를 합치게 되면, 루트 리듀서의 초깃값은 다음과 같은 구조로 됩니다.
```json
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

### ✏️ 6. 리덕스 개발자 도구 적용하기

* 크롬 웹스토어에서 설치 가능 => Redux Devtools (크롬 확장프로그램)