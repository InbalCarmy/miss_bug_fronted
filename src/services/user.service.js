
// import { utilService } from './util.service.js'
import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true,
})

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'


// const BASE_URL = 'http://localhost:3030/api/user/'

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '/api/' :
    '//localhost:3030/api/'

const BASE_USER_URL = BASE_URL + 'user/'
const BASE_AUTH_URL = BASE_URL + 'auth/'

// export const userService = {
//     query,
//     getById,
//     save,
//     remove
// }

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    
    getUsers,
    getById,
    remove,
    update,
    getEmptyUser
}

window.userService = userService



// async function query() {
//     try {
//         const res = await axios.get(BASE_URL)
//         return res.data
//     } catch (err) {
//         console.log('err:', err)
//         throw err
//     }
// }

// function getById(userId) {
//     return axios.get(BASE_URL + userId)
//         .then(res => res.data)
// }

// async function remove(userId) {
//     const url = BASE_URL + userId
//     try {
//         const { data } = await axios.delete(url)
//         return data
//     } catch (err) {
//         console.error('Cannot remove user', err)
//         throw err
//     }
// }

async function getUsers() {
    const { data: users } = await axios.get(BASE_USER_URL)
    return users
}

async function getById(userId) {
    const { data: user } = await axios.get(BASE_USER_URL + userId)
    return user
}

async function remove(userId) {
    return await axios.delete(BASE_USER_URL + userId)
}

async function update(userToUpdate) {
    // const user = await getById(userToUpdate.id)
    // console.log('user', user)

    // const updatedUser = await axios.put(BASE_USER_URL + userToUpdate._id, userToUpdate)
    const { data: updatedUser } = await axios.put(BASE_USER_URL + userToUpdate._id, userToUpdate)
    if (getLoggedinUser()?._id === updatedUser._id) saveLocalUser(updatedUser)
    return updatedUser
}

async function login(credentials) {
    const { data: user } = await axios.post(BASE_AUTH_URL + 'login', credentials)
    // console.log('user', user);
    if (user) {
        return saveLocalUser(user)
    }
}

async function signup(credentials) {

    const { data: user } = await axios.post(BASE_AUTH_URL + 'signup', credentials)
    return saveLocalUser(user)
}

async function logout() {
    await axios.post(BASE_AUTH_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getEmptyUser() {
    return {
        username: '',
        fullname: '',
        password: '',
        imgUrl: '',
    }
}

function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

// async function save(user) {
//     const url = BASE_URL + (user._id || '')
//     const method = user._id ? 'put' : 'post'

//     try{
//         const { data: savedUser } = await axios[method](url, user)
//         return savedUser
//     } catch (err) {
//         console.error('Cannot save user', err)
//         throw err
//     }
// }
