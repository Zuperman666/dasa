import React from 'react'
import { ContainerNewProduct, SelectTypeProduct } from './style/AddNewProductCard.style'

export const AddNewProductCard = (props) => {

    return (
        <ContainerNewProduct>
            Aggiungi Nuovo Prodotto
            <input placeholder={'nome'} onChange={(e) => props.setNome(e.target.value)} type={'text'}></input>
            <input type={'number'} onChange={(e) => props.setPrezzo(e.target.value)} placeholder={'prezzo'}></input>
            <input type={'number'} onChange={(e) => props.setIva(e.target.value)} placeholder={'iva'}></input>
            <div>
                <SelectTypeProduct onChange={(e) => props.setTipoProdotto(e.target.value)}>
                    {props.tipiProdotti && props.tipiProdotti?.map((val, key) => {
                        return (
                            <option key={key} value={Number(val.id)}>{val.name}</option>
                        )
                    }
                    )}
                </SelectTypeProduct>
            </div>
            <button onClick={() => props.sendToDbItem()} disabled={!(props.nome.length > 0 && props.prezzo.length > 0 && props.iva.length > 0)}>{'Conferma'}</button>
        </ContainerNewProduct>
    )
}

export default AddNewProductCard
