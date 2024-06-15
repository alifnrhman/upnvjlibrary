import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const Home = () => {
   const navigate = useNavigate();
   return (
      <>
         <div className="container">
            <h2 className="text-center my-5">Selamat datang di Perpustakaan UPNVJ</h2>
            <Row>
               <Card style={{ width: "18rem", margin: "20px 10px" }}>
                  <Card.Img variant="top" src="/src/assets/book.png" />
                  <Card.Body>
                     <Card.Title>Daftar Buku</Card.Title>
                     <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                     <Button variant="primary" onClick={() => navigate("/buku")}>
                        Lihat Daftar Buku
                     </Button>
                  </Card.Body>
               </Card>
               <Card style={{ width: "18rem", margin: "20px 10px" }}>
                  <Card.Img variant="top" src="/src/assets/book.png" />
                  <Card.Body>
                     <Card.Title>Daftar Peminjaman</Card.Title>
                     <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                     <Button variant="primary" onClick={() => navigate("/daftarpeminjaman")}>
                        Lihat Daftar Peminjaman
                     </Button>
                  </Card.Body>
               </Card>
            </Row>
         </div>
      </>
   );
};

export default Home;
