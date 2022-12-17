import { CustomInput } from 'style/Input.style';
import styled from 'styled-components';




export const ContainerProdctCardPrice = styled.div`
display: flex;
flex-direction: column;
border:solid 1px #C9CDD6;
box-shadow: 2px 1px 2px rgb(0 0 0 / 30%);
-webkit-box-shadow:2px 1px 2px rgb(0 0 0 / 30%); 
border-radius:12px;
width:100%;
transition: all 8s ease-in-out;
  `

export const TextProductCard = styled.div`
  font-size: 12px;
  font-weight: 700;
  width: 100%;
  text-align: center;
  padding-top: 12px;
  padding-bottom: 12px;
  background-color: #465a75a1;
  margin-bottom: 12px;
  border-top-left-radius:12px ;
  border-top-right-radius:12px;
  border-bottom-left-radius:2px;
  border-bottom-right-radius:2px;
  ${CustomInput}{
    background-color: transparent;
    color: #ffff;
  }
`


export const InputText = styled.input`
text-align: center;
::placeholder{
  color:#ffff
}
outline:none;
padding: 2px 5px;
border: 1px solid transparent;
border-radius:8px;
background: transparent;
appearance: none;
color: #ffff;
font-weight: inherit;

`





export const ContainerInputs = styled.div`
display: flex;
align-items: center;
flex-direction: column;
width: 100%;
padding:0 12px;

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


export const ContainerNumber = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
width: 100%;
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



