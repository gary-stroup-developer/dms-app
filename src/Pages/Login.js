import axios from "axios";
import { useState } from "react"
import {useNavigate} from "react-router-dom";
 

export const Login = () => {
    const navigate = useNavigate();
    const [username, SetUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
    function setValue(e) {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                SetUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                console.log(`Sorry, option not available for ${name}.`);
        }
    }

    const LoginUser = function (e) {
        e.preventDefault();
        let payload = {
            uid:username,
            password,
        }

        axios.post("http://localhost:8080/dms/login",payload, {
        headers: {
            'content-type': 'application/json'
        }
        }).then((response) => console.log(response.data))
        .then(() => navigate('/dashboard', { replace: true }))
        .catch(function (error) {
            // handle error
            setErrorMessage(error.response.data);
        })
    }

    return (
        <div className="grid grid-cols-5 grid-rows-4 gap-3 mx-auto p-2">
            <h1 className="text-purple-700 text-xl col-span-5 mx-auto py-4 md:text-6xl">Department Management System</h1>
            <form className="grid shadow-xl p-4 row-start-2 row-span-2 col-start-2 col-span-3">
                <label className="block mt-3" htmlFor="username">User Name</label>
                <input className="shadow-md my-3 rounded-md px-4 py-3" type="text" id="username" name="username" value={username} onChange={setValue} />
                <label className="block" htmlFor="password">Password</label>
                <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="password" name="password" value={password} onChange={setValue} />
                <hr />
                <input className="text-white font-bold bg-purple-400 rounded-lg p-4 my-3" type="submit" value="Login" onClick={LoginUser} />
            </form>
            <h1 className="text-red-500 md:text-2xl row-start-4 col-start-2 col-span-2 mt-4">{errorMessage}</h1>
            <p id="first"></p>
            <p id="last"></p>
        </div>
    )
}