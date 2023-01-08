import axios from "axios"
import { useState } from "react";
import { Button,Form } from "react-bootstrap";

export const CreateJobForm = ({ id,show }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [cat_num, setCatNum] = useState("");
    const [cat_lot, setCatLot] = useState("");
    const [cat_desc, setCatDescription] = useState("");
    const [raw_pn, setRawPN] = useState("");
    const [raw_desc, setRawDesc] = useState("");
    const [weight, setWeight] = useState(0);
    const [notes, setNotes] = useState("");
    const [qty, setQty] = useState("");
    const [start_date, SetStartDate] = useState("");
    const [end_date,SetEndDate] = useState("");

    const [searchPN, setSearchPN] = useState("");
    
    
    function setValue(e) {
        const { name, value } = e.target;
        switch (name) {
            case 'cat_desc':
                setCatDescription(value);
                break;
            case 'cat_num':
                setCatNum(value);
                break;
            case 'cat_lot':
                setCatLot(value);
                break;
            case 'raw_pn':
                setRawPN(value);
                break;
            case 'raw_desc':
                setRawDesc(value);
                break;
            case 'qty':
                setQty(value);
                break;
            case 'start_date':
                SetStartDate(value);
                break;
            case 'end_date':
                SetEndDate(value);
                break;
            case 'notes':
                setNotes(value);
                break;
            case 'searchPN':
                setSearchPN(value);
                break;
            default:
                console.log(`Sorry, option not available for ${name}.`);
        }
    };

    const searchCatNum = async () => {
        try {
            const response = await axios.post("http://localhost:8080/dms/job/create/search", { cat_num:searchPN }, {
                headers: {
                    'content-type': 'application/json'
                }
            });
            console.log(response.data)
            setCatNum(response.data.cat_num);
            setCatDescription(response.data.cat_desc);
            setRawPN(response.data.raw_pn);
            setRawDesc(response.data.raw_desc);
            setWeight(response.data.weight)

        } catch (error) {
            // handle error
            setErrorMessage(error.response.data);
        };
    };

    const createJob = async () => {
        try {
            const response = await axios.post("http://localhost:8080/dms/job/create", {
                cat_num,
                cat_lot,
                cat_desc,
                raw_desc,
                raw_pn,
                qty,
                start_date,
                end_date,
                weight,
                notes,
                status: "queue",
                uid: id,
            }, {
                headers: {
                    'content-type': 'application/json'
                }
            });
            setSuccessMessage(response.data)
            setTimeout(() => {
                window.location.reload();
            }, 2300);
            
        } catch (error) {
            // handle error
            setErrorMessage(error.response.data);
        };
    }

    return (
        <div className="col">
            <Form className="d-flex">
                <Form.Control
                type="text"
                placeholder="Search"
                
                aria-label="Search"
                name="searchPN"
                value={searchPN}
                onChange={setValue}
                />
                <Button variant="outline-dark" onClick={searchCatNum}>Search</Button>
            </Form>
            <h3 className="text-purple-700 text-xl mx-auto py-4 md:text-2xl">Create New Job Request</h3>
            <form className="row g-3 border-none shadow-lg shadow-slate-200 pb-5">
                <div className="col-md-6">
                <label className="form-label" htmlFor="cat_num">Part Number</label>
                <input className="form-control shadow-md" type="text" id="cat_num" name="cat_num" value={cat_num} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="form-label" htmlFor="cat_lot">Lot Number</label>
                <input className="form-control shadow-md" type="text" id="cat_lot" name="cat_lot" value={cat_lot} onChange={setValue} />
                </div>

                <div className="col-md-12">
                <label className="form-label" htmlFor="cat_desc">Product Description</label>
                <input className="form-control shadow-md" type="text" id="cat_desc" name="cat_desc" value={cat_desc} onChange={setValue} />
                </div>

                <div className="col-md-12">
                <label className="form-label" htmlFor="raw_desc">Cell Line Description</label>
                <input className="form-control shadow-md" type="text" id="raw_desc" name="raw_desc" value={raw_desc} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="form-label" htmlFor="raw_pn">Cell Line Part Number</label>
                <input className="form-control shadow-md" type="text" id="raw_pn" name="raw_pn" value={raw_pn} onChange={setValue} />
                </div>

                <div className="col-md-9">
                <label className="block form-label" htmlFor="qty">Quantity</label>
                <input className="form-control shadow-md" type="text" id="qty" name="qty" value={qty} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="block form-label" htmlFor="start_date">Start Date</label>
                <input className="form-control shadow-md" type="date" id="start_date" name="start_date" value={start_date} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="block form-label" htmlFor="end_date">End Date</label>
                <input className="form-control shadow-md" type="date" id="end_date" name="end_date" value={end_date} onChange={setValue} />
                </div>

                <div className="col-md-12">
                    <label className="block form-label" htmlFor="notes">Notes</label>
                    <textarea className="form-control shadow-md h-40" type="text" id="notes" name="notes" value={notes} onChange={setValue} />                    
                </div>
                    { show ?
                        <div className="col-md-12 text-center mt-3">
                            <Button className="col-md-6 bg-green-600 p-3 rounded text-white hover:bg-purple-600" onClick={createJob}>
                                Save Changes
                            </Button>
                        </div>
                        :<p></p>
                    }
            </form>
            <h4 className="text-purple-600 md:text-xl col-md-8 mt-4">{successMessage}</h4>
            <h4 className="text-red-500 md:text-xl col-md-8 mt-4">{errorMessage}</h4>
        </div>
    )
}