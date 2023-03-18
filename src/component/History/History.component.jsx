// @ts-nocheck
import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";
import { HistoryCard } from "./partial/HistoryCard.component";
import "react-datepicker/dist/react-datepicker.css";
import { useStore } from "store/store";
import { ContainerButton, ContainerDatePicker, ContainerHistory, TitleDatePicker } from "./style/History.style";
import { Column } from "component/TableProduct/style/TableProduct.style";

export const HistoryPage = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const history = useStore((state) => state.history);
  const allHistory = useStore((state) => state.allHistory);
  const setValue = useStore((state) => state.setValue);
  const selectUser = useStore((state) => state.selectUser)

  const sumDay = (filterBetween) => {
    let testResult = []
    for (let i = 0; i < filterBetween.length; i++) {
      for (let a = 0; a < filterBetween[i].fullOrder.relativeOrder.length; a++) {
        if (
          testResult.find(
            (obj) => Number(obj["itemId"]) == Number(filterBetween[i].fullOrder.relativeOrder[a]["itemId"])
          )
        ) {
          const target = testResult.find(
            (obj) => Number(obj["itemId"]) == Number(filterBetween[i].fullOrder.relativeOrder[a]["itemId"])
          );
          const targetIndex = testResult.findIndex(
            (obj) => Number(obj["itemId"]) == Number(filterBetween[i].fullOrder.relativeOrder[a]["itemId"])
          );
          let newValue;
          newValue = {
            ...target,
            quantità: target.quantità + filterBetween[i].fullOrder.relativeOrder[a].quantità,
          };
          testResult[targetIndex] = newValue;
        } else {
          testResult.push(filterBetween[i].fullOrder.relativeOrder[a]);
        }
      }
    }
    return testResult;
  }

  const findHistory = async () => {
    let newEndData = moment(startDate).format("MM/DD/yyyy")
    let newEndDate = moment(endDate).format("MM/DD/yyyy")
    let resp = await axios.get(`http://localhost:3001/history/?day_gte=${newEndData}&day_lte=${newEndDate}`);
    let filterDate = () => {
      let filterBetween = resp.data.filter((obj) =>
        obj.fullOrder.filter((obj2) => obj2.userId === selectUser.id)
        [0])
      setValue('allHistory', filterBetween)
      filterBetween = filterBetween.map((obj) => ({ "id": obj.id, "day": obj.day, "fullOrder": obj.fullOrder.filter((obj2) => obj2.userId === selectUser.id)[0] }))
      if (filterBetween) {
        let result = sumDay(filterBetween)
        let totalToPay = filterBetween.map((obj) => obj.fullOrder.daPagare).reduce((previous, next) => {
          return previous + next;
        })
        let newObj = { 'id': selectUser.id, "daPagareTotale": totalToPay, 'fullOrder': result }
        return newObj
      } else {
        return {}
      }
    }

    const result = filterDate()
    setValue('history', result)
  }
  const resetFilter = () => {
    setStartDate(new Date())
    setEndDate(new Date())
    setValue('history', {})
    setValue('allHistory', {})
  }
  const payAll = async () => {
    for (let i = 0; i < allHistory.length; i++) {
      let newPay = allHistory[i].fullOrder.map((obj) => ({ ...obj, "daPagare": obj.userId === selectUser.id ? 0 : obj.daPagare }))
      await axios.patch(`http://localhost:3001/history/${allHistory[i].id}`, {
        fullOrder: newPay
      });
    }
    findHistory()
  }

  return (
    <>
      <ContainerHistory>
        <ContainerDatePicker>
          <div>
            <TitleDatePicker>Dal:</TitleDatePicker>
            <DatePicker maxDate={new Date()} dateFormat="dd/MM/yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div>
            <TitleDatePicker>Al:</TitleDatePicker>
            <DatePicker maxDate={new Date()} dateFormat="dd/MM/yyyy" selected={endDate} onChange={(date) => setEndDate(date)} />
          </div>

        </ContainerDatePicker>
        <ContainerButton>
          <button onClick={() => findHistory()}>{'Cerca'}</button>
          <button>{'Stampa fattura'}</button>
          <button onClick={() => payAll()}>{'Paga questi giorni'}</button>
          <button onClick={(() => resetFilter())}>{'resettaFiltri'}</button>
        </ContainerButton>
        {'DaPagare:'}
        {typeof history.daPagareTotale !== Number
          ? history.daPagareTotale
          : ''}
        <div>
          {history && history.fullOrder?.length > 0 ?
            history.fullOrder.map((obj) =>
            <Column>
              <HistoryCard itemId={obj.itemId} quantità={obj.quantità} />
            </Column>
            )
            :


            "Selezionare dei Giorni ..."}

        </div>
      </ContainerHistory>
    </>);
};
