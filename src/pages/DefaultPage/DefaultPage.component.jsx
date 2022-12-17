import { MainContainer } from 'style/Container.style';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../component/Header/Header.component';

export const DefaultPage = () => {


  return (
    <>
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
};
