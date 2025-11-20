
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user/user.service.js'
import { Link } from 'react-router-dom'
import { bugService } from '../services/bug/bug.service.js'
import { BugList } from '../cmps/BugList.jsx'

export function UserDetails() {
    const [bugs, setBugs] = useState([])
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    // const loggedinUser= userService.getLoggedinUser()

    useEffect(() => {
        loadUser()
        loadBugs()
    }, [])

    async function loadBugs() {
        try{
            const bugs = await bugService.query({createdBy: userId})
            setBugs(bugs)
            console.log('User Bugs:', bugs)  
        }catch(err){
            console.log('Error from loadBugs ->', err)
            showErrorMsg('Cannot load bugs for user')
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