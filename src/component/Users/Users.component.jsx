import axios from "axios";
import AddNewUserCard from "component/AddNewUserCard/AddNewUserCard.component";
import { UserCard } from "component/UserCard/UserCard.component";
import React, { useEffect, useState } from "react";
import Toggle from "react-toggle";
import { useStore } from "store/store";
import { ContainerNewProduct, ContainerPadding } from "style/Container.style";
import {
  Column,
  ContainerDoubleTable,
  ContainerToggle,
  ContainerUsers,
  Row,
} from "./style/Users.style";

export const Users = (props) => {
  const girini = useStore((state) => state.girini);
  const liste = useStore((state) => state.liste);
  const [girino, setGirino] = useState(girini[0]?.id);
  const [lista, setLista] = useState(1);
  const allUser = useStore((state) => state.allUser);
  const setUsers = useStore((state) => state.setUsers);
  const item = useStore((state) => state.item);

  const [active, setActive] = useState(true);
  const [sendToDbF, setSendToDbF] = useState(false);
  const [nome, setNome] = useState("");
  const [via, setVia] = useState("");
  const arrayDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const sendToDbUser = async () => {
    await axios.post(`http://localhost:3001/user`, {
      name: nome,
      via: via,
      isActive: true,
      daPagare: 0,
      listId: Number(lista),
      girino: Number(girino),
    });
    setUsers();
    setSendToDbF(true);
  };

  const sendToDbUsuallyOrder = async () => {
    const userId = allUser.find((obj) => obj.name === nome);
    const body = arrayDays.map((obj) => ({
      day: obj,
      stato: "aperto",
      ordine: item.map((obj) => ({ itemId: obj.id, quantità: 0 })),
    }));
    await axios.post(`http://localhost:3001/usuallyOrder`, {
      userId: userId.id,
      body: body,
    });
  };

  useEffect(() => {
    if (girini) {
      setGirino(girini[0]?.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [girini]);

  useEffect(() => {
    if (sendToDbF) {
      sendToDbUsuallyOrder();
      setSendToDbF(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allUser]);

  return (
    <>
      <ContainerToggle>
        {" "}
        <div>
          {" "}
          {active ? <span>Vedi Disattivati</span> : <span>Vedi Abilitati</span>}
        </div>
        <Toggle
          icons={false}
          checked={active}
          onChange={() => setActive(!active)}
        />
      </ContainerToggle>
      <ContainerDoubleTable>
        <Row>
          {allUser.map((val, key) => {
            if (val.isActive === active) {
              return (
                <Column>
                  <ContainerUsers>
                    <UserCard
                      via={val.via}
                      id={val.id}
                      girino={val.girino}
                      lista={val.listId}
                      tipoProdotto={val.tipoProdotto}
                      isActive={val.isActive}
                      key={key}
                      name={val.name}
                    />
                  </ContainerUsers>
                </Column>
              );
            } else return <></>;
          })}
        </Row>
      </ContainerDoubleTable>
      <ContainerNewProduct>
        <AddNewUserCard
          setNome={setNome}
          nome={nome}
          setVia={setVia}
          via={via}
          sendToDbUser={sendToDbUser}
          girini={girini}
          setGirino={setGirino}
          liste={liste}
          setLista={setLista}
        />
      </ContainerNewProduct>
    </>
  );
};
