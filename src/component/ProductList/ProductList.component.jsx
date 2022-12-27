import axios from 'axios';
import React, { useState } from 'react';
import Toggle from 'react-toggle';
import { useStore } from 'store/store';
import { ProductCardPrice } from './partial/ProductCardPrice.component';
import "react-toggle/style.css";
import { Column, ContainerDoubleTable, ContainerToggle, Row } from './style/ProductList.style';
import AddNewProductCard from 'component/AddNewProductCard/AddNewProductCard.component';
import { useEffect } from 'react';


export const ProductList = () => {
  const item = useStore((state) => state.item)
  const tipiProdotti = useStore((state) => state.tipiProdotti)
  const setItem = useStore((state) => state.setItem)
  const [active, setActive] = useState(true)
  const [tipoProdotto, setTipoProdotto] = useState('')
  const [nome, setNome] = useState('')
  const [prezzo, setPrezzo] = useState('')
  const [iva, setIva] = useState('')

  const sendToDbItem = async () => {
    await axios.post(`http://localhost:3001/item`, {
      "name": nome,
      "price": prezzo,
      "iva": iva,
      "tipoProdotto": Number(tipoProdotto),
      "isActive": true
    })
    setItem()
    setNome('')
    setPrezzo('')
    setIva('')
    setTipoProdotto(tipiProdotti[0]?.id)
  }

  useEffect(() => {
    setTipoProdotto(tipiProdotti[0]?.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipiProdotti]);

  return (
    <>
      <ContainerToggle> <div> {active ? <span>Vedi Disattivati</span> : <span>Vedi Abilitati</span>}</div>
        <Toggle
          icons={false}
          checked={active}
          onChange={() => setActive(!active)} />
      </ContainerToggle>
      <ContainerDoubleTable>
        <Row>
          {item.map((val, key) => {
            if (val.isActive === active) {
              return (
                <Column>
                  <ProductCardPrice
                    id={val.id}
                    tipoProdotto={val.tipoProdotto}
                    isActive={val.isActive}
                    key={key}
                    name={val.name}
                    iva={val.iva}
                    price={val.price} />
                </Column>

              )
            } else return <></>
          })
          }
        </Row>
      </ContainerDoubleTable>
      <AddNewProductCard
        setNome={setNome}
        nome={nome}
        setPrezzo={setPrezzo}
        prezzo={prezzo}
        setIva={setIva}
        iva={iva}
        setTipoProdotto={setTipoProdotto}
        tipiProdotti={tipiProdotti}
        sendToDbItem={sendToDbItem}
      />
    </>
  );
};

