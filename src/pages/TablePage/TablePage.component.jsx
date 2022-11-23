import { TableProduct } from 'component/TableProduct/TableProduct.component';
import React from 'react';
import { useStore } from 'store/store';
import { ModalAlert } from 'component/ModalAlert/ModalAlert.component';
import { ContainerPage } from './style/TablePage.style';

export const TablePage = () => {
  const isModalOpen = useStore((state) => state.isModalOpen)

  return (
    <>
      <ContainerPage>
        <TableProduct />
        </ContainerPage>
      {isModalOpen && <ModalAlert />}
    </>
  );
};
