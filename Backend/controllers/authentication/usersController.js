const { randomUUID } = require('crypto')
const bcrypt = require('bcryptjs');
const auth = require("../../middlewares/authentication");
const UserModel = require("../../models/user")
const jwt = require('jsonwebtoken');

const express = require('express');
const router = express.Router();

const validRoles = ['Engenheiro de FE', 'Engenheiro de BE', 'Analista de dados', 'Líder Técnico'];

var users = []

router.get("/", auth, async (req, res) => {
    try {
        let users = await UserModel.find()
        return res.status(200).json(users)
    } catch (err) {
        console.log(`Um erro ocorreu ao buscar usuários. ${err}`)
        return res.status(500).json({error: err})
    }
})

router.get("/:email", auth, async (req, res) => {
    var email = req.params.email

    try {
        let users = await UserModel.findOne({email: email})
        if(!user) {
            return res.status(404).json({mensagem: "Usuário não encontrado"})
        }

        return res.status(200).json(users)
    } catch (err) {
        console.log(`Um erro ocorreu ao buscar usuários. ${err}`)
        return res.status(500).json({error: err})
    }
})

router.post("/", async (req, res) => {

    const { nome, email, senha } = req.body;
    const senhaEncrypt = await bcryptjs.hash(senha, 10)

    var user = {
        id: randomUUID(),
        nome: nome, 
        email: email,
        senha: senhaEncrypt
    }

    try {
        await UserModel.create(user)
        return res.status(201).json({
            mensagem: "Usuário criado com sucesso!"
        })
    } catch(error) {
        return res.status(500).json({
            error: error
        })
    }

})

router.post("/novo", async (req, res) => {

    const { nome, email, senha } = req.body;
    const senhaCrypt = await bcrypt.hash(senha, 10);
    const usuario = {
        nome, email, senha: senhaCrypt
    }
    try {
        await User.create(usuario);
        res.status(201).json(usuario);
    } catch(error) {
        res.status(500).json({ error: error });
    }

})

router.put("/:id", (req, res) => {
    var id = req.params.id
    var { nome, email } = req.body;


    users.map( user => {
        if(user.id == id) {
            user.nome = nome,
            user.email = email
        }
    } )

    console.log("Usuario editado com sucesso!")

    return res.json(
        {
            mensagem: "Usuario adicionado com sucesso!",
            users: users
        }
    )
})

router.delete("/:id", (req, res) => {
    var id = req.params.id

    users = users.filter( user => {
        return user.id != id
    })

    console.log("Usuario deletado com sucesso!")

    return res.json(
        {
            mensagem: "Usuario deletado com sucesso!",
            users: users
        }
    )
})


module.exports = router;