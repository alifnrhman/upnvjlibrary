import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { format } from "date-fns";
import Button from "react-bootstrap/Button";
import TambahPeminjaman from "./TambahPeminjaman";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";

const DaftarPeminjamanBuku = () => {
   const [data, setData] = useState([]);
   const [sortField, setSortField] = useState("id_peminjaman"); // Default sort field
   const [sortDirection, setSortDirection] = useState("asc"); // Default sort direction
   const [search, setSearch] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust as needed

   const fetchData = () => {
      fetch("http://localhost:5000/daftarpeminjaman")
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

   const handleReturn = (id_peminjaman) => {
      fetch(`http://localhost:5000/peminjaman/${id_peminjaman}`)
         .then((res) => res.json())
         .then((data) => {
            const returnData = {
               id_peminjaman: data.id_peminjaman,
               id_buku: data.id_buku,
               nim: data.nim,
               tanggal_pinjam: data.tanggal_pinjam,
            };

            fetch(`http://localhost:5000/kembalikan/${id_peminjaman}`, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json",
               },
               body: JSON.stringify(returnData),
            })
               .then((res) => {
                  console.log(res);
                  fetchData();
                  notify(toast.success("Buku berhasil dikembalikan!"));
               })
               .catch((err) => {
                  console.log(err);
                  notify(toast.error("Terjadi kesalahan!"));
               });
         })
         .catch((err) => {
            console.log(err);
            notify(toast.error("Terjadi kesalahan!"));
         });
   };

   const formatDate = (dateString) => {
      const date = new Date(dateString);
      return format(date, "dd MMM yyyy HH:mm:ss");
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
            (d.id_peminjaman ? d.id_peminjaman.toString().toLowerCase() : "").includes(searchLower) ||
            (d.nim ? d.nim.toString().toLowerCase() : "").includes(searchLower) ||
            (d.id_buku ? d.id_buku.toString().toLowerCase() : "").includes(searchLower) ||
            (d.tanggal_pinjam ? d.tanggal_pinjam.toString().toLowerCase() : "").includes(searchLower) ||
            (d.status_pengembalian ? d.status_pengembalian.toString().toLowerCase() : "").includes(searchLower)
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
         <div className="container mt-5">
            <h2 className="text-center mt-5 mb-2">Daftar Peminjaman</h2>
            <div className="mt-5">
               <Form>
                  <Row>
                     <Col sm={10}>
                        <Form.Group as={Col} className="mb-3">
                           <Form.Control type="text" placeholder="Cari berdasarkan ID Peminjaman, NIM, ID Buku, atau tanggal pinjam...." onChange={(e) => setSearch(e.target.value)} />
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group as={Col} className="mb-3">
                           <TambahPeminjaman fetchData={fetchData} />
                        </Form.Group>
                     </Col>
                  </Row>
               </Form>
            </div>
            <Table striped bordered hover>
               <thead>
                  <tr className="text-center">
                     <th onClick={() => handleSort("id_peminjaman")} style={{ cursor: "pointer", width: "150px" }}>
                        ID Peminjaman <SortIcon field="id_peminjaman" />
                     </th>
                     <th onClick={() => handleSort("nim")} style={{ cursor: "pointer" }}>
                        NIM <SortIcon field="nim" />
                     </th>
                     <th onClick={() => handleSort("id_buku")} style={{ cursor: "pointer" }}>
                        ID Buku <SortIcon field="id_buku" />
                     </th>
                     <th onClick={() => handleSort("tanggal_pinjam")} style={{ cursor: "pointer" }}>
                        Tanggal Pinjam <SortIcon field="tanggal_pinjam" />
                     </th>
                     <th onClick={() => handleSort("status_pengembalian")} style={{ cursor: "pointer" }}>
                        Status Pengembalian <SortIcon field="status_pengembalian" />
                     </th>
                     <th style={{ width: "120px" }}>Action</th>
                  </tr>
               </thead>
               <tbody>
                  {currentItems.map((d, i) => (
                     <tr key={i}>
                        <td>{d.id_peminjaman}</td>
                        <td>{d.nim}</td>
                        <td>{d.id_buku}</td>
                        <td>{formatDate(d.tanggal_pinjam)}</td>
                        <td>{d.status_pengembalian || "Belum Dikembalikan"}</td>
                        <td className="text-center">
                           <Button variant="outline-success" size="sm" onClick={() => handleReturn(d.id_peminjaman)} className="mx-1">
                              Kembalikan
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
         </div>
      </>
   );
};

export default DaftarPeminjamanBuku;
