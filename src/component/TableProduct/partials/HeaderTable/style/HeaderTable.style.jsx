import styled from 'styled-components';

export const HeaderTableCntainer = styled.div`
    width: 100%;
    display: flex;
    height: 50px;
`
export const ButtonSelectDay = styled.button`
    width: 100%;
    border: 1px solid grey;
    border-radius: 12%;
    background-color: ${props => props.isSelected ?  'red' : 'transparent'}; 
`