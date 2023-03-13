import { useContext, useState} from "react";
import styled from "styled-components";
import { StateContext } from "../context/StateContext";
import { faPenRuler } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Wrapper = styled.div``
const Icon = styled(FontAwesomeIcon)``
const Lable = styled.label``
const Value = styled.p``
const Input = styled.input``
const HiddenWrapper = styled.div`
    display: ${props => props.visible ? "flex" : "none"};
    flex-direction: column;
`

const BrushSizeChanger = () => {
    const [visible, setVisible] = useState(false)
    const {
        brushSize, setBrushSize
    } = useContext(StateContext)

    const handleChange = (e) => {
        setBrushSize(e.target.value)
    }

    const toggleVisible = (e) => {
        setVisible(!visible)
    }

    const handleBlur = (e) => {
        setVisible(false)
    }

    return (
        <Wrapper>
            <Icon icon={faPenRuler} onClick={toggleVisible}/>
            <HiddenWrapper visible={visible}>
                <Lable>Brush Size</Lable>
                <Value>{brushSize}</Value>
                <Input onBlur={handleBlur} type="range" min="1" max="10" value={brushSize} onChange={handleChange} />
            </HiddenWrapper>
        </Wrapper>
    )
}

export default BrushSizeChanger;