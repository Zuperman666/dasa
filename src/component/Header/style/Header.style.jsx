import styled from 'styled-components';

export const HeaderContainer = styled.header`
background-color:#efecec;
width: 100%;
height: 50px;
display: flex;
align-items: center;
justify-content:space-between;
`
export const Wrapper = styled.div`
display: flex;
padding:10px;
gap: 24px;  
>*{cursor:pointer}
 
`
export const ContainerPage = styled.div`
margin-right: auto;
margin-left: auto;
display: flex;
flex-flow: column nowrap;
-webkit-box-pack: start;
justify-content: flex-start;
-webkit-box-align: center;
align-items: center;
width: 100%;
overflow: hidden auto;
flex: 1 0 auto;
position: relative;
height: auto;
background: transparent;
`
export const BurgerDiv = styled.div`
cursor: pointer;
 @media screen and (min-width: 575px){
    display: none;
 }
`
