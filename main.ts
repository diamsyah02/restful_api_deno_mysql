import { Application } from './deps.ts'
import AuthRoutes from './routes/AuthRoutes.ts'
import UserRoutes from './routes/UserRoutes.ts'
// middleware
import { auth } from './middleware/AuthMiddleware.ts'
import { cors, CORSConfig } from "./middleware/CorsMiddleware.ts";
const app = new Application()

const env = Deno.env.toObject()
const HOST = env.HOST || '127.0.0.1'
const PORT = env.PORT || 7000

// Cors Configuration
const config: CORSConfig = {
    allowOrigins: ["*"],
    // allowMethods: ["GET","POST","PUT"],
};

app.use(cors(config))
app.use(AuthRoutes.routes())
app.use(AuthRoutes.allowedMethods())

// authorization middleware
app.use(auth);
// Protected Routes
app.use(UserRoutes.routes())
app.use(UserRoutes.allowedMethods())

await app.listen(`${HOST}:${PORT}`)

/**
 * Diamsyah M Dida
 * latihan membuat restful api
 * dengan deno, jwt dan mysql
*/