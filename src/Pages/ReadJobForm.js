import axios from "axios";
import { useState } from "react";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Button } from "react-bootstrap";
import { FSR } from "./FSR";

export const ReadJobForm = ({ data, update }) => {
    //need to set correct state values
    //axios request to get job by jobid
    //populate the fields
    //fields disabled until update btn clicked
    const [job, SetJob] = useState({
        cat_num: data.cat_num,
        cat_lot: data.cat_lot,
        raw_pn: data.raw_pn,
        raw_desc: data.raw_desc,
        qty: data.qty,
        start_date: data.start_date,
        end_date: data.end_date,
        notes: data.notes,
        fsr: data.fsr,
        cbr: data.cbr,
    });
    // const [catnum,SetCatNum] = useState();
    // const [catlot, SetCatLot] = useState();
    // const [rawpn, SetRawPN] = useState();
    // const [rawdesc, SetRawDesc] = useState();
    // const [qty, SetQty] = useState();
    // const [startDate, SetStartDate] = useState();
    // const [endDate, SetEndDate] = useState();
    // const [notes, SetNotes] = useState();
    // const [fsr, SetFSR] = useState();
    // const [cbr, SetCBR] = useState(data.cbr);
    const [key, setKey] = useState('home');
    const [errorMessage, setErrorMessage] = useState("");
    
    function setValue(e) {
        const { name, value } = e.target;
        const data = {
            ...job,
            [name]: value
        }
        SetJob(data);
    }

    const updateJob = async () => {
        try {
                const response = await axios.post("http://localhost:8080/dms/job/update", { job }, {
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                

            let updatedJobInfo = response.data.Jobs;
            console.log(updatedJobInfo)

            } catch (error) {
                // handle error
                setErrorMessage(error.response.data)
                
            }
    }

        return (
            <div className="col">
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
                            <label className="block form-label" htmlFor="fsr">FSR</label>
                            <FSR user={data.uid} fsrData={ data.fsr } jobid={data.id} update={update} />
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