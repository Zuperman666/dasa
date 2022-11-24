import axios from 'axios';
import React, {useState } from 'react';
import Toggle from 'react-toggle';
import { useStore } from 'store/store';
import { Column, ContainerDoubleTable, ContainerNewProduct, ContainerTableInside, ContainerToggle, ContainerUsers, Row } from './style/TipiProdotti.style';


export const TipiProdotti = (props) => {
  const tipiProdotti = useStore((state) => state.tipiProdotti)
  const setTipiProdotti = useStore((state) => state.setTipiProdotti)
  const [active, setActive] = useState(true)
  const [nome, setNome] = useState('')

  const sendToDbUser = async () => {
    await axios.post(`http://localhost:3001/tipiProdotti`, {
      "name": nome,
      "isActive": true,
    })
    setTipiProdotti()
    setNome('')
  }

  const patchToDbItem = async (id, isActive) => {
    await axios.patch(`http://localhost:3001/tipiProdotti/${id}`, {
      "isActive": !isActive
    })
    setTipiProdotti()
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
          {tipiProdotti.map((val, key) => {
            if (val.isActive === active) {
              return (
                <Column>
                  <ContainerUsers>
                    <div>
                      {val.name}
                    </div>
                    <button onClick={() => patchToDbItem(val.id, val.isActive)} > {val.isActive ? 'Disabilita' : 'Abilita'}</button>
                  </ContainerUsers>
                </Column>

              )
            } else return (
              <></>
            )
          })
          }
        </Row>
      </ContainerDoubleTable>
      <ContainerNewProduct>
        Aggiungi Nuovo Tipo Prodotto
        <input placeholder={'nome'} onChange={(e) => setNome(e.target.value)} type={'text'}></input>
        <button onClick={() => sendToDbUser()} disabled={!(nome.length > 0)}>{'Conferma'}</button>
      </ContainerNewProduct>
    </ContainerTableInside>
  );
};

