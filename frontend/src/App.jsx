import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import HomePage from "./pages/HomePage";
import DaftarBukuPage from "./pages/DaftarBukuPage";
import DaftarPeminjamanPage from "./pages/DaftarPeminjamanPage";
import RiwayatPeminjamanPage from "./pages/RiwayatPeminjamanPage";
import DaftarMahasiswaPage from "./pages/DaftarMahasiswaPage";
import StatsPage from "./pages/StatsPage";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

function App() {
   return (
      <>
         <Router>
            <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/buku" element={<DaftarBukuPage />} />
               <Route path="/daftarpeminjaman" element={<DaftarPeminjamanPage />} />
               <Route path="/riwayatpeminjaman" element={<RiwayatPeminjamanPage />} />
               <Route path="/daftarmahasiswa" element={<DaftarMahasiswaPage />} />
               <Route path="/stats" element={<StatsPage />} />
            </Routes>
         </Router>
         <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable={false} pauseOnHover={false} theme="light" transition:Bounce />
      </>
   );
}

export default App;
