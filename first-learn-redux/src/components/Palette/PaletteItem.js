import React from 'react'
import styled from '@emotion/styled';

const itemWithProps = props => ({backgroundColor: props.color, opacity: props.active ? 1 : 0.7})

const ItemContainer = styled.div`
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    border:2px solid white;
    margin-right: 5px;
    ${itemWithProps};

    &:hover {
        opacity: 0.9;
    }

    &:active {
        opacity: 1;
    }
`

const PaletteItem = (props) => {
    const {color , active, onClick} = props;
    return (
        <ItemContainer color={color} active={active} onClick={onClick}></ItemContainer>
    )
}

export default PaletteItem
