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
