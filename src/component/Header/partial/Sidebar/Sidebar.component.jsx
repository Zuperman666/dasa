import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useStore } from 'store/store';
import { ButtonSidebarSelect, SHEader, SidebarContainer } from './style/Sidebar.style';
import { ReactComponent as CloseIcon } from 'images/icons/circled_X.svg';
import { CustomSelect } from 'style/Select.style';
import { Overlay } from 'style/Overlay.style';

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
        const filteredData = resp?.data?.map((obj) => ({ 'userId': obj.userId, 'body': obj.body.filter((obj2) => obj2.stato === 'aperto' && obj2.day === selectedDay) })).filter((obj) => obj.body.length > 0)
        const money = filteredData.map((obj) => ({
            'userId': obj.userId, 'body': obj.body, 'totale':obj.body[0].ordine.map((obj2) => item.filter((obj3) => obj3.id === obj2.itemId)[0].price * obj2.quantità).reduce((previous, next) => {
                return previous + next;
            }).toFixed(2)
        }))
        const moneyName = money.map((obj) => ({ 'name': allUser.filter((obj2) => obj2.id === obj.userId)[0].name, 'body': obj.body, 'totale': obj.totale }))
        /* await axios.post(`http://localhost:3001/history`, { 
           ordini: money,
           data: moment(new Date()).format()
         })*/
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

                            onChange={(e) => {
                                modifiedItem.length === 0 && !changeday ?
                                    setValue('selectUser', allUser[e.target.value])
                                    : setValue('isModalOpen', true)
                            }}>
                            {allUserGirino.map((val, key) => {
                                return (
                                    <option key={key} value={key}>{val.name}</option>
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