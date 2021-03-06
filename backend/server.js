const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sc'
});
 
//connect to database
conn.connect((err) =>{
     if (!err) {
        console.log("Connected");
        var sqlTableUser = "CREATE TABLE IF NOT EXISTS user (id_user INT NOT NULL AUTO_INCREMENT, nama VARCHAR(255) NOT NULL, no_telepon INT NOT NULL, asal VARCHAR(255) NOT NULL, identitas VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, photo VARCHAR(255), PRIMARY KEY (id_user))";
        
        conn.query(sqlTableUser, function (err, result) {
          if (err) throw err;
          console.log("Table user created");
        });
    
        var sqlTableBuku = "CREATE TABLE IF NOT EXISTS buku (id_buku INT NOT NULL AUTO_INCREMENT, judul_buku VARCHAR(255) NOT NULL, id_user INT NOT NULL, penulis VARCHAR(255) NOT NULL, tahun_terbit INT NOT NULL, penerbit VARCHAR(255) NOT NULL, jenis VARCHAR(255) NOT NULL, jumlah INT NOT NULL, foto VARCHAR(255), PRIMARY KEY(id_buku), FOREIGN KEY(id_user) REFERENCES user(id_user) )";
        conn.query(sqlTableBuku, function (err, result) {
            if (err) throw err;
            console.log("Table buku created");
        });
    
        var sqlTablePeminjaman = "CREATE TABLE IF NOT EXISTS peminjaman (id_peminjaman INT NOT NULL AUTO_INCREMENT, tanggal_pinjam DATE, tanggal_kembali DATE, id_buku INT NOT NULL, id_user INT NOT NULL, PRIMARY KEY(id_peminjaman), FOREIGN KEY(id_user) REFERENCES user(id_user), FOREIGN KEY(id_buku) REFERENCES buku(id_buku) ) ";
        conn.query(sqlTablePeminjaman, function (err, result) {
            if (err) throw err;
              console.log("Table peminjaman created");
        });
    
      } else {
        console.log("Connection Failed");
      }

});
 
//show all user
app.get('/api/users',(req, res) => {
  let sql = "SELECT * FROM user";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//show single users
app.get('/api/users/:id',(req, res) => {
  let sql = "SELECT * FROM product WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 


app.post('/api/users', function(req, res) {
    let sql = `INSERT INTO user(nama, no_telepon, asal, identitas, status, photo) VALUES (?)`;
    
    let values = [
      req.body.nama,
      req.body.no_telepon,
      req.body.asal,
      req.body.identitas,
      req.body.status,
      req.photo
    ];

     conn.query(sql, [values],(err, results) => {
            if(err) throw err;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
          });
  }); 

//update users
app.put('/api/users/:id',(req, res) => {
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete users
app.delete('/api/users/:id',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Server listening
app.listen(4000,() =>{
  console.log('Server started on port 4000...');
});