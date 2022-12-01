import React from 'react';
import { useStore } from 'store/store';
import { ModalAlert } from 'component/ModalAlert/ModalAlert.component';
import { ProductList } from 'component/ProductList/ProductList.component';

export const ProductPage = () => {
  const isModalOpen = useStore((state) => state.isModalOpen)

  return (
    <>
      <ProductList />
      {isModalOpen && <ModalAlert />}
    </>
  );
};
