import React from 'react';
import { useStore } from 'store/store';
import { LateralColumn } from './partial/LateralColumn/LateralColumn.component';
import { BurgerDiv, HeaderContainer, Wrapper } from './style/Header.style'
import { ReactComponent as BurgerIcon } from 'images/icons/hamburger-menu.svg';
import { ReactComponent as LogOutIcon } from 'images/icons/exit.svg';
import Sidebar from './partial/Sidebar/Sidebar.component';
import { Overlay } from 'style/Overlay.style';

export const Header = () => {
  const selectUser = useStore((state) => state.selectUser)
  const isLogged = useStore((state) => state.isLogged)
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <>
      <HeaderContainer >
        <Wrapper>
          {'Logo'}
        </Wrapper>
        <LateralColumn />
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> 
          {isLogged &&
            <Wrapper>
              <span>{'Ciao ' + selectUser?.name}</span>
              <LogOutIcon stroke='#000000' />
            </Wrapper>} 
          <BurgerDiv onClick={() => setSidebarOpen(true)} >
            <BurgerIcon stroke='black' />
          </BurgerDiv>
      </HeaderContainer>
      {sidebarOpen && <Overlay onClick={() => setSidebarOpen(false)} />}
    </>
  );
};

