import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { format } from "date-fns";
import KembalikanButton from "./KembalikanButton";

const DaftarPeminjamanBuku = () => {
   const [data, setData] = useState([]);

   useEffect(() => {
      fetch("http://localhost:5000/daftarpeminjaman")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setData(data))
         .catch((err) => console.error("Fetch error: ", err));
   }, []);

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      return format(date, "dd MMM yyyy HH:mm:ss");
   };

   return (
      <>
         <div className="container mt-5">
            <h2 className="text-center m-4">Daftar Peminjaman</h2>
            <Table striped bordered hover>
               <thead>
                  <tr>
                     <th>ID Peminjaman</th>
                     <th>NIM</th>
                     <th>Nama Mahasiswa</th>
                     <th>ID Buku</th>
                     <th>Nama Buku</th>
                     <th>Tanggal Pinjam</th>
                     <th>Status Pengembalian</th>
                     <th>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {data.map((d, i) => (
                     <tr key={i}>
                        <td>{d.id_peminjaman}</td>
                        <td>{d.nim}</td>
                        <td>{d.nama_mahasiswa}</td>
                        <td>{d.id_buku}</td>
                        <td>{d.nama_buku}</td>
                        <td>{formatDate(d.tanggal_pinjam)}</td>
                        <td>{d.status_pengembalian}</td>
                        <td>
                           <KembalikanButton />
                        </td>
                     </tr>
                  ))}
               </tbody>
            </Table>
         </div>
      </>
   );
};

export default DaftarPeminjamanBuku;
