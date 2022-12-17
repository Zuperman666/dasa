import styled from 'styled-components';



export const InsideTableContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
export const Column =styled.div`
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
`
export const ContainerToggle = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
        display: flex;
    }
`