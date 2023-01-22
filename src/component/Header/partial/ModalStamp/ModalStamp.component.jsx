import { PDFDownloadLink } from '@react-pdf/renderer';
import axios from 'axios';
import { LinkModify, ModalAlertBody, ModalAlertContainer, ModalAlertFooter, ModalAlertText } from 'component/ModalAlert/style/ModalAlert.style';
import { MyDocument } from 'component/PdfRender/PdfRender.component';
import moment from 'moment';
import React from 'react';


export const ModalStamp = (props) => {
  let namePdf = 'Produzione_Cornetti_' + moment(new Date()).format("DD/MM/YYYY")
  const handleClick = async (reset) => {
    props.setIsModalStamp(false);
    props.setMoney('')
    if (reset) {
      props.hasPatch.map(async (obj) =>
        await axios.patch(`http://localhost:3001/usuallyOrder/${obj.id}`, {
          tempOrder: []
        })
      )
      props.setHasPatch('')
      props.setProduct(props.selectUser.id);
    }
  }


  return (
    <>
      <ModalAlertContainer>
        <ModalAlertBody>
          <ModalAlertText>
            <LinkModify document={<MyDocument girini={props.girini} tipiProdotti={props.tipiProdotti} money={props.money} item={props.item} />} fileName={namePdf}>
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : namePdf
              }
            </LinkModify>
          </ModalAlertText>
        </ModalAlertBody>
        <ModalAlertFooter>
          <button onClick={() => (handleClick(false))} >{'Chiudi'}</button>
          <button onClick={() => (handleClick(true))} >{'Chiudi e svuota'}</button>
        </ModalAlertFooter>
      </ModalAlertContainer>
    </>
  );
};

