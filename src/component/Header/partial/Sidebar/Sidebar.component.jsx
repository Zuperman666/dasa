import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from 'store/store';
import { ButtonSidebarSelect, SHEader, SidebarContainer } from './style/Sidebar.style';
import { ReactComponent as CloseIcon } from 'images/icons/circled_X.svg';
import { CustomSelect } from 'style/Select.style';
import { Overlay } from 'style/Overlay.style';
import moment from 'moment';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const navigate = useNavigate();
    const [isSending, setIsSending] = useState(false);
    const [isModalStamp, setIsModalStamp] = useState(false);
    const [money, setMoney] = useState('');
    const setTipiProdotti = useStore((state) => state.setTipiProdotti);
    const tipiProdotti = useStore((state) => state.tipiProdotti);
    const setValue = useStore((state) => state.setValue);
    const modifiedItem = useStore((state) => state.modifiedItem);
    const save = useStore((state) => state.save);
    const resetModify = useStore((state) => state.resetModify);
    const isAdmin = useStore((state) => state.isAdmin);
    const allUser = useStore((state) => state.allUser);
    const changeday = useStore((state) => state.changeday);
    const idStore = useStore((state) => state.idStore);
    const userProduct = useStore((state) => state.userProduct);
    const setUsers = useStore((state) => state.setUsers);
    const setItem = useStore((state) => state.setItem);
    const selectUser = useStore((state) => state.selectUser);
    const setProduct = useStore((state) => state.setProduct);
    const selectedDay = useStore((state) => state.selectedDay);
    const item = useStore((state) => state.item);
    const setGirini = useStore((state) => state.setGirini);
    const selectedGirino = useStore((state) => state.selectedGirino);
    const setAllUserGirino = useStore((state) => state.setAllUserGirino);
    const allUserGirino = useStore((state) => state.allUserGirino);
    const girini = useStore((state) => state.girini);


    const SendToDbProduct = async () => {
        await axios.patch(`http://localhost:3001/usuallyOrder/${idStore.id}`, { body: userProduct })
    }
    const PrintTotal = async () => {

        const resp = await axios.get('http://localhost:3001/usuallyOrder').then((resp) => resp)
        const filteredData = resp?.data?.map((obj) => ({ 'userId': obj.userId, 'body': obj.body.filter((obj2) => obj2.stato === 'aperto' && obj2.day === moment(new Date()).format('dddd')).map((obj4) => obj4.ordine.filter((obj5) => item.filter((obj6) => obj6.id === obj5.itemId)[0]?.isActive)) })).filter((obj) => obj.body.length > 0)
        const money = filteredData.map((obj) => ({
          'userId': obj.userId, 'body': obj.body, 'totaliPezzi': tipiProdotti.map((obj6) => ({
            'tipoProdotto': obj6.id, 'totale': obj?.body?.[0] ? obj.body[0].filter((obj7) => item.filter((obj8) => obj8.id === obj7.itemId)[0].tipoProdotto === obj6.id).map((obj9) => obj9.quantità).reduce((partialSum, a) => partialSum + a, 0) : 0
          })), 'totaleSoldi': obj.body ? obj?.body[0]?.map((obj2) => item.filter((obj3) => obj3.id === obj2.itemId)[0].price * obj2.quantità).reduce((previous, next) => {
            return previous + next;
          })?.toFixed(2) : 0
        }))
        let moneyName = money.map((obj) => ({ 'name': allUser.filter((obj2) => obj2.id === obj.userId)[0].name, 'body': obj.body, 'totaleSoldi': obj.totaleSoldi, 'totaliPezzi': obj.totaliPezzi, 'girino': allUser.filter((obj2) => obj2.id === obj.userId)[0].girino }))
        /* await axios.post(`http://localhost:3001/history`, { 
           ordini: money,
           data: moment(new Date()).format()
         })*/
        let testReduce = (objTotal, params, isAdmin) => {
          let valueObj = params === 'itemId' ? 'itemId' : 'tipoProdotto';
          let result = []
          let Check;
          if (!isAdmin) {
            let arrayFull = moneyName.filter((obj2) => obj2.girino === objTotal.id).length > 0
            if (arrayFull) {
              if (params === 'itemId') {
                Check = moneyName.filter((obj2) => obj2.girino === objTotal.id).map(obj => obj?.body[0])
              } else {
                Check = moneyName.filter((obj2) => obj2.girino === objTotal.id).map(obj => obj[params])
              }
            } else {
              return []
            }
          } else {
            if (params === 'itemId') {
              Check = objTotal.map(obj => obj?.body[0].ordine)
            } else {
              Check = objTotal.map(obj => obj[params])
            }
          }
          for (let i = 0; i < Check.length; i++) {
            for (let a = 0; a < Check[i].length; a++) {
              if (result.find(obj => Number(obj[valueObj]) == Number(Check[i][a][valueObj]))) {
                const target = result.find((obj) => obj[valueObj] === Check[i][a][valueObj]);
                let newValue;
                if (params === 'itemId') {
                  newValue = { ...target, 'quantità': target.quantità + Check[i][a].quantità }
                } else {
                  newValue = { ...target, 'totale': target.totale + Check[i][a].totale }
                }
                Object.assign(target, newValue);
              }
              else {
                result.push(Check[i][a])
              }
            }
          }
          return result
        }
        let girinoTotal = girini.map((obj) => ({ 'name': 'Girino ' + obj.name, 'body': [{ 'ordine': testReduce(obj, 'itemId') }], 'totaleSoldi': moneyName.filter((obj2) => obj2.girino === obj.id).length > 0 ? moneyName.filter((obj2) => obj2.girino === obj.id).map(obj => obj.totaleSoldi).reduce((partialSum, a) => Number(partialSum) + Number(a), 0) : 0, 'totaliPezzi': testReduce(obj, 'totaliPezzi'), 'girino': obj.id }))
    
    
    
    
        let totalLavoration = [{ 'name': 'Lista Produzione', 'body': [{ 'ordine': testReduce(girinoTotal, 'itemId', true) }], 'totaleSoldi': girinoTotal.map(obj => obj.totaleSoldi).reduce((partialSum, a) => Number(partialSum) + Number(a), 0), 'totaliPezzi': testReduce(girinoTotal, 'totaliPezzi', true), 'girino': 'Nessuno' }]
        let total = []
        total= moneyName.concat(totalLavoration)
        total= total.concat(girinoTotal)
        setMoney(moneyName)
        setIsModalStamp(true)
      }


    useEffect(() => {
        girini.length === 0 && setGirini()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        tipiProdotti.length === 0 && setTipiProdotti()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        allUser.length === 0 && setUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);





    useEffect(() => {
        item.length === 0 && setItem()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isSending) {
            SendToDbProduct()
            setIsSending(false)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSending]);

    useEffect(() => {
        if (selectUser?.id)
            setProduct(selectUser?.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectUser]);

    useEffect(() => {
        if (selectedGirino)
            setAllUserGirino()
            document.getElementById("lateralChangeBar").value = allUserGirino[0]?.id.toString();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedGirino]);


    const handleButtonSelectClick = (path) => {
        modifiedItem.length === 0 && !changeday ?
            navigate(`/${path}`)
            :
            setValue('isModalOpen', true);
        setSidebarOpen(false)
    }



    return (
        <>
            <SidebarContainer className={sidebarOpen && 'open'}>
                <SHEader>
                    <div>{'Logo'}</div>
                    <CloseIcon onClick={() => setSidebarOpen(false)} />
                </SHEader>
                <div style={{ display: 'flex', minWidth: '200px' }}>
                    <CustomSelect onChange={(e) => {
                        modifiedItem.length === 0 && !changeday
                            ? setValue('selectedGirino', [Number(e.target.value)])
                            : setValue('isModalOpen', true)
                    }}>
                        {girini && girini?.map((val, key) => {
                            return (
                                <option key={key} value={val.id}>{val.name}</option>
                            )
                        }
                        )}
                    </CustomSelect>
                    {isAdmin ?
                        <CustomSelect
                            id="lateralChangeBar"
                            onChange={(e) => {
                                modifiedItem.length === 0 && !changeday ?
                                    setValue('selectUser', allUser.filter(obj => obj.id === Number(e.target.value))[0])
                                    : setValue('isModalOpen', true)
                            }}>
                            {allUserGirino.map((val, key) => {
                                return (
                                    <option key={key} value={val.id}>{val.name}</option>
                                )
                            }
                            )}
                        </CustomSelect> :
                        <></>}
                </div>



                <ButtonSidebarSelect
                    onClick={() => handleButtonSelectClick('Order')}>{'Ordinazioni'}</ButtonSidebarSelect>
                <ButtonSidebarSelect onClick={() => handleButtonSelectClick('History')}>{'Storico'}</ButtonSidebarSelect>
                <ButtonSidebarSelect onClick={() => PrintTotal()}>{'Stampa'}</ButtonSidebarSelect>
                <ButtonSidebarSelect onClick={() => handleButtonSelectClick('Product')}>{'Prodotti'}</ButtonSidebarSelect>
                <ButtonSidebarSelect onClick={() => handleButtonSelectClick('Users')}>{'Utenti'}</ButtonSidebarSelect>
                <ButtonSidebarSelect onClick={() => handleButtonSelectClick('Girini')}>{'Girini'}</ButtonSidebarSelect>
                <ButtonSidebarSelect onClick={() => handleButtonSelectClick('TipiProdotti')}>{'TipiProdotti'}</ButtonSidebarSelect>

            </SidebarContainer>

        </>
    )
}

export default Sidebar