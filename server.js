const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors())

app.use(express.json());


app.get('/cadastro' , (req, res) => {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'squad1',
    })
    connection.query("SELECT * FROM `cadastro`" , (error, result) =>{
        res.json(result)
    })
})

app.post('/cadastrar' ,(req,res)=>{
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'squad1',
    })

    let dados =[]

    dados.push({
        nome: req.body.nome,
        usuario: req.body.usuario,
        nascimento: req.body.nascimento,
        email: req.body.email,
        senha: req.body.senha,
    })
    connection.query("INSERT INTO cadastro SET?", dados, ()=>{
        dados=[]

        return res.json({message:"Dados enviados com sucesso!"})
    })

})
app.get('/alerta' , (req, res) => {
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'squad1',
    })
    connection.query("SELECT * FROM alertas" , (error, result) =>{
        res.json(result)
    })
})


app.post('/alertas' ,(req,res)=>{
    const mysql = require('mysql');
    const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'squad1',
    })

    let dados =[]

    dados.push({
        alertas: req.body.alertas,
       
    })
    connection.query("INSERT INTO alertas SET?", dados, ()=>{
        dados=[]

        return res.json({message:"Dados enviados com sucesso!"})
    })

})

app.listen(3010, () => {
    console.log("server ativo");
  });