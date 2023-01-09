import { ButtonContainer } from 'component/Girini/style/Girini.style';
import { TextProductCard } from 'component/ProductList/partial/style/ProductCardPrice.style';
import React from 'react';
import { ContainerCardListPrice } from './style/CardListPrice.style';


export const CardListPrice = (props) => {


    return (
        <>
            <ContainerCardListPrice>
                <TextProductCard >
                    <div>{props.name}</div>
                </TextProductCard>
                <ButtonContainer>
                    <button onClick={ ()=> (props.setId(props.id),props.setIsEditing(true))} > Edita</button>
                </ButtonContainer>
            </ContainerCardListPrice>
        </>
    );
};
