import React from 'react'
import styled from '@emotion/styled';

const itemWithProps = props => ({backgroundColor: props.color, opacity: props.active ? 1 : 0.7})

const ItemContainer = styled.div`
    border-radius: 50%;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    border:2px solid white;
    maring-right: 0.5rem;
    ${itemWithProps};

    &:hover {
        opacity: 0.9;
    }
`

const PaletteItem = (props) => {
    console.log(props)
    const {color , active, onClick} = props;
    console.log(color);
    return (
        <ItemContainer color={color} active={active} onClick={onClick}></ItemContainer>
    )
}

export default PaletteItem
