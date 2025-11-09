
// import { utilService } from './util.service.js'
import Axios from 'axios'

const axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = 'http://localhost:3030/api/bug/'

export const bugService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
}


// function query(filterBy = {}) {
//     filterBy = {...filterBy}
//     return axios.get(BASE_URL)
//         .then(res => res.data)
//         .then (bugs => {
//             if(!filterBy.txt) filterBy.txt = ''
//             if(!filterBy.severity) filterBy.severity = 0
//             const regExp = new RegExp(filterBy.txt, 'i')
//             return bugs.filter(bug =>
//                 regExp.test(bug.title) &&
//                 bug.severity >= filterBy.severity
//             )
//         })
// }

async function query(filterBy = {}) {
    try {
        // Convert labels array to comma-separated string for server
        const params = { ...filterBy }
        if (params.labels && Array.isArray(params.labels) && params.labels.length > 0) {
            params.labels = params.labels.join(',')
        } else {
            // Remove empty labels array to avoid sending labels= in URL
            delete params.labels
        }

        const { data: cars } = await axios.get(BASE_URL, { params })
        // console.log('✸ → cars:', cars)
        return cars
    } catch (err) {
        console.log('err:', err)
        throw err
    }
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
}

async function remove(bugId) {
    const url = BASE_URL + bugId
    try {
        const { data } = await axios.delete(url)
        return data
    } catch (err) {
        console.error('Cannot remove bug', err)
        throw err
    }
}

async function save(bug) {
    const url = BASE_URL + (bug._id || '')
    const method = bug._id ? 'put' : 'post'

    try{
        const { data: savedBug } = await axios[method](url, bug)
        return savedBug
    } catch (err) {
        console.error('Cannot save bug', err)
        throw err
    }
}

function getDefaultFilter() {
    return { txt: '', minSeverity: 0 , labels: []}
}