
import { useParams } from 'react-router'
import { useState, useEffect } from 'react'
import { showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { Link } from 'react-router-dom'

export function UserDetails() {
    const [user, setUser] = useState(null)
    const { userId } = useParams()

    useEffect(() => {
        loadUser()
    }, [])

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
            </div>
            <Link to="/user">Back to users</Link>

        </section>
    )
}