import styled from 'styled-components';

export const ModalAlertContainer = styled.div`
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
export const ModalAlertText = styled.div`
    padding-left: 20%;
    padding-right: 20%;
`
export const ModalAlertBody = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    background-color: #aaaaaa;
    justify-items: center;
    align-items: center;
`

export const ModalAlertFooter = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    justify-items: center;
    background-color: white;
    align-items: center;
    justify-content: space-evenly;
`



