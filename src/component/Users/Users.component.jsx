import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Toggle from 'react-toggle';
import { useStore } from 'store/store';
import { ContainerNewProduct, ContainerPadding } from 'style/Container.style';
import { Column, ContainerDoubleTable, ContainerToggle, ContainerUsers, Row, SelectGirino } from './style/Users.style';


export const Users = (props) => {
  const [edit, setEdit] = useState({
    isEditing: false,
    name: '',
    via: '',
    girino: '',
    id: ''
  })
  const allUser = useStore((state) => state.allUser)
  const girini = useStore((state) => state.girini)
  const setUsers = useStore((state) => state.setUsers)
  const [active, setActive] = useState(true)
  const [sendToDbF, setSendToDbF] = useState(false)
  const [girino, setGirino] = useState(girini[0])
  const [nome, setNome] = useState('')
  const [via, setVia] = useState('')
  const arrayDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const sendToDbUser = async () => {
    await axios.post(`http://localhost:3001/user`, {
      "name": nome,
      "via": via,
      "isActive": true,
      "daPagare": 0,
      'girino': Number(girino)
    })
    setUsers()
    setSendToDbF(true)
  }

  const sendToDbUsuallyOrder = async () => {
    const userId = allUser.find((obj) => obj.name === nome)
    const body = arrayDays.map((obj) => ({ "day": obj, "stato": "aperto", "ordine": [] }))
    await axios.post(`http://localhost:3001/usuallyOrder`, {
      "userId": userId.id,
      'body': body,
    })
  }

  const patchToDbItem = async () => {
    console.log(edit)
    await axios.patch(`http://localhost:3001/user/${edit.id}`, {
      "name": edit.name,
      "via": edit.via,
      'girino': Number(edit.girino)
    })
    setEdit({
      isEditing: false,
      name: '',
      via: '',
      girino: '',
      id: ''
    })
    setUsers()
  }


  const patchToDbItemActive = async (id, isActive) => {
    await axios.patch(`http://localhost:3001/user/${id}`, {
      "isActive": !isActive
    })
    setUsers()
  }

  useEffect(() => {
    if (sendToDbF) {
      sendToDbUsuallyOrder()
      setSendToDbF(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUser]);

  return (
    <ContainerPadding>
      <ContainerToggle> <div> {active ? <span>Vedi Disattivati</span> : <span>Vedi Abilitati</span>}</div>
        <Toggle
          icons={false}
          checked={active}
          onChange={() => setActive(!active)} />
      </ContainerToggle>
      <ContainerDoubleTable>
        <Row>
          {allUser.map((val, key) => {
            if (val.isActive === active) {
              return (
                <Column>
                  <ContainerUsers>
                    <div>
                      {edit.isEditing && edit.id === val.id ?
                        <input value={edit.name} onChange={(e) => setEdit({
                          isEditing: true,
                          name: e.target.value,
                          via: edit.via,
                          girino: edit.girino,
                          id: edit.id
                        })} type={'text'}></input> :
                        <>{val.name}</>
                      }
                    </div>
                    <div>
                      {edit.isEditing && edit.id === val.id ?
                        <input value={edit.via} onChange={(e) => setEdit({
                          isEditing: true,
                          name: edit.name,
                          via: e.target.value,
                          girino: edit.girino,
                          id: edit.id
                        })} type={'text'}></input> :
                        <>{val.via}</>
                      }
                    </div>
                    <div>
                      {edit.isEditing && edit.id === val.id ?
                        <SelectGirino defaultValue={edit.girino} onChange={(e) => setEdit({
                          isEditing: true,
                          name: edit.name,
                          via: edit.via,
                          girino: e.target.value,
                          id: edit.id
                        })}>
                          {girini && girini?.map((val, key) => {
                            return (
                              <option key={key} value={val.id}>{val.name}</option>
                            )
                          }
                          )}
                        </SelectGirino> :
                        <>{girini && girini?.filter((obj) => obj.id === val.girino)[0]?.name}</>
                      }
                    </div>
                    <button onClick={() => patchToDbItemActive(val.id, val.isActive)} > {val.isActive ? 'Disabilita' : 'Abilita'}</button>
                    {!edit.isEditing && <button onClick={() => setEdit({
                      isEditing: true,
                      name: val.name,
                      via: val.via,
                      girino: val.girino,
                      id: val.id
                    })} > {'Edita'}</button>}
                    {edit.isEditing && edit.id === val.id && <button onClick={() => patchToDbItem()} > {'Salva'}</button>}
                    {edit.isEditing && edit.id === val.id && <button onClick={() => setEdit({
                      isEditing: false,
                      name: '',
                      via: '',
                      girino: '',
                      id: ''
                    })} > {'Elimina Modifiche'}</button>}
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
        Aggiungi Nuovo User
        <input placeholder={'nome'} onChange={(e) => setNome(e.target.value)} type={'text'}></input>
        <input type={'text'} onChange={(e) => setVia(e.target.value)} placeholder={'via'}></input>
        <SelectGirino onChange={(e) => setGirino(e.target.value)}>
          {girini && girini?.map((val, key) => {
            return (
              <option key={key} value={val.id}>{val.name}</option>
            )
          }
          )}
        </SelectGirino>
        <button onClick={() => sendToDbUser()} disabled={!(nome.length > 0 && via.length > 0)}>{'Conferma'}</button>
      </ContainerNewProduct>
    </ContainerPadding>
  );
};

