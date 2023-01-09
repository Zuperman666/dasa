import React from 'react'
import { Button } from 'style/Button.style'
import { ContainerNewProduct } from 'style/Container.style'
import { CustomInput } from 'style/Input.style'
import { CustomSelect } from 'style/Select.style'

export const AddNewProductCard = (props) => {

    return (
        <ContainerNewProduct>
            Aggiungi Nuovo Prodotto
            <CustomInput placeholder={'Nome'} onChange={(e) => props.setNome(e.target.value)} type={'text'}></CustomInput>
            <CustomInput type={'number'} onChange={(e) => props.setPrezzo(e.target.value)} placeholder={'Prezzo'}></CustomInput>
            <CustomInput type={'number'} onChange={(e) => props.setIva(e.target.value)} placeholder={'Iva'}></CustomInput>
            <CustomInput type={'number'} onChange={(e) => props.setOrdine(e.target.value)} placeholder={'ordine'}></CustomInput>

            <CustomSelect onChange={(e) => props.setTipoProdotto(e.target.value)}>
                {props.tipiProdotti && props.tipiProdotti?.map((val, key) => {
                    return (
                        <option key={key} value={Number(val.id)}>{val.name}</option>
                    )
                }
                )}
            </CustomSelect>

            <Button onClick={() => props.sendToDbItem()} disabled={!(props.nome.length > 0 && props.prezzo.length > 0 && props.iva.length > 0)}>{'Conferma'}</Button>
        </ContainerNewProduct>
    )
}

export default AddNewProductCard
