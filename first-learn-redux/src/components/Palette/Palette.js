import React from 'react'
import styled from '@emotion/styled';
import PaletteItem from './PaletteItem';

const PaletteContainer = styled.div`
    background: black;
    color: white;
    padding: 1rem;
    dislpay: inline-flex;
    flex-direction: column;
    width: 19rem;
`
const PaletteTitle = styled.h1`
    margin-top: 0;
    margin-bottom: 1rem;
`
const PaletteItemContainer = styled.div`
    display: flex;
`

const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];

const Palette = (props) => {
    const {selected, onSelect} = props;
    console.log(selected);
    return (
        <PaletteContainer>
            <PaletteTitle>색깔을 골라골라</PaletteTitle>
            <PaletteItemContainer>
                {colors.map(color => 
                    <PaletteItem color={color} key={color} active={selected === color} onClick={() => onSelect(color)}></PaletteItem>)}
            </PaletteItemContainer>
        </PaletteContainer>
    )
}

export default Palette

// {colors.forEach(color => {
//     <PaletteItem color={color} key={color} active={selected === color} />
// })}
// <PaletteItem color={color} key={color} active={selected === color}></PaletteItem>