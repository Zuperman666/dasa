import React from 'react';
import { useStore } from 'store/store';
import { ModalAlert } from 'component/ModalAlert/ModalAlert.component';
import { Girini } from 'component/Girini/Girini.component';

export const GiriniPage = () => {
  const isModalOpen = useStore((state) => state.isModalOpen)

  return (
    <>
      <Girini />
      {isModalOpen && <ModalAlert />}
    </>
  );
};
