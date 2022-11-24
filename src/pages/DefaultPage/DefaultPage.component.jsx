import { ContainerPage } from 'component/Header/style/Header.style';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../../component/Header/Header.component';

export const DefaultPage = () => {

  return (
    <>
        <Header/>
          <ContainerPage>
          <Outlet />
        </ContainerPage>
    </>
  );
};
