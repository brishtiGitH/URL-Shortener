const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const cookieParser = require('cookie-parser')
const { restrictAccess } = require('./middlewares/auth')

const urlRouter = require('./routes/url')
const userRouter = require('./routes/user')
const staticRouter = require('./routes/staticRouter')

mongoose.connect("mongodb://127.0.0.1:27017/ShortURL").then(() => console.log('MongoDB Connected!')).catch(() => console.log('MongoDB Connection Failed!'))

const app = express()
app.use(cors());

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())  //bodyparser- to parse the incoming json payload and initialize req.body
app.use(cookieParser())

app.use('/', staticRouter)
app.use('/url', restrictAccess, urlRouter)
app.use('/user', userRouter)  //localhost:3000/user

app.listen(3000, () => console.log('Server Started!'))