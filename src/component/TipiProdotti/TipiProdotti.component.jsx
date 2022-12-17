import axios from 'axios';
import AddNewTipiProdotti from 'component/AddNewTipiProdotti/AddNewTipiProdotti.component';
import React, { useState } from 'react';
import Toggle from 'react-toggle';
import { useStore } from 'store/store';
import { ContainerNewProduct, ContainerPadding } from 'style/Container.style';
import { Column, ContainerDoubleTable, ContainerToggle, ContainerUsers, Row } from './style/TipiProdotti.style';


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
    <>
      <ContainerToggle> <div> {active ? <span>Vedi Disattivati</span> : <span>Vedi Abilitati</span>}</div>
        <Toggle
          checked={active}
          icons={false}
          onChange={() => setActive(!active)} />
      </ContainerToggle>
      <ContainerDoubleTable>
        <Row>
          {tipiProdotti && tipiProdotti.map((val, key) => {
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
      <AddNewTipiProdotti 
       nome={nome}
       sendToDbItem={sendToDbUser}
       setNome={setNome}
       />
      </ContainerNewProduct>
    </>
  );
};

