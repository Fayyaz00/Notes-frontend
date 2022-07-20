import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/notes'

export const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

export const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

export const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export const updateImportance = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export const deleteNote = (id) => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

const exportedObject = { getAll, create, update, updateImportance, deleteNote }
export default exportedObject