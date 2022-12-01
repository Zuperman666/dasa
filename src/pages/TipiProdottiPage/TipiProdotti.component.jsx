import React from 'react';
import { useStore } from 'store/store';
import { ModalAlert } from 'component/ModalAlert/ModalAlert.component';
import { TipiProdotti } from 'component/TipiProdotti/TipiProdotti.component';

export const TipiProdottiPage = () => {
  const isModalOpen = useStore((state) => state.isModalOpen)

  return (
    <>
      <TipiProdotti />
      {isModalOpen && <ModalAlert />}
    </>
  );
};
