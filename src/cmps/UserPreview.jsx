

export function UserPreview({ user }) {

    return( 
        <article >
            <h3>{user.fullname}</h3>
            <h4>Username: <span>{user.username}</span></h4>
            <h4>Score: <span>{user.score}</span></h4>
        </article>
    )
}