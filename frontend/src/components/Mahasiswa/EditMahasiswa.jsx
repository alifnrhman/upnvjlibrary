import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import axios from "axios";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bounce } from "react-toastify";

const EditMahasiswa = ({ show, handleClose, currentIdMahasiswa, fetchData }) => {
   const [formData, setFormData] = useState({
      id: "",
      nim: "",
      nama: "",
      jurusan: "",
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
         .put(`http://localhost:5000/mahasiswa/update/${currentIdMahasiswa}`, formData)
         .then((res) => {
            handleClose();
            fetchData();
            console.log(res);
            notify(toast.success("Perubahan berhasil disimpan!"));
         })
         .catch((err) => {
            console.log(err);
            notify(toast.error("Terjadi kesalahan!"));
         });
   };

   useEffect(() => {
      if (currentIdMahasiswa) {
         axios
            .get(`http://localhost:5000/mahasiswa/getrecord/${currentIdMahasiswa}`)
            .then((res) => {
               console.log(res.data);
               setFormData({
                  id: res.data[0]?.id || "",
                  nim: res.data[0]?.nim || "",
                  nama: res.data[0]?.nama || "",
                  jurusan: res.data[0]?.jurusan || "",
               });
            })
            .catch((err) => {
               console.log(err);
               notify(toast.error("Terjadi kesalahan saat fetching data buku!"));
            });
      }
   }, [currentIdMahasiswa]);

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
         <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered className="modal-lg">
            <Modal.Header>
               <Modal.Title className="mx-3">Edit Mahasiswa</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form className="m-3" onSubmit={handleSubmit}>
                  <Row>
                     <Col sm={2}>
                        <Form.Group as={Col} className="mb-3">
                           <FloatingLabel label="ID">
                              <Form.Control type="text" name="id" value={formData.id} placeholder="ID" onChange={handleChange} autoFocus required />
                           </FloatingLabel>
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group as={Col} className="mb-3" controlId="nama_buku">
                           <FloatingLabel label="NIM">
                              <Form.Control type="text" name="nim" value={formData.nim} placeholder="NIM" onChange={handleChange} required />
                           </FloatingLabel>
                        </Form.Group>
                     </Col>
                  </Row>
                  <Row>
                     <Col sm={7}>
                        <Form.Group as={Col} className="mb-3" controlId="isbn">
                           <FloatingLabel label="Nama">
                              <Form.Control type="text" name="nama" value={formData.nama} placeholder="Nama" onChange={handleChange} required />
                           </FloatingLabel>
                        </Form.Group>
                     </Col>
                     <Col>
                        <Form.Group as={Col} className="mb-3" controlId="tahun_terbit">
                           <FloatingLabel label="Jurusan">
                              <Form.Control type="text" name="jurusan" value={formData.jurusan} placeholder="Jurusan" onChange={handleChange} required />
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
      </>
   );
};

export default EditMahasiswa;
