import React from "react";
import { useEffect } from "react";
import { useStore } from "store/store";
import { CustomInput } from "style/Input.style";
import {
  ContainerProductCard,
  InputCustomNumber,
  TextProductCard,
} from "./style/ProductCard.style";

export const ProductCard = (props) => {
  const modifyItem = useStore((state) => state.modifyItem);
  const selectedDay = useStore((state) => state.selectedDay);
  const defaultOrder = useStore((state) => state.defaultOrder);
  const selectedDayOrder = useStore((state) => state.selectedDayOrder);
  const selectedTempOrder = useStore((state) => state.selectedTempOrder);
  const temporary = useStore((state) => state.temporary);
  const setValue = useStore((state) => state.setValue);

  const ModifyFunction = (e) => {
    switch (selectedDay) {
      case "":
        modifyDefaultOrder(e);
        break;
      default:
        modifyDayOrder(e);
        break;
    }
  };

  const modifyDayOrder = (e) => {
    let isPresent = temporary ? props.isPresentTemp : props.isPresentDay;
    let array = temporary ? selectedTempOrder : selectedDayOrder;
    let result;
    let modify = { itemId: props.itemId, quantità: Number(e.target.value) };
    if (array && array.length === 0) {
      array = [{ day: selectedDay, order: [] }];
    }
    let alreadyInside = array[0].order.filter(
      (obj) => props.itemId === obj.itemId
    );
    if (!isPresent && alreadyInside.length === 0) {
      console.log("true")
      array[0].order.push(modify);
      result = array;
    } else {
      console.log("fas")
      let order = array[0].order.map((obj) =>
        props.itemId === obj.itemId ? modify : obj
      );
      array[0].order = order;
      result = array;
    }
   
    setValue(temporary ? "selectedTempOrder" : "selectedDayOrder", result);
  };

  const modifyDefaultOrder = (e) => {
    const edited = defaultOrder.map((obj) =>
      obj.itemId === props.itemId
        ? { itemId: props.itemId, quantità: Number(e.target.value) }
        : obj
    );
    setValue("defaultOrder", edited);
  };

  return (
    <ContainerProductCard>
      <TextProductCard> {props.name}</TextProductCard>
      <div>
        <CustomInput
          // @ts-ignore
          maxWidth={"50px"}
          onChange={(e) => (
            modifyItem({
              itemId: props.itemId,
              quantità: Number(e.target.value),
            }),
            ModifyFunction(e)
          )}
          defaultValue={props.quantità}
          type={"number"}
          min={"0"}
        />
      </div>
    </ContainerProductCard>
  );
};
