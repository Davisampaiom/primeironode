const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors())

app.use(express.json());

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'squad1',
})

app.get('/cadastro' , (req, res) => {
   
    db.query("SELECT * FROM `cadastro`" , (error, result) =>{
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
    db.query("SELECT * FROM alertas" , (error, result) =>{
        res.json(result)
    })
})


app.post('/alertas' ,(req,res)=>{
   

    let dados =[]

    dados.push({
        alertas: req.body.alertas,
       
    })
    db.query("INSERT INTO alertas SET?", dados, ()=>{
        dados=[]

        return res.json({message:"Dados enviados com sucesso!"})
    })

})

app.listen(3010, () => {
    console.log("server ativo");
  });