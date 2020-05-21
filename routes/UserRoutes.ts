import { Router } from '../deps.ts'
import {
    getUsers,
    getUser,
    updateUsers,
    deleteUsers
} from '../controllers/UserController.ts'

const UserRoutes = new Router()

UserRoutes.get('/user', getUsers)
UserRoutes.get('/user/:id', getUser)
UserRoutes.put('/user/:id', updateUsers)
UserRoutes.delete('/user/:id', deleteUsers)

export default UserRoutes


/** 
 * Diamsyah M Dida
 * latihan membuat restful api
 * dengan deno, jwt dan mysql
*/