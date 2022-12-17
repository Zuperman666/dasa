import styled from "styled-components";

export const Button = styled.button`
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  letter-spacing: 0.28px;
  white-space: nowrap;
  text-overflow:ellipsis;
  cursor: pointer;
  outline: none;
  border: 0;
  &[disabled] {
        pointer-events: none;
        opacity:0.7;
   } 
  transition: 0.3s; 
  background-color: #ddd ;
  &:hover {
        color: white;
        opacity: 0.8;
        background-color: #3e8e41;
   }
  border-radius: 10px;
  font-weight: 500;
  font-size:14px;
  padding: 8px 16px;

`