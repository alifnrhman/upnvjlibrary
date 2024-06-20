const express = require("express");
const cors = require("cors");
const db = require("./connection");
const moment = require("moment-timezone");

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
   const sql = `INSERT INTO buku (id_buku, nama_buku, isbn, penulis, penerbit, tahun_terbit, kategori, stok) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
   const values = [req.body.id_buku, req.body.nama_buku, req.body.isbn, req.body.penulis, req.body.penerbit, req.body.tahun_terbit, req.body.kategori, req.body.stok];
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

// Add mahasiswa
app.post("/tambahmahasiswa", (req, res) => {
   const sql = `INSERT INTO mahasiswa (id, nama, nim, jurusan) VALUES (?, ?, ?, ?)`;
   const values = [req.body.id, req.body.nama, req.body.nim, req.body.jurusan];
   db.query(sql, values, (err, result) => {
      if (err) console.log(err);
      return res.json({ success: "Mahasiswa added successfully" });
   });
});

// delete mahasiswa
app.delete("/mahasiswa/delete/:id", (req, res) => {
   const sql = `DELETE FROM mahasiswa WHERE id = ?`;
   db.query(sql, req.params.id, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         return res.json({ success: "Book deleted successfully" });
      }
   });
});

// update mahasiswa
app.put("/mahasiswa/update/:id", (req, res) => {
   const sql = `UPDATE mahasiswa SET id = ?, nim = ?, nama = ?, jurusan = ? WHERE id = ?`;
   const values = [req.body.id, req.body.nim, req.body.nama, req.body.jurusan, req.params.id];
   db.query(sql, values, (err, result) => {
      if (err) {
         throw err;
      } else {
         res.send(result);
      }
   });
});

// select mahasiswa by id
app.get("/mahasiswa/getrecord/:id", (req, res) => {
   const sql = `SELECT * FROM mahasiswa WHERE id = ?`;
   db.query(sql, req.params.id, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         return res.json(result);
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
   const sql = `UPDATE buku SET id_buku = ?, nama_buku = ?, isbn = ?, penulis = ?, penerbit = ?, tahun_terbit = ?, kategori = ?, stok = ? WHERE id_buku = ?`;
   const values = [req.body.id_buku, req.body.nama_buku, req.body.isbn, req.body.penulis, req.body.penerbit, req.body.tahun_terbit, req.body.kategori, req.body.stok, req.params.id_buku];
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

// Fetch peminjaman details
app.get("/peminjaman/:id_peminjaman", (req, res) => {
   const sql = `SELECT * FROM peminjaman WHERE id_peminjaman = ?`;
   db.query(sql, req.params.id_peminjaman, (err, result) => {
      if (err) {
         console.log(err);
         res.status(500).send("Error fetching peminjaman details");
      } else {
         res.json(result[0]); // Assuming id_peminjaman is unique and only one record is returned
      }
   });
});

// Adjusted endpoint for returning a book
app.post("/kembalikan/:id", (req, res) => {
   // Adjust tanggal_pinjam to the correct timezone
   const tanggalPinjamCorrected = moment(req.body.tanggal_pinjam).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");

   const sqlInsert = `INSERT INTO riwayat_peminjaman (id_peminjaman, id_buku, nim, tanggal_pinjam) VALUES (?, ?, ?, ?)`;
   const valuesInsert = [req.body.id_peminjaman, req.body.id_buku, req.body.nim, tanggalPinjamCorrected];

   db.query(sqlInsert, valuesInsert, (err, result) => {
      if (err) {
         console.log(err);
         res.status(500).send("Error inserting into riwayatpeminjaman");
      } else {
         // After successful insertion, delete from peminjaman
         const sqlDelete = `DELETE FROM peminjaman WHERE id_peminjaman = ?`;
         db.query(sqlDelete, req.body.id_peminjaman, (err, result) => {
            if (err) {
               console.log(err);
               res.status(500).send("Error deleting from peminjaman");
            } else {
               res.json({ success: "Book returned successfully" });
            }
         });
      }
   });
});

// GET riwayat peminjaman
app.get("/riwayatpeminjaman", (req, res) => {
   const sql = `SELECT riwayat_peminjaman.id_peminjaman, riwayat_peminjaman.id_buku, riwayat_peminjaman.nim, riwayat_peminjaman.tanggal_pinjam, riwayat_peminjaman.tanggal_pengembalian, denda.total_denda
FROM riwayat_peminjaman
INNER JOIN denda ON riwayat_peminjaman.id_peminjaman = denda.id_peminjaman`;
   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// POST tambah peminjaman
app.post("/tambahpeminjaman", (req, res) => {
   const sql = `INSERT INTO peminjaman (id_buku, nim) VALUES (?, ?)`;
   const values = [req.body.id_buku, req.body.nim];
   db.query(sql, values, (err, result) => {
      if (err) console.log(err);
      return res.json({ success: "Book added successfully" });
   });
});

// delete peminjaman
app.delete("/deletepeminjaman/:id_peminjaman", (req, res) => {
   const sql = `DELETE FROM peminjaman WHERE id_peminjaman = ?`;
   db.query(sql, req.params.id_peminjaman, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         return res.json(result);
      }
   });
});

// GET riwayat peminjaman
app.get("/daftarmahasiswa", (req, res) => {
   const sql = `SELECT * FROM mahasiswa`;
   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// GET stats
app.get("/stats", (req, res) => {
   const sql = `SELECT
    JumlahBuku() AS jumlah_buku,
    JumlahPeminjaman() AS jumlah_peminjaman,
    JumlahRiwayatPeminjaman() AS jumlah_riwayat_peminjaman,
    JumlahMahasiswa() AS jumlah_mahasiswa`;

   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// GET stats buku dipinjam bulan ini
app.get("/bukudipinjambulanini", (req, res) => {
   const sql = `SELECT SUM(jumlah) AS total_buku_dipinjam
FROM ( SELECT COUNT(id_peminjaman) AS jumlah
    FROM peminjaman
    WHERE MONTH(tanggal_pinjam) = MONTH(CURDATE()) AND YEAR(tanggal_pinjam) = YEAR(CURDATE())
    UNION ALL
    SELECT COUNT(id_peminjaman) AS jumlah
    FROM riwayat_peminjaman
    WHERE MONTH(tanggal_pinjam) = MONTH(CURDATE()) AND YEAR(tanggal_pinjam) = YEAR(CURDATE())) AS counts;
`;

   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// GET stats buku dikembalikan bulan ini
app.get("/bukudikembalikanbulanini", (req, res) => {
   const sql = `SELECT COUNT(id_peminjaman) AS jumlah_pengembalian_bulan_ini FROM riwayat_peminjaman WHERE MONTH(tanggal_pengembalian) = MONTH(CURDATE()) AND YEAR(tanggal_pengembalian) = YEAR(CURDATE());`;

   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// GET stats buku belum dikembalikan bulan ini
app.get("/bukubelumdikembalikanbulanini", (req, res) => {
   const sql = `SELECT COUNT(id_peminjaman) AS jumlah_buku_belum_dikembalikan_bulan_ini FROM peminjaman WHERE MONTH(tanggal_pinjam) = MONTH(CURDATE()) 
  AND YEAR(tanggal_pinjam) = YEAR(CURDATE())
  AND (status_pengembalian IS NULL OR status_pengembalian = 0);`;

   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// GET stats buku terlambat dikembalikan bulan ini
app.get("/bukubelumdikembalikandanterlambatdikembalikanbulanini", (req, res) => {
   const sql = `SELECT
    COUNT(DISTINCT p.id_buku) AS jumlah_buku_terlambat
FROM
    peminjaman p
    JOIN buku b ON p.id_buku = b.id_buku
WHERE
DATEDIFF(CURDATE(), p.tanggal_pinjam) > 7;

`;

   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// GET stats buku dikembalikan terlambat bulan ini
app.get("/bukudikembalikanterlambat", (req, res) => {
   const sql = `SELECT
    COUNT(DISTINCT r.id_peminjaman) AS jumlah_buku_dikembalikan_terlambat
FROM
    riwayat_peminjaman r
WHERE
    DATEDIFF(r.tanggal_pengembalian, r.tanggal_pinjam) > 7;
`;

   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// GET stats total denda dibayarkan bulan ini
app.get("/dendadibayarkanbulanini", (req, res) => {
   const sql = `SELECT SUM(total_denda) AS total_denda_bulan_ini
FROM denda
WHERE MONTH(tanggal_pengembalian) = MONTH(CURDATE())
  AND YEAR(tanggal_pengembalian) = YEAR(CURDATE());

`;

   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// GET stats nim dan nama mahasiswa dengan peminjaman terbanyak bulan ini
app.get("/mahasiswaofthemonth", (req, res) => {
   const sql = `SELECT 
    m.nim,
    m.nama
FROM 
    mahasiswa m
JOIN (
    SELECT 
        nim,
        COUNT(id_peminjaman) AS total_dipinjam
    FROM 
        riwayat_peminjaman
    WHERE 
        MONTH(tanggal_pinjam) = MONTH(CURRENT_DATE())
        AND YEAR(tanggal_pinjam) = YEAR(CURRENT_DATE())
    GROUP BY 
        nim
    ORDER BY 
        total_dipinjam DESC
    LIMIT 1
) pb ON m.nim = pb.nim;`;

   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// GET stats jumlah buku dipinjam oleh mahasiswa of the month
app.get("/jumlahbukumahasiswaofthemonth", (req, res) => {
   const sql = `SELECT 
    pb.total_dipinjam AS total_buku_dipinjam
FROM 
    mahasiswa m
JOIN (
    SELECT 
        nim,
        COUNT(id_peminjaman) AS total_dipinjam
    FROM 
        riwayat_peminjaman
    WHERE 
        MONTH(tanggal_pinjam) = MONTH(CURRENT_DATE())
        AND YEAR(tanggal_pinjam) = YEAR(CURRENT_DATE())
    GROUP BY 
        nim
    ORDER BY 
        total_dipinjam DESC
    LIMIT 1
) pb ON m.nim = pb.nim;
`;

   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// GET stats jumlah buku dipinjam oleh mahasiswa of the month
app.get("/jumlahtepatwaktumahasiswaofthemonth", (req, res) => {
   const sql = `SELECT 
    COUNT(CASE WHEN d.total_denda <= 0 THEN 1 END) AS jumlah_kembali_tepat_waktu
FROM 
    mahasiswa m
JOIN (
    SELECT 
        nim,
        COUNT(id_peminjaman) AS total_dipinjam
    FROM 
        riwayat_peminjaman
    WHERE 
        MONTH(tanggal_pinjam) = MONTH(CURRENT_DATE())
        AND YEAR(tanggal_pinjam) = YEAR(CURRENT_DATE())
    GROUP BY 
        nim
    ORDER BY 
        total_dipinjam DESC
    LIMIT 1
) pt ON m.nim = pt.nim
JOIN 
    riwayat_peminjaman rp ON m.nim = rp.nim
LEFT JOIN 
    denda d ON rp.id_peminjaman = d.id_peminjaman
WHERE 
    rp.tanggal_pengembalian <= rp.tanggal_pinjam + INTERVAL 30 DAY
GROUP BY 
    m.nim;`;

   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// GET stats buku paling banyak dipinjam
app.get("/bukuterbanyak", (req, res) => {
   const sql = `CALL BukuTerbanyakDipinjam();`;

   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

// GET stats buku paling banyak dipinjam bulan ini
app.get("/bukuterbanyakbulanini", (req, res) => {
   const sql = `CALL BukuTerbanyakDipinjamBulanIni();`;

   db.query(sql, (err, data) => {
      if (err) throw err;
      return res.json(data);
   });
});

app.listen(port, () => {
   console.log("Listening on port", port);
});
