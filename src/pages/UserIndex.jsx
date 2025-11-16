import { useState, useEffect } from 'react'
import { UserList } from '../cmps/UserList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'


export function UserIndex() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try{
            const users = await userService.getUsers()
            setUsers(users)  
        } catch(err){
            console.log('Error from loadUsers ->', err)
            showErrorMsg('Cannot load users')
        }
    }

    async function onRemoveUser(userId) {
        try {
            await userService.remove(userId)
            console.log('Deleted Succesfully!')
            setUsers(prevUsers => prevUsers.filter((user) => user._id !== userId))
            showSuccessMsg('User removed')
        } catch (err) {
            console.log('Error from onRemoveUser ->', err)
            showErrorMsg('Cannot remove user')
        }
    }

    async function onEditUser(user) {
        const username = prompt('New username?')
        const score = +prompt('New score?')
        const password = prompt('New password?')
        const userToSave = { ...user, username, score, password }
        try {
            const savedUser = await userService.update(userToSave)
            console.log('Updated User:', savedUser)
            setUsers(prevUsers => prevUsers.map((currUser) =>
                currUser._id === savedUser._id ? savedUser : currUser
            ))
            showSuccessMsg('User updated')
        } catch (err) {
            console.log('Error from onEditUser ->', err)
            showErrorMsg('Cannot update user')
        }
    }


    // async function onAddUser() {
    //     const user = {
    //         fullname: prompt('Full name?'),
    //         username: prompt('User name?'),
    //         password: prompt('Password?'),
    //         score: +prompt('Score?'),
    //     }
    //     try {
    //         const savedUser = await userService.save(user)
    //         console.log('Added User', savedUser)
    //         setUsers(prevUsers => [...prevUsers, savedUser])
    //         showSuccessMsg('User added')
    //     } catch (err) {
    //         console.log('Error from onAddUser ->', err)
    //         showErrorMsg('Cannot add user')
    //     }
    // }

    return (
        <section>
            <h2>Users</h2>
            {/* <button onClick={onAddUser}>Add User</button> */}
            <UserList users={users} onRemoveUser={onRemoveUser} onEditUser={onEditUser}/>

        </section>
    )
}