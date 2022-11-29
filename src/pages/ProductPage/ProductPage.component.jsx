import React from 'react';
import { useStore } from 'store/store';
import { ModalAlert } from 'component/ModalAlert/ModalAlert.component';
import { ProductList } from 'component/ProductList/ProductList.component';
import { Container } from 'component/style/Container.style';

export const ProductPage = () => {
  const isModalOpen = useStore((state) => state.isModalOpen)

  return (
    <>
      <Container >
        <ProductList />
      </Container>
      {isModalOpen && <ModalAlert />}
    </>
  );
};
