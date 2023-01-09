import axios from 'axios';
import AddNewList from 'component/AddNewList/AddNewList.component';
import { RowTitle } from 'component/TableProduct/style/TableProduct.style';
import React, { useState } from 'react';
import { useStore } from 'store/store';
import { CustomSelect } from 'style/Select.style';
import { CardListPrice } from './partials/CardListPrice.component';
import { Column, ContainerDoubleTable, CustomModal, Row } from './style/NewListi.style';

export const NewList = () => {
    const liste = useStore((state) => state.liste)
    const item = useStore((state) => state.item)
    const tipiProdotti = useStore((state) => state.tipiProdotti)
    const setListe = useStore((state) => state.setListe)

    const [id, setId] = useState('')
    const [nome, setNome] = useState('')
    const [tipoProdotto, setTipoProdotto] = useState(1)
    const [modalElement, setModalElement] = useState(false)
    const [prodotto, setProdotto] = useState(0)
    const [isEditing, setIsEditing] = useState(false)
    const [price, setPrice] = useState(0)


    const sendToDbItem = async () => {
        await axios.post(`http://localhost:3001/liste`, {
            "name": nome,
            "modifiche": []
        })
        setNome('')
        setListe()
    }

    const patchToDbItem = async () => {
        await axios.patch(`http://localhost:3001/liste/${id}`, {
            "modifiche": [...liste.filter((obj) => obj.id === id)[0].modifiche,{
                "id":prodotto,
                "price":price

            }]
        })
        setPrice(0)
        setListe()
    }

    function filterByType() {
        let prop = 'tipoProdotto';
        let xs = item.filter((obj6) => obj6.isActive)
        let grouped = {};
        for (var i = 0; i < xs.length; i++) {
          var p = xs[i][prop];
          if (!grouped[p]) { grouped[p] = []; }
          grouped[p].push(xs[i]);
        }
        let result = Object.values(grouped);
        result = result.map((obj)=> obj.sort((a, b) => a.sort - b.sort))
        return result;
      }
    return (
        isEditing ? <>
            <ContainerDoubleTable>
                <div>
                    <button onClick={() => setIsEditing(false)}> Back</button>
                </div>
                <div>
                    {liste.filter((obj) => obj.id === id)[0].modifiche.map((val) => {
                        return (
                            <>
                                <div>
                                    {val.id}
                                </div>
                                <div>
                                    {val.price}
                                </div>
                            </>
                        )
                    }

                    )

                    }

                </div>
                <div>
                    {modalElement ?
                        <CustomModal>
                            <>
                                <CustomSelect onChange={(e) => setTipoProdotto(Number(e.target.value))}>
                                    {tipiProdotti && tipiProdotti?.map((val, key) => {
                                        return (
                                            <option key={key} value={val.id}>{val.name}</option>
                                        )
                                    }
                                    )}
                                </CustomSelect>
                                <CustomSelect onChange={(e) => setProdotto(Number(e.target.value))}>
                                    {filterByType().filter((obj) => Number(obj[0].tipoProdotto) === Number(
                                        tipoProdotto
                                    ))[0].filter((obj2) => liste.filter((obj) => obj.id === id)[0].modifiche.filter((obj3) => obj2.itemId === obj3.id)).map((val, key) => {
                                        return (
                                            <option key={key} value={val.id}>{val.name}</option>
                                        )
                                    }
                                    )}
                                </CustomSelect></>
                            <div>Nuovo Prezzo</div><input onChange={(e)=> setPrice(Number(e.target.value))}type={"number"}></input>
                            <button onClick={() => (patchToDbItem(),setModalElement(false))}>{'Conferma'}</button>
                            <button onClick={() => (setModalElement(false))}>{'Annulla'}</button>
                        </CustomModal>
                        :
                        <button onClick={() => setModalElement(true)}>
                            Aggiungi
                        </button>
                    }

                </div>
            </ContainerDoubleTable>
        </> :
            <>
                <ContainerDoubleTable>
                    <Row>
                        {liste.map((val, key) => {
                            if (val.id !== 1)
                                return (
                                    <Column>
                                        <CardListPrice id={val.id} setId={setId} setIsEditing={setIsEditing} name={val.name} />
                                    </Column>
                                )
                        })
                        }
                    </Row>
                </ContainerDoubleTable>
                <AddNewList
                    sendToDbItem={sendToDbItem}
                    nome={nome}
                    setNome={setNome}
                />

            </>
    );
};
