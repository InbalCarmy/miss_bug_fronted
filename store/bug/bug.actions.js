import { bugService } from '../../src/services/bug'
import { store } from '../store'
import { ADD_BUG, REMOVE_BUG, SET_BUGS, SET_BUG, UPDATE_BUG } from './bug.reducer'

export async function loadBugs(filterBy) {
    
    try {        
        const bugs = await bugService.query(filterBy)        
        store.dispatch(getCmdSetBugs(bugs))
    } catch (err) {
        console.log('Cannot load bugs', err)
        throw err
    }
}

export async function loadBug(bugId) {
    try {
        const bug = await bugService.getById(bugId)
        store.dispatch(getCmdSetBug(bug))
    } catch (err) {
        console.log('Cannot load bug', err)
        throw err
    }
}


export async function removeBug(bugId) {
    try {
        await bugService.remove(bugId)
        store.dispatch(getCmdRemoveBug(bugId))
    } catch (err) {
        console.log('Cannot remove bug', err)
        throw err
    }
}

export async function addBug(bug) {
    try {
        const savedBug = await bugService.save(bug)
        store.dispatch(getCmdAddBug(savedBug))
        return savedBug
    } catch (err) {
        console.log('Cannot add bug', err)
        throw err
    }
}

export async function updateBug(bug) {
    try {
        const savedBug = await bugService.save(bug)
        store.dispatch(getCmdUpdateBug(savedBug))
        return savedBug
    } catch (err) {
        console.log('Cannot save bug', err)
        throw err
    }
}

// export async function addBugMsg(bugId, txt) {
//     try {
//         const msg = await bugService.addBugMsg(bugId, txt)
//         store.dispatch(getCmdAddBugMsg(msg))
//         return msg
//     } catch (err) {
//         console.log('Cannot add bug msg', err)
//         throw err
//     }
// }

// Command Creators:
function getCmdSetBugs(bugs) {
    return {
        type: SET_BUGS,
        bugs
    }
}
function getCmdSetBug(bug) {
    return {
        type: SET_BUG,
        bug
    }
}
function getCmdRemoveBug(bugId) {
    return {
        type: REMOVE_BUG,
        bugId
    }
}
function getCmdAddBug(bug) {
    return {
        type: ADD_BUG,
        bug
    }
}
function getCmdUpdateBug(bug) {
    return {
        type: UPDATE_BUG,
        bug
    }
}
// function getCmdAddBugMsg(msg) {
//     return {
//         type: ADD_BUG_MSG,
//         msg
//     }
// }

// unitTestActions()
// async function unitTestActions() {
//     await loadBugs()
//     await addBug(bugService.getEmptyBug())
//     await updateBug({
//         _id: 'm1oC7',
//         title: 'Bug-Good',
//     })
//     await removeBug('m1oC7')
//     // TODO unit test addBugMsg
// }
