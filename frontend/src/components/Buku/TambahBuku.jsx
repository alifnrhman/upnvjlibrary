import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const TambahBuku = ({ fetchData }) => {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   const [formData, setFormData] = useState({
      id_buku: "",
      nama_buku: "",
      isbn: "",
      tahun_terbit: "",
      penulis: "",
      penerbit: "",
      kategori: "",
      stok: "",
   });

   function handleSubmit(e) {
      e.preventDefault();

      axios
         .post("http://localhost:5000/tambahbuku", formData)
         .then((res) => {
            handleClose();
            fetchData();
            console.log(res);
            notify(toast.success("Buku berhasil ditambahkan!"));
         })
         .catch((err) => {
            console.log(err);
            notify(toast.error("Terjadi kesalahan!"));
         });
   }

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

   return (
      <>
         <div className="d-flex justify-content-end mb-4">
            <Button variant="primary" onClick={handleShow} className="">
               Tambah Buku
            </Button>
         </div>

         <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered className="modal-lg">
            <Modal.Header>
               <Modal.Title className="mx-3">Tambah Buku</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form className="m-3" onSubmit={handleSubmit} action="/tambah" method="post">
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
                              <Form.Control type="text" name="stok" value={formData.stok} placeholder="Stok" onChange={handleChange} required />
                           </FloatingLabel>
                        </Form.Group>
                     </Col>
                  </Row>
                  <Modal.Footer className="px-0 pb-0 pt-4 mt-2">
                     <Button variant="outline-danger" onClick={handleClose} className="m-0 me-2" type="button">
                        Cancel
                     </Button>
                     <Button as="input" type="submit" value="Simpan" className="m-0" />
                  </Modal.Footer>
               </Form>
            </Modal.Body>
         </Modal>
      </>
   );
};

export default TambahBuku;
