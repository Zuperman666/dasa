import styled from 'styled-components';
import { CustomInput } from 'style/Input.style';



export const InsideTableContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const ButtonContainer = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: space-between;
align-items: center;
margin-bottom: 12px;
width: 100%;
justify-content: center;
gap: 10px;
`

export const Column = styled.div`
  float: left;
  width: 50%;
`


export const Row = styled.div`
  :after {
  content: "";
  display: table;
  clear: both;
}
`

export const ContainerDoubleTable = styled.div`
    width: 100%;
    overflow: auto;
    max-height: 350px;
`

export const ContainerUsers = styled.div`
white-space: nowrap;
display: flex;
flex-direction: column;
align-items: center;
margin-top: 10px;
width: 100%;
display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    border: solid 1px #C9CDD6;
    box-shadow: 2px 1px 2px rgb(0 0 0 / 30%);
    -webkit-box-shadow: 2px 1px 2px rgb(0 0 0 / 30%);
    border-radius: 12px;
    width: 100%;
    -webkit-transition: all 8s ease-in-out;
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