import axios from "axios";
import React, { useState} from "react"
import { Link } from "react-router-dom"



export const AddUser = () => {

    const [uid, setUID] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [role, setRole] = useState("");


    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    function setValue(e) {
        const { name, value } = e.target;
        switch (name) {
            case 'uid':
                setUID(value);
                break;
            case 'firstname':
                setFirstName(value);
                break;
            case 'lastname':
                setLastName(value);
                break;
            case 'role':
                setRole(value);
                break;
            default:
                console.log(`Sorry, option not available for ${name}.`);
        }
    }

    const AddUser = function (e) {
        e.preventDefault();
        let payload = {
            uid,
            firstname,
            lastname,
            role,
        }

        axios.post("http://localhost:8080/dms/user/create",payload, {
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
                <label className="block mt-3" htmlFor="uid">User ID</label>
                    <input className="shadow-md my-3 rounded-md px-4 py-3" type="text" id="uid" name="uid" value={uid} onChange={setValue} />
                <label className="block" htmlFor="cat_desc">First Name</label>
                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="firstname" name="firstname" value={firstname} onChange={setValue} />
                <label className="block" htmlFor="raw_pn">Last Name</label>
                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="lastname" name="lastname" value={lastname} onChange={setValue} />
                <label className="block" htmlFor="raw_desc">User Role</label>
                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="role" name="role" value={role} onChange={setValue} />
                <hr />
                <input className="text-white font-bold bg-purple-400 rounded-lg p-4 my-3" type="submit" value="Add Product" onClick={AddUser} />
            </form>
        </div>
    )
}