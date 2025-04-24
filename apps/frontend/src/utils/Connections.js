import axios from 'axios'

const API_URL = 'http://localhost:3000'

export const getCitas = async () => {
  const res = await axios.get(`${API_URL}/citas`)
  return res.data
}

export const postCita = async (data) => {
  const res = await axios.post(`${API_URL}/citas`, data)
  return res.data
}

export const deleteCita = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/citas/${id}`)
    return res.data
  } catch (error) {
    throw new Error(`Error deleting cita: ${error}`)
  }
}

export const putCita = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/citas/${id}`, data)
    return res.data
  } catch (error) {
    throw new Error(`Error updating cita: ${error}`)
  }
}

//     inventario

export const getInventario = async () => {
  const res = await axios.get(`${API_URL}/inventario`)
  return res.data
}

export const postInventario = async (data) => {
  const res = await axios.post(`${API_URL}/inventario`, data)
  return res.data
}

export const deleteInventario = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/inventario/${id}`)
    return res.data
  } catch (error) {
    throw new Error(`Error deleting inventario: ${error}`)
  }
}

export const putInventario = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/inventario/${id}`, data)
    return res.data
  } catch (error) {
    throw new Error(`Error updating inventario: ${error}`)
  }
}

// saldo

export const getSaldo = async () => {
  const res = await axios.get(`${API_URL}/saldo`)
  return res.data
}

export const postSaldo = async (data) => {
  const res = await axios.post(`${API_URL}/saldo`, data)
  return res.data
}

export const deleteSaldo = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/saldo/${id}`)
    return res.data
  } catch (error) {
    throw new Error(`Error deleting saldo: ${error}`)
  }
}

export const putSaldo = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/saldo/${id}`, data)
    return res.data
  } catch (error) {
    throw new Error(`Error updating saldo: ${error}`)
  }
}
