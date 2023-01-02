import axios from "axios";
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { JobCard } from "../Components/JobCard";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { ReadJobForm } from '../Pages/ReadJobForm';
import { useParams } from "react-router-dom";
import { Draggable, Droppable } from 'react-drag-and-drop';

export const UserProfile = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [queue, setQueue] = useState([]);
    const [wip, SetWip] = useState([]);
    const [staged, SetStaged] = useState([]);
    const [complete, SetComplete] = useState(0);

    const [first, SetFirst] = useState("");
    const [last, SetLast] = useState("");
    const [capacity, setCapacity] = useState(0);

    const [id, setID] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    let userID = useParams();
    
    useEffect(() => {
        setID(userID.id)
        axios.post("http://localhost:8080/dms/userprofile/jobs", {uid:id}, {
            headers: {
                'content-type': 'application/json'
            }
        }).then((response) => {
            let user = response.data.Users[0];
            let jobs = response.data.Jobs[0];
            if (user) {
                SetFirst(user.firstname);
                SetLast(user.lastname);
                setCapacity(((user.capacity/6.5)*100).toFixed(2))
            }
            if (jobs) {
                switch (jobs._id) {
                    case "queue":
                        setQueue(jobs.jobs.map((record) => record));
                        break;
                    case "wip":
                        SetWip(jobs.jobs.map((record) => record));
                        break;
                    case "staged":
                        SetStaged(jobs.jobs.map((record) => record));
                        break;
                    case "complete":
                        SetComplete(jobs.jobs.length);
                        break;
                    default:
                        setErrorMessage("Jobs unavailable at this time");
                }
            }
            })
            .catch((error) => {
                // handle error
                while (!error) {
                    console.log("uh oh")
                }
                console.log(error)
            });
    },[id,userID]);

    function toggleContent(section) {
        let content = document.getElementById(section);
         
        if (content.style.display === "none") {
             content.style.display = "block";
        }else{content.style.display = "none";}
    }
    return (
        <div>
            {errorMessage}
            <div className="text-slate-700 border-b border-black grid grid-cols-3 grid-rows-3 p-4">
                <h1 className="text-3xl row-start-1 col-start-2 col-span-2 mb-4 md:text-5xl">{first} { last}</h1>
                <Link className="row-start-2 self-center justify-self-center p-4 md:text-2xl hover:text-purple-600" to="/dashboard/admin">Dashboard</Link>
                {/* <Link className="row-start-3 md:text-2xl" to="/dashboard/user">Create Job</Link> */}
                <Button variant="link" className="row-start-3 text-slate-700 md:text-2xl border-none no-underline hover:text-purple-600" onClick={handleShow}>
                    Create Job
                </Button>
                <p className="row-start-2 col-start-3 self-center justify-self-center p-4 md:text-2xl">Total Jobs: {complete }</p>
                <p className="row-start-3 col-start-3 self-center justify-self-center p-4 md:text-2xl">Capacity: {capacity}% </p>
            </div>
            <div className="flex flex-wrap mt-5 justify-around">
                <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
           
                        <div className="flex justify-between text-white bg-purple-600 p-3 rounded" onClick={()=>toggleContent("queue")}>
                            <h1>Queue</h1>
                            <p>{queue.length}</p>
                        </div>
                    <Droppable>
                        <div id="queue">
                            {
                                queue.map(job => <Draggable data={job._id}><JobCard key={job._id} desc={job.raw_desc} pn={job.cat_num} ln={job.cat_lot} jobid={job._id} due={"2022-12-31"} /></Draggable>)
                            }
                        </div>
                    </Droppable>
                </div>

                <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
                    <div className="flex justify-between text-white bg-purple-600 p-3 rounded" onClick={()=>toggleContent("wip")}>
                        <h1>WIP</h1>
                        <p>{wip.length}</p>
                    </div>

                    <div id="wip">
                        {
                            wip.map(job =><JobCard key={job._id} desc={job.raw_desc} pn={job.cat_num} ln={job.cat_lot} jobid={job._id} due={"2022-12-31"}/>)
                        }
                    </div>
                </div>

                <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
                    <div className="flex justify-between text-white bg-purple-600 p-3 rounded" onClick={() => toggleContent("staged")}>
                        <h1>Staged</h1>
                        <p>{staged.length}</p>
                    </div>
                    
                    <div id="staged">
                        {
                            staged.map(job =><JobCard key={job._id} desc={job.raw_desc} pn={job.cat_num} ln={job.cat_lot} jobid={job._id} due={"2022-12-31"}/>)
                        }
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title><Button className="col-md-12 bg-red-500 p-3 rounded border-none text-white hover:bg-red-500">Cancel Job</Button></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ReadJobForm />
                </Modal.Body>
                <Modal.Footer>
                <Button className="col-md-4 bg-red-500 p-3 rounded text-white hover:bg-red-500" onClick={handleClose}>
                    Close
                </Button>
                <Button className="col-md-4 bg-green-600 p-3 rounded text-white hover:bg-purple-600" onClick={handleClose}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
