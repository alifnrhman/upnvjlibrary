const express = require("express");
const cors = require("cors");
const db = require("./connection");

const port = 5000;
const app = express();

app.use(cors());
app.use(express.json());

// app.post("/add_user", (req, res) => {
//    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
//    const values = [req.body.username, req.body.password];
//    db.query(sql, values, (err, result) => {
//       if (err) console.log(err);
//       return res.json({ success: "User added successfully" });
//    });
// });

app.post("/tambahbuku", (req, res) => {
   const sql = `INSERT INTO buku (id_buku, nama_buku, isbn, penulis, penerbit, tahun_terbit, kategori, stok_buku) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
   const values = [req.body.id_buku, req.body.nama_buku, req.body.isbn, req.body.penulis, req.body.penerbit, req.body.tahun_terbit, req.body.kategori, req.body.stok_buku];
   db.query(sql, values, (err, result) => {
      if (err) console.log(err);
      return res.json({ success: "Book added successfully" });
   });
});

app.get("/buku", (req, res) => {
   const sql = `SELECT * FROM buku`;
   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// delete book
app.delete("/buku/delete/:id_buku", (req, res) => {
   const sql = `DELETE FROM buku WHERE id_buku = ?`;
   db.query(sql, req.params.id_buku, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         return res.json({ success: "Book deleted successfully" });
      }
   });
});

// select book by id
app.get("/buku/getrecord/:id_buku", (req, res) => {
   const sql = `SELECT * FROM buku WHERE id_buku = ?`;
   db.query(sql, req.params.id_buku, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         return res.json(result);
      }
   });
});

// update book
app.put("/buku/update/:id_buku", (req, res) => {
   const sql = `UPDATE buku SET id_buku = ?, nama_buku = ?, isbn = ?, penulis = ?, penerbit = ?, tahun_terbit = ?, kategori = ?, stok_buku = ? WHERE id_buku = ?`;
   const values = [req.body.id_buku, req.body.nama_buku, req.body.isbn, req.body.penulis, req.body.penerbit, req.body.tahun_terbit, req.body.kategori, req.body.stok_buku, req.params.id_buku];
   db.query(sql, values, (err, result) => {
      if (err) {
         throw err;
      } else {
         res.send(result);
      }
   });
});

// GET data peminjaman
app.get("/daftarpeminjaman", (req, res) => {
   const sql = `SELECT * FROM peminjaman`;
   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

app.listen(port, () => {
   console.log("Listening on port", port);
});
