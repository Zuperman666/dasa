import React from 'react';
import { useStore } from 'store/store';
import { ModalAlert } from 'component/ModalAlert/ModalAlert.component';
import { NewList } from 'component/NewList/NewList.component';

export const ListePrezziPage = () => {
  const isModalOpen = useStore((state) => state.isModalOpen)

  return (
    <>
      <NewList />
      {isModalOpen && <ModalAlert />}
    </>
  );
};
