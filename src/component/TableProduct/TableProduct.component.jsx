import { ProductCard } from 'component/ProductCard/ProductCard.component';
import React, { useEffect } from 'react';
import { useStore } from 'store/store';
import { Column, ContainerDivFull, ContainerDoubleTable, DayH1, Row, RowTitle } from './style/TableProduct.style';
import Toggle from 'react-toggle'
import { HeaderTable } from './partials/HeaderTable/HeaderTable.component';
import { Overlay } from 'style/Overlay.style';
import { HeaderTableConfigDays } from './partials/HeaderTable/HeaderTable.config';
import { ContainerToggle } from 'component/Users/style/Users.style';

export const TableProduct = () => {
  const item = useStore((state) => state.item)
  const tipiProdotti = useStore((state) => state.tipiProdotti)
  const selectedDay = useStore((state) => state.selectedDay)
  const changeOpen = useStore((state) => state.changeOpen)
  const changeday = useStore((state) => state.changeday)
  const setValue = useStore((state) => state.setValue)
  const setSelectedDayOrder = useStore((state) => state.setSelectedDayOrder)
  const selectedDayOrder = useStore((state) => state.selectedDayOrder)
  const userProduct = useStore((state) => state.userProduct)
  const [isOpen, setIsOpen] = React.useState(false);
  const today = HeaderTableConfigDays.filter((day) => day.value === selectedDay);
  useEffect(() => {
    setSelectedDayOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDay, userProduct]);

  if (!selectedDayOrder) return (
    <>{'Sta caricando ...'}</>
  )

  function filterByType() {
    let prop = 'tipoProdotto';
    let xs = item.filter((obj6) => obj6.isActive)
    let grouped = {};
    for (var i = 0; i < xs.length; i++) {
      var p = xs[i][prop];
      if (!grouped[p]) { grouped[p] = []; }
      grouped[p].push(xs[i]);
    }
    return Object.values(grouped);;
  }

  return (
    <ContainerDivFull>
      <HeaderTable isOpen={isOpen} setIsOpen={setIsOpen} />
      <DayH1 onClick={() => setIsOpen(true)}>{today[0].text}</DayH1>
      <ContainerToggle> <div> {selectedDayOrder && selectedDayOrder?.stato === 'aperto' ? <span>Giorno Abilitato</span> : <span>Giorno Disabilitato</span>}</div>
        <Toggle
          icons={false}
          checked={selectedDayOrder && selectedDayOrder?.stato === 'aperto'}
          onChange={() => { changeOpen(); setValue('changeday', !changeday) }} /></ContainerToggle>

      <ContainerDoubleTable>
        <Row>
          {selectedDayOrder.stato === 'aperto' && filterByType().map((val, key) => {
            return (
              <>
              <RowTitle>{tipiProdotti.filter((obj)=> Number(obj.id) === Number(val[0].tipoProdotto) )?.[0]?.name}</RowTitle>
             { val.map((vali, keys) => {
                if (vali.isActive) {
                  const isPresent = selectedDayOrder.ordine.find((obj) => obj.itemId === vali.id)
                  return (
                    <Column>
                      <ProductCard key={Math.random()} name={vali.name} isPresent={isPresent} itemId={vali.id} quantità={isPresent ? isPresent.quantità : 0} />
                    </Column>
                  )
                } else return <></>
              })}
              </>
              )
          })

          }
        </Row>
      </ContainerDoubleTable>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
    </ContainerDivFull>
  );
};

