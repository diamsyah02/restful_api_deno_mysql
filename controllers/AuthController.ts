import {
    bcrypt,
    md5
} from '../deps.ts'
import { 
    makeJwt,
    setExpiration,
    Jose,
    Payload
 } from '../deps.ts'
import { client } from '../db.ts'

const login = async ({ request, response }: { request: any; response: any }) => {
    let body = await request.body()
    let email = body.value.email
    let password = md5(body.value.password)

    let users = await client.query("SELECT * FROM ?? WHERE email = ?", ["user", email])
    if (users.length > 0) {
        if (bcrypt.checkpw(password, users[0]['password'])) {
            let payload: Payload = {
                iss: users[0]['fullname'],
                exp: setExpiration(new Date().getTime() + 80000),
            }
            let header: Jose = {
                alg: "HS256",
                typ: "JWT",
            }
            let key = "d1d4d14m5y4h02!-!-!"
            let token = makeJwt({ header, payload, key })
            response.status = 200
            response.body = { data: users[0], token: token }
        } else {
            response.status = 400
            response.body = { message: 'login unsuccessfully, because your password is wrong !' }
        }
    } else {
        response.status = 400
        response.body = { message: 'login unsuccessfully, because you are not register !' }
    }
}

const register = async ({ request, response }: { request: any; response: any }) => {
    let body = await request.body()
    let fullname = body.value.fullname
    let email = body.value.email
    let salt = bcrypt.gensalt(8)
    let password = bcrypt.hashpw(md5(body.value.password), salt)

    let cekEmail = await client.query('SELECT * FROM ?? WHERE email = ?', ['user', email])
    if (cekEmail.length > 1) {
        response.status = 400
        response.body = { message: 'Email is already !' }
    } else {
        let insert = await client.execute('INSERT INTO user(fullname, email, password) values(?, ?, ?)', [fullname, email, password])
        if (insert) {
            response.status = 200
            response.body = { message: 'Register successfully !' }
        } else {
            response.status = 400
            response.body = { message: "Opss.. something's is wrong !" }
        }
    }
}

export {
    login,
    register
}

/** 
 * Diamsyah M Dida
 * latihan membuat restful api
 * dengan deno, jwt dan mysql
*/