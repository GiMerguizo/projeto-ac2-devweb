const express = require('express');
const porta = 8080
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const usarioRouter = require('./controllers/usersController');
app.use('/users', usarioRouter);

mongoose.connect("")
.then(() => {
    app.listen(porta, () => {
        console.log('Conectado ao mongoDB');
        console.log(`Servidor rodando em http://localhost:${porta}`);
    })
})
.catch((err) => {
    console.log(err);
});

