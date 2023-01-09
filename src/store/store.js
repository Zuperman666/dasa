import axios from 'axios'
import moment from 'moment'
import create from 'zustand'

export const useStore = create((set, get) => ({
  selectUser: {},
  isLogged: true,
  changeday: false,
  isModalOpen: false,
  selectedDayOrder: [],
  liste:[],
  selectedDay: moment(new Date()).format('dddd'),
  userProduct: [
  ],
  modifiedItem: [],
  girini: [],
  selectedGirino: 1,
  isAdmin: true,
  idStore: '',
  tipiProdotti:[],
  allUserGirino: [],
  allUser: [],
  item: [],
  setListe: async () => {
    const response = await axios.get('http://localhost:3001/liste')
    set({ liste: response.data})
  },
  setSelectedDayOrder: async () => {
    set({ selectedDayOrder: get().userProduct.find((obj) => obj.day === get().selectedDay) })
  },
  setUsers: async () => {
    const response = await axios.get('http://localhost:3001/user')
    set({ allUserGirino: response.data.filter((obj) => obj.girino === get().girini.filter((obj2) => obj2.id === get().selectedGirino)[0].id) })
    set({ selectUser: response.data.filter((obj) => obj.girino === get().girini.filter((obj2) => obj2.id === get().selectedGirino)[0].id)[0] })
    set({ allUser: await response.data })
  },
  setAllUserGirino: async () => {
    set({ allUserGirino: get().allUser.filter((obj) => obj.girino === get().girini.filter((obj2) => obj2.id === get().selectedGirino[0])[0].id) })
    set({ selectUser: get().allUser.filter((obj) => obj.girino === get().girini.filter((obj2) => obj2.id === get().selectedGirino[0])[0].id)[0] })
  },
  setGirini: async () => {
    const response = await axios.get('http://localhost:3001/girini')
    set({ girini: response.data })
  },
  setTipiProdotti: async () => {
    const response = await axios.get('http://localhost:3001/tipiProdotti')
    set({ tipiProdotti: response.data })
  },
  setItem: async () => {
    const response = await axios.get('http://localhost:3001/item')
    set({ item: await response.data })
  },
  setProduct: async (id) => {
    set({ idStore: await axios.get(`http://localhost:3001/usuallyOrder?userId=${id}`).then(resp => resp.data[0]) })
    set({ userProduct: get().idStore !== '' ? get().idStore.body : [] })
  },
  setValue: (key, value) =>
    set(() => ({
      [key]: value,
    })),
  modifyItem: (objectModi) =>
    set((state) => ({
      modifiedItem: get().modifiedItem.findIndex((el) => el.itemId === objectModi.itemID) === -1 ? [...state.modifiedItem, objectModi] :
        get().modifiedItem.map((r) => (r.itemId === objectModi.itemId ? objectModi : r)),
    })),
  changeOpen: () =>
    set(() => ({
      selectedDayOrder: Object.fromEntries(Object.entries(get().selectedDayOrder)
        .map(([k, v]) => [k, k === 'stato' ? v === 'aperto' ? 'chiuso' : 'aperto' : v]))
    })),
  save: () =>
    set(() => ({
      userProduct: get().userProduct.map((obj) =>
        obj.day === get().selectedDay
          ?
          get().selectedDayOrder
          : obj
      )
    })),
  resetModify: () => {
    set(() => ({
      changeday: false
    }))
    set(() => ({
      modifiedItem: []
    }))
  }
}))

