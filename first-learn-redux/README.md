# π‘ How to use `Redux`

## λ€μ΄κ°κΈ° μ μ,

### π λ¦¬μ‘νΈμμ λ¦¬λμ€λ₯Ό μ¬μ©νκΈ° μν΄ νμν λΌμ΄λΈλ¬λ¦¬

- `redux` : λ¦¬λμ€ λͺ¨λ
- `react-redux` : λ¦¬μ‘νΈ μ»΄ν¬λνΈμμ λ¦¬λμ€λ₯Ό μ¬μ©νκΈ° μν μ μ©ν λκ΅¬λ€ ν¬ν¨
- `redux-actions`

### πDuck ν¨ν΄

π¦νΉμ  κΈ°λ₯μ κ΅¬ννκΈ° μνμ¬ νμν μ‘μκ³Ό, μ‘μ μμ±ν¨μμ, μ΄κΉκ°κ³Ό, λ¦¬λμ ν¨μκ° λ€μ΄μλ νμΌλ‘ λ§λλ ν¨ν΄

- actionμ μν νμΌκ³Ό reducerλ₯Ό μν νμΌμ λ°λ‘ μμ±νλ κ²μ΄ μλλΌ νλμ νμΌλ‘ μμ±νμ¬ κ΄λ¦¬νκ² λ¨.

## μλ‘λ¬λ‘ μΉ΄μ΄ν° λ§λ€κΈ°

### βοΈ coutner λͺ¨λ λ§λ€κΈ°

νΉμ  κΈ°λ₯μ κ΅¬ννκΈ°μνμ¬ νμν μ‘μκ³Ό, μ‘μμμ±ν¨μμ, μ΄κΉκ°κ³Ό, λ¦¬λμν¨μκ° λ€μ΄μλ νμΌμ μ°λ¦¬λ λͺ¨λ μ΄λΌκ³  λΆλ¦λλ€. κ·Έλ¦¬κ³  μ΄ νμΌμ src/store/modules κ²½λ‘μ μ μ₯νλ€.

### βοΈ 1. μ‘μ νμ μ μ₯νκΈ° (src/store/modules/counter.js)

μ°λ¦¬κ° μΉ΄μ΄ν° μͺ½μ μ¬μ©ν  μ‘μλ€μ μμ±ν΄μ€λ€.

```javascript
// μ‘μ νμ μ μ
const CHANGE_COLOR = "counter/CHANGE_COLOR";
const INCREMENT = "counter/INCREMENT";
const DECREMENT = "counter/DECREMENT";
```

Ducks ν¨ν΄μ μ¬μ© ν  λ μμ κ°μ΄ μ‘μ μ΄λ¦μ μ§μ λ λ¬Έμμ΄μ μλΆλΆμ λͺ¨λ μ΄λ¦μ λ£μ΅λλ€. μ΄λ, λ€λ₯Έ λͺ¨λμμ μμ±νκ² λ  μλ μλ μ‘μλ€κ³Ό μΆ©λλμ§ μκ² νκΈ° μν¨μλλ€.

### βοΈ 2. μ‘μ μμ±ν¨μ μ μνκΈ° (src/store/modules/counter.js)

μμμ μ μνλ μ‘μ νμμ λ°λΌ μ‘μ μμ±ν¨μλ₯Ό λ§λ€μ΄ μ€λ€.

```javascript
// μ‘μ μμ±ν¨μ μ μ
export const changeColor = (color) => ({ type: CHANGE_COLOR, color });
export const increment = () => ({ type: INCREMENT });
export const decrement = () => ({ type: DECREMENT });
```

μ‘μ μμ±ν¨μλ₯Ό μ μν  λ μμκ°μ΄ κΌ­ μμ `export`λ₯Ό λΆμ¬μ£Όμ΄μΌ νλ€.
μ¬κΈ°μ λ§λ  νμλ€μ λμ€μ μ°λ¦¬κ° μ»΄ν¬λνΈμ λ¦¬λμ€λ₯Ό μ°λνκ³  λΆλ¬μμ μ¬μ©νκ² λλ€.

### βοΈ 3. μ΄κΈ°μν(initialState)μ λ¦¬λμ μ μ (src/store/modules/counter.js)

```javascript
// μ΄κΈ°μν μ μ
const initialState = {
    color: 'red',
    number: 0,
}

// λ¦¬λμν¨μ μμ±
// λ¦¬λμν¨μμλ νλΌλ―Έν°λ‘ (μ΄μ μν, μ‘μκ°μ²΄)λ₯Ό λ°λλ€.
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

λ¦¬λμ ν¨μμ κ²½μ°μ, κΌ­ `export default`λ₯Ό ν΄μ£Όμ΄μΌ νλ€. λμ€μ μ€ν μ΄λ₯Ό λ§λ€λ, μ΄ ν¨μλ₯Ό νμλ‘ ν©λλ€.

### βοΈ 4. combineReducersλ‘ λ¦¬λμ ν©μΉrl (src/store/modules/index.js)

- λ¦¬λμκ° μ¬λ¬κ°μΌλλ reduxμ λ΄μ₯ν¨μμΈ combineReducersλ₯Ό μ¬μ©νμ¬ λ¦¬λμλ₯Ό νλλ‘ ν©μΉλ μμμ ν©λλ€. μ¬λ¬κ°λ‘ λλμ΄μ§ λ¦¬λμλ€μ `μλΈλ¦¬λμ`λΌκ³  λΆλ₯΄κ³ , νλλ‘ ν©μ³μ§ λ¦¬λμλ₯Ό `λ£¨νΈλ¦¬λμ`λΌκ³  λΆλ¦λλ€.

```javascript
// src/store/modules/index.js
import { combineReducers } from "redux";
import counter from "./counter";

export default combineReducers({
  counter,
  // λ€λ₯Έ λ¦¬λμλ₯Ό λ§λ€κ²λλ©΄ μ¬κΈ°μ λ£μ΄μ€..
});
```

μ΄λ κ² λ¦¬λμλ₯Ό ν©μΉκ² λλ©΄, λ£¨νΈ λ¦¬λμμ μ΄κΉκ°μ λ€μκ³Ό κ°μ κ΅¬μ‘°λ‘ λ©λλ€.

```
{
    counter : {
        color : 'red',
        number : 0,
    },
    // ... λ€λ₯Έ λ¦¬λμμμ μ¬μ©νλ μ΄κΉκ°λ€
}
```

### βοΈ 5. store λ§λ€κΈ° (src/index.js)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

// (1) createStoreμ λ£¨νΈλ¦¬λμ λΆλ¬μ€κΈ°
import { createStore } from 'redux';
import rootReducer from './store/modules';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// (2) storeλ₯Ό λ§λ€κ³  νμ¬ κ° νμΈν΄λ³΄κΈ°
const store = createStore(rootReducer);
console.log(store.getState());
// κ²°κ³Ό
// { counter: { color: 'red', number: 0 }}

ReactDOM.render(
    <App />
  document.getElementById('root')
);
registerServiceWorker();

```

### βοΈ 6. λ¦¬λμ€ κ°λ°μ λκ΅¬ μ μ©νκΈ° ('src/index.js')

- ν¬λ‘¬ μΉμ€ν μ΄μμ μ€μΉ κ°λ₯ => Redux Devtools (ν¬λ‘¬ νμ₯νλ‘κ·Έλ¨)
- μ€μΉ νμ μ€ν μ΄λ₯Ό λ§λ€ λ λ€μκ³Ό κ°μ΄ μ½λλ₯Ό μμ ν΄μ£Όλ©΄ μ μ©λλ€.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import rootReducer from './store/modules';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// λ¦¬λμ€ κ°λ°μλκ΅¬ μ μ©
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);
console.log(store.getState());

ReactDOM.render(
    <App />
  document.getElementById('root')
);
registerServiceWorker();
```

### βοΈ 7. `Provider` μ μ¬μ©νμ¬ λ¦¬μ‘νΈ νλ‘μ νΈμ μ€ν μ΄ μ°λ (src/index.js)

```javascript
import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import rootReducer from './store/modules';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// (1) Provider λΆλ¬μ€κΈ°
import { Provider } from 'react-redux';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);
console.log(store.getState());

// (2) Provider λλλ§ν΄μ κΈ°μ‘΄μ APP κ°μΈμ£ΌκΈ°
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
  document.getElementById('root')
);
registerServiceWorker();
```

### βοΈ 8. `connect`ν¨μλ₯Ό μ¬μ©νμ¬ μ»΄ν¬λνΈμ μ€ν μ΄ μ°λνκΈ° ('src/containers/PaletteContainer.js')

- μ»΄ν¬λνΈμ λ¦¬λμ€ μ€ν μ΄ μμ μλ κ°μ΄λ μ‘μ ν¨μλ€μ μ°λν΄μ£Όμ΄μΌ νλλ°, μ΄λ κ² λ¦¬λμ€μ μ°λλ μ»΄ν¬λνΈλ₯Ό μ°λ¦¬λ μ»¨νμ΄λ μ»΄ν¬λνΈλΌκ³  λΆλ₯Έλ€. κ·Έλ¦¬κ³  λ¨μν propsλ₯Ό μ λ¬ν΄μ£Όλ©΄ κ·Έλλ‘ λ³΄μ¬μ£Όλ μ»΄ν¬λνΈλ₯Ό `νλ¦¬μ  νμ΄μλ μ»΄ν¬λνΈ`λΌκ³  λΆλ₯Έλ€.
  - `νλ¦¬μ  νμ΄μλ μ»΄ν¬λνΈ` : UIμ λͺ¨μμμλ§ μ§μ€ ν  μ μλ€
  - `μ»¨νμ΄λ μ»΄ν¬λνΈ` : μ μ  μΈν°λ μμͺ½μ μ§μ€ ν  μ μλ€.

```javascript
//src/containers/PaletteContainer.js

import React from "react";
import { connect } from "react-redux";
import Palette from "../components/Palette";
import { changeColor } from "../store/modules/counter";

// propsλ‘ λ£μ΄μ€ μ€ν μ΄ μνκ°
const mapStateToProps = (state) => ({
  color: state.counter.color,
});

// propsλ‘ λ£μ΄μ€ μ‘μμμ±ν¨μ
const mapDispatchToProps = (dispatch) => ({
  changeColor: (color) => dispatch(changeColor(color)),
});

const PaletteContainer = (props) => {
  // μμ λ ν¨μλ₯Ό ν΅ν΄ μμ±λ props
  const { changeColor, color } = props;
  console.log(props);
  // κ²°κ³Ό
  // {color: "red", changeColor: Ζ changeColor()}
  const handleSelect = (color) => {
    console.log("what");
    changeColor(color);
  };

  return <Palette onSelect={handleSelect} selected={color} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(PaletteContainer);
```

μ»¨νμ΄λ μ»΄ν¬λνΈλ₯Ό λ§λ€λ, react-reduxμμ λ€μ΄μλ `connect`λΌλ ν¨μλ₯Ό μ¬μ©ν©λλ€.
`connect` μμ λ€μ΄μλ

- `mapStateToProps` : μ€ν μ΄ μμ λ€μ΄μλ κ°μ propsλ‘ μ λ¬ν΄μ£Όκ³ ,
- `mapDispatchToProps` : μ‘μ μμ±ν¨μλ€μ propsλ‘ μ λ¬ν΄μ€λ€.

  - μ‘μ μμ±ν¨μλ, νΈμΆνλ€κ³  ν΄μ μνμ λ³νκ° μΌμ΄λλ κ²μ΄ μλλ€. κ·Έ λμ μ μ‘μ κ°μ²΄λ₯Ό μμ±ν΄λΈλ€.
  - κ·Έ μ‘μ κ°μ²΄λ₯Ό μ€ν μ΄νν μ λ¬ν΄μ£Όμ΄μΌ μνμ λ³νκ° λ°μνλ€.

  - μ¬κΈ° μλ mapDispatchToPropsλ `color`λ₯Ό νλΌλ―Έν°λ‘ λ°μμμ, κ·Έ κ°μ κ°μ§κ³  `CHANGE_COLOR` μ‘μ κ°μ²΄λ₯Ό μμ±ν λ€μμ μ€ν μ΄νν λμ€ν¨μΉ νλ ν¨μλ₯Ό μ»΄ν¬λνΈμ propsλ‘ μ λ¬ν΄μ£Όλ κ²μ΄λ€.

`connect` ν¨μκ° νΈμΆλλ©΄, λ°ννλ κ°μ νΉμ  μ»΄ν¬λνΈμ μ€μ λ propsλ₯Ό μ λ¬ν΄μ£Όλ ν¨μμ΄λ€.


<μ°Έκ³ >
* https://velog.io/@velopert/Redux-3-%EB%A6%AC%EB%8D%95%EC%8A%A4%EB%A5%BC-%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%99%80-%ED%95%A8%EA%BB%98-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0-nvjltahf5e#%EC%95%A1%EC%85%98-%ED%83%80%EC%9E%85-%EC%A0%95%EC%9D%98%ED%95%98%EA%B8%B0-1