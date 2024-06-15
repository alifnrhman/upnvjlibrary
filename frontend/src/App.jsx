import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DaftarBukuPage from "./pages/DaftarBukuPage";
import DaftarPeminjamanPage from "./pages/DaftarPeminjamanPage";
import "./index.css";

function App() {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/buku" element={<DaftarBukuPage />} />
            <Route path="/daftarpeminjaman" element={<DaftarPeminjamanPage />} />
         </Routes>
      </Router>
   );
}

export default App;
