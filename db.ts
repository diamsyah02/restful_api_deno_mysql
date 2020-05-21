import { Client } from "https://deno.land/x/mysql/mod.ts"
const client = await new Client().connect({
  hostname: "127.0.0.1",
  username: "root",
  db: "latihan_deno",
  password: "",
})

export { client }

/** 
 * Diamsyah M Dida
 * latihan membuat restful api
 * dengan deno, jwt dan mysql
*/