const { VITE_LOCAL } = import.meta.env

// import { bugService as local } from './bug.service.local'
import { bugService as remote } from './bug.service'

function getDefaultFilter() {
    return { 
        txt: '', 
        minSeverity: 0 , 
        labels: [], 
        pageIdx: 0, 
        sortBy: '', 
        sortDir: 1 ,
        createdBy: ''
    }
}

// console.log('VITE_LOCAL:', VITE_LOCAL)

// const service = VITE_LOCAL === 'true' ? local : remote
const service = remote
export const bugService = { getDefaultFilter, ...service }