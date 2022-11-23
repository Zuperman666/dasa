import { Page, View } from '@react-pdf/renderer';
import styled from 'styled-components';

export const PageContainer = styled(Page)`
margin:20px;
display: flex;
align-items: center;
flex-direction: column;
`

export const ViewTitle = styled(View)`
display: flex;
align-items: center;
margin-top:20px;
width:50%;
flex-direction: row;

`


export const ViewTitleContainer = styled(View)`
flexGrow: 1,
    flexDirection: 'row',

`


