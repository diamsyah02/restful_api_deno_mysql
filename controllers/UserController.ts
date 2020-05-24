import {
    bcrypt,
    md5
} from '../deps.ts'
import { client } from '../db.ts'

const getUsers = async ({ response } : { response: any }) => {
    let users = await client.query('SELECT * FROM user')
    response.status = 200
    response.body = { data: users }
}

const getUser = async ({ params, response } : { params: any; response: any }) => {
    let user = await client.query("SELECT * FROM ?? WHERE id = ?", ["user", params.id])
    if(user.length > 0){
        response.status = 200
        response.body = { data: user[0] }
    }else{
        response.status = 404
        response.body = { message: 'Data not found !' }
    }
}

const updateUsers = async ({ params, request, response } : { params: any; request: any; response: any }) => {
    let body = await request.body()
    let fullname = body.value.fullname
    let email = body.value.email
    let salt = bcrypt.gensalt(8)
    let password = bcrypt.hashpw(md5(body.value.password), salt)
    await client.execute('UPDATE user SET fullname = ?, email = ?, password = ? WHERE id = ?', [fullname, email, password, params.id])
    response.status = 200
    response.body = { message: 'Update successfully !' }
}

const deleteUsers = async ({ params, response } : {params: any; response: any}) => {
    let del = await client.execute('DELETE FROM user WHERE ?? = ?', ["id", params.id])
    response.status = 200
    response.body = { message: 'Delete successfully !' }
}

export {
    getUsers,
    getUser,
    updateUsers,
    deleteUsers
}

/** 
 * Diamsyah M Dida
 * latihan membuat restful api
 * dengan deno, jwt dan mysql
*/