import styled from 'styled-components';

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


export const CustomModal = styled.div`
    position: absolute;
    width:300px;
    height:300px;
    display: flex;
    border:2px black solid;
    justify-items: center;
    background-color: white;
    align-items: center;
    flex-direction: column;
    z-index: 1000;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    margin-left: auto; 
    margin-right: auto; 
`
