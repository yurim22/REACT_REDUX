import React from 'react'
import styled from '@emotion/styled';

const CounterContainer = styled.div`
    border: 1px solid black;
    padding: 1rem;
    width: 19rem;
`
const titleColor = props => ({color: props.color})

const CounterTitle = styled.h1`
    maring-top: 0;
    margin-botton: 1rem;
    ${titleColor}
`


const Counter = (props) => {
    const {number, color, onIncrement, onDecrement} = props;
    return (
        <CounterContainer>
            <CounterTitle color={color}>{number}</CounterTitle>
            <button onClick={onIncrement}>+</button>
            <button onClick={onDecrement}>-</button>
        </CounterContainer>
    )
}

export default Counter
