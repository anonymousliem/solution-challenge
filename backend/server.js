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
 
/****  CRUD USER*****/
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
  let sql = "SELECT * FROM user WHERE id_user="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 

//post user
app.post('/api/users', function(req, res) {
    let sql = `INSERT INTO user(nama, no_telepon, asal, identitas, status, photo) VALUES (?)`;
    
    let values = [
      req.body.nama,
      req.body.no_telepon,
      req.body.asal,
      req.body.identitas,
      req.body.status,
      req.body.photo
    ];

     conn.query(sql, [values],(err, results) => {
            if(err) throw err;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
          });
  }); 

//update users
app.put('/api/users/:id',(req, res) => {
  let sql = "UPDATE user SET nama='"+req.body.nama+"', no_telepon='"+req.body.no_telepon+"', asal='"+req.body.asal+"', identitas='"+req.body.identitas+"', status='"+req.body.status+"', photo='"+req.body.photo+"' WHERE id_user="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete users
app.delete('/api/users/:id',(req, res) => {
  let sql = "DELETE FROM user WHERE id_user="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
/**** END CRUD USER*****/

/*** START CRUD BUKU ***/

//show all user
app.get('/api/books',(req, res) => {
    let sql = "SELECT * FROM buku";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//show single books
app.get('/api/books/:id',(req, res) => {
    let sql = "SELECT * FROM buku WHERE id_buku="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });  

//post api book  
app.post('/api/books', function(req, res) {
    let sql = `INSERT INTO buku(judul_buku, id_user, penulis, tahun_terbit, penerbit, jenis, jumlah, foto) VALUES (?)`;
    
    let values = [
      req.body.judul_buku,
      req.body.id_user,
      req.body.penulis,
      req.body.tahun_terbit,
      req.body.penerbit,
      req.body.jenis,
      req.body.jumlah,
      req.body.foto
    ];

     conn.query(sql, [values],(err, results) => {
            if(err) throw err;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
          });
  });

//update books
app.put('/api/books/:id',(req, res) => {
    let sql = "UPDATE buku SET judul_buku='"+req.body.judul_buku+"', id_user='"+req.body.id_user+"', penulis='"+req.body.penulis+"', tahun_terbit='"+req.body.tahun_terbit+"', penerbit='"+req.body.penerbit+"', jenis='"+req.body.jenis+"', jumlah='"+req.body.jumlah+"', foto='"+req.body.foto+"' WHERE id_buku="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//Delete books
app.delete('/api/books/:id',(req, res) => {
    let sql = "DELETE FROM buku WHERE id_buku="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

/**** END CRUD BOOKS*****/

/**** START CRUD PINJAMAN*****/

//get all pinjaman
app.get('/api/peminjamans',(req, res) => {
    let sql = "SELECT * FROM peminjaman";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//show single books
app.get('/api/peminjamans/:id',(req, res) => {
    let sql = "SELECT * FROM peminjaman WHERE id_peminjaman="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//post api pinjaman  
app.post('/api/peminjamans', function(req, res) {
  let sql = `INSERT INTO peminjaman(tanggal_pinjam, tanggal_kembali, id_buku, id_user) VALUES (?)`;
  
  let values = [
    req.body.tanggal_pinjam,
    req.body.tanggal_kembali,
    req.body.id_buku,
    req.body.id_user
  ];

   conn.query(sql, [values],(err, results) => {
          if(err) throw err;
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
});

//update books
app.put('/api/peminjamans/:id',(req, res) => {
    let sql = "UPDATE peminjaman SET tanggal_pinjam='"+req.body.tanggal_pinjam+"', tanggal_kembali='"+req.body.tanggal_kembali+"', id_buku='"+req.body.id_buku+"', id_user='"+req.body.id_user+"' WHERE id_peminjaman="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//Delete books
app.delete('/api/peminjamans/:id',(req, res) => {
    let sql = "DELETE FROM peminjaman WHERE id_peminjaman="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
/**** END CRUD PINJAMAN*****/

//Server listening
app.listen(4000,() =>{
  console.log('Server started on port 4000...');
});

