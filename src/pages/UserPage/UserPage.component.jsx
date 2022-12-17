import React from 'react';
import { useStore } from 'store/store';
import { ModalAlert } from 'component/ModalAlert/ModalAlert.component';
import { Users } from 'component/Users/Users.component';

export const UserPage = () => {
  const isModalOpen = useStore((state) => state.isModalOpen)

  return (
    <>

      <Users />

      {isModalOpen && <ModalAlert />}
    </>
  );
};
