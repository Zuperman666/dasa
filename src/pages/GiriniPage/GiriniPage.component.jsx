import React from 'react';
import { useStore } from 'store/store';
import { ModalAlert } from 'component/ModalAlert/ModalAlert.component';
import { ContainerPage } from './style/GiriniPage.style';
import { Girini } from 'component/Girini/Girini.component';

export const GiriniPage = () => {
  const isModalOpen = useStore((state) => state.isModalOpen)

  return (
    <>
      <ContainerPage>
        <Girini />
      </ContainerPage>
      {isModalOpen && <ModalAlert />}
    </>
  );
};
