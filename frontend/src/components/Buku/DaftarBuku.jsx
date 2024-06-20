import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import TambahBuku from "./TambahBuku";
import EditBuku from "./EditBuku";
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
   const [currentIdBuku, setCurrentIdBuku] = useState(null);
   const [sortField, setSortField] = useState("id_buku"); // Default sort field
   const [sortDirection, setSortDirection] = useState("asc"); // Default sort direction
   const [search, setSearch] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10);

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
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
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
            notify(toast.success("Buku berhasil dihapus!"));
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
         return (
            d.id_buku.toLowerCase().includes(searchLower) ||
            d.nama_buku.toLowerCase().includes(searchLower) ||
            d.isbn.toLowerCase().includes(searchLower) ||
            d.penulis.toLowerCase().includes(searchLower) ||
            d.penerbit.toLowerCase().includes(searchLower) ||
            d.tahun_terbit.toString().toLowerCase().includes(searchLower) ||
            d.kategori.toLowerCase().includes(searchLower)
         );
      })
      .sort((a, b) => {
         // Check if the values are purely numeric
         const isNumeric = /^\d+$/;
         const aFieldValue = a[sortField] ? a[sortField].toString() : "";
         const bFieldValue = b[sortField] ? b[sortField].toString() : "";

         // If both values are numeric, compare them as numbers
         if (isNumeric.test(aFieldValue) && isNumeric.test(bFieldValue)) {
            return sortDirection === "asc" ? aFieldValue - bFieldValue : bFieldValue - aFieldValue;
         }

         // Regular expression to match the prefix and numeric parts for alphanumeric sorting
         const regex = /([a-zA-Z]+)(\d+)/;
         const aMatch = aFieldValue.match(regex);
         const bMatch = bFieldValue.match(regex);

         if (aMatch && bMatch) {
            const [_, aPrefix, aNumber] = aMatch;
            const [__, bPrefix, bNumber] = bMatch;

            // First, compare the prefixes
            if (aPrefix.toLowerCase() < bPrefix.toLowerCase()) return sortDirection === "asc" ? -1 : 1;
            if (aPrefix.toLowerCase() > bPrefix.toLowerCase()) return sortDirection === "asc" ? 1 : -1;

            // If prefixes are equal, compare the numeric parts
            const aNum = parseInt(aNumber, 10);
            const bNum = parseInt(bNumber, 10);
            return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
         }

         // Fallback to original string comparison if regex match fails
         const aValue = aFieldValue.toLowerCase();
         const bValue = bFieldValue.toLowerCase();
         if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
         if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
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
         <div>
            <h2 className="text-center mt-5 mb-5">Daftar Buku</h2>
            <Form>
               <Row>
                  <Col sm={10}>
                     <Form.Group as={Col} className="mb-3">
                        <Form.Control type="text" placeholder="Cari buku berdasarkan ID Buku, nama buku, ISBN, penulis, penerbit, tahun terbit, atau kategori...." onChange={(e) => setSearch(e.target.value)} />
                     </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group as={Col} className="mb-3">
                        <TambahBuku fetchData={fetchData} />
                     </Form.Group>
                  </Col>
               </Row>
            </Form>
         </div>
         <Table striped bordered hover>
            <thead>
               <tr className="text-center">
                  <th>No.</th>
                  <th onClick={() => handleSort("id_buku")} style={{ cursor: "pointer" }}>
                     ID Buku <SortIcon field="id_buku" />
                  </th>
                  <th onClick={() => handleSort("nama_buku")} style={{ cursor: "pointer" }}>
                     Nama Buku <SortIcon field="nama_buku" />
                  </th>
                  <th onClick={() => handleSort("isbn")} style={{ cursor: "pointer" }}>
                     ISBN <SortIcon field="isbn" />
                  </th>
                  <th onClick={() => handleSort("penulis")} style={{ cursor: "pointer" }}>
                     Penulis <SortIcon field="penulis" />
                  </th>
                  <th onClick={() => handleSort("penerbit")} style={{ cursor: "pointer" }}>
                     Penerbit <SortIcon field="penerbit" />
                  </th>
                  <th onClick={() => handleSort("tahun_terbit")} style={{ cursor: "pointer" }}>
                     Tahun Terbit <SortIcon field="tahun_terbit" />
                  </th>
                  <th onClick={() => handleSort("kategori")} style={{ cursor: "pointer" }}>
                     Kategori <SortIcon field="kategori" />
                  </th>
                  <th onClick={() => handleSort("stok")} style={{ cursor: "pointer" }}>
                     Stok <SortIcon field="stok" />
                  </th>
                  <th style={{ width: "140px" }}>Action</th>
               </tr>
            </thead>
            <tbody>
               {currentItems.map((d, i) => (
                  <tr key={i}>
                     <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                     <td>{d.id_buku}</td>
                     <td>{d.nama_buku}</td>
                     <td>{d.isbn}</td>
                     <td>{d.penulis}</td>
                     <td>{d.penerbit}</td>
                     <td>{d.tahun_terbit}</td>
                     <td>{d.kategori}</td>
                     <td>{d.stok}</td>
                     <td className="text-center">
                        <Button variant="outline-primary" onClick={() => handleShow(d.id_buku)} size="sm" className="mx-1">
                           Edit
                        </Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(d.id_buku)} className="mx-1">
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

         <EditBuku show={show} handleClose={handleClose} currentIdBuku={currentIdBuku} fetchData={fetchData} />
      </>
   );
};

export default DaftarBuku;
