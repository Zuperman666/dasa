import styled from "styled-components";



export const CustomSelect = styled.select`
    font-size: 13.3333px;
    width: 100%;
    font-family: inherit;
    color: #6c6c6c;
    background-color: #ddd;
    border-radius: 8px;
    border: solid 1px transparent;
    outline: 0;
    display: inline-block;
    padding: 5px 1.5em 5px 1em;
    margin: 0 auto;
    -webkit-appearance: none;
    transition: all 0.3s ease-in-out;
    background-image: linear-gradient(45deg,transparent 50%,gray 50%), linear-gradient(135deg,gray 50%,transparent 50%), linear-gradient(to right,#ccc,#ccc);
    background-position: calc(100% - 20px) calc(1em + -2px), calc(100% - 15px) calc(1em - 2px), calc(100% - 3em);
    background-size: 5px 5px,5px 5px,1px 1.5em;
    background-repeat: no-repeat;
    width: 100%;
  &:focus{
    background-color: transparent;
    border: solid 1px;
    background-image:
    linear-gradient(45deg, green 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, green 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position:
    calc(100% - 15px) 0.8em,
    calc(100% - 20px) 0.8em,
    calc(100% - 3em);
  background-size:
    5px 5px,
    5px 5px,
    1px 1.5em;
  background-repeat: no-repeat;
 
  }
  `