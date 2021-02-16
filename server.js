const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors())

app.use(express.json());

const db = mysql.createConnection({
    host:'bczpxu0vazl6ajdfgq0k-mysql.services.clever-cloud.com',
    user:'u8orsmfm7wtqk980',
    password:'lRm8lJWY1JwvfgK9JlWY',
    database:'bczpxu0vazl6ajdfgq0k',
})

app.get('/cadastro' , (req, res) => {
   
    db.query("SELECT * FROM cadastro" , (error, result) =>{
        res.json(result)
    })
})

app.post('/cadastrar' ,(req,res)=>{
   

    let dados =[]

    dados.push({
        nome: req.body.nome,
        usuario: req.body.usuario,
        nascimento: req.body.nascimento,
        email: req.body.email,
        senha: req.body.senha,
    })
    db.query("INSERT INTO cadastro SET?", dados, ()=>{
        dados=[]

        return res.json({message:"Dados enviados com sucesso!"})
    })

})
app.get('/alerta' , (req, res) => {
    db.query("SELECT alertas.alertas AS alertas,alertas.id_usuario AS id_usuario FROM alertas JOIN cadastro ON alertas.id_usuario=cadastro.id" , (error, result) =>{
        res.json(result)
    })
})

app.get('/alertas' , (req, res) => {
    db.query("SELECT * FROM alertas" , (error, result) =>{
        res.json(result)
    })
})


app.post('/alertas' ,(req,res)=>{
   

    let dados =[]

    dados.push({
        alertas: req.body.alertas,
        id_usuario:req.body.id_usuario,
       
    })
    db.query("INSERT INTO alertas SET?", dados, ()=>{
        dados=[]

        return res.json({message:"Dados enviados com sucesso!"})
    })

})


app.delete('/id=:id', (req,res,next )=>{
    let alerta = req.params.idalertas

    db.query(`DELETE FROM alertas WHERE id=${alerta}`, ()=>{
        res.json({message: 'Alerta excluido com sucesso!'})
    })
})

app.put('/:id', (req,res) =>{
    let alerta = {
        idalertas : req.params.idalertas,
        alertas: req.params.alertas
    }

    db.query(`UPDATE alertas SET alertas='${alerta.alertas}' WHERE idalertas='${alerta.idalertas}'`)
} )


app.listen(process.env.PORT || 3010);