import React from 'react';
import { useStore } from 'store/store';
import { ModalAlertBody, ModalAlertContainer, ModalAlertFooter, ModalAlertText } from './style/ModalAlert.style';

export const ModalAlert = (props) => {

    const setValue = useStore((state) => state.setValue)
    
  return (
    <>
       <ModalAlertContainer>
        <ModalAlertBody>
            <ModalAlertText>
            {'Ci sono delle modifiche da salvare. Salvare prima di spostarsi'}
            </ModalAlertText>
        </ModalAlertBody>
        <ModalAlertFooter> 
            <button onClick={() => setValue('isModalOpen', false)} >{'Ok'}</button>
        </ModalAlertFooter>
       </ModalAlertContainer>
    </>
  );
};

