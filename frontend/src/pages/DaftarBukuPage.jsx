import DaftarBuku from "../components/Buku/DaftarBuku";
import NavigationBar from "../components/NavigationBar";
import Container from "react-bootstrap/esm/Container";

const DaftarBukuPage = () => {
   return (
      <>
         <NavigationBar />
         <Container>
            <DaftarBuku />
         </Container>
      </>
   );
};

export default DaftarBukuPage;
