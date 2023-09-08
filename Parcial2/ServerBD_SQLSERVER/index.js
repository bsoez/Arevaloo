app.get("/usuarios",(req,res)=>{
    mysql.createConnection({host:'localhost' ,user,'root',password:'',database:'crud'})
    .then(conn=>conn.query('SELECT * FROM usuario'))
    .then(([rows, fields])=> res.json(rows));
});

