import axios from 'axios';
import React, { useState } from 'react';
import Toggle from 'react-toggle';
import { useStore } from 'store/store';
import { ProductCardPrice } from './partial/ProductCardPrice.component';
import "react-toggle/style.css";
import { Column, ContainerDoubleTable, ContainerToggle, Row } from './style/ProductList.style';
import AddNewProductCard from 'component/AddNewProductCard/AddNewProductCard.component';
import { useEffect } from 'react';
import { Loader } from 'component/Loader/Loader.component';


export const ProductList = () => {
  const item = useStore((state) => state.item)
  const tipiProdotti = useStore((state) => state.tipiProdotti)
  const setItem = useStore((state) => state.setItem)
  const allUser = useStore((state) => state.allUser)
  const [active, setActive] = useState(true)
  const [tipoProdotto, setTipoProdotto] = useState('')
  const [nome, setNome] = useState('')
  const [prezzo, setPrezzo] = useState('')
  const [iva, setIva] = useState('')
  const [ordine, setOrdine] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const sendToDbItem = async () => {
    setIsLoading(true)
    await axios.post(`http://localhost:3001/item`, {
      "name": nome,
      "price": prezzo,
      "iva": iva,
      "tipoProdotto": Number(tipoProdotto),
      "isActive": true,
      "sort": Number(ordine)
    })
      allUser.map(async (obj) =>{
        const resp = await axios.get(`http://localhost:3001/usuallyOrder/${obj.id}`)
        
        await axios.patch(`http://localhost:3001/usuallyOrder/${obj.id}`, {
          defaultOrder: [...resp.data.defaultOrder,{
            "itemId": item.length +1,
            "quantità": 0
          }]
      }
    )})
    setItem()
    setNome('')
    setPrezzo('')
    setIva('')
    setTipoProdotto(tipiProdotti[0]?.id)
    setOrdine( tipiProdotti[0]?.length)
    setIsLoading(false)
  }

  useEffect(() => {
    setTipoProdotto(tipiProdotti[0]?.id)
    setOrdine( tipiProdotti[0]?.length)
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
                    ordine={val.sort}
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
        setOrdine={setOrdine}
        ordine={ordine}
        tipiProdotti={tipiProdotti}
        sendToDbItem={sendToDbItem}
      />
    </>
  );
};

