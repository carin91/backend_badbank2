//Configuración del servidor
import express from "express"
import dotenv from "dotenv"
import mongoose from 'mongoose'
import cors from "cors"
import { connectDB } from "./config/connectDb.js"
import userRoutes from "./routes/User.routes.js"
import { all } from "axios"

//Write the request
const app = express()
//configurando leer JSON
// app.use(express.json())
dotenv.config();

const port = process.env.PORT || 4000

//middleware

const whitelist = [process.env.FRONT_END_URL, process.env.FRONT_END_URL_LOCALHOST]


const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin)
        if (whitelist.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
app.use(cors(corsOptions))
app.use(express.json());
app.use('/api', userRoutes);


app.get("/", (req,res) => {
    res.send("welcome to my API");
})

mongoose.connect( process.env.MONGO_URI ,{
            
    useUnifiedTopology: true
})
.then(() => console.log('Connected to mongoDb atlas'))
.catch((error) => console.log(error))
//Configurando dorenv
 // busca un archivo .env

//Conectando nuestra BBDD
// connectDB()

//Configurar CORS
    // WhiteList


// //Routing
// app.use("/api/user", usersRoutes)

//And call listen methods
app.listen(port, () => {
    console.log('server in port 4000')
})