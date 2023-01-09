import React from 'react'
import { Button } from 'style/Button.style'
import { ContainerNewProduct } from 'style/Container.style'
import { CustomInput } from 'style/Input.style'

export const AddNewList = (props) => {

    return (
        <ContainerNewProduct>
            Aggiungi Nuova Lista Prodotto
            <CustomInput placeholder={'Nome'} onChange={(e) => props.setNome(e.target.value)} type={'text'}></CustomInput>
            <Button onClick={() => props.sendToDbItem()} disabled={!(props.nome.length > 0)}>{'Conferma'}</Button>
        </ContainerNewProduct>
    )
}

export default AddNewList
