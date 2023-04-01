import axios from "axios";
import React, { useState } from "react";
import { useStore } from "store/store";
import {
  TextProductCard,
  ContainerInputs,
  InputWrapper,
  ButtonContainer,
  ControlIcons,
  IconWrapper,
} from "./style/ModificationCard.style";
import { CustomInput } from "style/Input.style";
import { ReactComponent as EditIcon } from "images/icons/edit-note-icon.svg";
import { ReactComponent as DeleteIcon } from "images/icons/trash-bin-icon.svg";
import { ReactComponent as SaveIcon } from "images/icons/save-outline-icon.svg";
import { Button } from "style/Button.style";

export const ModificationCard = (props) => {
  const item = useStore((state) => state.item);
  const liste = useStore((state) => state.liste);
  const setListe = useStore((state) => state.setListe);
  const [edit, setEdit] = useState({
    isEditing: false,
    id: "",
    price: 0,
  });

  const handleClick = () => {
    setEdit({
      isEditing: true,
      id: edit.id,
      price: edit.price,
    });
  };

  const patchToDbItem = async (modId) => {
    await axios.patch(`http://localhost:3001/liste/${props.id}`, {
      modifiche: [
        ...liste
          .filter((obj) => obj.id === props.id)[0]
          .modifiche.map((mod) =>
            mod.itemId === modId ? { itemId: modId, price: edit.price } : mod
          ),
      ],
    });
    setListe();
    setEdit({ ...edit, isEditing: false, id: modId });
  };

  const deleteToDbItem = async (modId) => {
    const ultimoElem =
      liste.filter((obj) => obj.id === props.id)[0].modifiche.length === 1;
    await axios.patch(`http://localhost:3001/liste/${props.id}`, {
      modifiche: ultimoElem
        ? []
        : 
            liste
              .filter((obj) => obj.id === props.id)[0]
              .modifiche.filter((mod) => mod.itemId !== modId),
          
    });
    setListe();
  };

  return (
    <>
      <TextProductCard>
        {item.find((prod) => prod.id === props.val.itemId)?.name}
      </TextProductCard>
      <ContainerInputs>
        {edit.isEditing ? (
          <InputWrapper>
            <label htmlFor="prezzo">Prezzo: </label>
            <CustomInput
              onChange={(e) =>
                setEdit({
                  isEditing: true,
                  id: edit.id,
                  price: Number(e.target.value),
                })
              }
              value={edit.price}
              step=".01"
              placeholder={"Prezzo"}
              type={"number"}
              id="prezzo"
            />
          </InputWrapper>
        ) : (
          <span style={{ minWidth: "fit-content" }}>
            Prezzo: {props.val.price}{" "}
          </span>
        )}
      </ContainerInputs>
      <ButtonContainer>
        <ControlIcons>
          {!edit.isEditing && (
            <IconWrapper onClick={() => handleClick()}>
              <EditIcon />
            </IconWrapper>
          )}
          {edit.isEditing && (
            <IconWrapper onClick={() => patchToDbItem(props.val.itemId)}>
              <SaveIcon />
            </IconWrapper>
          )}
          {edit.isEditing && (
            <IconWrapper
              onClick={() => {
                setEdit({
                  isEditing: false,
                  id: "",
                  price: edit.price,
                });
              }}
            >
              <DeleteIcon />
            </IconWrapper>
          )}
        </ControlIcons>
        <Button onClick={() => deleteToDbItem(props.val.itemId)}> Elimina </Button>
      </ButtonContainer>
    </>
  );
};
