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
