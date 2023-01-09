import { PDFDownloadLink } from '@react-pdf/renderer';
import { LinkModify, ModalAlertBody, ModalAlertContainer, ModalAlertFooter, ModalAlertText } from 'component/ModalAlert/style/ModalAlert.style';
import { MyDocument } from 'component/PdfRender/PdfRender.component';
import moment from 'moment';
import React from 'react';


export const ModalStamp = (props) => {
  let namePdf = 'Produzione_Cornetti_' + moment(new Date()).format("DD/MM/YYYY")
  return (
    <>
      <ModalAlertContainer>
        <ModalAlertBody>
          <ModalAlertText>
            <LinkModify document={<MyDocument girini={props.girini} tipiProdotti={props.tipiProdotti} money={props.money} item={props.item}/>} fileName={namePdf}>
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : namePdf
              }
            </LinkModify>
          </ModalAlertText>
        </ModalAlertBody>
        <ModalAlertFooter>
          <button onClick={() => (props.setIsModalStamp (false),props.setMoney(''))} >{'Ok'}</button>
        </ModalAlertFooter>
      </ModalAlertContainer>
    </>
  );
};

