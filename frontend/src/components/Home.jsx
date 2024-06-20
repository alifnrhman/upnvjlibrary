import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import HomeStats from "./HomeStats";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

const Home = () => {
   const navigate = useNavigate();
   return (
      <>
         <div className="container">
            <h2 className="text-center my-5">Selamat datang di Perpustakaan UPNVJ</h2>
            <Container className="mt-5">
               <HomeStats />
               <Row className="justify-content-center p-0">
                  <Col xs={8} md={6} lg={3} className="p-0">
                     <Card className="mx-auto" style={{ width: "18rem", margin: "20px 0px", padding: "10px" }}>
                        <div className="text-center mt-4">
                           <Card.Img variant="top" src="/src/assets/daftarbuku.png" style={{ width: "8rem" }} />
                        </div>
                        <Card.Body>
                           <Card.Title>Daftar Buku</Card.Title>
                           <Card.Text>Daftar buku yang tersedia di perpustakaan</Card.Text>
                           <Button variant="primary" onClick={() => navigate("/buku")}>
                              Lihat Daftar Buku
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col xs={8} md={6} lg={3}>
                     <Card className="mx-auto" style={{ width: "18rem", margin: "20px 0px", padding: "10px" }}>
                        <div className="text-center mt-4">
                           <Card.Img variant="top" src="/src/assets/daftarpeminjaman.png" style={{ width: "8rem" }} />
                        </div>
                        <Card.Body>
                           <Card.Title>Daftar Peminjaman</Card.Title>
                           <Card.Text>Daftar peminjaman buku di perpustakaan</Card.Text>
                           <Button variant="primary" onClick={() => navigate("/daftarpeminjaman")}>
                              Lihat Peminjaman
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col xs={8} md={6} lg={3}>
                     <Card className="mx-auto" style={{ width: "18rem", margin: "20px 0px", padding: "10px" }}>
                        <div className="text-center mt-4">
                           <Card.Img variant="top" src="/src/assets/riwayatpeminjaman.png" style={{ width: "8rem" }} />
                        </div>
                        <Card.Body>
                           <Card.Title>Riwayat Peminjaman</Card.Title>
                           <Card.Text>Riwayat peminjaman buku di perpustakaan</Card.Text>
                           <Button variant="primary" onClick={() => navigate("/riwayatpeminjaman")}>
                              Lihat Riwayat Peminjaman
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
                  <Col xs={8} md={6} lg={3}>
                     <Card className="mx-auto" style={{ width: "18rem", margin: "20px 0px", padding: "10px" }}>
                        <div className="text-center mt-4">
                           <Card.Img variant="top" src="/src/assets/daftarmahasiswa.png" style={{ width: "8rem" }} />
                        </div>
                        <Card.Body>
                           <Card.Title>Daftar Mahasiswa</Card.Title>
                           <Card.Text>Daftar mahasiswa yang terdaftar di perpustakaan</Card.Text>
                           <Button variant="primary" onClick={() => navigate("/daftarmahasiswa")}>
                              Lihat Daftar Mahasiswa
                           </Button>
                        </Card.Body>
                     </Card>
                  </Col>
               </Row>
            </Container>
         </div>
      </>
   );
};

export default Home;
