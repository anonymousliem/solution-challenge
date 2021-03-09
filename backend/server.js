const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const multer = require('multer')
const uploadImage = require('./helpers/helpers')
require('dotenv').config();
var cors = require('cors')
// parse application/json
app.use(bodyParser.json());
app.use(cors())
//create database connection
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
 
//connect to database
conn.connect((err) =>{
     if (!err) {
        console.log("Connected");
        var sqlTableAccount = "CREATE TABLE IF NOT EXISTS account (id_account INT NOT NULL AUTO_INCREMENT, email VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id_account)) ";
        
        conn.query(sqlTableAccount, function (err, result) {
          if (err) throw err;
        });
  
        var sqlTableUser = "CREATE TABLE IF NOT EXISTS user (id_user INT NOT NULL AUTO_INCREMENT, nama VARCHAR(255) NOT NULL, no_telepon INT NOT NULL, asal VARCHAR(255) NOT NULL, identitas VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, photo VARCHAR(255), PRIMARY KEY (id_user), FOREIGN KEY(id_user) REFERENCES account(id_account))";
        
        conn.query(sqlTableUser, function (err, result) {
          if (err) throw err;
        });
    
        var sqlTableBuku = "CREATE TABLE IF NOT EXISTS buku (id_buku INT NOT NULL AUTO_INCREMENT, judul_buku VARCHAR(255) NOT NULL, id_user INT NOT NULL, penulis VARCHAR(255) NOT NULL, tahun_terbit INT NOT NULL, penerbit VARCHAR(255) NOT NULL, jenis VARCHAR(255) NOT NULL, jumlah INT NOT NULL, foto VARCHAR(255), PRIMARY KEY(id_buku), FOREIGN KEY(id_user) REFERENCES user(id_user) )";
        conn.query(sqlTableBuku, function (err, result) {
            if (err) throw err;
        });
    
        var sqlTablePeminjaman = "CREATE TABLE IF NOT EXISTS peminjaman (id_peminjaman INT NOT NULL AUTO_INCREMENT, tanggal_pinjam DATE, tanggal_kembali DATE, id_buku INT NOT NULL, id_user INT NOT NULL, PRIMARY KEY(id_peminjaman), FOREIGN KEY(id_user) REFERENCES user(id_user), FOREIGN KEY(id_buku) REFERENCES buku(id_buku) ) ";
        conn.query(sqlTablePeminjaman, function (err, result) {
            if (err) throw err;
        });
    
      } else {
        console.log("Connection Failed");
      }

});

/**** START  CRUD ACCOUNT *****/
//show all account
app.get('/api/accounts',(req, res) => {
    let sql = "SELECT * FROM account";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//show single account
app.get('/api/accounts/:id',(req, res) => {
    let sql = "SELECT * FROM account WHERE id_account="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//post account
app.post('/api/accounts', function(req, res) {
  let sql = `INSERT INTO account(email, password) VALUES (?)`;
  
  let values = [
    req.body.email,
    req.body.password
  ];

   conn.query(sql, [values],(err, results) => {
          if(err) throw err;
          res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
        });
}); 

//update account
app.put('/api/accounts/:id',(req, res) => {
    let sql = "UPDATE account SET email='"+req.body.email+"', password='"+req.body.password+"' WHERE id_account="+req.params.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

//Delete users
app.delete('/api/accounts/:id',(req, res) => {
    let sql = "DELETE FROM account WHERE id_account="+req.params.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });
  /****  END CRUD ACCOUNT*****/
 
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

  //show single books
app.get('/api/booksfilter',(req, res) => {
  
    let sql = "SELECT * FROM buku WHERE id_buku='"+req.query.id_buku+"' OR judul_buku='"+req.query.judul+"'";
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


/*** MULTER***/
const multerMid = multer({
  storage: multer.memoryStorage(),
  limits: {
    // no larger than 5mb.
    fileSize: 5 * 1024 * 1024,
  },
});

app.disable('x-powered-by')
app.use(multerMid.single('file'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.post('/uploads', async (req, res, next) => {
  try {
    const myFile = req.file
    const imageUrl = await uploadImage(myFile)

    res
      .status(200)
      .json({
        message: "Upload was successful",
        data: imageUrl
      })
  } catch (error) {
    next(error)
  }
})
/*** END MULTER ***/

//Server listening
var port = process.env.PORT || 4000;
app.listen(port,() =>{
  console.log('Server started on port 4000...');
});

