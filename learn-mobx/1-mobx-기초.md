## MobX

state → action(함수일 필요도 없다) → state 변경

observable이 state를 감싸고 있다. ⇒ observer에게 바뀐 사항을 알려준다.

```jsx
const { observable, autorun, runInAction } = require("mobx");

const state = observable({
  compA: "a",
  compB: 12,
  compC: null,
});

autorun(() => {
  console.log("changed");
});

// redux처럼 action 만들고 dispatch하는거 다 필요없고 그냥 바꾸기만 하면
// 그 자체로 action이 된다.
state.compA = "c";

runInAction(() => {
  state.compA = "d";
  state.compB = "e";
  state.compC = "f";
});
runInAction(() => {
  state.compA = "d";
});
```

- autorun : 바뀔 때 마다 뭔가 바뀌었다는 것을 감지하는 역할
- reaction : 감지하기를 원하는 값을 선택하면, 그 값이 변했을때 두번째 인자의 함수가 실행
  ```jsx
  reaction(
    () => {
      return state.compB;
    },
    () => {
      console.log("reaction", state.compB);
    }
  );
  ```
- runInAction : 여러개의 action을 하나로 묶어준다.
- action : `runInAction` 은 바로 실행되는 반면에, `action` 은 따로 변수로 정의를 해놓고 내가 원할 때에 실행 할 수 있다.

정해진 틀이 없어서 자유롭다.

### 데코레이터(@)

@observable

⇒ 함수라고 생각! (감싸주는것을 편하게)

```jsx
@observable
const userStore
```

## 리덕스 vs mobX

### 1. initial state setting

💟 **redux**

```jsx
const initialState = {
	user: {
		isLoggingIn: true,
		data: null
	}
	posts: [],
}
// 하나의 initialState 안에 여러개의 객체로 나눠서 정의한다.
```

💟 **mobX**

```jsx
const userState = observable({
  isLoggingIn: true,
  data: null,
});

const postState = observable([]);

//애초에 다른 변수 이름으로 각자 정의할 수 있다.

// + 로그인 하면서 동시에 글을 작성하는 action
```

### 2. 다른 state에 대한 하나의 action

예시) **로그인을 하면서 동시에 하나의 글을 작성하는 action**

💟 **mobX**

```jsx
runInAction(() => {
  postState.push({ id: 1, content: " 안녕하세요" });
  userState.data = {
    id: 1,
    nickname: "yurim2",
  };
});
//runInAction으로 안묶어주어도 가능
```

💟 **redux**

```jsx
const postReducer = (prevState = initialState, action) => {
	return

// userReducer과 postReducer가 나뉘어져 있어서 하나의 action에서
// 동시에 다른 reducer의 값을 수정 할 수 없다
// 서로 다른 action을 만들어주어야함.
```

redux 에서는 불변성이 중요하게 여겨지지만, mobX에서는 불변성을 따지지 않음

- react는 내부적으로 `prevState === nextState` 를 비교한다. 이때 다르면(false) 렌더링을 다시하고, 같으면(true)이면 렌더링을 하지 않는다.
- 렌더링 자체는 리엑트가 하는 것이기 때문에 redux나 mobx 같은 상태관리에서 렌더링 자체를 신경쓸 필요는 없다..
  - redux의 컨셉 자체가 react를 따라서 불변성을 따르려고 만들었다.

class ⇒ `new` 를 활용해서 새로운 instance를 만들어내려고 쓴다.

## store 쓰기

```jsx
//store.js
const userStore = observable({
	isLoggingIn: false,
	data: null,

	logIn(data) {
		this.isLoggingIn = true;
		setTimeOut(() => {
			this.data = data;
			this.isLoggingIn = false;
			postStore.data.push(1); // redux에 비해 편한 점
		}, 2000 );
	}

	logOut() {
		this.data = null;
	},
});

const postStore = observable({
	data: [],
	addPost(data) {
		this.data.push(data);
	}
});
```

안에다가 action 함수를 바로 포함시켜서 상태변화까지 실행
