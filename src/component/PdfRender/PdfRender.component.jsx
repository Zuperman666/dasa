import React from 'react';
import { Text, Document, StyleSheet, Page, View, Font } from '@react-pdf/renderer';


const styles = StyleSheet.create({
    body: {
        flexGrow: 1,
        margin:20,
        fontSize: '12px',
    },
    
    row: {
        flexGrow: 4,
        flexDirection: 'row',
    },
    block: {
        flexGrow: 1,
    },
    text: {
        width: '30%',
        border: '2px solid black',
        textAlign:'center',
        height:'20px',
    },
    text2: {
        width: '15%',
        border: '2px solid black',
        textAlign:'center',
        height:'20px',
        marginLeft:'-3px',
        marginRight:'4%'
    },
    Title: {
        fontSize: '15px',
        fontWeight: 'bold',
    },
    marginBottom:{
        marginBottom:'10px'
    }
   
})
// Create Document Component
export const MyDocument = (props) => {

    return (
        <Document>
            {props.money.map((obj) => {
                return (
                    <Page size="A4" style={styles.body}>
                         <View style={styles.marginBottom}>
                            <Text style={styles.Title}>{'PASTICCERIA DASA s.r.l ~ Gastronomia e Catering ~ Tel. 3474884888 Alessandro'}</Text>
                        </View>
                        <View style={styles.marginBottom}>
                            <Text>{'Cliente: ' + obj.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <View  style={styles.text}>
                                <Text>Descrizione Prodotto</Text>
                            </View>
                            <View style={styles.text2}>
                                <Text >Q.TA</Text>
                            </View>
                            <View style={styles.text}>
                                <Text >Descrizione Prodotto</Text>
                            </View>
                            <View style={styles.text2}>
                                <Text >Q.TA</Text>
                            </View>
                        </View>
                        <View>
                             <View  style={styles.text}>
                                <Text>Descrizione Prodotto</Text>
                            </View>
                            <View  style={styles.text}>
                                <Text>Descrizione Prodotto</Text>
                            </View>
                        </View>
                    </Page>
                )
            }
            )}
        </Document>

    )
}