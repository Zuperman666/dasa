import React from 'react';
import { useStore } from 'store/store';
import { ModalAlert } from 'component/ModalAlert/ModalAlert.component';
import { ProductList } from 'component/ProductList/ProductList.component';
import { ContainerPage } from './style/ProductPage.component';

export const ProductPage = () => {
  const isModalOpen = useStore((state) => state.isModalOpen)

  return (
    <>
    <ContainerPage >
      <ProductList />
    </ContainerPage>
      {isModalOpen && <ModalAlert />}
    </>
  );
};
