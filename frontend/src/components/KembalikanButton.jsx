import Button from "react-bootstrap/Button";
import axios from "axios";

const KembalikanButton = () => {
   const handleSubmit = (e) => {
      e.preventDefault();

      axios
         .put(`http://localhost:5000/buku/update/${currentIdBuku}`, formData)
         .then((res) => {
            handleClose();
            fetchData();
            console.log(res);
         })
         .catch((err) => console.log(err));
   };

   return <Button as="input" type="submit" value="Kembalikan" variant="success" size="sm" onClick={handleSubmit} />;
};

export default KembalikanButton;
