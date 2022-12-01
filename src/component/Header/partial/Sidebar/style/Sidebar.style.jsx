import styled from "styled-components";


export const SidebarContainer = styled.div`
background-color:#ffff;
position: fixed;
top: 0;
width: 38rem;
bottom: 0;
right: -45rem;
z-index: 10;
padding: 1.2rem 2rem 5.6rem;
display: flex;
flex-direction: column;
justify-content: space-between;
transition: all 0.5s;

&.open {
  opacity: 1;
  right: 0;
}
@media screen and (min-width: 575px){
      display:none;
  }
`;

export const SHEader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`
