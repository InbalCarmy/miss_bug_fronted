import { UserPreview } from "./UserPreview.jsx";
import { Link } from 'react-router-dom'

export function UserList({users, onRemoveUser, onEditUser}) {

return(
    <ul className="user-list">
        {users.map((user) => (
            <li className="user-preview" key={user._id}>
                {/* <h3>{user.fullname}</h3>
                <h4>User name: <span>{user.username}</span></h4>
                <h4>Full name: <span>{user.fullname}</span></h4>
                <h4>Score: <span>{user.score}</span></h4> */}
                <UserPreview user={user}/>
                <div>
                    <button onClick={() => {onRemoveUser(user._id)}}>X</button>
                    <button onClick={() =>{onEditUser(user)}}>Edit</button>                    
                </div>
                <Link to={`/user/${user._id}`}>Details</Link>

            </li>
        ))}
    </ul>
)


}