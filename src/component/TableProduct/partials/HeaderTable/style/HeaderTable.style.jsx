import { Button } from 'style/Button.style';
import styled from 'styled-components';

export const HeaderTableCntainer = styled.div`
background-color:transparent;
position: fixed;
left:0;
right:0;
bottom: -50rem;
z-index: 10;
display: flex;
min-width: fit-content;
max-height: 100vh;
flex-direction: column;
justify-content: space-between;
transition: all 0.5s;
 border-radius: 12px;
&.open {
/*   opacity: 1;
 */  bottom: 0;
}
@media screen and (min-width: 575px){
      display:flex;
      position: unset;
      flex-direction: row;
      width: 100%;
      height: 50px;

  }
`
export const ButtonSelectDay = styled.button`
    flex-grow: 1;
    font-size: 24px;
    font-weight: 600;
    font-family: 'Roboto';
    border-radius:0;
    padding: 0 24px;
    height: 100px;
    outline:0;      
    background-color: ${props => props.isSelected ? 'red' : 'white'}; 
    border-radius: 12px;
    transition: all 0.1s ease-in-out;
    cursor:pointer;
    :hover {
        flex-grow:2;
        color: white;
         background:${props => props.isSelected ? 'red' : '#ff8800'} ;
    }    
    @media screen and (min-width: 575px) {
    
    font-size: unset;
    border:none;
    outline:none;
    height: 100%;
    min-height: 100%;
    box-shadow: 2px 1px 2px rgb(0 0 0 / 30%);
    padding:0;
    
    }
`