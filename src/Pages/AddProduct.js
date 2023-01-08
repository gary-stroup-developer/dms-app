import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom"

export const AddProduct = () => {
     
    const [cat_num, setCatNum] = useState("");
    const [cat_desc, setCatDescription] = useState("");
    const [raw_pn, setRawPN] = useState("");
    const [raw_desc, setRawDesc] = useState("");
    const [weight, setWeight] = useState(0);

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    function setValue(e) {
        const { name, value } = e.target;
        switch (name) {
            case 'cat_num':
                setCatNum(value);
                break;
            case 'cat_desc':
                setCatDescription(value);
                break;
            case 'raw_pn':
                setRawPN(value);
                break;
            case 'raw_desc':
                setRawDesc(value);
                break;
            case 'weight':
                setWeight(value);
                break;
            default:
                console.log(`Sorry, option not available for ${name}.`);
        }
    }

    const AddProduct = function (e) {
        e.preventDefault();
        let payload = {
            cat_num,
            cat_desc,
            raw_pn,
            raw_desc,
            weight: parseFloat(weight),

        }

        axios.post("http://localhost:8080/dms/product/create",payload, {
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
    }

    return (
        <div className="grid grid-cols-5 grid-rows-4 p-1 mx-auto p-2">
            <h1 className="text-purple-700 text-xl col-span-5 mx-auto md:text-6xl md:mt-28 mb-0">Department Management System</h1>
              {successMessage ?
                <div className="row-start-2 row-span-1 col-span-5 my-0 mx-auto md:text-4xl">
                    <h1 className="text-purple-600">{successMessage}</h1>
                    <Link to="/dashboard/admin">Dashboard</Link>
                </div>
                :
                <h1 className="text-red-500 row-start-2 row-span-1 col-span-5 mx-auto md:text-4xl">{errorMessage}</h1>
            }
            <form className="grid shadow-xl p-4 row-start-3 row-span-2 col-start-2 col-span-3 mt-0">
                <label className="block mt-3" htmlFor="cat_num">Part Number</label>
                    <input className="shadow-md my-3 rounded-md px-4 py-3" type="text" id="cat_num" name="cat_num" value={cat_num} onChange={setValue} />
                <label className="block" htmlFor="cat_desc">Description</label>
                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="cat_desc" name="cat_desc" value={cat_desc} onChange={setValue} />
                <label className="block" htmlFor="raw_pn">Cell Line Part Number</label>
                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="raw_pn" name="raw_pn" value={raw_pn} onChange={setValue} />
                <label className="block" htmlFor="raw_desc">Cell Line Description</label>
                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="raw_desc" name="raw_desc" value={raw_desc} onChange={setValue} />
                <label className="block" htmlFor="weight">Job Weight</label>
                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="number" step="any" id="weight" name="weight" value={weight} onChange={setValue} />
                <hr />
                <input className="text-white font-bold bg-purple-400 rounded-lg p-4 my-3" type="submit" value="Add Product" onClick={AddProduct} />
            </form>
        </div>
    )
}