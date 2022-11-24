import styled from 'styled-components';

export const ContainerTableInside = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const InsideTableContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`
export const HalfTable = styled.div`
    width: 40%;
    height: 100%;
    margin-right: 5%;
    margin-left:5%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
`

export const ContainerToggle = styled.div`
    width: fit-content;
    display: flex;
    margin-left:20px;
    justify-content: center;
    align-items: center;
    > div {
        display: flex;
    }
`
export const Column = styled.div`
  float: left;
  width: 50%;
  margin-top: 10px;
  display: flex;
    flex-flow: column;
    align-items: center;
    overflow: hidden;
white-space: nowrap; /* Don't forget this one */
text-overflow: ellipsis;
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
   max-height: 460px;
`
