import React from 'react';
import { Text, Document, StyleSheet, Page, View, Font } from '@react-pdf/renderer';
import { render } from '@testing-library/react';


const styles = StyleSheet.create({
    body: {
        flexGrow: 1,
        margin: 20,
        fontSize: '14px',
    },
    row: {
        flexGrow: 4,
        flexDirection: 'row',
        marginTop: '-3px',
    },
    block: {
        flexGrow: 1,
    },
    text: {
        width: '30%',
        textTransform: 'uppercase',
        border: '2px solid black',
        textAlign: 'center',
        height: '25px',
    },
    text2: {
        width: '15%',
        border: '2px solid black',
        textAlign: 'center',
        height: '25px',
        marginLeft: '-3px',
        marginRight: '4%'
    },
    text3: {
        width: '30%',
        textTransform: 'uppercase',
        border: '2px solid black',
        textAlign: 'center',
        height: '25px',
        fontSize: '10px',
        fontWeight: 'light',
    },
    text4: {
        width: '15%',
        border: '2px solid black',
        textAlign: 'center',
        height: '25px',
        marginLeft: '-3px',
        marginRight: '4%',
        fontSize: '10px',
        fontWeight: 'light',
    },
    Title: {
        fontSize: '15px',
        fontWeight: 'bold',
    },
    marginBottom: {
        marginBottom: '10px'
    },
    marginBottomDouble: {
        marginBottom: '10px',
        flexDirection: 'row',
        justifyContent:'space-around'
    },
    marginTopLow: {
        marginTop: '5px'
    },
    marginTopLowColor: {
        marginTop: '5px',
        fontWeight: 'bold',
        fontSize: '14px'
    },
    column: {
        flexDirection: 'column'
    }

})
// Create Document Component
export const MyDocument = (props) => {

    let maxRow = 32;
    let filtered = props.item.filter((obj6) => obj6.isActive)

    function filterByType(xs,prop) {
        let grouped = {};
        for (var i = 0; i < xs.length; i++) {
          var p = xs[i][prop];
          if (!grouped[p]) { grouped[p] = []; }
          grouped[p].push(xs[i]);
        }
        let result = Object.values(grouped);
        result = result.map((obj)=> obj.sort((a, b) => a.sort - b.sort))
        return result;
      }




    let item = filterByType(filtered, 'tipoProdotto')
    const separateColumnFunction = (index, obj) => {
        console.log(obj)
        let count = 0;
        let limitMin = index * (maxRow * 2);
        let limitMax = (index + 1) * (maxRow * 2);
        let a = [];
        let b = [];
        for (var i = 0; i < item.length; i++) {
            for (var l = 0; l < item[i].length; l++) {
                if (l === 0) {
                    count++
                    if (count >= limitMin && count < limitMax) {
                        if (count < maxRow + ((maxRow * 2) * index)) {
                            a.push([props.tipiProdotti.filter((obj2) => Number(obj2.id) == Number(item[i][l].tipoProdotto))?.[0].name, 'TIPO PRODOTTO'])
                        } else {
                            b.push([props.tipiProdotti.filter((obj3) => Number(obj3.id) == Number(item[i][l].tipoProdotto))?.[0].name, 'TIPO PRODOTTO'])
                        }
                    }
                }
                if (count >= limitMin && count < limitMax) {
                    if (count < maxRow + ((maxRow * 2) * index)) {
                        a.push([item[i][l].name, obj.body?.filter((obj3) => Number(obj3.itemId) === Number(item[i][l].id)).length > 0 && obj.body.filter((obj3) => Number(obj3.itemId) === Number(item[i][l].id))?.[0]?.quantità !== 0 ? obj.body.filter((obj3) => Number(obj3.itemId) === Number(item[i][l].id))[0]?.quantità : null])
                    }
                    else {
                        b.push([item[i][l].name, obj.body?.filter((obj3) => Number(obj3.itemId) === Number(item[i][l].id)).length > 0 && obj.body.filter((obj3) => Number(obj3.itemId) === Number(item[i][l].id))?.[0]?.quantità !== 0 ? obj.body.filter((obj3) => Number(obj3.itemId) === Number(item[i][l].id))[0]?.quantità : null])
                    }
                }
                if (l + 1 === item[i].length) {
                    count++
                    if (count >= limitMin && count < limitMax) {
                        if (count < maxRow + ((maxRow * 2) * index)) {
                            a.push(['Totale', obj.totaliPezzi.filter((obj2) => Number(obj2.tipoProdotto) === Number(item[i][l].tipoProdotto)).length > 0 ? obj.totaliPezzi.filter((obj2) => Number(obj2.tipoProdotto) === Number(item[i][l].tipoProdotto))[0]?.totale : 0])
                        } else {
                            b.push(['Totale', obj.totaliPezzi.filter((obj2) => Number(obj2.tipoProdotto) === Number(item[i][l].tipoProdotto)).length > 0 ? obj.totaliPezzi.filter((obj2) => Number(obj2.tipoProdotto) === Number(item[i][l].tipoProdotto))[0]?.totale : 0])
                        }
                        if (i +1 !== item.length) {
                            if (count < maxRow + ((maxRow * 2) * index)) {
                                a.push([null,null])
                            } else {
                                b.push([null,null])
                            }
                        }

                    }
                }
                count++
            }

        }
        b.push(['Totale Da Pagare', obj.totaleSoldi + ' €']);
        return (
            <>
                {
                    a.map((obj, indx) => {
                        return (

                            <View style={styles.row}>
                                <View style={styles.text3}>
                                    {obj[0] === 'Totale' || obj[1] === 'TIPO PRODOTTO' ?
                                        <Text style={styles.marginTopLowColor}>{obj[0]}</Text>
                                        :
                                        <Text style={styles.marginTopLow}>{obj[0]}</Text>
                                    }
                                </View>
                                <View style={styles.text4}>
                                    <Text style={styles.marginTopLow}>{obj[1] === 'TIPO PRODOTTO' ? '' :  obj[1]}</Text>
                                </View>
                                {b.length > 0 && b[indx] !== undefined && <>
                                    <View style={styles.text3}>
                                        {b?.[indx]?.[0] === 'Totale' || b?.[indx]?.[0] === 'Totale Da Pagare' || b?.[indx]?.[1] === 'TIPO PRODOTTO' ?
                                            <Text style={styles.marginTopLowColor}>{b?.[indx]?.[0]}</Text>
                                            :
                                            <Text style={styles.marginTopLow}>{b?.[indx]?.[0]}</Text>
                                        }
                                    </View>
                                    <View style={styles.text4}>
                                        <Text style={styles.marginTopLow}>{b?.[indx]?.[1] === 'TIPO PRODOTTO' ? '' :  b?.[indx]?.[1]}</Text>
                                    </View>
                                </>}
                            </View>


                        )
                    }
                    )

                }
            </>
        )

    }
    let arrayLen = Math.ceil((filtered.length + item.length * 2) / (maxRow * 2))
 
    return (
        <Document>
            {props.money.map((obj) => {
                return (
                    Array(arrayLen).fill().map((_, i) => {
                        return (
                            <>
                                <Page size="A4" style={styles.body}>
                                    <View style={styles.marginBottom}>
                                        <Text style={styles.Title}>{'PASTICCERIA DASA s.r.l ~ Gastronomia e Catering ~ Tel. 3474884888 Alessandro'}</Text>
                                    </View>
                                    <View style={styles.marginBottomDouble}>
                                        <Text>{'Cliente: ' + obj.name}{obj.girino === 'Nessuno' ? '  Data:' + props.date : ''}</Text>
                                        {obj.girino !== 'Nessuno' && <Text>{'Girino: ' + props.girini.filter((obj2)=> obj2.id === obj.girino )[0]?.name }</Text>}
                                    </View>
                                    <View style={styles.column}>
                                        <View style={styles.row}>
                                            <View style={styles.text}>
                                                <Text style={styles.marginTopLow}>Prodotto</Text>
                                            </View>
                                            <View style={styles.text2}>
                                                <Text style={styles.marginTopLow}>Q.TA</Text>
                                            </View>
                                            <View style={styles.text}>
                                                <Text style={styles.marginTopLow}>Prodotto</Text>
                                            </View>
                                            <View style={styles.text2}>
                                                <Text style={styles.marginTopLow}>Q.TA</Text>
                                            </View>
                                        </View>

                                        {separateColumnFunction(i, obj)}
                                    </View>
                                </Page>
                            </>
                        )
                    }))
            })}
        </Document>

    )
}