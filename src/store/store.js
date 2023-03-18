import axios from 'axios'
import moment from 'moment'
import create from 'zustand'

export const useStore = create((set, get) => ({
  selectUser: {},
  isLogged: true,
  changeday: false,
  isModalOpen: false,
  selectedDayOrder: [],
  allHistory:[],
  history:[],
  defaultOrder: [],
  dayOrder: [],
  liste: [],
  tempOrder:[],
  selectedTempOrder:[],
  selectedDay: moment(new Date()).format('dddd'),
  closeDay: [],
  userProduct: [
  ],
  modifiedItem: [],
  temporary: false,
  girini: [],
  selectedGirino: 1,
  isAdmin: true,
  idStore: '',
  tipiProdotti: [],
  allUserGirino: [],
  allUser: [],
  item: [],
  setListe: async () => {
    const response = await axios.get('http://localhost:3001/liste')
    set({ liste: response.data })
  },
  setSelectedDayOrder: () => {
    set({ selectedDayOrder: get().userProduct?.dayOrder?.filter((obj) => obj.day === get().selectedDay) })
    set({ selectedTempOrder: get().userProduct?.tempOrder?.filter((obj) => obj.day === get().selectedDay) })
  },
  setUsers: async () => {
    const response = await axios.get('http://localhost:3001/user')
    set({ allUserGirino: response.data.filter((obj) => obj.girino === get().girini.filter((obj2) => obj2.id === get().selectedGirino)[0].id) })
    set({ selectUser: response.data.filter((obj) => obj.girino === get().girini.filter((obj2) => obj2.id === get().selectedGirino)[0].id)[0] })
    set({ allUser: response.data })
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
    set({ userProduct: await axios.get(`http://localhost:3001/usuallyOrder/${id}`).then(resp => resp.data) })
    set({ closeDay: get().userProduct !== '' ? get().userProduct.closeDay : [] })
    set({ defaultOrder: get().userProduct !== '' ? get().userProduct.defaultOrder : [] })
    set({ dayOrder: get().userProduct !== '' ? get().userProduct.dayOrder : [] })
    set({ tempOrder: get().userProduct !== '' ? get().userProduct.tempOrder : [] })
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
  setTemporary: () =>
    set(({ temporary: !get().temporary })),
  resetModify: () => {
    set(() => ({
      modifiedItem: []
    }))
  }
}))

