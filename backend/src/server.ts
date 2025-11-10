import express from 'express'
import router from './routes'
import cors from 'cors'

const app = express()

app.use(cors({
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use('/', router);

app.listen(3000,() => {
    console.log("servidor online")
})