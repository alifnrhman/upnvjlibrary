import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import { Fragment } from "react";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";

const Stats = () => {
   const [mainStats, setMainStats] = useState([]);
   const [bukuDipinjam, setBukuDipinjam] = useState([]);
   const [bukuDikembalikan, setBukuDikembalikan] = useState([]);
   const [bukuBelumDikembalikan, setBukuBelumDikembalikan] = useState([]);
   const [bukuTerlambatDanBelumDikembalikan, setBukuTerlambatDanBelumDikembalikan] = useState([]);
   const [dendaDibayarkan, setDendaDibayarkan] = useState([]);
   const [bukuDikembalikanTerlambat, setBukuDikembalikanTerlambat] = useState([]);
   const [mahasiswaOfTheMonth, setMahasiswaOfTheMonth] = useState([]);
   const [bukuMahasiswaOfTheMonth, setBukuMahasiswaOfTheMonth] = useState([]);
   const [jumlahTepatWaktuMahasiswaOfTheMonth, setJumlahTepatWaktuMahasiswaOfTheMonth] = useState([]);
   const [bukuTerbanyak, setBukuTerbanyak] = useState([]);
   const [bukuTerbanyakBulanIni, setBukuTerbanyakBulanIni] = useState([]);
   const [selectedOption, setSelectedOption] = useState("bulanini");

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

   const fetchData = () => {
      fetch("http://localhost:5000/stats")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setMainStats(data))
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
      console.log(mainStats);

      fetch("http://localhost:5000/bukudipinjambulanini")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setBukuDipinjam(data))
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
      console.log(bukuDipinjam);

      fetch("http://localhost:5000/bukudikembalikanbulanini")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setBukuDikembalikan(data))
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
      console.log(bukuDikembalikan);

      fetch("http://localhost:5000/bukubelumdikembalikanbulanini")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setBukuBelumDikembalikan(data))
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
      console.log(bukuBelumDikembalikan);

      fetch("http://localhost:5000/bukubelumdikembalikandanterlambatdikembalikanbulanini")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setBukuTerlambatDanBelumDikembalikan(data))
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
      console.log(bukuTerlambatDanBelumDikembalikan);

      fetch("http://localhost:5000/dendadibayarkanbulanini")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setDendaDibayarkan(data))
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
      console.log(dendaDibayarkan);

      fetch("http://localhost:5000/bukudikembalikanterlambat")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setBukuDikembalikanTerlambat(data))
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
      console.log(bukuDikembalikanTerlambat);

      fetch("http://localhost:5000/mahasiswaofthemonth")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setMahasiswaOfTheMonth(data))
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
      console.log(mahasiswaOfTheMonth);

      fetch("http://localhost:5000/jumlahbukumahasiswaofthemonth")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setBukuMahasiswaOfTheMonth(data))
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
      console.log(bukuMahasiswaOfTheMonth);

      fetch("http://localhost:5000/jumlahtepatwaktumahasiswaofthemonth")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => setJumlahTepatWaktuMahasiswaOfTheMonth(data))
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
      console.log(jumlahTepatWaktuMahasiswaOfTheMonth);

      fetch("http://localhost:5000/bukuterbanyak")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => {
            const processedData = data
               .filter((item) => !item.fieldCount) // Assuming 'fieldCount' is unique to the metadata object
               .flat()
               .slice(0, -1);
            setBukuTerbanyak(processedData);
         })
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });

      console.log(bukuTerbanyak);

      fetch("http://localhost:5000/bukuterbanyakbulanini")
         .then((res) => {
            if (!res.ok) {
               throw new Error("Network response was not ok " + res.statusText);
            }
            return res.json();
         })
         .then((data) => {
            const processedData = data
               .filter((item) => !item.fieldCount) // Assuming 'fieldCount' is unique to the metadata object
               .flat()
               .slice(0, -1);
            setBukuTerbanyakBulanIni(processedData);
         })
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });

      console.log(bukuTerbanyakBulanIni);
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleSelectionChange = (event) => {
      setSelectedOption(event.target.value);
   };

   const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
         style: "currency",
         currency: "IDR",
         minimumFractionDigits: 2,
      }).format(amount);
   };

   return (
      <div className="container">
         <h4 className="text-center mt-4">Statistik Perpustakaan</h4>

         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mt-2">
            {mainStats.map((d, index) => (
               <Fragment key={index}>
                  <div className="col">
                     <div className="card p-2">
                        <div className="row card-body">
                           <div className="col-sm-8">
                              <h5 className="card-title">{d.jumlah_buku}</h5>
                              <p className="card-text mb-4">Jumlah Buku</p>
                           </div>
                           <div className="col-sm-4">
                              <img className="float-right" src="/src/assets/Bukuu.png" alt="sans" style={{ width: "64px" }} />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col">
                     <div className="card p-2">
                        <div className="row card-body">
                           <div className="col-sm-8">
                              <h5 className="card-title">{d.jumlah_peminjaman}</h5>
                              <p className="card-text">Jumlah Buku Sedang Dipinjam</p>
                           </div>
                           <div className="col-sm-4">
                              <img className="float-right" src="/src/assets/BukuSedangPinjam.png" alt="sans" style={{ width: "64px" }} />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col">
                     <div className="card p-2">
                        <div className="row card-body">
                           <div className="col-sm-8">
                              <h5 className="card-title">{d.jumlah_riwayat_peminjaman}</h5>
                              <p className="card-text">Jumlah Buku Selesai Dipinjam</p>
                           </div>
                           <div className="col-sm-4">
                              <img className="float-right" src="/src/assets/BukuSelesaiPinjam.png" alt="sans" style={{ width: "64px" }} />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col">
                     <div className="card p-2">
                        <div className="row card-body">
                           <div className="col-sm-6">
                              <h5 className="card-title">{d.jumlah_mahasiswa}</h5>
                              <p className="card-text">Jumlah Mahasiswa</p>
                           </div>
                           <div className="col-sm-6">
                              <img className="float-right" src="/src/assets/Mahasiswaa.png" alt="sans" style={{ width: "64px" }} />
                           </div>
                        </div>
                     </div>
                  </div>
               </Fragment>
            ))}
         </div>

         <div className="row g-4 mt-1">
            <div className="col-8">
               <div className="card p-1">
                  <div className="card-body">
                     <h5 className="card-title text-center">Statistik Bulan ini</h5>
                     <hr />
                     <div className="row my-3">
                        {bukuDipinjam.map((d, index) => (
                           <Fragment key={index}>
                              <div className="col-lg-6 text-center">
                                 <h5 className="card-text">{d.total_buku_dipinjam}</h5>
                                 <p className="card-text">Buku Dipinjam</p>
                              </div>
                           </Fragment>
                        ))}
                        {bukuDikembalikan.map((d, index) => (
                           <Fragment key={index}>
                              <div className="col-lg-6 text-center">
                                 <h5 className="card-text">{d.jumlah_pengembalian_bulan_ini}</h5>
                                 <p className="card-text">Buku Dikembalikan</p>
                              </div>
                           </Fragment>
                        ))}
                     </div>
                     <div className="row my-3">
                        {bukuBelumDikembalikan.map((d, index) => (
                           <Fragment key={index}>
                              <div className="col-lg-6 text-center">
                                 <h5 className="card-text">{d.jumlah_buku_belum_dikembalikan_bulan_ini}</h5>
                                 <p className="card-text">Buku Belum Dikembalikan</p>
                              </div>
                           </Fragment>
                        ))}
                        {bukuTerlambatDanBelumDikembalikan.map((d, index) => (
                           <Fragment key={index}>
                              <div className="col-lg-6 text-center">
                                 <h5 className="card-text">{d.jumlah_buku_terlambat}</h5>
                                 <p className="card-text">Buku Terlambat dan Belum Dikembalikan</p>
                              </div>
                           </Fragment>
                        ))}
                     </div>
                     <div className="row my-3">
                        {bukuDikembalikanTerlambat.map((d, index) => (
                           <Fragment key={index}>
                              <div className="col-lg-6 text-center">
                                 <h5 className="card-text">{d.jumlah_buku_dikembalikan_terlambat}</h5>
                                 <p className="card-text">Buku Dikembalikan Terlambat</p>
                              </div>
                           </Fragment>
                        ))}
                        {dendaDibayarkan.map((d, index) => (
                           <Fragment key={index}>
                              <div className="col-lg-6 text-center">
                                 <h5 className="card-text">{formatCurrency(d.total_denda_bulan_ini)}</h5>
                                 <p className="card-text">Total Denda Dibayarkan</p>
                              </div>
                           </Fragment>
                        ))}
                     </div>
                  </div>
               </div>

               <div className="card p-1 mt-4">
                  <div className="card-body">
                     <div className="row">
                        <div className="col text-center">
                           <h5 className="card-title ms-1">Buku Paling Banyak Dipinjam</h5>
                        </div>
                        <div className="col-2 justify-content-end position-absolute">
                           <Form.Select onChange={handleSelectionChange} value={selectedOption} size="sm">
                              <option value="bulanini">Bulan Ini</option>
                              <option value="alltime">Semua</option>
                           </Form.Select>
                        </div>
                     </div>
                     <hr />
                     <div className="row  m-0 p-0">
                        {selectedOption === "alltime" && (
                           <table className="table table-striped table-sm" id="alltime">
                              <thead>
                                 <tr className="text-center">
                                    <th scope="col" style={{ width: "64px" }}>
                                       No.
                                    </th>
                                    <th scope="col">ID Buku</th>
                                    <th scope="col">Nama Buku</th>
                                    <th scope="col">Jumlah</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {bukuTerbanyak.map((d, i) => (
                                    <tr key={i}>
                                       <td className="text-center">{i + 1}</td>
                                       <td>{d.id_buku}</td>
                                       <td>{d.nama_buku}</td>
                                       <td className="text-center">{d.jumlah_peminjaman}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        )}

                        {selectedOption === "bulanini" && (
                           <table className="table table-striped table-sm" id="alltime">
                              <thead>
                                 <tr className="text-center">
                                    <th scope="col" style={{ width: "64px" }}>
                                       No.
                                    </th>
                                    <th scope="col">ID Buku</th>
                                    <th scope="col">Nama Buku</th>
                                    <th scope="col">Jumlah</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {bukuTerbanyakBulanIni.map((d, i) => (
                                    <tr key={i}>
                                       <td className="text-center">{i + 1}</td>
                                       <td>{d.id_buku}</td>
                                       <td>{d.nama_buku}</td>
                                       <td className="text-center">{d.jumlah_peminjaman}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        )}
                     </div>
                  </div>
               </div>
            </div>

            <div className="col-4">
               <div className="card p-1">
                  <div className="card-body">
                     <h5 className="card-title mx-2 text-center">Mahasiswa of the Month</h5>
                     <hr />
                     <div className="row">
                        <div className="col">
                           {mahasiswaOfTheMonth.map((d, index) => (
                              <Fragment key={index}>
                                 <div className="text-center my-4">
                                    <img src="/src/assets/user.png" alt="Foto Mahasiswa" style={{ width: "128px", marginBottom: "36px" }} />
                                    <h5 className="card-text">{d.nama}</h5>
                                    <p className="card-text">{d.nim}</p>
                                 </div>
                              </Fragment>
                           ))}
                        </div>
                     </div>
                     <div className="row">
                        <div className="col-6 border-end">
                           {bukuMahasiswaOfTheMonth.map((d, index) => (
                              <Fragment key={index}>
                                 <div className="text-center my-4 ">
                                    <h5 className="card-text">{d.total_buku_dipinjam}</h5>
                                    <p className="card-text">Buku Dipinjam</p>
                                 </div>
                              </Fragment>
                           ))}
                        </div>
                        <div className="col-6">
                           {jumlahTepatWaktuMahasiswaOfTheMonth.map((d, index) => (
                              <Fragment key={index}>
                                 <div className="text-center my-4">
                                    <h5 className="card-text">{d.jumlah_kembali_tepat_waktu}</h5>
                                    <p className="card-text">Dikembalikan Tepat Waktu</p>
                                 </div>
                              </Fragment>
                           ))}
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Stats;
