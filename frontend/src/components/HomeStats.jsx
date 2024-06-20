import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";

const HomeStats = () => {
   const [data, setData] = useState([]);

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
         .then((data) => setData(data))
         .catch((err) => {
            console.error("Fetch error: ", err);
            notify(toast.error("Terjadi kesalahan saat fetching data!"));
         });
      console.log(data);
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <>
         <div className="container-fluid p-3 border shadow-sm p-4 mb-4 rounded">
            <div className="container">
               <div className="row">
                  <div className="col-10">
                     <h5>Statistik</h5>
                  </div>
                  <div className="col-2 text-end">
                     <p>
                        <a href="/stats" className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                           Lihat Selengkapnya
                        </a>
                     </p>
                  </div>
               </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 text-center">
               {data.map((d, index) => (
                  <Fragment key={index}>
                     <div className="col">
                        <div className="p-2">
                           <div className="row card-body d-flex flex-column align-items-center">
                              <div className="mb-3">
                                 <img className="float-right" src="/src/assets/Bukuu.png" alt="sans" style={{ width: "64px" }} />
                              </div>
                              <div>
                                 <h5 className="card-title">{d.jumlah_buku}</h5>
                                 <p className="card-text">Jumlah Buku</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col">
                        <div className="p-2">
                           <div className="row card-body d-flex flex-column align-items-center">
                              <div className="mb-3">
                                 <img className="float-right" src="/src/assets/BukuSedangPinjam.png" alt="sans" style={{ width: "64px" }} />
                              </div>
                              <div>
                                 <h5 className="card-title">{d.jumlah_peminjaman}</h5>
                                 <p className="card-text">Jumlah Buku Sedang Dipinjam</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col">
                        <div className="p-2">
                           <div className="row card-body d-flex flex-column align-items-center">
                              <div className="mb-3">
                                 <img src="/src/assets/BukuSelesaiPinjam.png" alt="sans" style={{ width: "64px" }} />
                              </div>
                              <div>
                                 <h5 className="card-title">{d.jumlah_riwayat_peminjaman}</h5>
                                 <p className="card-text">Jumlah Buku Selesai Dipinjam</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col">
                        <div className="p-2">
                           <div className="row card-body d-flex flex-column align-items-center">
                              <div className="mb-3">
                                 <img className="float-right" src="/src/assets/Mahasiswaa.png" alt="sans" style={{ width: "64px" }} />
                              </div>
                              <div>
                                 <h5 className="card-title">{d.jumlah_mahasiswa}</h5>
                                 <p className="card-text">Jumlah Mahasiswa</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </Fragment>
               ))}
            </div>
         </div>
      </>
   );
};

export default HomeStats;
