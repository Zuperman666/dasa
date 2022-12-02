import styled from "styled-components";

export const CustomInput = styled.input`
::placeholder{
  color:#6c6c6c;
} 
width: 100%;
padding: 4px 5px 4px 24px;
border:1px solid transparent;
border-radius:8px;
background-color:#ddd;
appearance: none;
font-weight: 400;
transition: all 0.3s ease-in-out;
outline: 0;
max-width: 200px;

&:hover {
  opacity: 0.8;
  }
  &:focus{
    background-color: transparent;
    border: solid 1px;

  }
  @media screen and (min-width: 575px) {
    max-width: 200px;
  }
`
