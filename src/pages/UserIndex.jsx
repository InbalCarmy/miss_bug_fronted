import { useEffect } from 'react'
import { UserList } from '../cmps/UserList.jsx'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { useSelector } from 'react-redux'
import { removeUser, updateUser, loadUsers } from '../../store/user/user.actions.js'


export function UserIndex() {
    // const [users, setUsers] = useState([])
        const users = useSelector(storeState => storeState.userModule.users)



    useEffect(() => {
        loadUsers()
    }, [])

    // async function loadUsers() {
    //     try{
    //         const users = await userService.getUsers()
    //         setUsers(users)  
    //     } catch(err){
    //         console.log('Error from loadUsers ->', err)
    //         showErrorMsg('Cannot load users')
    //     }
    // }

    async function onRemoveUser(userId) {
        try {
            await removeUser(userId)
            console.log('Deleted Succesfully!')
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
            const savedUser = await updateUser(userToSave)
            console.log('Updated User:', savedUser)
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