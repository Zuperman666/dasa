import axios from 'axios';
import React, { useState } from 'react';
import Toggle from 'react-toggle';
import { useStore } from 'store/store';
import { ProductCardPrice } from './partial/ProductCardPrice.component';
import { Column, ContainerDoubleTable, ContainerNewProduct, ContainerSelectTypeProduct, ContainerTableInside, ContainerToggle, Row, SelectTypeProduct } from './style/ProductList.style';


export const ProductList = () => {
  const item = useStore((state) => state.item)
  const tipiProdotti = useStore((state) => state.tipiProdotti)
  const setItem = useStore((state) => state.setItem)
  const [active, setActive] = useState(true)
  const [tipoProdotto, setTipoProdotto] = useState(tipiProdotti[0])
  const [nome, setNome] = useState('')
  const [prezzo, setPrezzo] = useState('')
  const [iva, setIva] = useState('')

  const sendToDbItem = async () => {
    await axios.post(`http://localhost:3001/item`, {
      "name": nome,
      "price": prezzo,
      "iva": iva,
      "tipoProdotto":tipoProdotto,
      "isActive": true
    })
    setItem()
    setNome('')
    setPrezzo('')
    setIva('')
    setTipoProdotto(tipiProdotti[0])
  }

  return (
    <ContainerTableInside>
      <ContainerToggle> <div> {active ? <span>Vedi Disattivati</span> : <span>Vedi Abilitati</span>}</div>
        <Toggle
          checked={active}
          onChange={() => setActive(!active)} />
      </ContainerToggle>
      <ContainerDoubleTable>
        <Row>
          {item.map((val, key) => {
            if (val.isActive === active) {
              return (
                <Column>
                  <ProductCardPrice id={val.id} tipoProdotto={val.tipoProdotto} isActive={val.isActive} key={key} name={val.name} iva={val.iva} price={val.price} />
                </Column>

              )
            } else return <></>
          })
          }
        </Row>
      </ContainerDoubleTable>
      <ContainerNewProduct>
          Aggiungi Nuovo Prodotto
          <input placeholder={'nome'} onChange={(e) => setNome(e.target.value)} type={'text'}></input>
          <input type={'number'} onChange={(e) => setPrezzo(e.target.value)} placeholder={'prezzo'}></input>
          <input type={'number'} onChange={(e) => setIva(e.target.value)} placeholder={'iva'}></input>
          <ContainerSelectTypeProduct>
          <SelectTypeProduct onChange={(e) => setTipoProdotto(e.target.value)}>
          {tipiProdotti && tipiProdotti?.map((val, key) => {
            return (
              <option key={key} value={Number(val.id)}>{val.name}</option>
            )
          }
          )}
        </SelectTypeProduct>
        </ContainerSelectTypeProduct>
          <button onClick={() => sendToDbItem()} disabled={!(nome.length > 0 && prezzo.length > 0 && iva.length > 0)}>{'Conferma'}</button>
      </ContainerNewProduct>
    </ContainerTableInside>
  );
};

