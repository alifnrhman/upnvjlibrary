import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { format } from "date-fns";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Pagination from "react-bootstrap/Pagination";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const RiwayatPeminjamanBuku = () => {
   const [data, setData] = useState([]);
   const [sortField, setSortField] = useState("id_peminjaman"); // Default sort field
   const [sortDirection, setSortDirection] = useState("asc"); // Default sort direction
   const [search, setSearch] = useState("");
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10); // Adjust as needed

   useEffect(() => {
      fetch("http://localhost:5000/riwayatpeminjaman")
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

   const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
         minimumFractionDigits: 2,
      }).format(amount);
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
            (d.id_buku ? d.id_buku.toString().toLowerCase() : "").includes(searchLower) ||
            (d.nim ? d.nim.toString().toLowerCase() : "").includes(searchLower) ||
            (d.tanggal_pinjam ? d.tanggal_pinjam.toString().toLowerCase() : "").includes(searchLower) ||
            (d.tanggal_pengembalian ? d.tanggal_pengembalian.toString().toLowerCase() : "").includes(searchLower) ||
            (d.total_denda ? d.total_denda.toString().toLowerCase() : "").includes(searchLower)
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
            <h2 className="text-center m-4">Riwayat Peminjaman</h2>
            <div className="mt-5">
               <Form>
                  <Form.Group className="mb-3">
                     <Form.Control type="text" placeholder="Cari berdasarkan ID Peminjaman, ID Buku, NIM, tanggal pinjam, tanggal pengembalian, atau total denda...." onChange={(e) => setSearch(e.target.value)} />
                  </Form.Group>
               </Form>
            </div>
            <Table striped bordered hover>
               <thead>
                  <tr className="text-center">
                     <th onClick={() => handleSort("id_peminjaman")} style={{ cursor: "pointer", width: "150px" }}>
                        ID Peminjaman <SortIcon field="id_peminjaman" />
                     </th>
                     <th onClick={() => handleSort("id_buku")} style={{ cursor: "pointer" }}>
                        ID Buku <SortIcon field="id_buku" />
                     </th>
                     <th onClick={() => handleSort("nim")} style={{ cursor: "pointer" }}>
                        NIM <SortIcon field="nim" />
                     </th>
                     <th onClick={() => handleSort("tanggal_pinjam")} style={{ cursor: "pointer" }}>
                        Tanggal Pinjam <SortIcon field="tanggal_pinjam" />
                     </th>
                     <th onClick={() => handleSort("tanggal_pengembalian")} style={{ cursor: "pointer" }}>
                        Tanggal Pengembalian <SortIcon field="tanggal_pengembalian" />
                     </th>
                     <th onClick={() => handleSort("total_denda")} style={{ cursor: "pointer" }}>
                        Total Denda <SortIcon field="total_denda" />
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {currentItems.map((d, i) => (
                     <tr key={i}>
                        <td>{d.id_peminjaman}</td>
                        <td>{d.id_buku}</td>
                        <td>{d.nim}</td>
                        <td>{formatDate(d.tanggal_pinjam)}</td>
                        <td>{formatDate(d.tanggal_pengembalian)}</td>
                        <td>{formatCurrency(d.total_denda)}</td>
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

export default RiwayatPeminjamanBuku;
