import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon }  from "@fortawesome/react-fontawesome";
import { faPalette} from "@fortawesome/free-solid-svg-icons";
import { StateContext } from "../context/StateContext";
const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5px;
    padding: 5px;
`

const PickerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const Picker = styled.input`
position: absolute;
opacity: 0;
`
const PickerIcon = styled(FontAwesomeIcon)`
    font-size: 25px;
    cursor: pointer;
    position: absolute;
    color: ${props => props.color};
    filter: drop-shadow(0 0 2px #000);
`

const ColorPicker = ({color}) => {

const {
        toolActive, setToolActive,
        tool, setTool,
        currentColorIndex, setCurrentColorIndex,
        palette, setPalette,
        frames, setFrames,
        currentFrameIndex, setCurrentFrameIndex, config
} = useContext(StateContext)
    const handleChange = (e) => { 
        let newPalette = [...palette];
        newPalette[currentColorIndex] = e.target.value;
        setPalette(newPalette);
    }
    return (
        <Wrapper>
            
            <PickerWrapper>
                <PickerIcon icon={faPalette} color={color} />
                <Picker type="color" value={color} onChange={handleChange} />
            </PickerWrapper>
       </Wrapper>
    )
}

export default ColorPicker;