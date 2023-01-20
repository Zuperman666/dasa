import { ProductCard } from "component/ProductCard/ProductCard.component";
import React, { useEffect } from "react";
import { useStore } from "store/store";
import {
  Column,
  ColumnSpecial,
  ContainerDivFull,
  ContainerDoubleTable,
  DayH1,
  Row,
  RowTitle,
} from "./style/TableProduct.style";
import Toggle from "react-toggle";
import { HeaderTable } from "./partials/HeaderTable/HeaderTable.component";
import { Overlay } from "style/Overlay.style";
import { HeaderTableConfigDays } from "./partials/HeaderTable/HeaderTable.config";
import { ContainerToggle } from "component/Users/style/Users.style";
import axios from "axios";

export const TableProduct = () => {
  const item = useStore((state) => state.item);
  const tipiProdotti = useStore((state) => state.tipiProdotti);
  const selectedDay = useStore((state) => state.selectedDay);
  const closeDay = useStore((state) => state.closeDay);
  const changeday = useStore((state) => state.changeday);
  const setValue = useStore((state) => state.setValue);
  const temporary = useStore((state) => state.temporary);
  const setTemporary = useStore((state) => state.setTemporary);
  const setSelectedDayOrder = useStore((state) => state.setSelectedDayOrder);
  const selectedDayOrder = useStore((state) => state.selectedDayOrder);
  const setProduct = useStore((state) => state.setProduct);
  const userProduct = useStore((state) => state.userProduct);
  const [isOpen, setIsOpen] = React.useState(false);
  const today = HeaderTableConfigDays.filter((day) =>
    selectedDay !== "" ? day.value === selectedDay : day.value === "default"
  );
  // @ts-ignore
  useEffect(() => {
    setSelectedDayOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay, userProduct]);

  if (!selectedDayOrder) return <>{"Sta caricando ..."}</>;

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
  const handleToggle = async () => {
    await axios
      .patch(`http://localhost:3001/usuallyOrder/${userProduct.id}`, {
        closeDay: closeDay.some((day) => day === selectedDay)
          ? [...closeDay.filter((day) => day !== selectedDay)]
          : [...closeDay, selectedDay],
      })
      .then(() => setProduct(userProduct.id));
  };

  return (
    <ContainerDivFull>
      <HeaderTable isOpen={isOpen} setIsOpen={setIsOpen} />
      <DayH1 onClick={() => setIsOpen(true)}>{today[0].text}</DayH1>
      <ContainerToggle>
        <>
          {selectedDayOrder &&
          !closeDay.some((closedDay) => closedDay === selectedDay) ? (
            <span>Giorno Abilitato</span>
          ) : (
            <span>Giorno Disabilitato</span>
          )}
          <Toggle
            icons={false}
            checked={
              selectedDayOrder &&
              !closeDay.some((closedDay) => closedDay === selectedDay)
            }
            onChange={handleToggle}
          />
          <label htmlFor="temp"> Temporaneo? </label>
          <input
            type="checkbox"
            id="temp"
            name="temp"
            value="temp"
            checked={temporary}
            onChange={() => setTemporary()}
          />
        </>
      </ContainerToggle>

      <ContainerDoubleTable>
        <Row>
          {!closeDay.some((closedDay) => closedDay === selectedDay) &&
            filterByType().map((val, key) => {
              return (
                <>
                  <RowTitle>
                    {
                      tipiProdotti.filter(
                        (obj) => Number(obj.id) === Number(val[0].tipoProdotto)
                      )?.[0]?.name
                    }
                  </RowTitle>
                  {val.map((vali, keys) => {
                    if (vali.isActive) {
                      const isPresent = selectedDayOrder[0]?.order?.find(
                        (obj) => obj.itemId === vali.id
                      );
                      return (
                        <>
                          <Column>
                            <ProductCard
                              key={Math.random()}
                              name={vali.name}
                              isPresent={isPresent}
                              itemId={vali.id}
                              quantità={
                                isPresent?.quantità ||
                                userProduct?.defaultOrder.find(
                                  (obj) => obj.itemId === vali.id
                                ).quantità
                              }
                            />
                          </Column>
                          {keys + 1 === val.length && val.length % 2 !== 0 ? (
                            <ColumnSpecial></ColumnSpecial>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                    } else
                      return (
                        <>
                          {keys + 1 === val.length && val.length % 2 !== 0 ? (
                            <ColumnSpecial></ColumnSpecial>
                          ) : (
                            <></>
                          )}
                        </>
                      );
                  })}
                </>
              );
            })}
        </Row>
      </ContainerDoubleTable>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
    </ContainerDivFull>
  );
};
