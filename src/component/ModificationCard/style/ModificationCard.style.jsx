import styled from "styled-components";
import { CustomInput } from "style/Input.style";

export const TextProductCard = styled.div`
  font-size: 12px;
  font-weight: 700;
  width: 100%;
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #465a75a1;
  margin-bottom: 12px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  ${CustomInput} {
    background-color: transparent;
    color: #ffff;
  }
`;

export const ContainerInputs = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0 12px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  > *{margin-top:12px;
  margin-left: 5px;}
  label{
    flex-grow: 1;
  }
  `

export const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between;
align-items: center;
padding: 12px;
width: 100%;
margin-top:15px;
gap: 10px;
`

export const ControlIcons = styled.div`
display:flex;
align-items: baseline;
gap: 24px;
`

export const IconWrapper = styled.div`
height: 24px;
    width: 24px;
  cursor: pointer;
`;