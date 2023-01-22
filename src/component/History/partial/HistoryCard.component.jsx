import { ButtonContainer, ContainerUsers, TextProductCard } from "component/Girini/style/Girini.style";

import React, { useRef, useState } from "react";
import { useStore } from "store/store";

export const HistoryCard = (props) => {
    const item = useStore((state) => state.item);
    return (
        <>
            <ContainerUsers>
                <TextProductCard>
                    <div>
                        {item.filter((obj3) => obj3.id === props.itemId)[0].name}
                    </div>
                </TextProductCard>
                <ButtonContainer>
                    {props.quantità}
                </ButtonContainer>
            </ContainerUsers>
        </>
    )
}