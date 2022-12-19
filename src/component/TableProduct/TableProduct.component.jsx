import { ProductCard } from 'component/ProductCard/ProductCard.component';
import React, { useEffect } from 'react';
import { useStore } from 'store/store';
import { Column, ContainerDivFull, ContainerDoubleTable, DayH1, Row } from './style/TableProduct.style';
import Toggle from 'react-toggle'
import { HeaderTable } from './partials/HeaderTable/HeaderTable.component';
import { Overlay } from 'style/Overlay.style';
import { HeaderTableConfigDays } from './partials/HeaderTable/HeaderTable.config';
import { ContainerToggle } from 'component/Users/style/Users.style';

export const TableProduct = () => {
  const item = useStore((state) => state.item)
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
          {selectedDayOrder.stato === 'aperto' && item.map((val, key) => {
            if (val.isActive) {
              const isPresent = selectedDayOrder.ordine.find((obj) => obj.itemId === val.id)
              return (
                <Column>
                  <ProductCard key={Math.random()} name={val.name} isPresent={isPresent} itemId={val.id} quantità={isPresent ? isPresent.quantità : 0} />
                </Column>
              )
            } else return <></>
          })}
        </Row>
      </ContainerDoubleTable>
      {isOpen && <Overlay onClick={() => setIsOpen(false)} />}
    </ContainerDivFull>
  );
};

