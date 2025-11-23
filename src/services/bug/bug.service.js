import { httpService } from '../http.service'

export const bugService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterBy = {
        txt: '',
        minSeverity: 0 ,
        labels: [],
        pageIdx: 0,
        sortBy: '',
        sortDir: 1,
        createdBy: ''
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
    if (!params.createdBy) delete params.createdBy    
    
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

