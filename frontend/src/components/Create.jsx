import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Create() {
   const [values, setValues] = useState({
      username: "",
      password: "",
   });

   const navigate = useNavigate();

   function handleSubmit(e) {
      e.preventDefault();

      axios
         .post("http://localhost:5000/add_user", values)
         .then((res) => {
            navigate("/");
            console.log(res);
         })
         .catch((err) => console.log(err));
   }
   return (
      <div className="container vh-100 vw-100 bg-primary">
         <div className="row">
            <h3>Add Student</h3>
            <div className="d-flex justify-content-end">
               <Link to="/" className="btn btn-success">
                  Home
               </Link>
            </div>
            <form onSubmit={handleSubmit}>
               <div className="form-group my-3">
                  <label htmlFor="name">Username</label>
                  <input type="text" name="username" required onChange={(e) => setValues({ ...values, username: e.target.value })} />
               </div>
               <div className="form-group my-3">
                  <label htmlFor="email">Password</label>
                  <input type="password" name="password" required onChange={(e) => setValues({ ...values, password: e.target.value })} />
               </div>
               <div className="form-group my-3">
                  <button type="submit" className="btn btn-success">
                     Save
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}

export default Create;
