import { httpService } from '../http.service'

// import { utilService } from './util.service.js'
// import Axios from 'axios'

// const axios = Axios.create({
//     withCredentials: true,
// })

// const BASE_URL = (process.env.NODE_ENV !== 'development')
//                 ? '/api/bug/'
//                 : 'http://localhost:3030/api/bug/';

export const bugService = {
    query,
    getById,
    save,
    remove,
    // getDefaultFilter,
}

async function query(filterBy = {
        txt: '',
        minSeverity: 0 ,
        labels: [],
        pageIdx: 0,
        sortBy: '',
        sortDir: 1
    })
    {        
    const params = { ...filterBy }
    // Remove empty/default values to avoid backend 400 errors
    if (!params.txt) delete params.txt
    if (!params.sortBy) delete params.sortBy
    if (!params.labels?.length) delete params.labels
    if (params.minSeverity === 0) delete params.minSeverity
    if (params.pageIdx === undefined) delete params.pageIdx
    if (!params.sortDir) delete params.sortDir
    
    return httpService.get(`bug`, params)
    
}

function getById(bugId) {
    return httpService.get(`bug/${bugId}`)
}

async function remove(bugId) {
    return httpService.delete(`bug/${bugId}`)
}

async function save(bug) {
    var savedBug
    if (bug._id) {
        savedBug = await httpService.put(`bug/${bug._id}`, bug)
    } else {
        savedBug = await httpService.post('bug', bug)
    }
    return savedBug
}


// async function query(filterBy = {}) {
//     try {
//         const params = { ...filterBy }
//         if (params.labels && Array.isArray(params.labels) && params.labels.length > 0) {
//             params.labels = params.labels.join(',')
//         } else {
//             delete params.labels
//         }

//         const { data: bugs } = await axios.get(BASE_URL, { params })
//         return bugs
//     } catch (err) {
//         console.log('err:', err)
//         throw err
//     }
// }



// function getById(bugId) {
//     return axios.get(BASE_URL + bugId)
//         .then(res => res.data)
// }

// async function remove(bugId) {
//     const url = BASE_URL + bugId
//     try {
//         const { data } = await axios.delete(url)
//         return data
//     } catch (err) {
//         console.error('Cannot remove bug', err)
//         throw err
//     }
// }

// async function save(bug) {
//     const url = BASE_URL + (bug._id || '')
//     const method = bug._id ? 'put' : 'post'

//     try{
//         const { data: savedBug } = await axios[method](url, bug)
//         return savedBug
//     } catch (err) {
//         console.error('Cannot save bug', err)
//         throw err
//     }
// }

// function getDefaultFilter() {
//     return { txt: '', minSeverity: 0 , labels: [], pageIdx: 0, sortBy: '', sortDir: 1 }
// }