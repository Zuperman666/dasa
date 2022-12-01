import { CustomSelect } from 'style/Select.style';
import styled from 'styled-components';

export const ContainerLateral = styled.div`
    width: 100%;
    display: none;
    flex-flow: row;
    max-width: 100px;
    justify-content: space-around;
    border-right: 2px solid black;
    height: 100%;
    @media screen and (min-width: 575px){
        display:flex;
    }
    ${CustomSelect}{
        min-width: fit-content;
    }
`
export const ButtonSelect = styled.button`
    width: 100%;
    height: 50px;
    border:none;
`
