import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const EditBuku = ({ show, handleClose, currentIdBuku, fetchData }) => {
   const [formData, setFormData] = useState({
      id_buku: "",
      nama_buku: "",
      isbn: "",
      tahun_terbit: "",
      penulis: "",
      penerbit: "",
      kategori: "",
      stok_buku: "",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      axios
         .put(`http://localhost:5000/buku/update/${currentIdBuku}`, formData)
         .then((res) => {
            handleClose();
            fetchData();
            console.log(res);
         })
         .catch((err) => console.log(err));
   };

   useEffect(() => {
      if (currentIdBuku) {
         axios
            .get(`http://localhost:5000/buku/getrecord/${currentIdBuku}`)
            .then((res) => {
               console.log(res.data);
               setFormData({
                  id_buku: res.data[0]?.id_buku || "",
                  nama_buku: res.data[0]?.nama_buku || "",
                  isbn: res.data[0]?.isbn || "",
                  tahun_terbit: res.data[0]?.tahun_terbit || "",
                  penulis: res.data[0]?.penulis || "",
                  penerbit: res.data[0]?.penerbit || "",
                  kategori: res.data[0]?.kategori || "",
                  stok_buku: res.data[0]?.stok_buku || "",
               });
            })
            .catch((err) => console.error("Fetch error: ", err));
      }
   }, [currentIdBuku]);

   return (
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered className="modal-lg">
         <Modal.Header>
            <Modal.Title className="mx-3">Edit Buku</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <Form className="m-3" onSubmit={handleSubmit}>
               <Row>
                  <Col sm={2}>
                     <Form.Group as={Col} className="mb-3">
                        <FloatingLabel label="ID Buku">
                           <Form.Control type="text" name="id_buku" value={formData.id_buku} placeholder="ID Buku" onChange={handleChange} autoFocus required />
                        </FloatingLabel>
                     </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group as={Col} className="mb-3" controlId="nama_buku">
                        <FloatingLabel label="Nama Buku">
                           <Form.Control type="text" name="nama_buku" value={formData.nama_buku} placeholder="Nama Buku" onChange={handleChange} required />
                        </FloatingLabel>
                     </Form.Group>
                  </Col>
               </Row>
               <Row>
                  <Col sm={7}>
                     <Form.Group as={Col} className="mb-3" controlId="isbn">
                        <FloatingLabel label="ISBN">
                           <Form.Control type="text" name="isbn" value={formData.isbn} placeholder="ISBN" onChange={handleChange} required />
                        </FloatingLabel>
                     </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group as={Col} className="mb-3" controlId="tahun_terbit">
                        <FloatingLabel label="Tahun Terbit">
                           <Form.Control type="text" name="tahun_terbit" value={formData.tahun_terbit} placeholder="Tahun Terbit" onChange={handleChange} required />
                        </FloatingLabel>
                     </Form.Group>
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <Form.Group as={Col} className="mb-3" controlId="penulis">
                        <FloatingLabel label="Penulis">
                           <Form.Control type="text" name="penulis" value={formData.penulis} placeholder="Penulis" onChange={handleChange} required />
                        </FloatingLabel>
                     </Form.Group>
                  </Col>
                  <Col>
                     <Form.Group as={Col} className="mb-3" controlId="penerbit">
                        <FloatingLabel label="Penerbit">
                           <Form.Control type="text" name="penerbit" value={formData.penerbit} placeholder="Penerbit" onChange={handleChange} required />
                        </FloatingLabel>
                     </Form.Group>
                  </Col>
               </Row>
               <Row>
                  <Col>
                     <Form.Group as={Col} className="mb-3" controlId="kategori">
                        <FloatingLabel label="Kategori">
                           <Form.Control type="text" name="kategori" value={formData.kategori} placeholder="Kategori" onChange={handleChange} required />
                        </FloatingLabel>
                     </Form.Group>
                  </Col>
                  <Col sm={2}>
                     <Form.Group as={Col} className="mb-3" controlId="stok">
                        <FloatingLabel label="Stok">
                           <Form.Control type="text" name="stok_buku" value={formData.stok_buku} placeholder="Stok" onChange={handleChange} required />
                        </FloatingLabel>
                     </Form.Group>
                  </Col>
               </Row>
               <Modal.Footer className="px-0 pb-0 pt-4 mt-2">
                  <Button variant="outline-danger" type="button" className="m-0 me-2" onClick={handleClose}>
                     Cancel
                  </Button>
                  <Button as="input" type="submit" value="Simpan" variant="primary" className="m-0" />
               </Modal.Footer>
            </Form>
         </Modal.Body>
      </Modal>
   );
};

export default EditBuku;
