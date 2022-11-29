import styled from "styled-components";

export const Container = styled.div` 

  margin-bottom: 20px;
  align-items: center;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden auto;
  flex: 1 0 auto;
  position: relative;
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