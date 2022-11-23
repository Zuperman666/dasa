import axios from 'axios';
import React, { useState } from 'react';
import { useStore } from 'store/store';
import { ContainerInput, ContainerNumber, ContainerProdctCardPrice, InputCustomNumber, TextProductCard } from './style/ProductCardPrice.style';


export const ProductCardPrice = (props) => {
    const tipiProdotti = useStore((state) => state.tipiProdotti)
    const setItem = useStore((state) => state.setItem)
    const [edit, setEdit] = useState({
        isEditing: false,
        name: '',
        price: '',
        iva: '',
        tipoProdotto: ''
    })

    const patchToDbItem = async () => {
        await axios.patch(`http://localhost:3001/item/${props.id}`, {
            "name": edit.name,
            "price": edit.price,
            "iva": edit.iva,
            "tipoProdotto": edit.tipoProdotto
        })
        setItem()
        setEdit({
            isEditing: false,
            name: '',
            price: '',
            iva: '',
            tipoProdotto: ''
        })
    }

    const sendToDbItem = async () => {
        await axios.patch(`http://localhost:3001/item/${props.id}`, {
            "isActive": !props.isActive
        })
        setItem()
    }

    return (
        <>
            <ContainerProdctCardPrice >
                <TextProductCard> {edit.isEditing ? <input value={edit.name} onChange={(e) => setEdit({
                    isEditing: true,
                    name: e.target.value,
                    price: edit.price,
                    iva: edit.iva,
                    tipoProdotto: edit.tipoProdotto
                })} type={'text'}></input> : <div>{props.name}</div>}</TextProductCard>
                <ContainerInput>
                    {edit.isEditing ? <InputCustomNumber onChange={(e) => setEdit({
                        isEditing: true,
                        name: edit.name,
                        price: e.target.value,
                        iva: edit.iva,
                        tipoProdotto: edit.tipoProdotto
                    })} value={edit.price} placeholder={'Prezzo'} type={'number'} min={"0"} /> : <ContainerNumber>{'Prezzo:' + props.price}</ContainerNumber>}
                    {edit.isEditing ? <InputCustomNumber onChange={(e) => setEdit({
                        isEditing: true,
                        name: edit.name,
                        price: edit.price,
                        iva: e.target.value,
                        tipoProdotto: edit.tipoProdotto
                    })} value={edit.iva} placeholder={'Iva'} type={'number'} pattern="[0-9]" min="0" max="100" /> : <ContainerNumber>{'Iva: ' + props.iva}</ContainerNumber>}
                    {edit.isEditing ? <select onChange={(e) => setEdit({
                                isEditing: true,
                                name: edit.name,
                                price: edit.price,
                                iva: edit.iva,
                                tipoProdotto: e.target.value
                            })} value={edit.tipoProdotto}>
                            </select> 
                        
                            : <ContainerNumber>{'Tipo: ' + props.tipoProdotto}</ContainerNumber>}
                </ContainerInput>
                <button onClick={() => sendToDbItem()}> {props.isActive ? 'Disabilita' : 'Abilita'}</button>
                {!edit.isEditing && <button onClick={() => setEdit({
                    isEditing: true,
                    name: props.name,
                    price: props.price,
                    iva: props.iva,
                    tipoProdotto: props.tipoProdotto
                })} > {'Edita'}</button>}
                {edit.isEditing && <button onClick={() => patchToDbItem()} > {'Salva'}</button>}
                {edit.isEditing && <button onClick={() => setEdit({
                    isEditing: false,
                    name: '',
                    price: '',
                    iva: '',
                    tipoProdotto: ''
                })} > {'Elimina Modifiche'}</button>}
            </ContainerProdctCardPrice>

        </>
    );
};

