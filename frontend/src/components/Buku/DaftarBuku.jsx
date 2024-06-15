import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import TambahBuku from "./TambahBuku";
import EditBuku from "./EditBuku";

const DaftarBuku = () => {
   const [data, setData] = useState([]);
   const [show, setShow] = useState(false);
   const [currentIdBuku, setCurrentIdBuku] = useState(null);

   const handleClose = () => {
      setShow(false);
      setCurrentIdBuku(null);
   };

   const handleShow = (id_buku) => {
      setCurrentIdBuku(id_buku);
      setShow(true);
   };

   const fetchData = () => {
      fetch("http://localhost:5000/buku")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setData(data))
         .catch((err) => console.error("Fetch error: ", err));
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleDelete = (id_buku) => {
      fetch(`http://localhost:5000/buku/delete/${id_buku}`, {
         method: "DELETE",
      })
         .then((res) => {
            console.log(res);
            fetchData();
         })
         .catch((err) => console.log(err));
   };

   return (
      <>
         <div>
            <h2 className="text-center mt-5 mb-2">Daftar Buku</h2>
            <TambahBuku fetchData={fetchData} />
         </div>
         <Table striped bordered hover>
            <thead>
               <tr>
                  <th>No.</th>
                  <th>ID Buku</th>
                  <th>Nama Buku</th>
                  <th>ISBN</th>
                  <th>Penulis</th>
                  <th>Penerbit</th>
                  <th>Tahun Terbit</th>
                  <th>Kategori</th>
                  <th>Stok</th>
                  <th>Action</th>
               </tr>
            </thead>
            <tbody>
               {data.map((d, i) => (
                  <tr key={i}>
                     <td>{i + 1}</td>
                     <td>{d.id_buku}</td>
                     <td>{d.nama_buku}</td>
                     <td>{d.isbn}</td>
                     <td>{d.penulis}</td>
                     <td>{d.penerbit}</td>
                     <td>{d.tahun_terbit}</td>
                     <td>{d.kategori}</td>
                     <td>{d.stok_buku}</td>
                     <td>
                        <Button variant="primary" onClick={() => handleShow(d.id_buku)} size="sm">
                           Edit
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(d.id_buku)}>
                           Hapus
                        </Button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </Table>
         <EditBuku show={show} handleClose={handleClose} currentIdBuku={currentIdBuku} fetchData={fetchData} />
      </>
   );
};

export default DaftarBuku;
