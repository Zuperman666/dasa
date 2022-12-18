import { CustomSelect } from 'style/Select.style';
import styled from 'styled-components';

export const ContainerLateral = styled.div`
    width: 100%;
    display: none;
    flex-flow: row;
/*     max-width: 100px;
 */ justify-content: space-around;
    align-items: center;
/*  border-right: 2px solid black;
 */ height: 100%;
    max-width: 689px;
    @media screen and (min-width: 575px){
        display:flex;
    }

    ${CustomSelect}{
        min-width: 100px;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-left:12px;
    }
`
export const ButtonSelect = styled.button`
    color: ${props => props.selected ? 'red' : 'black'}; 
    width: 100%;
    height: 50px;
    border:none;
    &:disabled{
        color:grey
    }
`
export const ButtonWrapper = styled.div`
display: flex;
height: 100%;
`
