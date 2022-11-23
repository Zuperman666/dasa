import React from 'react';
import { useStore } from 'store/store';
import { HeaderTableConfigDays } from './HeaderTable.config';
import { ButtonSelectDay, HeaderTableCntainer } from './style/HeaderTable.style';

export const HeaderTable = () => {
  const setValue = useStore((state) => state.setValue)
  const selectedDay = useStore((state) => state.selectedDay )
  const modifiedItem = useStore((state) => state.modifiedItem )
  const changeday = useStore((state) => state.changeday )


   


  return (
    <>

      <HeaderTableCntainer>
        {
          HeaderTableConfigDays.map((val, key) => {
            return (
              <ButtonSelectDay 
// @ts-ignore
              isSelected={val.value ===selectedDay } key={key} onClick={() => {modifiedItem.length === 0 && !changeday ? setValue('selectedDay', val.value) :  setValue('isModalOpen', true) }}>
                {val.text}
              </ButtonSelectDay>
            )
          })
        }

      </HeaderTableCntainer>
    </>
  );
};

