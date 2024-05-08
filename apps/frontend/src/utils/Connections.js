import axios from 'axios'
import Plomo from '../assets/Plomo.png'
import Zinc from '../assets/Zinc.png'
import Estano from '../assets/Estano.png'
import Plata from '../assets/Plata.png'

const API_URL = 'http://localhost:3000'

export const getConnections = async () => {
  const response = await axios.get(`${API_URL}/connections`)
  return response.data
}

export const getProducts = async () => {
  const res = await axios.get(`${API_URL}/products`)
  return res.data
}

export const getMaterial = async (id) => {
  const res = await axios.get(`${API_URL}/products/${id}`)
  return res.data
}

export const getSells = async () => {
  const res = await axios.get(`${API_URL}/ventas`)
  return res.data
}

export const getExtractionRegister = async () => {
  const res = await axios.get(`${API_URL}/extracted-materials`)
  return res.data
}

export const postExtractionRegister = async (data) => {
  const res = await axios.post(`${API_URL}/extracted-materials`, data)
  return res.data
}

export const getSell = async (id) => {
  const res = await axios.get(`${API_URL}/ventas/${id}`)
  return res.data
}

export const getImage = (materialName) => {
  switch (materialName) {
    case 'Plomo':
      return Plomo
    case 'Zinc':
      return Zinc
    case 'Estaño':
      return Estano
    case 'Plata':
      return Plata
    default:
      return Plomo
  }
}
