import { TableProduct } from 'component/TableProduct/TableProduct.component';
import React from 'react';
import { useStore } from 'store/store';
import { ModalAlert } from 'component/ModalAlert/ModalAlert.component';

export const TablePage = () => {
  const isModalOpen = useStore((state) => state.isModalOpen)

  return (
    <>
      <TableProduct />
      {isModalOpen && <ModalAlert />}
    </>
  );
};
