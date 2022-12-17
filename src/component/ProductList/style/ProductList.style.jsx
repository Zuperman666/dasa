import styled from 'styled-components';



export const InsideTableContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
export const Column = styled.div`
  width: 100%;
  float:left;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: 10px;
  padding: 0 15px;
  @media screen and (min-width : 575px) {
   width:50%;
  }
   `


export const Row = styled.div`
  :after {
  content: "";
  display: table;
  clear: both;
}
`

export const ContainerDoubleTable = styled.div`
   width:100%;
   overflow:auto;
   max-height: 350px;
   &::-webkit-scrollbar {
    width: 8px;
    visibility: hidden;
    }
    &:hover{
    &::-webkit-scrollbar {
     visibility: visible;
    }
    &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #e3dcf3;
    box-shadow: inset 0 0 2px rgba(0,0,0,0.3);
    -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.5); 
    }
}   
`


export const ContainerToggle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color:#e3dcf3;
    min-height: 60px;
    gap: 24px;
    @media screen and (min-width: 575px) {
    border-top-right-radius: 12px;
    border-top-left-radius: 12px;
    }
 
`
export const SelectTypeProduct = styled.select`
    width: 100%;
`
export const ContainerSelectTypeProduct = styled.div`
 `


export const IconWrapper = styled.div`
height: 24px;
    width: 24px;
  cursor: pointer;
`;

export const InputWrapper = styled.div`
width: 100%;
display:flex;
flex-direction:row;
align-items:center;
justify-content:space-between;
`

export const InputText = styled.input`
text-align: center;
outline:none;
padding: 2px 5px;
border:1px solid transparent;
border-radius:8px;
background: transparent;
appearance: none;
color: #ffff;
font-weight: inherit;
&:hover {
  border:1px solid lightgray;
  }
`