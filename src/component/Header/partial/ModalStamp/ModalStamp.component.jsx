import { PDFDownloadLink } from '@react-pdf/renderer';
import { ModalAlertBody, ModalAlertContainer, ModalAlertFooter, ModalAlertText } from 'component/ModalAlert/style/ModalAlert.style';
import { MyDocument } from 'component/PdfRender/PdfRender.component';
import React from 'react';


export const ModalStamp = (props) => {

  return (
    <>
      <ModalAlertContainer>
        <ModalAlertBody>
          <ModalAlertText>
            <PDFDownloadLink document={<MyDocument money={props.money} item={props.item}/>} fileName="somename.pdf">
              {({ blob, url, loading, error }) =>
                loading ? 'Loading document...' : 'Download now!'
              }
            </PDFDownloadLink>
          </ModalAlertText>
        </ModalAlertBody>
        <ModalAlertFooter>
          <button onClick={() => (props.setIsModalStamp(false),props.setMoney(''))} >{'Ok'}</button>
        </ModalAlertFooter>
      </ModalAlertContainer>
    </>
  );
};

