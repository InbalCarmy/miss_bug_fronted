import { httpService } from "../http.service"

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
	login,
	logout,
	signup,
	getUsers,
	getById,
	remove,
	update,
    getLoggedinUser,
}

window.userService = userService


function getUsers() {
	return httpService.get(`user`)
}

async function getById(userId) {
	const user = await httpService.get(`user/${userId}`)
	return user
}

function remove(userId) {
	return httpService.delete(`user/${userId}`)
}

async function update(user) {
    const savedUser = await httpService.put(`user/${user._id}`, user)


	// const user = await httpService.put(`user/${_id}`, { _id, score, username })

	// When admin updates other user's details, do not update loggedinUser
    const loggedinUser = getLoggedinUser() // Might not work because its defined in the main service???
    if (loggedinUser._id === savedUser._id) _saveLocalUser(savedUser)

	return savedUser
}

async function login(userCred) {
	const user = await httpService.post('auth/login', userCred)
	if (user) return _saveLocalUser(user)
}

async function signup(userCred) {
	if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
	userCred.score = 10000

    const user = await httpService.post('auth/signup', userCred)
	return _saveLocalUser(user)
}



async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function _saveLocalUser(user) {
	user = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
	sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
	return user
}

// async function save(user) {
//     var savedUser
//     if (user._id) {
//         savedUser = await httpService.put(`user/${user._id}`, user)
//     } else {
//         savedUser = await httpService.post('user', user)
//     }

//     // Update local storage if it's the logged in user
//     const loggedinUser = getLoggedinUser()
//     if (loggedinUser && loggedinUser._id === savedUser._id) {
//         _saveLocalUser(savedUser)
//     }

//     return savedUser
// }