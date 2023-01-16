import axios from "axios";
import AddNewList from "component/AddNewList/AddNewList.component";
import React, { useState } from "react";
import { useStore } from "store/store";
import { CustomSelect } from "style/Select.style";
import { CardListPrice } from "./partials/CardListPrice.component";
import {
  Column,
  ContainerDoubleTable,
  ContainerEditor,
  CustomModal,
  Row,
} from "./style/NewListi.style";
import { ModificationCard } from "component/ModificationCard/ModificationCard.component";

export const NewList = () => {
  const liste = useStore((state) => state.liste);
  const item = useStore((state) => state.item);
  const tipiProdotti = useStore((state) => state.tipiProdotti);
  const setListe = useStore((state) => state.setListe);

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [tipoProdotto, setTipoProdotto] = useState(1);
  const [modalElement, setModalElement] = useState(false);
  const [prodotto, setProdotto] = useState(-1);
  const [isEditing, setIsEditing] = useState(false);

  const [price, setPrice] = useState(0);

  const sendToDbItem = async () => {
    await axios.post(`http://localhost:3001/liste`, {
      name: nome,
      modifiche: [],
    });
    setNome("");
    setListe();
  };

  const patchToDbItem = async () => {
    const alreadyExist = liste
      .filter((obj) => obj.id === id)[0]
      .modifiche.some((mod) => mod.id === prodotto);
    if (alreadyExist) {
      alert("Prodotto già modificato");
    } else {
      await axios.patch(`http://localhost:3001/liste/${id}`, {
        modifiche: [
          ...liste.filter((obj) => obj.id === id)[0].modifiche,
          {
            id: prodotto,
            price: price,
          },
        ],
      });
    }
    setListe();
  };

  const deleteList = async (delId) => {
    await axios.delete(`http://localhost:3001/liste/${delId}`);
    setListe();
  };

  function filterByType() {
    let prop = "tipoProdotto";
    let xs = item.filter((obj6) => obj6.isActive);
    let grouped = {};
    for (var i = 0; i < xs.length; i++) {
      var p = xs[i][prop];
      if (!grouped[p]) {
        grouped[p] = [];
      }
      grouped[p].push(xs[i]);
    }
    let result = Object.values(grouped);
    result = result.map((obj) => obj.sort((a, b) => a.sort - b.sort));
    return result;
  }
  return isEditing ? (
    <>
      <ContainerEditor>
        <button onClick={() => setIsEditing(false)}> Back</button>
        <h1> Modifica {nome}</h1>
      </ContainerEditor>
      <ContainerDoubleTable>
        <Row>
          {liste
            .filter((obj) => obj.id === id)[0]
            .modifiche.map((val) => {
              return (
                <>
                  <Column>
                    <ModificationCard id={id} val={val} />
                  </Column>
                </>
              );
            })}
        </Row>
      </ContainerDoubleTable>
      <div>
        {modalElement ? (
          <CustomModal>
            <>
              <CustomSelect
                onChange={(e) => setTipoProdotto(Number(e.target.value))}
              >
                <option value={-1}>Seleziona Tipo</option>
                {tipiProdotti &&
                  tipiProdotti?.map((val, key) => {
                    return (
                      <option key={key} value={val.id}>
                        {val.name}
                      </option>
                    );
                  })}
              </CustomSelect>
              <CustomSelect
                onChange={(e) => setProdotto(Number(e.target.value))}
              >
                <option value={-1}>Seleziona Prodotto</option>
                {filterByType()
                  .filter(
                    (obj) =>
                      Number(obj[0].tipoProdotto) === Number(tipoProdotto)
                  )[0]
                  .filter((obj2) =>
                    liste
                      .filter((obj) => obj.id === id)[0]
                      .modifiche.filter((obj3) => obj2.itemId === obj3.id)
                  )
                  .map((val, key) => {
                    return (
                      <option key={key} value={val.id}>
                        {val.name}
                      </option>
                    );
                  })}
              </CustomSelect>
            </>
            <div>Nuovo Prezzo</div>
            <input
              onChange={(e) => setPrice(Number(e.target.value))}
              type={"number"}
            ></input>
            <button
              disabled={prodotto === -1 || tipoProdotto === -1}
              onClick={() => (patchToDbItem(), setModalElement(false))}
            >
              {"Conferma"}
            </button>
            <button onClick={() => setModalElement(false)}>{"Annulla"}</button>
          </CustomModal>
        ) : (
          <button onClick={() => setModalElement(true)}>Aggiungi</button>
        )}
      </div>
    </>
  ) : (
    <>
      <ContainerDoubleTable>
        <Row>
          {liste.map((val, key) => {
            if (val.id !== 1)
              return (
                <Column>
                  <CardListPrice
                    id={val.id}
                    setId={setId}
                    setIsEditing={setIsEditing}
                    name={val.name}
                    setName={setNome}
                    delete={deleteList}
                  />
                </Column>
              );
          })}
        </Row>
      </ContainerDoubleTable>
      <AddNewList sendToDbItem={sendToDbItem} nome={nome} setNome={setNome} />
    </>
  );
};
