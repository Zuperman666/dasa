import axios from "axios";
import React, { useRef, useState } from "react";
import { useStore } from "store/store";
import { IconWrapper } from "component/ProductList/style/ProductList.style";
import {
  ButtonContainer,
  ContainerInputs,
  ContainerNumber,
  ContainerProdctCardPrice,
  ControlIcons,
  InputText,
  InputWrapper,
  TextProductCard,
} from "component/ProductList/partial/style/ProductCardPrice.style";
import { firstToCapitalLetter } from "utils/firstToCapitalLetter";
import { ReactComponent as EditIcon } from "images/icons/edit-note-icon.svg";
import { ReactComponent as DeleteIcon } from "images/icons/trash-bin-icon.svg";
import { ReactComponent as SaveIcon } from "images/icons/save-outline-icon.svg";
import { Button } from "style/Button.style";
import { CustomSelect } from "style/Select.style";
import { CustomInput } from "style/Input.style";

export const UserCard = (props) => {
  const setUsers = useStore((state) => state.setUsers);
  const ref = useRef(null);
  const girini = useStore((state) => state.girini);
  const liste = useStore((state) => state.liste);

  const [edit, setEdit] = useState({
    isEditing: false,
    name: "",
    via: "",
    girino: "",
    lista: "",
    id: "",
  });

  const patchToDbItem = async () => {
    await axios.patch(`http://localhost:3001/user/${edit.id}`, {
      name: edit.name,
      via: edit.via,
      listId: Number(edit.lista),
      girino: Number(edit.girino),
    });
    setEdit({
      isEditing: false,
      name: "",
      via: "",
      girino: "",
      lista: "",
      id: "",
    });
    setUsers();
  };

  const patchToDbItemActive = async (id, isActive) => {
    await axios.patch(`http://localhost:3001/user/${id}`, {
      isActive: !isActive,
    });
    setUsers();
  };

  const handleClick = () => {
    setTimeout(() => ref.current.focus());
    setEdit({
      isEditing: true,
      name: props.name,
      via: props.via,
      girino: props.girino,
      lista: props.lista,
      id: props.id,
    });
  };

  return (
    <>
      <ContainerProdctCardPrice>
        <TextProductCard>
          {edit.isEditing ? (
            <InputText
              ref={ref}
              value={firstToCapitalLetter(edit.name)}
              onChange={(e) =>
                setEdit({
                  isEditing: true,
                  name: e.target.value,
                  via: edit.via,
                  girino: edit.girino,
                  lista: edit.lista,
                  id: edit.id,
                })
              }
              type={"text"}
            />
          ) : (
            <span style={{ minWidth: "fit-content" }}> {props.name}</span>
          )}
        </TextProductCard>

        <ContainerInputs>
          {edit.isEditing ? (
            <InputWrapper>
              <label htmlFor="via">Via: </label>
              <CustomInput
                onChange={(e) =>
                  setEdit({
                    isEditing: true,
                    name: edit.name,
                    via: e.target.value,
                    girino: edit.girino,
                    lista: edit.lista,
                    id: edit.id,
                  })
                }
                value={edit.via}
                placeholder={"Via"}
                type={"text"}
                id="via"
              />
            </InputWrapper>
          ) : (
            <span style={{ minWidth: "fit-content" }}> {props.via}</span>
          )}
          {edit.isEditing ? (
            <InputWrapper>
              <label htmlFor="tipo">Tipo: </label>
              <CustomSelect
                style={{ marginLeft: "5px" }}
                id="tipo"
                defaultValue={edit.girino}
                onChange={(e) =>
                  setEdit({
                    isEditing: true,
                    name: edit.name,
                    via: edit.via,
                    girino: e.target.value,
                    lista: edit.lista,
                    id: edit.id,
                  })
                }
              >
                {girini &&
                  girini?.map((val, key) => {
                    return (
                      <option key={key} value={Number(val.id)}>
                        {val.name}
                      </option>
                    );
                  })}
              </CustomSelect>
            </InputWrapper>
          ) : (
            <ContainerNumber>
              <span>Tipo:</span>
              {girini &&
                girini.filter((item, key) => item.id === props.girino)[0].name}
            </ContainerNumber>
          )}
          {edit.isEditing ? (
            <InputWrapper>
              <label htmlFor="lista">Listino: </label>
              <CustomSelect
                style={{ marginLeft: "5px" }}
                id="lista"
                defaultValue={edit.lista}
                onChange={(e) =>
                  setEdit({
                    isEditing: true,
                    name: edit.name,
                    via: edit.via,
                    girino: edit.girino,
                    lista: e.target.value,
                    id: edit.id,
                  })
                }
              >
                {liste &&
                  liste?.map((val, key) => {
                    return (
                      <option key={key} value={Number(val.id)}>
                        {val.name}
                      </option>
                    );
                  })}
              </CustomSelect>
            </InputWrapper>
          ) : (
            <ContainerNumber>
              <span>Listino:</span>
              {liste &&
                liste.filter((item, key) => item.id === props.lista)[0].name}
            </ContainerNumber>
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
              <IconWrapper onClick={() => patchToDbItem()}>
                <SaveIcon />
              </IconWrapper>
            )}
            {edit.isEditing && (
              <IconWrapper
                onClick={() =>
                  setEdit({
                    isEditing: false,
                    name: "",
                    via: "",
                    girino: "",
                    lista: "",
                    id: "",
                  })
                }
              >
                <DeleteIcon />
              </IconWrapper>
            )}
          </ControlIcons>
          <Button onClick={() => patchToDbItemActive(props.id, props.isActive)}>
            {" "}
            {props.isActive ? "Disabilita" : "Abilita"}
          </Button>
        </ButtonContainer>
      </ContainerProdctCardPrice>
    </>
  );
};
