import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = () => {
   return (
      <>
         <Navbar bg="light" data-bs-theme="light">
            <Container>
               <Navbar.Brand href="/" className="position-absolute">
                  <img src="/src/assets/upnvjlibrary.png" width="70px"></img>
               </Navbar.Brand>
               <Nav className="mx-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/buku">Buku</Nav.Link>
                  <Nav.Link href="/daftarpeminjaman">Peminjaman</Nav.Link>
                  <Nav.Link href="/riwayatpeminjaman">Riwayat Peminjaman</Nav.Link>
                  <Nav.Link href="/daftarmahasiswa">Mahasiswa</Nav.Link>
               </Nav>
            </Container>
         </Navbar>
      </>
   );
};

export default NavigationBar;
