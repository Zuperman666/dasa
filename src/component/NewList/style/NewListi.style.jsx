import styled from "styled-components";
import { CustomInput } from "style/Input.style";

export const Column = styled.div`
  width: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 0 15px;
  @media screen and (min-width: 575px) {
    width: 50%;
  }
`;

export const Row = styled.div`
  :after {
    content: "";
    display: table;
    clear: both;
  }
`;

export const ContainerDoubleTable = styled.div`
  width: 100%;
  overflow: auto;
  max-height: 350px;
  &::-webkit-scrollbar {
    width: 8px;
    visibility: hidden;
  }
  &:hover {
    &::-webkit-scrollbar {
      visibility: visible;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #e3dcf3;
      box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.5);
    }
  }
`;

export const CustomModal = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  display: flex;
  border: 2px black solid;
  justify-items: center;
  background-color: white;
  align-items: center;
  flex-direction: column;
  z-index: 1000;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-left: auto;
  justify-content: space-evenly;
  margin-right: auto;
`;
export const ContainerEditor = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e3dcf3;
  min-height: 60px;
  gap: 24px;
  @media screen and (min-width: 575px) {
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
  }
`;

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

export const ControlIcons = styled.div`
display:flex;
align-items: baseline;
gap: 24px;
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
