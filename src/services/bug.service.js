
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


function query(filterBy = {}) {
    filterBy = {...filterBy}
    return axios.get(BASE_URL)
        .then(res => res.data)
        .then (bugs => {
            if(!filterBy.txt) filterBy.txt = ''
            if(!filterBy.severity) filterBy.severity = 0
            const regExp = new RegExp(filterBy.txt, 'i')
            return bugs.filter(bug =>
                regExp.test(bug.title) &&
                bug.severity >= filterBy.severity
            )
        })
}

function getById(bugId) {
    return axios.get(BASE_URL + bugId)
        .then(res => res.data)
}

function remove(bugId) {
    return axios.get(BASE_URL + 'remove/' + bugId)
        .then(res => res.data)
}

function save(bug) {
    // const queryParams = `save?_id=${bug._id || ''}&title=${bug.title}&severity=${bug.severity}&description=${bug.description}&createdAt=${bug.createdAt}`
    return axios.get(BASE_URL + 'save', {params: bug}).then(res => res.data)
}

function getDefaultFilter() {
    return { txt: '', severity: 0 }
}