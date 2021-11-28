# TodoList using Mobx

## 1. Mobx Installation

```
$ npm install mobx mobx-react
```
⭐️`mobx-react` 는 v6 이상부터 hooks 문법을 지원한다.

### Store

#### /src/stores/todo.ts
```typescript
import { observable } from 'mobx';

export interface TodoData {
  id: number;
  content: string;
  checked: boolean;
}

interface Todo {
  todoData: TodoData[];
  currentId: number;
  addTodo: (content: string) => void;
  removeTodo: (id: number) => void;
}

// mobx에서 store를 만드는 방법 
// : todo 객체를 선언하고 `observable`로 감싸준다.
export const todo = observable<Todo>({
  todoData: [],
  currentId: 0,

  addTodo(content) {
    this.todoData.push({ id: this.currentId, content, checked: false });
    this.currentId++;
  },
  removeTodo(id) {
    const index = this.todoData.findIndex((v) => v.id === id);
    if (id !== -1) {
      this.todoData.splice(index, 1);
    }
  },
});
```
👉🏻 store를 만드는 방법은 todo 객체를 선언하고 `observable`로 감싸준다.
store 객체 안에 action을 선언 할 수 있다.

#### /src/useStore.ts
``` typescript
import {todo} from './store/todo';

const useStore = () => ({todo});

export default useStore;
```

`useStore`는 컴포넌트 마다 스토어를 사용하기 위해 작성한다. 
만약 스토어가 여러개일 경우 불러와서 합쳐주면 된다.


#### component에서 action 사용하기

👉🏻각 component에서 `const {todo} = useStore();` 과 같이 store를 불러와서 사용할 수 있다.

👉🏻`todo.removeTodo(data.id)` 이렇게 store안의 action을 쓸 수 있다.

#### component에서 store 값 사용하기
👉🏻 데이터를 사용할 때는 해당 컴포넌트를 `useObserver`로 감싸워야 한다.

#### /src/component/TodoList.tsx
```typescript
import React from 'react';
import {useObserver} from 'mobx-react';

import useStore from '../useStore';
import TodoItem from './TodoItem';

const TodoList = () => {
    const {todo: {todoData}} = useStore();
}

return useObsever(() => (
    <section>
        {todoData.map((v) => (
            <TodoItem data={v} key={`todoData_${v.id}`} />
        ))}
    </section>
))

export default TodoList;
```