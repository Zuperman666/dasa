import { CustomSelect } from "style/Select.style";
import styled from "styled-components";


export const SidebarContainer = styled.div`
background-color: white;
position: fixed;
top: 0;
bottom: 0;
right: -50rem;
z-index: 10;
padding: 1.2rem 2rem 5.6rem;
display: flex;
flex-direction: column;
justify-content: space-between;
transition: all 0.5s;
border-left: solid 1px;

&.open {
  opacity: 1;
  right: 0;
}
${CustomSelect}{
    margin-left:12px;
   } 

@media screen and (min-width: 575px){
      display:none;
  }
  
`;

export const SHEader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`



export const PointerDiv = styled.div`
  cursor: pointer;

`

export const ButtonWrapper = styled.div`
  display: flex;
  flex-flow: column;

`

export const ButtonSidebarSelect = styled.div`
    cursor: pointer;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    border:none;
    color:#1a0a55;
    font-weight: 700;
    transition: all 0.3s ease-in-out;
    :hover{
      color: #fff;
      background-color: grey;
      border-top:solid 1px;
      border-radius: solid 1px;
    }
`