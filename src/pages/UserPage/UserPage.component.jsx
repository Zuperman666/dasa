import React from 'react';
import { useStore } from 'store/store';
import { ModalAlert } from 'component/ModalAlert/ModalAlert.component';
import { Users } from 'component/Users/Users.component';
import { ContainerPage } from './style/UserPage.style';

export const UserPage = () => {
  const isModalOpen = useStore((state) => state.isModalOpen)

  return (
    <>
      <ContainerPage>
        <Users />
      </ContainerPage>
      {isModalOpen && <ModalAlert />}
    </>
  );
};
