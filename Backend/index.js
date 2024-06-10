require('dotenv').config();

const usersController = require('./controllers/authentication/usersController')
const loginController = require('./controllers/login')

const express = require('express');
const mongoose = require('mongoose')
const servidor = express()
servidor.use(express.json())

const PORT = process.env.PORT
const DB_NAME = process.env.DB_NAME
const DB_USER = process.env.DB_USER
const DB_PASS = process.env.DB_PASS
const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@crud-app.f6k2zig.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=CRUD-APP`

servidor.use("/login", loginController)
servidor.use("/users", usersController)

const usarioRouter = require('./controllers/authentication/usersController');
app.use('/users', usarioRouter);

mongoose.connect(DB_URL)
.then(() => {
    console.log('Conectado ao mongoDB');
    servidor.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${porta}`);
    })
})
.catch((err) => {
    console.log(err);
});

