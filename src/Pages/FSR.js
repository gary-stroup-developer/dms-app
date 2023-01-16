import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"

export const FSR = () => {

     const [num_vials, setNumVials] = useState("");
    const [due_date, setDueDate] = useState("");
    const [location, setLocation] = useState("");
    const [raw_desc, setRawDesc] = useState("");


    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    function setValue(e) {
        const { name, value } = e.target;
        switch (name) {
            case 'num_vials':
                setNumVials(value);
                break;
            case 'due_date':
                setDueDate(value);
                break;
            case 'location':
                setLocation(value);
                break;
            case 'raw_desc':
                setRawDesc(value);
                break;
            default:
                console.log(`Sorry, option not available for ${name}.`);
        }
    }

  const AddProduct = function (e) {
    e.preventDefault();
    let payload = {
      num_vials,
      due_date,
      location,
      raw_desc,
    }

    axios.post("http://localhost:8080/dms/job/fsr", payload, {
      headers: {
        'content-type': 'application/json'
      }
    }).then((response) => {
      setSuccessMessage(response.data);
    })
      .catch(function (error) {
        // handle error
        setErrorMessage(error.response.data);
      })
  };
  
  return (
    <div>
      <Link to="/dashboard/:role">Dashboard</Link>
      {successMessage ? <p>{successMessage}</p> : <p>{errorMessage}</p>}
      <form className="grid shadow-xl p-4 row-start-3 row-span-2 col-start-2 col-span-3 mt-0">
          <label className="block" htmlFor="raw_desc">Cell Line Description</label>
            <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="raw_desc" name="raw_desc" value={raw_desc} onChange={setValue} />
        <label className="block mt-3" htmlFor="num_vials">Number of Vials</label>
            <input className="shadow-md my-3 rounded-md px-4 py-3" type="text" id="num_vials" name="num_vials" value={num_vials} onChange={setValue} />
        <label className="block" htmlFor="due_date">Date Neded</label>
            <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="date" id="due_date" name="due_date" value={due_date} onChange={setValue} />
        <label className="block" htmlFor="location">Location</label>
            <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="location" name="location" value={location} onChange={setValue} />
        <hr />
        <input className="text-white font-bold bg-purple-400 rounded-lg p-4 my-3" type="submit" value="Add Product" onClick={AddProduct} />
      </form>
    </div>
  )
}

