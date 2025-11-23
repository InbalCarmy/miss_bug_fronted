
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user'
import { Link } from 'react-router-dom'
import { BugList } from '../cmps/BugList.jsx'
import { loadBugs, updateBug, removeBug } from '../../store/bug/bug.actions.js'
import { useSelector } from 'react-redux'

export function UserDetails() {
    const bugs = useSelector(storeState => storeState.bugModule.bugs)
    const [user, setUser] = useState(null)
    const { userId } = useParams()

    useEffect(() => {
        loadUser()
        loadBugs({createdBy: userId})
    }, [])


    async function onEditBug(bug) {
        const severity = +prompt('New severity?')
        if(!severity && severity !== 0) return 
        const bugToSave = { ...bug, severity }
        try {
            const savedBug = await updateBug(bugToSave)
            console.log('Updated Bug:', savedBug)
            showSuccessMsg('Bug updated')
        } catch (err) {
            console.log('Error from onEditBug ->', err)
            showErrorMsg('Cannot update bug')
        }
    }

    async function onRemoveBug(bugId) {
        try {
            await removeBug(bugId)
            console.log('Deleted Succesfully!')
            showSuccessMsg('Bug removed')
        } catch (err) {
            console.log('Error from onRemoveBug ->', err)
            showErrorMsg('Cannot remove bug')
        }
    }

    async function loadUser() {
        try {
            const user = await userService.getById(userId)
            setUser(user)
        }catch (err) {
            showErrorMsg('Cannot load user')
        }
    }

    if (!user) return <h1>Loading....</h1>
    return (
        <section className="user-details">
            <h2>User Details</h2>
            <div >
                <h3>{user.fullname}</h3>
                <h4>Username: <span>{user.username}</span></h4>
                <h4>Score: <span>{user.score}</span></h4> 
                <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug}/>
            </div>
            <Link to="/user">Back to users</Link>

        </section>
    )
}