import React from 'react';
import { useStore } from 'store/store';
import { HeaderTableConfigDays } from './HeaderTable.config';
import { ButtonSelectDay, HeaderTableCntainer } from './style/HeaderTable.style';

export const HeaderTable = ( {isOpen, setIsOpen}) => {
  const setValue = useStore((state) => state.setValue)
  const selectedDay = useStore((state) => state.selectedDay )
  const modifiedItem = useStore((state) => state.modifiedItem )
  const changeday = useStore((state) => state.changeday )

   const handleClick = (val)=>{
    modifiedItem.length === 0 && !changeday 
    ? setValue('selectedDay', val.value) 
    :  setValue('isModalOpen', true) ;
       setTimeout(()=>setIsOpen(false));
   }

  
  return (
    <>
      <HeaderTableCntainer className={isOpen && 'open'}>
        {
          HeaderTableConfigDays.map((val, key) => {
            return (
              <ButtonSelectDay 
// @ts-ignore
              isSelected={val.value === selectedDay }
               key={key} 
               onClick={() => handleClick(val)}>
                {val.text}
              </ButtonSelectDay>
            )
          })
        }
      </HeaderTableCntainer>
    </>
  );
};

