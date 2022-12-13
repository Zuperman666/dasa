import React from 'react';
import { useStore } from 'store/store';
import { CustomInput } from 'style/Input.style';
import { ContainerProductCard, InputCustomNumber, TextProductCard } from './style/ProductCard.style';


export const ProductCard = (props) => {
  const modifyItem = useStore((state) => state.modifyItem)
  const selectedDayOrder = useStore((state) => state.selectedDayOrder)
  const setValue = useStore((state) => state.setValue)


  const ModifyItemFunction = (e) => {
    let array = selectedDayOrder;
    let result;
    let modify = { itemId: props.itemId, quantità: Number(e.target.value) }
    let alreadyInside = array.ordine.filter(
      (obj) => props.itemId === obj.itemId)
    if (!props.isPresent && alreadyInside.length === 0) {
      array.ordine.push(modify);
      result = array
    } else {
      let order = array.ordine.map(
        (obj) => props.itemId === obj.itemId ? modify : obj)
      array.ordine = order
      result = array
    }
    setValue("selectedDayOrder", result)
  }

  return (
    <ContainerProductCard>
      <TextProductCard> {props.name}</TextProductCard>
      <CustomInput
        // @ts-ignore
        maxWidth={'fit-content'} onChange={(e) => (modifyItem({ itemId: props.itemId, quantità: Number(e.target.value) }), ModifyItemFunction(e))}
        defaultValue={props.quantità} type={'number'} min={"0"} />
    </ContainerProductCard>
  );
};


