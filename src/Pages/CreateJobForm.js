import axios from "axios"
import { useState } from "react";
import { Button,Form } from "react-bootstrap";

export const CreateJobForm = ({ update }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [username, SetUsername] = useState("");
    const [password, setPassword] = useState("");
    const payload = { "firstname": "Gary", "lastname": "stroup" }
    
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
    const searchCatNum = () => {
        axios.post("http://localhost:8080/dms/job/create/search", payload, {
            headers: {
                'content-type': 'application/json'
            }
        })
            .then((response) => response.data).then(function (data) {
                // handle success
                document.getElementById("first").innerHTML = data.firstname;
                document.getElementById("last").innerHTML = data.lastname;
        
            })
            .catch(function (error) {
                // handle error
                setErrorMessage(error.response.data);
            });
    }
    return (
        <div className="col">
            <Form className="d-flex">
                <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                />
                <Button variant="outline-dark" onClick={searchCatNum}>Search</Button>
            </Form>
            <h3 className="text-purple-700 text-xl mx-auto py-4 md:text-2xl">Create New Job Request</h3>
            <form className="row g-3 border-none shadow-lg shadow-slate-200 pb-5">
                <div className="col-md-6">
                <label className="form-label" htmlFor="username">Part Number</label>
                <input className="form-control shadow-md" type="text" id="cat_num" name="cat_num" value={username} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="form-label" htmlFor="password">Lot Number</label>
                <input className="form-control shadow-md" type="text" id="cat_lot" name="cat_lot" value={password} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="form-label" htmlFor="password">Cell Line Part Number</label>
                <input className="form-control shadow-md" type="text" id="raw_pn" name="raw_pn" value={password} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="form-label" htmlFor="password">Cell Line Description</label>
                <input className="form-control shadow-md" type="text" id="raw_desc" name="raw_desc" value={password} onChange={setValue} />
                </div>

                <div className="col-md-9">
                <label className="block form-label" htmlFor="password">Quantity</label>
                <input className="form-control shadow-md" type="text" id="qty" name="qty" value={password} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="block form-label" htmlFor="password">Start Date</label>
                <input className="form-control shadow-md" type="date" id="start_date" name="start_date" value={password} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="block form-label" htmlFor="password">End Date</label>
                <input className="form-control shadow-md" type="date" id="end_date" name="end_date" value={password} onChange={setValue} />
                </div>

                <div className="col-md-12">
                    <label className="block form-label" htmlFor="password">Notes</label>
                    <textarea className="form-control shadow-md h-40" type="text" id="notes" name="notes" value={password} onChange={setValue} />                    
                </div>
                    { update ?
                        <div className="col-md-12 text-center mt-3">
                            <Button className="col-md-6 bg-green-600 p-3 rounded text-white hover:bg-purple-600">
                                Save Changes
                            </Button>
                        </div>
                        :<p></p>
                    }
            </form>
            <h1 className="text-red-500 md:text-xl col-md-8 mt-4">{errorMessage}</h1>
        </div>
    )
}