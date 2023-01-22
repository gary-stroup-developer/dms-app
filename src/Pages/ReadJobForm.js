import axios from "axios";
import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from "react-bootstrap";


export const ReadJobForm = ({ data, update }) => {


    const [job, SetJob] = useState({
        cat_num: data.cat_num,
        cat_lot: data.cat_lot,
        raw_pn: data.raw_pn,
        raw_desc: data.raw_desc,
        qty: data.qty,
        start_date: data.start_date,
        end_date: data.end_date,
        notes: data.notes,
        fsr: {
            num_vials: data.fsr.num_vials,
            due_date: data.fsr.due_date,
            location: data.fsr.location,
            fsr_desc: data.fsr.fsr_desc,
            jobid: data.id,
            uid: data.uid
        },
        weight: data.weight,
        status: data.status,
        cbr: data.cbr,
        id: data.id,
        uid: data.uid,
        _id: data._id,
    });


    const [key, setKey] = useState('home');

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
   
    
    function setValue(e) {
        const { name, value } = e.target;
        const data = {
            ...job,
            [name]: value
        }
        SetJob(data);
    }

     function setFSR(e) {
        const { name, value } = e.target;

         switch (name) {
            case 'num_vials':
                 const numvials = {
                     ...job,
                     fsr: {
                         ...job.fsr,
                         num_vials: value,
                     }
                 };
                //  const newNum = { ...job, numvials }
                 SetJob(numvials);
                break;
             case 'due_date':
                 const due = {
                     ...job,
                     fsr: {
                         ...job.fsr,
                         due_date: value,
                     }
                 };
                //  const newDueDate = { ...job, due }
                 SetJob(due);
                 break;
            case 'location':
                const loc = {
                     ...job,
                     fsr: {
                         ...job.fsr,
                         location: value,
                     }
                 };
                //  const newLoc = { ...job, loc }
                 SetJob(loc);
                break;
            case 'fsr_desc':
                const desc = {
                     ...job,
                     fsr: {
                         ...job.fsr,
                         fsr_desc: value
                     }
                 };
                //  const newDesc = { ...job, desc }
                 SetJob(desc);
                break;
            default:
                console.log(`Sorry, option not available for ${name}.`);
        }
    }

   

    const updateJob = async () => {
        try {
                const response = await axios.post("http://localhost:8080/dms/job/update", job, {
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                

            setSuccessMessage(response.data);

            } catch (error) {
                // handle error
                setErrorMessage(error.response.data)
                
            }
    }

        return (
            <div className="col">
                <h1 className="text-purple-500 md:text-xl col-md-8 mt-4">{successMessage}</h1>
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                    <Tab eventKey="home" title="Home">
                        <h3 className="text-purple-700 text-xl mx-auto py-4 md:text-2xl">{data.cat_desc}</h3>
                        <form className="row g-3 border-none shadow-lg shadow-slate-200 pb-5">
                            <div className="col-md-6">
                                <label className="form-label" htmlFor="cat_num">Part Number</label>
                                {update ?
                                    <input className="form-control shadow-md" type="text" id="cat_num" name="cat_num" value={job.cat_num} onChange={setValue} />:
                                    <input className="form-control shadow-md" type="text" id="cat_num" name="cat_num" value={job.cat_num} onChange={setValue} disabled/>}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label" htmlFor="cat_lot">Lot Number</label>
                                {update ?
                                    <input className="form-control shadow-md" type="text" id="cat_lot" name="cat_lot" value={job.cat_lot} onChange={setValue} />:
                                    <input className="form-control shadow-md" type="text" id="cat_lot" name="cat_lot" value={job.cat_lot} onChange={setValue} disabled/>}
                            </div>

                            <div className="col-md-8">
                                <label className="form-label" htmlFor="raw_pn">Cell Line Part Number</label>
                                {update ?
                                    <input className="form-control shadow-md" type="text" id="raw_pn" name="raw_pn" value={job.raw_pn} onChange={setValue} />:
                                    <input className="form-control shadow-md" type="text" id="raw_pn" name="raw_pn" value={job.raw_pn} onChange={setValue} disabled/>}
                            </div>

                            <div className="col-md-12">
                                <label className="form-label" htmlFor="raw_desc">Cell Line Description</label>
                                {update ?
                                    <input className="form-control shadow-md" type="text" id="raw_desc" name="raw_desc" value={job.raw_desc} onChange={setValue} />:
                                    <input className="form-control shadow-md" type="text" id="raw_desc" name="raw_desc" value={job.raw_desc} onChange={setValue} disabled />}
                            </div>

                            <div className="col-md-9">
                                <label className="block form-label" htmlFor="qty">Quantity</label>
                                {update ?
                                    <input className="form-control shadow-md" type="text" id="qty" name="qty" value={job.qty} onChange={setValue} />:
                                    <input className="form-control shadow-md" type="text" id="qty" name="qty" value={job.qty} onChange={setValue} disabled />}
                            </div>

                            <div className="col-md-6">
                                <label className="block form-label" htmlFor="start_date">Start Date</label>
                                {update ?
                                    <input className="form-control shadow-md" type="date" id="start_date" name="start_date" value={job.start_date} onChange={setValue} />:
                                    <input className="form-control shadow-md" type="date" id="start_date" name="start_date" value={job.start_date} onChange={setValue} disabled />}
                            </div>

                            <div className="col-md-6">
                                <label className="block form-label" htmlFor="end_date">End Date</label>
                                {update ?
                                    <input className="form-control shadow-md" type="date" id="end_date" name="end_date" value={job.end_date} onChange={setValue} />:
                                    <input className="form-control shadow-md" type="date" id="end_date" name="end_date" value={job.end_date} onChange={setValue} disabled />}
                            </div>

                            <div className="col-md-12">
                                <label className="block form-label" htmlFor="notes">Notes</label>
                                {update ?
                                    <textarea className="form-control shadow-md h-40" type="text" id="notes" name="notes" value={job.notes} onChange={setValue} />:
                                    <textarea className="form-control shadow-md h-40" type="text" id="notes" name="notes" value={job.notes} onChange={setValue} disabled />}
                            </div>
                          
                        </form>
                    </Tab>
                    <Tab eventKey="FSR" title="FSR">
                        <div className="col-md-12">
                            {update ?
                                <form className="grid shadow-xl p-4 row-start-3 row-span-2 col-start-2 col-span-3 mt-0">
                                    <label className="block" htmlFor="fsr_desc">Cell Line Description</label>
                                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="fsr_desc" name="fsr_desc" value={job.fsr.fsr_desc} onChange={setFSR} />
                                    <label className="block mt-3" htmlFor="num_vials">Number of Vials</label>
                                    <input className="shadow-md my-3 rounded-md px-4 py-3" type="text" id="num_vials" name="num_vials" value={job.fsr.num_vials} onChange={setFSR} />
                                    <label className="block" htmlFor="due_date">Date Neded</label>
                                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="date" id="due_date" name="due_date" value={job.fsr.due_date} onChange={setFSR} />
                                    <label className="block" htmlFor="location">Location</label>
                                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="location" name="location" value={job.fsr.location} onChange={setFSR} />                    
                                </form> :
                                <form className="grid shadow-xl p-4 row-start-3 row-span-2 col-start-2 col-span-3 mt-0">
                                    <label className="block" htmlFor="fsr_desc">Cell Line Description</label>
                                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="fsr_desc" name="fsr_desc" value={job.fsr.fsr_desc} onChange={setFSR} disabled/>
                                    <label className="block mt-3" htmlFor="num_vials">Number of Vials</label>
                                    <input className="shadow-md my-3 rounded-md px-4 py-3" type="text" id="num_vials" name="num_vials" value={job.fsr.num_vials} onChange={setFSR} disabled/>
                                    <label className="block" htmlFor="due_date">Date Neded</label>
                                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="date" id="due_date" name="due_date" value={job.fsr.due_date} onChange={setFSR} disabled/>
                                    <label className="block" htmlFor="location">Location</label>
                                    <input className="shadow-md my-3 px-4 py-3 rounded-md mb-4" type="text" id="location" name="location" value={job.fsr.location} onChange={setFSR} disabled/>         
                                </form>
                            }
                        </div>
                    </Tab>
                    <Tab eventKey="CBR" title="CBR">
                        <div className="col-md-12">
                            <label className="block form-label" htmlFor="cbr">CBR</label>
                            {update ?
                                <input className="form-control shadow-md h-40" type="text" id="cbr" name="cbr" value={job.cbr.num_vials} onChange={setValue} />:
                                <input className="form-control shadow-md h-40" type="text" id="cbr" name="cbr" value={job.cbr.num_vials} onChange={setValue} disabled />
                            }
                        </div>
                    </Tab>
                </Tabs>
                {update ?
                    <div className="col-md-12 text-center mt-3">
                        <Button className="col-md-6 bg-green-600 p-3 rounded text-white hover:bg-purple-600" onClick={updateJob}>
                            Save Changes
                        </Button>
                    </div>
                    : <p></p>
                }
                <h1 className="text-red-500 md:text-xl col-md-8 mt-4">{errorMessage}</h1>
            </div>
        )
}
    
  