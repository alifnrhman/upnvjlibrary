import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import EditMahasiswa from "./EditMahasiswa";
import TambahMahasiswa from "./TambahMahasiswa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";

const DaftarBuku = () => {
   const [data, setData] = useState([]);
   const [show, setShow] = useState(false);
   const [currentIdMahasiswa, setCurrentIdMahasiswa] = useState(null);
   const [sortField, setSortField] = useState("id"); // Default sort field
   const [sortDirection, setSortDirection] = useState("asc"); // Default sort direction
   const [search, setSearch] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust as needed

   const handleClose = () => {
      setShow(false);
      setCurrentIdMahasiswa(null);
   };

   const handleShow = (id) => {
      setCurrentIdMahasiswa(id);
      setShow(true);
   };

   const fetchData = () => {
      fetch("http://localhost:5000/daftarmahasiswa")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setData(data))
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleDelete = (id) => {
      fetch(`http://localhost:5000/mahasiswa/delete/${id}`, {
         method: "DELETE",
      })
         .then((res) => {
            console.log(res);
            fetchData();
            notify(toast.success("Data mahasiswa berhasil dihapus!"));
         })
         .catch((err) => {
            console.log(err);
            notify(toast.error("Terjadi kesalahan!"));
         });
   };

   const notify = () => {
      toast.success({
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: false,
         pauseOnHover: false,
         draggable: false,
         progress: undefined,
         theme: "light",
         transition: Bounce,
      });

      toast.error({
         position: "top-center",
         autoClose: 5000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: false,
         draggable: false,
         progress: undefined,
         theme: "light",
         transition: Bounce,
      });
   };

   const handleSort = (field) => {
      if (sortField === field) {
         setSortDirection(sortDirection === "asc" ? "desc" : "asc");
      } else {
         setSortField(field);
         setSortDirection("asc");
      }
   };

   const filteredAndSortedData = [...data]
      .filter((d) => {
         // Convert search input and fields to lowercase for case-insensitive comparison
         const searchLower = search.toLowerCase();
         return d.id.toString().toLowerCase().includes(searchLower) || d.nim.toString().toLowerCase().includes(searchLower) || d.nama.toLowerCase().includes(searchLower) || d.jurusan.toLowerCase().includes(searchLower);
      })
      .sort((a, b) => {
         if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
         if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
         return 0;
      });

   const SortIcon = ({ field }) => {
      if (sortField !== field) {
         return <FontAwesomeIcon icon={faSort} className="fas fa-camera" color={"gray"} size="xs" />;
      }
      return sortDirection === "asc" ? <FontAwesomeIcon icon={faSortUp} className="fas fa-camera" color={"gray"} size="xs" /> : <FontAwesomeIcon icon={faSortDown} className="fas fa-camera" color={"gray"} size="xs" />;
   };

   const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

   const indexOfLastItem = currentPage * itemsPerPage;
   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
   const currentItems = filteredAndSortedData.slice(indexOfFirstItem, indexOfLastItem);

   const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
   };

   const renderPagination = () => {
      let items = [];
      // First Button
      items.push(<Pagination.First key="first" onClick={() => handlePageChange(1)} disabled={currentPage === 1} />);

      // Previous Button
      items.push(<Pagination.Prev key="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />);

      // Page Numbers
      for (let number = 1; number <= totalPages; number++) {
         items.push(
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
               {number}
            </Pagination.Item>
         );
      }
      // Next Button
      items.push(<Pagination.Next key="next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />);
      // Last Button
      items.push(<Pagination.Last key="last" onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />);
      return (
         <div className="d-flex justify-content-center">
            <Pagination>{items}</Pagination>
         </div>
      );
   };

   const handleItemsPerPageChange = (newItemsPerPage) => {
      setItemsPerPage(Number(newItemsPerPage));
      setCurrentPage(1); // Reset to first page
   };

   return (
      <>
         <div className="container mt-5">
            <div>
               <h2 className="text-center mt-5 mb-5">Daftar Mahasiswa</h2>
               <Form>
                  <Row>
                     <Col sm={10}>
                        <Form.Group as={Col} className="mb-3">
                           <Form.Control type="text" placeholder="Cari mahasiswa berdasarkan ID, nama, NIM, atau jurusan...." onChange={(e) => setSearch(e.target.value)} />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group as={Col} className="mb-3">
                           <TambahMahasiswa fetchData={fetchData} />
                        </Form.Group>
                     </Col>
                  </Row>
               </Form>
            </div>
            <Table striped bordered hover>
               <thead>
                  <tr className="text-center">
                     <th onClick={() => handleSort("id")} style={{ cursor: "pointer", width: "50px" }}>
                        ID <SortIcon field="id" />
                     </th>
                     <th onClick={() => handleSort("nim")} style={{ cursor: "pointer", width: "120px" }}>
                        NIM <SortIcon field="nim" />
                     </th>
                     <th onClick={() => handleSort("nama")} style={{ cursor: "pointer" }}>
                        Nama <SortIcon field="nama" />
                     </th>
                     <th onClick={() => handleSort("jurusan")} style={{ cursor: "pointer" }}>
                        Jurusan <SortIcon field="jurusan" />
                     </th>
                     <th style={{ width: "140px" }}>Action </th>
                  </tr>
               </thead>
               <tbody>
                  {currentItems.map((d, i) => (
                     <tr key={i}>
                        <td>{d.id}</td>
                        <td>{d.nim}</td>
                        <td>{d.nama}</td>
                        <td>{d.jurusan}</td>
                        <td className="text-center">
                           <Button variant="outline-primary" onClick={() => handleShow(d.id)} size="sm" className="mx-1">
                              Edit
                           </Button>
                           <Button variant="outline-danger" size="sm" onClick={() => handleDelete(d.id)} className="mx-1">
                              Hapus
                           </Button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </Table>
            <div className="mt-2">
               <Form>
                  <Row>
                     <Col sm={1}>
                        <Form.Group as={Col} className="mb-3">
                           <Form.Select onChange={(e) => handleItemsPerPageChange(e.target.value)} defaultValue={"10"}>
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="20">20</option>
                              <option value="50">50</option>
                           </Form.Select>
                        </Form.Group>
                     </Col>
                     <Col sm={10}>
                        <Form.Group as={Col} className="mb-3">
                           {renderPagination()}
                        </Form.Group>
                     </Col>
                  </Row>
               </Form>
            </div>
            <EditMahasiswa show={show} handleClose={handleClose} currentIdMahasiswa={currentIdMahasiswa} fetchData={fetchData} />
         </div>
      </>
   );
};

export default DaftarBuku;
