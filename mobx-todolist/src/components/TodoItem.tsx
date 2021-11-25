import React from 'react'
import { TodoData } from '../stores/todo'
import useStore from '../useStore';

interface Props {
    data: TodoData;
    key: string;
}

const TodoItem = ({data}: Props) => {
    const {todo} = useStore();

    const removeItem = () => {
        todo.removeTodo(data.id)
    }
    return (
        <div>
            <input type="checkbox" />
            <span>{data.content}</span>
            <span onClick={removeItem}>❌</span>
        </div>
    )
}

export default TodoItem
