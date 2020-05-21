import { Context, validateJwt } from '../deps.ts'

const key = 'd1d4d14m5y4h02!-!-!'
export const auth = async (ctx: Context, next: () => Promise<void>) => {
  ctx.response.headers.set('Content-Type', 'application/json')
  // Get Authorization Header
  const jwt = ctx.request.headers.get('diamsyah-key')
  // ctx.response.body = { token: jwt }
  if (jwt != null) {
    const tokenValid = await validateJwt(jwt, key, { isThrowing: false })
    if (tokenValid) {
      await next()
      return
    }else{
      // Set Response to Unauthorized
      ctx.response.status = 401
      ctx.response.body = { error: "Token invalid" }
    }
  } else {
    // Set Response to Unauthorized
    ctx.response.status = 401
    ctx.response.body = { error: "Token is null" }
  }
}

/** 
 * Diamsyah M Dida
 * latihan membuat restful api
 * dengan deno, jwt dan mysql
*/