import axios from 'axios';
import React from 'react';
import { useStore } from 'store/store';
import { ModalAlertBody, ModalAlertContainer, ModalAlertFooter, ModalAlertText } from '../../ModalAlert/style/ModalAlert.style';

export const ModalAlertTemp = (props) => {

    const setValue = useStore((state) => state.setValue);
    const setProduct = useStore((state) => state.setProduct);
    const selectUser = useStore((state) => state.selectUser);
    const handleReset = async () => {
        setValue('selectedTempOrder', [])
        await axios.patch(`http://localhost:3001/usuallyOrder/${selectUser.id}`, {
            tempOrder: [],
        });
        props.setModalAlertTemp(false)
        setProduct(selectUser.id);
    }

    return (
        <>
            <ModalAlertContainer>
                <ModalAlertBody>
                    <ModalAlertText>
                        {'Hai fatto già delle modifiche temporanee.Eliminarle?'}
                    </ModalAlertText>
                </ModalAlertBody>
                <ModalAlertFooter>
                    <button onClick={() => handleReset()} >{'Si'}</button>
                </ModalAlertFooter>
                <ModalAlertFooter>
                    <button onClick={() => props.setModalAlertTemp(false)} >{'No'}</button>
                </ModalAlertFooter>
            </ModalAlertContainer>
        </>
    );
};