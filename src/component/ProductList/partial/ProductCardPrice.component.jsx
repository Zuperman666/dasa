import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useStore } from 'store/store';
import { IconWrapper } from '../style/ProductList.style';
import { ButtonContainer, ContainerInputs, ContainerNumber, ContainerProdctCardPrice, ControlIcons, InputText, InputWrapper, TextProductCard } from './style/ProductCardPrice.style';
import { firstToCapitalLetter } from 'utils/firstToCapitalLetter';
import { ReactComponent as EditIcon } from '../../../images/icons/edit-note-icon.svg';
import { ReactComponent as DeleteIcon } from '../../../images/icons/trash-bin-icon.svg';
import { ReactComponent as SaveIcon } from '../../../images/icons/save-outline-icon.svg';
import { Button } from 'style/Button.style';
import { CustomSelect } from 'style/Select.style';
import { CustomInput } from 'style/Input.style';




export const ProductCardPrice = (props) => {
    const tipiProdotti = useStore((state) => state.tipiProdotti)
    const setItem = useStore((state) => state.setItem)
    const ref = useRef(null);

    const [edit, setEdit] = useState({
        isEditing: false,
        name: '',
        price: '',
        iva: '',
        tipoProdotto: '',
        ordine:''
    })

    const patchToDbItem = async () => {
        await axios.patch(`http://localhost:3001/item/${props.id}`, {
            "name": edit.name,
            "price": edit.price,
            "iva": edit.iva,
            "sort": Number(edit.ordine),
            "tipoProdotto": Number(edit.tipoProdotto)
        })
        setItem()
        setEdit({
            isEditing: false,
            name: '',
            price: '',
            iva: '',
            tipoProdotto: '',
            ordine:''
        })
    }

    const sendToDbItem = async () => {
        await axios.patch(`http://localhost:3001/item/${props.id}`, {
            "isActive": !props.isActive
        })
        setItem()
    }


    const handleClick = () => {
        setTimeout(() => ref.current.focus())
        setEdit({
            isEditing: true,
            name: props.name,
            price: props.price,
            iva: props.iva,
            tipoProdotto: props.tipoProdotto,
            ordine:props.ordine
        })
    }

    
    
    return (
        <>
            <ContainerProdctCardPrice >
                <TextProductCard >
                    {edit.isEditing
                        ? <InputText
                            ref={ref}
                            value={firstToCapitalLetter(edit.name)}
                            onChange={(e) => setEdit({
                                isEditing: true,
                                name: e.target.value,
                                price: edit.price,
                                iva: edit.iva,
                                tipoProdotto: edit.tipoProdotto,
                                ordine:edit.ordine
                            })} type={'text'}
                        />
                        : <span style={{ minWidth: 'fit-content' }}> {props.name}</span>}
                </TextProductCard>

                <ContainerInputs>
                    {edit.isEditing ?
                        <InputWrapper>
                            <label htmlFor="price">Prezzo: </label>
                            <CustomInput
                                onChange={(e) => setEdit({
                                    isEditing: true,
                                    name: edit.name,
                                    price: e.target.value,
                                    iva: edit.iva,
                                    tipoProdotto: edit.tipoProdotto,
                                    ordine:edit.ordine
                                })} value={edit.price} placeholder={'Prezzo'} type={'number'} min={"0"} id='price' />
                        </InputWrapper>


                        : <ContainerNumber><span>Prezzo: </span><span>{props.price}</span></ContainerNumber>}
                    {edit.isEditing ?
                        <InputWrapper>
                            <label htmlFor="iva">Iva:</label>
                            <CustomInput
                                onChange={(e) => setEdit({
                                    isEditing: true,
                                    name: edit.name,
                                    price: edit.price,
                                    iva: e.target.value,
                                    tipoProdotto: edit.tipoProdotto,
                                    ordine:edit.ordine
                                })} value={edit.iva} placeholder={'Iva'} type={'number'} pattern="[0-9]" min="0" max="100" id='iva' />
                        </InputWrapper>
                        : <ContainerNumber><span>Iva:</span><span>{props.iva}</span></ContainerNumber>}
                        {edit.isEditing ?
                        <InputWrapper>
                            <label htmlFor="Ordine">Ordine:</label>
                            <CustomInput
                                onChange={(e) => setEdit({
                                    isEditing: true,
                                    name: edit.name,
                                    price: edit.price,
                                    iva: edit.iva,
                                    tipoProdotto: edit.tipoProdotto,
                                    ordine:e.target.value
                                })} value={edit.ordine} placeholder={'ordine'} type={'number'} pattern="[0-9]" min="0" id='ordine' />
                        </InputWrapper>
                        : <ContainerNumber><span>Ordine:</span><span>{props.ordine}</span></ContainerNumber>}
                    {edit.isEditing ?
                        <InputWrapper>
                            <label htmlFor="tipo">Tipo: </label>
                            <CustomSelect
                                style={{ marginLeft: '5px' }}
                                id='tipo'
                                onChange={(e) => setEdit({
                                    isEditing: true,
                                    name: edit.name,
                                    price: edit.price,
                                    iva: edit.iva,
                                    tipoProdotto: e.target.value,
                                    ordine:edit.ordine
                                })}>
                                {tipiProdotti && tipiProdotti?.map((val, key) => {
                                    return (
                                        <option key={key} value={Number(val.id)}>{val.name}</option>
                                    )
                                }
                                )}
                            </CustomSelect>
                        </InputWrapper>
                        : <ContainerNumber><span>Tipo: </span>{tipiProdotti && tipiProdotti?.filter((item, key) =>
                            item.id === Number(props.tipoProdotto)
                        )[0]?.name}
                        </ContainerNumber>}
                </ContainerInputs>
                <ButtonContainer>
                    <ControlIcons>
                        {!edit.isEditing && <IconWrapper onClick={() => handleClick()} >
                            <EditIcon />
                        </IconWrapper>}
                        {edit.isEditing && <IconWrapper onClick={() => patchToDbItem()} >
                            <SaveIcon />
                        </IconWrapper>}
                        {edit.isEditing &&
                            <IconWrapper onClick={() => setEdit({
                                isEditing: false,
                                name: '',
                                price: '',
                                iva: '',
                                tipoProdotto: '',
                                ordine:''
                            })}>
                                <DeleteIcon />
                            </IconWrapper>}
                    </ControlIcons>
                    <Button onClick={() => sendToDbItem()}> {props.isActive ? 'Disabilita' : 'Abilita'}</Button>
                </ButtonContainer>
            </ContainerProdctCardPrice>

        </>
    );
};

