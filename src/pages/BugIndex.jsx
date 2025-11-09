import { bugService } from '../services/bug.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { useState } from 'react'
import { useEffect } from 'react'
import { BugFilter } from '../cmps/BugFilter.jsx'


export function BugIndex() {
    const [bugs, setBugs] = useState([])
    const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter())

    useEffect(() => {
        loadBugs()
    }, [filterBy])

    async function loadBugs() {
        try{
            const bugs = await bugService.query(filterBy)
            setBugs(bugs)  
        }catch(err){
            console.log('Error from loadBugs ->', err)
            showErrorMsg('Cannot load bugs')
        }
    }

    async function onRemoveBug(bugId) {
        try {
            await bugService.remove(bugId)
            console.log('Deleted Succesfully!')
            setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
            showSuccessMsg('Bug removed')
        } catch (err) {
            console.log('Error from onRemoveBug ->', err)
            showErrorMsg('Cannot remove bug')
        }
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(prevFilter => {
            let pageIdx = undefined
            if(prevFilter.pageIdx !== undefined) pageIdx = 0
            return {...prevFilter, ...filterBy, pageIdx}
        })
    }

    function onChangePageIdx(diff) {
        setFilterBy(prevFilter => {
            let newPageIdx = prevFilter.pageIdx ?? 0
            newPageIdx += diff
            if (newPageIdx < 0) return prevFilter
            return { ...prevFilter, pageIdx: newPageIdx }
        })
    }

    async function onAddBug() {
        const bug = {
            title: prompt('Bug title?'),
            severity: +prompt('Bug severity?'),
            description: prompt('Bug description?'),
        }
        try {
            const savedBug = await bugService.save(bug)
            console.log('Added Bug', savedBug)
            setBugs(prevBugs => [...prevBugs, savedBug])
            showSuccessMsg('Bug added')
        } catch (err) {
            console.log('Error from onAddBug ->', err)
            showErrorMsg('Cannot add bug')
        }
    }

    async function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        try {
            const savedBug = await bugService.save(bugToSave)
            console.log('Updated Bug:', savedBug)
            setBugs(prevBugs => prevBugs.map((currBug) =>
                currBug._id === savedBug._id ? savedBug : currBug
            ))
            showSuccessMsg('Bug updated')
        } catch (err) {
            console.log('Error from onEditBug ->', err)
            showErrorMsg('Cannot update bug')
        }
    }

    const { pageIdx, ...restOfFilter } = filterBy
    // const isPaging = pageIdx !== undefined

    return (
        <section >
            <h3>Bugs App</h3>
            <button onClick={() => onChangePageIdx(-1)}>-</button>
            <span>{pageIdx !== undefined ? pageIdx + 1 : ''}</span>
            <button onClick={() => onChangePageIdx(1)}>+</button>
            <BugFilter filterBy={restOfFilter} onSetFilterBy={onSetFilterBy}/>
            <main>
                <button onClick={onAddBug}>Add Bug ⛐</button>
                <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} />
            </main>
        </section>
    )
}
