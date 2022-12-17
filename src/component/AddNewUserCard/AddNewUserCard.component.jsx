import React from 'react'
import { Button } from 'style/Button.style'
import { ContainerNewProduct } from 'style/Container.style'
import { CustomInput } from 'style/Input.style'
import { CustomSelect } from 'style/Select.style'

export const AddNewUserCard = (props) => {
console.log(props)
    return (
        <ContainerNewProduct>
            Aggiungi Nuovo User
            <CustomInput placeholder={'nome'} onChange={(e) => props.setNome(e.target.value)} type={'text'}></CustomInput>
            <CustomInput type={'text'} onChange={(e) => props.setVia(e.target.value)} placeholder={'via'}></CustomInput>
            <CustomSelect onChange={(e) => props.setGirino(e.target.value)}>
                {props.girini && props.girini?.map((val, key) => {
                    return (
                        <option key={key} value={val.id}>{val.name}</option>
                    )
                }
                )}
            </CustomSelect>
            <Button onClick={() => props.sendToDbUser()} disabled={!(props.nome.length > 0 && props.via.length > 0)}>{'Conferma'}</Button>
        </ContainerNewProduct>
    )
}

export default AddNewUserCard
