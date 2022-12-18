import axios from 'axios';
import AddNewGirini from 'component/AddNewGirini/AddNewGirini.component';
import React, { useState } from 'react';
import Toggle from 'react-toggle';
import { useStore } from 'store/store';
import { Button } from 'style/Button.style';
import { ContainerNewProduct, ContainerPadding } from 'style/Container.style';
import { ButtonContainer, Column, ContainerDoubleTable, ContainerToggle, ContainerUsers, Row, TextProductCard } from './style/Girini.style';


export const Girini = (props) => {
  const girini = useStore((state) => state.girini)
  const setGirini = useStore((state) => state.setGirini)
  const [active, setActive] = useState(true)
  const [nome, setNome] = useState('')

  const sendToDbGirino = async () => {
    await axios.post(`http://localhost:3001/girini`, {
      "name": nome,
      "isActive": true,
    })
    setGirini()
    setNome('')
  }

  const patchToDbItem = async (id, isActive) => {
    await axios.patch(`http://localhost:3001/girini/${id}`, {
      "isActive": !isActive
    })
    setGirini()
  }


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
          {girini.map((val, key) => {
            if (val.isActive === active) {
              return (
                <Column>
                  <ContainerUsers>
                    <TextProductCard>

                      <div>
                        {val.name}
                      </div>
                    </TextProductCard>
                    <ButtonContainer>
                    <Button onClick={() => patchToDbItem(val.id, val.isActive)} > {val.isActive ? 'Disabilita' : 'Abilita'}</Button>
                    </ButtonContainer>
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
        <AddNewGirini
          nome={nome}
          sendToDbItem={sendToDbGirino}
          setNome={setNome}
        />
      </ContainerNewProduct>
    </ >
  );
};

