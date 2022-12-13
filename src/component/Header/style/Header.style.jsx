import styled from 'styled-components';

export const HeaderContainer = styled.header`
background-color:#efecec;
width: 100%;
height: 50px;
display: flex;
align-items: center;
justify-content:space-between;
overflow-x: auto ;
::-webkit-scrollbar{
display: none;
}

`
export const Wrapper = styled.div`
display: flex;
min-width:fit-content;
align-items: center;
svg{
   cursor:pointer;
   height: 24px;
   visibility:hidden;
   transition: all 0.8s;
   margin-left:24px;
   &:hover{
      visibility: visible;
   }

   
}
span{
white-space: nowrap;
&:hover + svg{
visibility:visible;
}
}
 
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
