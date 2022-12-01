import styled from "styled-components";
import { CustomSelect } from "./Select.style";

export const MainContainer = styled.div` 
  margin-bottom: 20px;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden auto;
  flex: 1 0 auto;
  position: relative;
  min-height: fit-content;
  background: transparent;

   @media screen and (min-width: 575px) {
    margin-right: auto;
    margin-left: auto;
    max-width: 483px;
    min-height: 550px;
    margin-top: 24px;
    margin-bottom: 24px;
    border: 1px solid rgb(201, 205, 214);
    border-radius: 12px;
  }

`

export const ContainerPadding = styled(MainContainer)`
padding: 30px 0;
border: none;
`
export const ContainerNewProduct = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    margin-top:30px;
    margin-bottom:10px;
    > * {
    margin-top:10px;
  }
  ${CustomSelect}{ 
    margin-top:10px;
  }
`