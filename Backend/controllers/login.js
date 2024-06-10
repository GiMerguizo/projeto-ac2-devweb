const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const express = require('express');
const UserModel = require('../../models/user')
const loginController = express.Router()

loginController.post("/", async (req, res) => {
    
    const { email, senha } = req.body;

    const usuario = await UserModel.findOne({ email: email });
    if (!usuario)
        return res.status(402).send('Usuário não encontrado');
    
    if (await bcrypt.compare(senha, usuario.senha)) {
        const token = jwt.sign({ id: usuario.id, nome: usuario.nome, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: '2d' });

        return res.status(200).json({
            messagem: `Bem-vindo, ${usuario.nome}!`,
            token: token
        });
    }
    else {
        return res.status(401).send("E-mail ou senha incorretos!")
    }
 
})

module.exports = loginController
