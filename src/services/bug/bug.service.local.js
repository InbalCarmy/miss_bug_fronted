
import { storageService } from '../async-storage.service.js'
import { utilService } from '../util.service.js'

const STORAGE_KEY = 'bugDB'

export const bugService = {
    query,
    getById,
    save,
    remove,
}


function query(filterBy = {}) {
    filterBy = {...filterBy}
    return storageService.query(STORAGE_KEY)
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
    return storageService.get(STORAGE_KEY, bugId)
}
function remove(bugId) {
    return storageService.remove(STORAGE_KEY, bugId)
}
function save(bug) {
    if (bug._id) {
        return storageService.put(STORAGE_KEY, bug)
    } else {
        return storageService.post(STORAGE_KEY, bug)
    }
}