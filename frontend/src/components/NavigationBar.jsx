import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavigationBar = () => {
   return (
      <>
         <Navbar bg="light" data-bs-theme="light">
            <Container>
               <Navbar.Brand href="#home">
                  <img src="/src/assets/upnvjlibrary.png" width="70px"></img>
               </Navbar.Brand>
               <Nav className="mx-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/buku">Daftar Buku</Nav.Link>
                  <Nav.Link href="/daftarpeminjaman">Daftar Peminjaman</Nav.Link>
                  <Nav.Link href="/riwayatpeminjaman">Riwayat Peminjaman</Nav.Link>
               </Nav>
            </Container>
         </Navbar>
      </>
   );
};

export default NavigationBar;
