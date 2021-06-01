const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const multer = require("multer");
const uploadImage = require("./helpers/helpers");
require("dotenv").config();
var cors = require("cors");
var uuid = require("uuid");
require("./spanner.js")  
// parse application/json
app.use(bodyParser.json());
app.use(cors());
//create database connection
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
//connect to database
conn.connect((err) => {
  if (!err) {
    console.log("Connected");
    var sqlTableAccount =
      "CREATE TABLE IF NOT EXISTS account (id_account INT NOT NULL AUTO_INCREMENT, email VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, PRIMARY KEY(id_account)) ";

    conn.query(sqlTableAccount, function (err, result) {
      var checkRowAccount = "SELECT COUNT(*) as total FROM account";
      conn.query(checkRowAccount, function (errs, results) {
        if (results[0].total == 0) {
          var sqlAccountDummy =
            "INSERT INTO account (id_account, email, password) VALUES ('1','muslim@gmail.com','Standar123.'),('2','example@gmail.com','Standar123.')";
          conn.query(sqlAccountDummy, function (errs, resultst) {
            if (errs) throw errs;
          });
          if (err) throw err;
        }
        if (errs) throw errs;
      });
    });

    var sqlTableUser =
      "CREATE TABLE IF NOT EXISTS user (id_user INT NOT NULL AUTO_INCREMENT, nama VARCHAR(255) NOT NULL, no_telepon VARCHAR(255) NOT NULL, asal VARCHAR(255) NOT NULL, identitas VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, photo VARCHAR(255), PRIMARY KEY (id_user), FOREIGN KEY(id_user) REFERENCES account(id_account))";

    conn.query(sqlTableUser, function (err, result) {
      var checkRowUser = "SELECT COUNT(*) as total FROM user";
      conn.query(checkRowUser, function (errs, results) {
        if (results[0].total == 0) {
          var sqlUserDummy =
            "INSERT INTO user (id_user, nama, no_telepon, asal, identitas, status, photo) VALUES ('1','muslim','6281234567890', 'jl.kejaksaan agung no 12 medan', '12345678890' ,'verified','http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'),('2','example','628123123123', 'jl. sisimangaraja no 12 jakarta','12331121213','verified','http://s3.amazonaws.com/37assets/svn/765-default-avatar.png')";
          conn.query(sqlUserDummy, function (errs, resultst) {
            if (errs) throw errs;
          });
          if (err) throw err;
        }
        if (errs) throw errs;
      });
    });

    var sqlTableBuku =
      "CREATE TABLE IF NOT EXISTS buku (id_buku INT NOT NULL AUTO_INCREMENT, judul_buku VARCHAR(255) NOT NULL, id_user INT NOT NULL, penulis VARCHAR(255) NOT NULL, tahun_terbit INT NOT NULL, penerbit VARCHAR(255) NOT NULL, jenis VARCHAR(255) NOT NULL, jumlah INT NOT NULL, foto VARCHAR(255), PRIMARY KEY(id_buku), FOREIGN KEY(id_user) REFERENCES user(id_user) )";
    conn.query(sqlTableBuku, function (err, result) {
      var checkRowBuku = "SELECT COUNT(*) as total FROM buku";
      conn.query(checkRowBuku, function (errs, results) {
        if (results[0].total == 0) {
          var sqlBukuDummy =
            "INSERT INTO buku (id_buku, judul_buku, id_user, penulis, tahun_terbit, penerbit, jenis, jumlah, foto) VALUES ('1', 'bumi', '1', 'tere liye', '2020', 'gramedia', 'novel fiksi', '1', 'https://www.bukukita.com/babacms/displaybuku/95219_f.jpg'),('2', 'bulan', '1', 'tere liye', '2020', 'gramedia', 'novel fiksi', '1', 'https://www.bukukita.com/babacms/displaybuku/95221_f.jpg'),('3', 'matahari', '2', 'tere liye', '2020', 'gramedia', 'novel fiksi', '1', 'https://ebooks.gramedia.com/ebook-covers/33455/big_covers/ID_GPU2016MTH07MATA_B.jpg'),('4', 'komet', '2', 'tere liye', '2020', 'gramedia', 'novel fiksi', '1', 'https://inc.mizanstore.com/aassets/img/com_cart/produk/komet-tere-liye.jpg')";
          conn.query(sqlBukuDummy, function (errs, resultst) {
            if (errs) throw errs;
          });
          if (err) throw err;
        }
        if (errs) throw errs;
      });
    });

    var sqlTablePeminjaman =
      "CREATE TABLE IF NOT EXISTS peminjaman (id_peminjaman INT NOT NULL AUTO_INCREMENT, tanggal_pinjam DATE, tanggal_kembali DATE, id_buku INT NOT NULL, id_user INT NOT NULL, PRIMARY KEY(id_peminjaman), FOREIGN KEY(id_user) REFERENCES user(id_user), FOREIGN KEY(id_buku) REFERENCES buku(id_buku) ) ";
    conn.query(sqlTablePeminjaman, function (err, result) {
      if (err) throw err;
    });

    var sqlViewAllDatas =
      "CREATE OR REPLACE VIEW AllData as SELECT account.email, user.id_user, user.nama, user.no_telepon, user.asal, user.status, user.photo,buku.id_buku,buku.judul_buku,buku.penulis,buku.tahun_terbit,buku.penerbit,buku.jenis,buku.jumlah,buku.foto FROM account INNER JOIN user INNER JOIN buku ON account.id_account = user.id_user AND buku.id_user = user.id_user";
    conn.query(sqlViewAllDatas, function (err, result) {
      if (err) throw err;
    });
  } else {
    console.log("Connection Failed");
  }
});

/**** START  CRUD ACCOUNT *****/
//login api

//show all account
app.get("/api/accounts", (req, res) => {
  let sql = "SELECT * FROM account";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//show single account
app.get("/api/accounts/:id", (req, res) => {
  let sql = "SELECT * FROM account WHERE id_account=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//post account
app.post("/api/accounts", function (req, res) {
  let sql = `INSERT INTO account(email, password) VALUES (?)`;

  let values = [req.body.email, req.body.password];

  conn.query(sql, [values], (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});
//update account
app.put("/api/accounts/:id", (req, res) => {
  let sql =
    "UPDATE account SET email='" +
    req.body.email +
    "', password='" +
    req.body.password +
    "' WHERE id_account=" +
    req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//Delete users
app.delete("/api/accounts/:id", (req, res) => {
  let sql = "DELETE FROM account WHERE id_account=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//LOGIN USERTS
app.post("/api/login", function (req, res) {
  let sql =
    "SELECT * FROM account WHERE email='" +
    req.body.email +
    "' AND password='" +
    req.body.password +
    "'";

  let values = [req.body.email, req.body.password];

  conn.query(sql, [values], (err, results) => {
    let random = Math.random().toString(36).substr(2, 36);
    if (err) throw err;
    res.send(
      JSON.stringify({
        status: 200,
        error: null,
        response: results,
        token: uuid.v4(),
      })
    );
  });
});
/****  END CRUD ACCOUNT*****/
/****  CRUD USER*****/
//show all user
app.get("/api/users", (req, res) => {
  let sql = "SELECT * FROM user";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});
//show single users
app.get("/api/users/:id", (req, res) => {
  let sql = "SELECT * FROM user WHERE id_user=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});
//post user
app.post("/api/users", function (req, res) {
  let sql = `INSERT INTO user(nama, no_telepon, asal, identitas, status, photo) VALUES (?)`;

  let values = [
    req.body.nama,
    req.body.no_telepon,
    req.body.asal,
    req.body.identitas,
    req.body.status,
    req.body.photo,
  ];

  conn.query(sql, [values], (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});
//update users
app.put("/api/users/:id", (req, res) => {
  let sql =
    "UPDATE user SET nama='" +
    req.body.nama +
    "', no_telepon='" +
    req.body.no_telepon +
    "', asal='" +
    req.body.asal +
    "', identitas='" +
    req.body.identitas +
    "', status='" +
    req.body.status +
    "', photo='" +
    req.body.photo +
    "' WHERE id_user=" +
    req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});
//Delete users
app.delete("/api/users/:id", (req, res) => {
  let sql = "DELETE FROM user WHERE id_user=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});
/**** END CRUD USER*****/

/*** START CRUD BUKU ***/

//show all user
app.get("/api/books", (req, res) => {
  let sql = "SELECT * FROM buku";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//show single books
app.get("/api/books/:id", (req, res) => {
  let sql = "SELECT * FROM buku WHERE id_buku=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//show single books
app.get("/api/booksfilter", (req, res) => {
  let sql =
    "SELECT * FROM buku WHERE id_buku='" +
    req.query.id_buku +
    "' OR judul_buku='" +
    req.query.judul +
    "'";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//post api book
app.post("/api/books", function (req, res) {
  let sql = `INSERT INTO buku(judul_buku, id_user, penulis, tahun_terbit, penerbit, jenis, jumlah, foto) VALUES (?)`;

  let values = [
    req.body.judul_buku,
    req.body.id_user,
    req.body.penulis,
    req.body.tahun_terbit,
    req.body.penerbit,
    req.body.jenis,
    req.body.jumlah,
    req.body.foto,
  ];

  conn.query(sql, [values], (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//update books
app.put("/api/books/:id", (req, res) => {
  let sql =
    "UPDATE buku SET judul_buku='" +
    req.body.judul_buku +
    "', id_user='" +
    req.body.id_user +
    "', penulis='" +
    req.body.penulis +
    "', tahun_terbit='" +
    req.body.tahun_terbit +
    "', penerbit='" +
    req.body.penerbit +
    "', jenis='" +
    req.body.jenis +
    "', jumlah='" +
    req.body.jumlah +
    "', foto='" +
    req.body.foto +
    "' WHERE id_buku=" +
    req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//Delete books
app.delete("/api/books/:id", (req, res) => {
  let sql = "DELETE FROM buku WHERE id_buku=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

/**** END CRUD BOOKS*****/

/**** START CRUD PINJAMAN*****/

//get all pinjaman
app.get("/api/peminjamans", (req, res) => {
  let sql = "SELECT * FROM peminjaman";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//show single books
app.get("/api/peminjamans/:id", (req, res) => {
  let sql = "SELECT * FROM peminjaman WHERE id_peminjaman=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//post api pinjaman
app.post("/api/peminjamans", function (req, res) {
  let sql = `INSERT INTO peminjaman(tanggal_pinjam, tanggal_kembali, id_buku, id_user) VALUES (?)`;

  let values = [
    req.body.tanggal_pinjam,
    req.body.tanggal_kembali,
    req.body.id_buku,
    req.body.id_user,
  ];

  conn.query(sql, [values], (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//update books
app.put("/api/peminjamans/:id", (req, res) => {
  let sql =
    "UPDATE peminjaman SET tanggal_pinjam='" +
    req.body.tanggal_pinjam +
    "', tanggal_kembali='" +
    req.body.tanggal_kembali +
    "', id_buku='" +
    req.body.id_buku +
    "', id_user='" +
    req.body.id_user +
    "' WHERE id_peminjaman=" +
    req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

//Delete books
app.delete("/api/peminjamans/:id", (req, res) => {
  let sql = "DELETE FROM peminjaman WHERE id_peminjaman=" + req.params.id + "";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
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

app.disable("x-powered-by");
app.use(multerMid.single("file"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/uploads", async (req, res, next) => {
  try {
    const myFile = req.file;
    const imageUrl = await uploadImage(myFile);

    res.status(200).json({
      message: "Upload was successful",
      data: imageUrl,
    });
  } catch (error) {
    next(error);
  }
});

/*** END MULTER ***/
app.get("/api/alldata", (req, res) => {
  let sql = "SELECT * FROM AllData";
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});

app.get("/api/mybooks/:id", (req, res) => {
  let sql = "SELECT * FROM AllData WHERE id_user=" + req.params.id;
  let query = conn.query(sql, (err, results) => {
    if (err) throw err;
    res.send(JSON.stringify({ status: 200, error: null, response: results }));
  });
});
/*** all data view****/

/*** end data view ***/

app.get('/hmm', (req, res) => {

  res.send('Hello World!!!')

})

//Server listening
var port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server started on port 4000...");

});
