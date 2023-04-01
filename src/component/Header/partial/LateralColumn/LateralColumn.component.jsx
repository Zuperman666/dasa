import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "store/store";
import { CustomSelect } from "style/Select.style";
import { ModalStamp } from "../ModalStamp/ModalStamp.component";
import {
  ButtonSelect,
  ButtonWrapper,
  ContainerLateral,
} from "./style/LateralColumn.style";

export const LateralColumn = (props) => {
  const [isSending, setIsSending] = useState(false);
  const [hasPatch, setHasPatch] = useState();
  const [isModalStamp, setIsModalStamp] = useState(false);
  const [money, setMoney] = useState("");
  const setTipiProdotti = useStore((state) => state.setTipiProdotti);
  const tipiProdotti = useStore((state) => state.tipiProdotti);
  const setValue = useStore((state) => state.setValue);
  const modifiedItem = useStore((state) => state.modifiedItem);
  const save = useStore((state) => state.save);
  const resetModify = useStore((state) => state.resetModify);
  const isAdmin = useStore((state) => state.isAdmin);
  const allUser = useStore((state) => state.allUser);
  const changeday = useStore((state) => state.changeday);
  const userProduct = useStore((state) => state.userProduct);
  const setUsers = useStore((state) => state.setUsers);
  const setItem = useStore((state) => state.setItem);
  const selectUser = useStore((state) => state.selectUser);
  const setProduct = useStore((state) => state.setProduct);
  const defaultOrder = useStore((state) => state.defaultOrder);
  const dayOrder = useStore((state) => state.dayOrder);
  const selectedDayOrder = useStore((state) => state.selectedDayOrder);
  const selectedDay = useStore((state) => state.selectedDay);
  const item = useStore((state) => state.item);
  const setGirini = useStore((state) => state.setGirini);
  const selectedGirino = useStore((state) => state.selectedGirino);
  const setAllUserGirino = useStore((state) => state.setAllUserGirino);
  const allUserGirino = useStore((state) => state.allUserGirino);
  const girini = useStore((state) => state.girini);
  const liste = useStore((state) => state.liste);
  const setListe = useStore((state) => state.setListe);
  const temporary = useStore((state) => state.temporary);
  const tempOrder = useStore((state) => state.tempOrder);
  const selectedTempOrder = useStore((state) => state.selectedTempOrder);
  const navigate = useNavigate();

  const SendToDbProduct = async () => {
    if (selectedDay === "") {
      await axios.patch(`http://localhost:3001/usuallyOrder/${selectUser.id}`, {
        defaultOrder: defaultOrder,
      });
    } else if (!temporary) {
      let ordine;
      if (selectedDayOrder[0].order.length === 0) {
        if (dayOrder.length === 0) {
          ordine = []
        } else {
          ordine = dayOrder.filter((obj) => obj.day !== selectedDayOrder[0].day);
        }
      } else {
        if (dayOrder.length === 0) {
          ordine = [selectedDayOrder[0]]
        } else {
          if (dayOrder.filter((obj) => obj?.day === selectedDayOrder[0].day).length === 0) {
            ordine = dayOrder
            ordine.push(selectedDayOrder[0])
          } else {
            ordine = dayOrder.map((obj) => obj?.day === selectedDayOrder[0].day ? selectedDayOrder[0] : obj);
          }
        }
      }
      await axios.patch(`http://localhost:3001/usuallyOrder/${selectUser.id}`, {
        dayOrder: ordine || [],
      });
    } else {
      let ordine;
      if (selectedTempOrder[0].order.length === 0) {
        if (tempOrder.length === 0) {
          ordine = []
        } else {
          ordine = tempOrder.filter((obj) => obj.day !== selectedTempOrder[0].day);
        }
      } else {
        if (tempOrder.length === 0) {
          ordine = [selectedTempOrder[0]]
        } else {
          if (tempOrder.filter((obj) => obj?.day === selectedTempOrder[0].day).length === 0) {
            ordine = tempOrder
            ordine.push(selectedTempOrder[0])
          } else {
            ordine = tempOrder.map((obj) => obj?.day === selectedTempOrder[0].day ? selectedTempOrder[0] : obj);
          }
        }
      }
      await axios.patch(`http://localhost:3001/usuallyOrder/${selectUser.id}`, {
        tempOrder: ordine || [],
      });
    }
    setValue('temporary', false)
    setProduct(selectUser.id);
  };
  const PrintTotal = async () => {
    await axios.get("http://localhost:3001/usuallyOrder").then((resp) => {
      const filterActive = resp.data.filter(
        (obj2) =>
          allUser.filter((obj3) => obj3.id === obj2.id)[0].isActive === true
      );
      const hasPatchFunc = async () => {
        setHasPatch(filterActive.filter((obj) => obj.tempOrder.length > 0))
      }
      hasPatchFunc()
      const handleFiltertemp = (obj2, obj) => {
        let temp = obj.tempOrder.filter((obj3) =>
          obj3.day === moment(new Date()).format("dddd"))[0];
        let day = obj.dayOrder.filter((obj3) =>
          obj3.day === moment(new Date()).format("dddd"))[0];
        if (temp && temp.order.length > 0) {
          if (temp.order.filter((obj4) => obj4.itemId === obj2.itemId)[0]) {
            return temp.order.filter((obj4) => obj4.itemId === obj2.itemId)[0]
          }
        }
        if (day && day.order.length > 0) {
          if (day.order.filter((obj4) => obj4.itemId === obj2.itemId)[0]) {
            return day.order.filter((obj4) => obj4.itemId === obj2.itemId)[0]
          }
        }
        return obj2
      }
      const filteredData = filterActive
        .map((obj) => ({
          id: obj.id,
          closeDay: obj.closeDay,
          body: obj.defaultOrder.map((obj2) => handleFiltertemp(obj2, obj))
            .filter((obj4) =>
              item.filter((obj6) => obj6.id === obj4.itemId)[0]?.isActive
            )
        }))
        .filter((obj) => obj.body.length > 0).filter((obj) => obj.closeDay.length === 0 || obj.closeDay.filter((obj4) => obj4 === moment(new Date()).format("dddd"))[0].length === 0)
      const money = filteredData.map((obj) => ({
        id: obj.id,
        body: obj.body,
        totaliPezzi: tipiProdotti.map((obj6) => ({
          tipoProdotto: obj6.id,
          totale: obj?.body
            ? obj.body
              .filter(
                (obj7) =>
                  item.filter(
                    (obj8) => Number(obj8.id) === Number(obj7.itemId)
                  )[0].tipoProdotto === Number(obj6.id)
              )
              .map((obj9) => Number(obj9.quantità))
              .reduce((partialSum, a) => partialSum + a, 0)
            : 0,
        })),
        totaleSoldi: obj.body
          ? obj?.body
            ?.map(
              (obj2) =>
                allUser.filter((obj4) => obj4.id === obj.id)[0]?.listId === 1 ||
                  liste.filter((obj6) => Number(allUser.filter((obj4) => obj4.id === obj.id)[0]?.listId) === Number(obj6.id))[0].modifiche.filter((obj7) => obj7.itemId === obj2.itemId).length === 0
                  ?
                  item.filter((obj3) => obj3.id === obj2.itemId)[0].price *
                  obj2.quantità
                  : liste.filter((obj6) => Number(allUser.filter((obj4) => obj4.id === obj.id)[0]?.listId) === Number(obj6.id))[0].modifiche.filter((obj7) => obj7.itemId === obj2.itemId)[0].price * obj2.quantità
            )
            .reduce((previous, next) => {
              return previous + next;
            })
            ?.toFixed(2)
          : 0,
      }));

      let moneyName = money.map((obj) => ({
        name: allUser.filter((obj2) => obj2.id === obj.id)[0]?.name,
        body: obj.body,
        totaleSoldi: obj.totaleSoldi,
        totaliPezzi: obj.totaliPezzi,
        girino: allUser.filter((obj2) => obj2.id === obj.id)[0]?.girino,
      }));
      let test = moneyName;
      console.log(test)
      /* await axios.post(`http://localhost:3001/history`, { 
      "day": moment(new Date()).format("mm/dd/yyyy"),
      "fullOrder": [
        {
          "userId": 1,
          "daPagare": 0,
          "relativeOrder": [
            {
              "itemId": 1,
              "quantità": 2
            }
          ]
        }
      ]
     })*/
      let testReduce = (objTotal, params, isAdmin = false) => {

        let valueObj = params === "itemId" ? "itemId" : "tipoProdotto";
        let testResult = [];
        let Check;
        if (!isAdmin) {
          let arrayFull =
            moneyName.filter((obj2) => obj2.girino === objTotal.id).length > 0;

          if (arrayFull) {
            if (params === "itemId") {
              Check = moneyName
                .filter((obj2) => obj2.girino === objTotal.id)
                .map((obj) => obj?.body);
            } else {
              Check = moneyName
                .filter((obj2) => obj2.girino === objTotal.id)
                .map((obj) => obj[params]);
            }
          } else {
            return [];
          }
        } else {
          if (params === "itemId") {
            Check = objTotal.map((obj) =>
              obj?.body?.ordine ? obj?.body?.ordine : obj?.body
            );
            Check = Check.map((obj) => obj);
          } else {
            Check = objTotal.map((obj) => obj[params]);
          }
        }
        for (let i = 0; i < Check.length; i++) {
          for (let a = 0; a < Check[i].length; a++) {
            if (
              testResult.find(
                (obj) => Number(obj[valueObj]) == Number(Check[i][a][valueObj])
              )
            ) {
              const target = testResult.find(
                (obj) => Number(obj[valueObj]) == Number(Check[i][a][valueObj])
              );
              const targetIndex = testResult.findIndex(
                (obj) => Number(obj[valueObj]) == Number(Check[i][a][valueObj])
              );
              let newValue;
              if (params === "itemId") {
                newValue = {
                  ...target,
                  quantità: target.quantità + Check[i][a].quantità,
                };
              } else {
                newValue = {
                  ...target,
                  totale: target.totale + Check[i][a].totale,
                };
              }
              testResult[targetIndex] = newValue;
            } else {
              testResult.push(Check[i][a]);
            }
          }
        }
        return testResult;
      };

      let girinoTotal = girini.map((obj) => ({
        name: "Girino " + obj.name,
        body: testReduce(obj, "itemId"),
        totaleSoldi:
          moneyName.filter((obj2) => obj2.girino === obj.id).length > 0
            ? moneyName
              .filter((obj2) => obj2.girino === obj.id)
              .map((obj) => obj.totaleSoldi)
              .reduce((partialSum, a) => Number(partialSum) + Number(a), 0)
              .toFixed(2)
            : 0,
        totaliPezzi: testReduce(obj, "totaliPezzi"),
        girino: "Nessuno",
      }));
      let totalLavoration = [
        {
          name: "Lista Produzione",
          body: testReduce(girinoTotal, "itemId", true),
          totaleSoldi: girinoTotal
            .map((obj) => obj.totaleSoldi)
            .reduce((partialSum, a) => Number(partialSum) + Number(a), 0)
            .toFixed(2),
          totaliPezzi: testReduce(girinoTotal, "totaliPezzi", true),
          girino: "Nessuno",
        },
      ];

      let total = [];

      total = test.concat(girinoTotal, totalLavoration);
      setMoney(total);
      setIsModalStamp(true);

    });
  };

  useEffect(() => {
    girini.length === 0 && setGirini();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    tipiProdotti.length === 0 && setTipiProdotti();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    allUser.length === 0 && setUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    liste.length === 0 && setListe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    item.length === 0 && setItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isSending) {
      SendToDbProduct();
      setIsSending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSending]);

  useEffect(() => {
    if (selectUser?.id) setProduct(selectUser?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectUser]);

  useEffect(() => {
    if (selectedGirino) setAllUserGirino();
    document.getElementById("lateralChange").value =
      allUserGirino[0]?.id.toString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGirino]);

  const pathname = window.location.pathname;
  const setValueSelect = (e) => {
    setValue("selectedGirino", [Number(e.target.value)]);
  };
  return (
    <>
      <ContainerLateral>
        <CustomSelect
          onChange={(e) => {
            modifiedItem.length === 0 && !changeday
              ? setValueSelect(e)
              : setValue("isModalOpen", true);
          }}
        >
          {girini &&
            girini?.map((val, key) => {
              return (
                <option key={key} value={val.id}>
                  {val.name}
                </option>
              );
            })}
        </CustomSelect>
        {isAdmin ? (
          <CustomSelect
            id="lateralChange"
            onChange={(e) => {
              modifiedItem.length === 0 && !changeday
                ? setValue(
                  "selectUser",
                  allUser.filter(
                    (obj) => obj.id === Number(e.target.value)
                  )[0]
                )
                : setValue("isModalOpen", true);
            }}
          >
            {allUserGirino.map((val, key) => {
              return (
                <option key={key} value={val.id}>
                  {val.name}
                </option>
              );
            })}
          </CustomSelect>
        ) : (
          <></>
        )}
        <ButtonWrapper>
          <ButtonSelect
            selected={pathname === "/Order"}
            onClick={() => {
              modifiedItem.length === 0 && !changeday
                ? navigate("/Order")
                : setValue("isModalOpen", true);
            }}
          >
            {"Ordinazioni"}
          </ButtonSelect>
          <ButtonSelect
            selected={pathname === "/History"}
            onClick={() => {
              modifiedItem.length === 0 && !changeday
                ? navigate("/History")
                : setValue("isModalOpen", true);
            }}
          >
            {"Storico"}
          </ButtonSelect>
          <ButtonSelect onClick={() => PrintTotal()}>{"Stampa"}</ButtonSelect>
          <ButtonSelect
            selected={pathname === "/Product"}
            onClick={() => {
              modifiedItem.length === 0 && !changeday
                ? navigate("/Product")
                : setValue("isModalOpen", true);
            }}
          >
            {"Prodotti"}
          </ButtonSelect>
          <ButtonSelect
            selected={pathname === "/Users"}
            onClick={() => {
              modifiedItem.length === 0 && !changeday
                ? navigate("/Users")
                : setValue("isModalOpen", true);
            }}
          >
            {"Utenti"}
          </ButtonSelect>
          <ButtonSelect
            selected={pathname === "/Girini"}
            onClick={() => {
              modifiedItem.length === 0 && !changeday
                ? navigate("/Girini")
                : setValue("isModalOpen", true);
            }}
          >
            {"Girini"}
          </ButtonSelect>
          <ButtonSelect
            selected={pathname === "/Liste"}
            onClick={() => {
              modifiedItem.length === 0 && !changeday
                ? navigate("/Liste")
                : setValue("isModalOpen", true);
            }}
          >
            {"Liste Prezzi"}
          </ButtonSelect>
          <ButtonSelect
            selected={pathname === "/TipiProdotti"}
            onClick={() => {
              modifiedItem.length === 0 && !changeday
                ? navigate("/TipiProdotti")
                : setValue("isModalOpen", true);
            }}
          >
            {"TipiProdotti"}
          </ButtonSelect>
          <ButtonSelect
            disabled={modifiedItem.length === 0 && !changeday}
            onClick={async () => {
              await resetModify();
              setIsSending(true);
            }}
          >
            {"Salva"}
          </ButtonSelect>
        </ButtonWrapper>
      </ContainerLateral>
      {isModalStamp && (
        <ModalStamp
          girini={girini}
          tipiProdotti={tipiProdotti}
          setIsModalStamp={setIsModalStamp}
          item={item}
          money={money}
          setMoney={setMoney}
          hasPatch={hasPatch}
          setHasPatch={setHasPatch}
          setProduct={setProduct}
          selectUser={selectUser}
        />
      )}
    </>
  );
};
