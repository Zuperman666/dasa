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
export const Column =styled.div`
overflow: hidden;
white-space: nowrap; /* Don't forget this one */
text-overflow: ellipsis;
  float: left;
  width: 50%;
  margin-top: 10px;
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
   max-height: 335px;
`
export const ContainerNewProduct = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    justify-items: center;
    align-items: center;
    margin-top:10px;
    margin-bottom:10px;
    > * {
    margin-top:10px;
  }
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
export const SelectTypeProduct = styled.select`
    width: 100%;
`
export const ContainerSelectTypeProduct = styled.div`
    width: 100%;
`