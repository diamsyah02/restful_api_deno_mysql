import { Router } from '../deps.ts'
import { 
    login,
    register    
} from '../controllers/AuthController.ts'
const AuthRoutes = new Router()

AuthRoutes.post('/login', login)
AuthRoutes.post('/register', register)

export default AuthRoutes

/** 
 * Diamsyah M Dida
 * latihan membuat restful api
 * dengan deno, jwt dan mysql
*/