import axios from "axios";
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { JobCard } from "../Components/JobCard";
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { ReadJobForm } from '../Pages/ReadJobForm';
import {useParams} from "react-router-dom";

export const UserProfile = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [id, setID] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    let userID = useParams();

    useEffect(() => {
        setID(userID.id)
        axios.post("http://localhost:8080/dms/userprofile/jobs", {uid:"X202202"}, {
            headers: {
                'content-type': 'application/json'
            }
        }).then((response) => {
            console.log(response.data)
            //set the role for the current user logged in
            

            // let respUser = []; //hold the array of <Card />
            // let totalCapacity = 0;

            // for (let user of response.data) {
                // totalCapacity += (user.capacity / 6.5);
                
                // respUser.push(<Card key={user._id} capacity={((user.capacity / 6.5) * 100).toFixed(2)} fname={user.firstname} lname={user.lastname} id={user.uid} />)
                
                // setCapacity(totalCapacity/(response.data.length))
                // setUserProfile(respUser.map(u => u))
            // }
            })
            .catch(function (error) {
                // handle error
                setErrorMessage(error.response.data);
            });
    },[]);

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
                <h1 className="text-3xl row-start-1 col-start-2 col-span-2 mb-4 md:text-5xl">Gary Stroup</h1>
                <Link className="row-start-2 self-center justify-self-center p-4 md:text-2xl hover:text-purple-600" to="/dashboard/admin">Dashboard</Link>
                {/* <Link className="row-start-3 md:text-2xl" to="/dashboard/user">Create Job</Link> */}
                <Button variant="link" className="row-start-3 text-slate-700 md:text-2xl border-none no-underline hover:text-purple-600" onClick={handleShow}>
                    Create Job
                </Button>
                <p className="row-start-2 col-start-3 self-center justify-self-center p-4 md:text-2xl">Total Jobs: 54</p>
                <p className="row-start-3 col-start-3 self-center justify-self-center p-4 md:text-2xl">Capacity: 88% </p>
            </div>
            <div className="flex flex-wrap mt-5 justify-around">
                <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
                    <h1 className="text-white bg-purple-600 p-3 rounded" onClick={()=>toggleContent("queue")}>Queue</h1>
                    <div id="queue">
                        <JobCard key={1} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={2} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={3} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                    </div>
                </div>
                <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
                    <h1 className="text-white bg-purple-600 p-3 rounded" onClick={()=>toggleContent("wip")}>WIP</h1>
                    <div id="wip">
                        <JobCard key={4} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={5} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={6} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={7} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={8} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={9} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={10} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={11} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={12} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={13} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={14} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={15} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                    </div>
                </div>
                <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
                    <h1 className="text-white bg-purple-600 p-3 rounded" onClick={()=>toggleContent("staged")}>Staged</h1>
                    <div id="staged">
                        <JobCard key={16} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={23} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={55} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
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
