
// import { utilService } from './util.service.js'
import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = 'http://localhost:3030/api/user/'

export const userService = {
    query,
    getById,
    save,
    remove
}


async function query() {
    try {
        const res = await axios.get(BASE_URL)
        return res.data
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

function getById(userId) {
    return axios.get(BASE_URL + userId)
        .then(res => res.data)
}

async function remove(userId) {
    const url = BASE_URL + userId
    try {
        const { data } = await axios.delete(url)
        return data
    } catch (err) {
        console.error('Cannot remove user', err)
        throw err
    }
}

async function save(user) {
    const url = BASE_URL + (user._id || '')
    const method = user._id ? 'put' : 'post'

    try{
        const { data: savedUser } = await axios[method](url, user)
        return savedUser
    } catch (err) {
        console.error('Cannot save user', err)
        throw err
    }
}
