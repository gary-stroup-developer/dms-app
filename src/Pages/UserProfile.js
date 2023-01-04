import axios from "axios";
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { DragDropContext} from 'react-beautiful-dnd';
import styled from "styled-components";
import { Column } from "../Components/Column";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.25rem;
    justify-content: space-around;
`

export const UserProfile = () => {
    // const [show, setShow] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    const [queue, setQueue] = useState([]);
    const [wip, SetWip] = useState([]);
    const [staged, SetStaged] = useState([]);
    const [complete, SetComplete] = useState(0);
    const [data, SetData] = useState({
        columns: {
            "queue": {
                id: "queue",
                title: "Queue",
                jobs: []
            },
            "wip": {
                id: "wip",
                title: "WIP",
                jobs: []
            },
            "staged": {
                id: "staged",
                title: "Staged",
                jobs: []
            }
        }
    });

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
            let jobs = response.data.Jobs;
            console.log(response.data.Jobs)
            if (user) {
                SetFirst(user.firstname);
                SetLast(user.lastname);
                setCapacity(((user.capacity/6.5)*100).toFixed(2))
            }
            for (let job of jobs) {
                if (job) {
                    switch (job._id) {
                        case "queue":
                            setQueue(job.jobs.map((record) => record));
                            const newQueueState = {
                            columns: {
                                ...data.columns,
                                [job._id]: {
                                    ...data.columns[job._id],
                                    jobs:job.jobs.map((record) => record)
                                    }
                                }
                            }
                            SetData(newQueueState);
                            break;
                        case "wip":
                            SetWip(job.jobs.map((record) => record));
                            break;
                        case "staged":
                            SetStaged(job.jobs.map((record) => record));
                            break;
                        case "complete":
                            SetComplete(job.jobs.length);
                            break;
                        default:
                            setErrorMessage("Jobs unavailable at this time");
                    }
                }
            }

           

            const newWipState = {
                columns: {
                    ...data.columns,
                    [data.columns["wip"].id]: {
                        ...data.columns.wip,
                        jobs:wip.map((record) => record)
                    }
                }
            }
            SetData(newWipState);
           
            const newStageState = {
                columns: {
                    ...data.columns,
                    [data.columns["staged"].id]: {
                        ...data.columns.staged,
                        jobs: staged.map((record) => record)
                    }
                }
            }
            SetData(newStageState);

            console.log(data);
            })
            .catch((error) => {
                // handle error
                while (!error) {
                    console.log("uh oh")
                }
                console.log(error)
            });
    }, [id, userID,SetData]);
    
    const updateList = (result) => {
        const { destination, source, draggableId } = result;

        //if user drags item outside list area or doesnt move it
        if (!destination) {
            return;
        }

        //item dragged but ultimately placed back to original spot or just selected but not moved
        if (
            destination.droppabaleId === source.droppabaleId &&
            destination.index === source.index
        ) { return }
        
        
    }

    return (
        <div>
            {errorMessage}
            <div className="text-slate-700 border-b border-black grid grid-cols-3 grid-rows-3 p-4">
                <h1 className="text-3xl row-start-1 col-start-2 col-span-2 mb-4 md:text-5xl">{first} { last}</h1>
                <Link className="row-start-2 self-center justify-self-center p-4 md:text-2xl hover:text-purple-600" to="/dashboard/admin">Dashboard</Link>
                {/* <Link className="row-start-3 md:text-2xl" to="/dashboard/user">Create Job</Link> */}
                <Button variant="link" className="row-start-3 text-slate-700 md:text-2xl border-none no-underline hover:text-purple-600">
                    Create Job
                </Button>
                <p className="row-start-2 col-start-3 self-center justify-self-center p-4 md:text-2xl">Total Jobs: {complete }</p>
                <p className="row-start-3 col-start-3 self-center justify-self-center p-4 md:text-2xl">Capacity: {capacity}% </p>
            </div>
            <DragDropContext onDragEnd={updateList}>
                <Container>
                    <Column key={"queue"} status={queue} toggle={"queue"} title={ "Queue" } />
                    <Column key={"wip"} status={wip} toggle={"wip"} title={"WIP"}/>
                    <Column key={"staged"} status={staged} toggle={ "staged" } title={"Staged"}/>
                </Container>
            </DragDropContext>
        </div>
    )
}


            // <DragDropContext>
            // <div className="flex flex-wrap mt-5 justify-around">
            //     <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
           
            //             <div className="flex justify-between text-white bg-purple-600 p-3 rounded" onClick={()=>toggleContent("queue")}>
            //                 <h1>Queue</h1>
            //                 <p>{queue.length}</p>
            //             </div>
            //         <Droppable droppableId="queue">
            //             {provided => (
            //                 <div innerRef={provided.innerRef} {...provided.droppableProps} id="queue">
            //                     {
            //                         queue.map((job,index) => <JobCard key={job._id} desc={job.raw_desc} pn={job.cat_num} ln={job.cat_lot} jobid={job._id} due={"2022-12-31"} index={index} />)
            //                     }
            //                     {provided.placeholder}
            //                 </div>
            //             )}
            //         </Droppable>
            //     </div>

            //     <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
            //         <div className="flex justify-between text-white bg-purple-600 p-3 rounded" onClick={()=>toggleContent("wip")}>
            //             <h1>WIP</h1>
            //             <p>{wip.length}</p>
            //         </div>

            //         <div id="wip">
            //             {
            //                 wip.map(job =><JobCard key={job._id} desc={job.raw_desc} pn={job.cat_num} ln={job.cat_lot} jobid={job._id} due={"2022-12-31"}/>)
            //             }
            //         </div>
            //     </div>

            //     <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
            //         <div className="flex justify-between text-white bg-purple-600 p-3 rounded" onClick={() => toggleContent("staged")}>
            //             <h1>Staged</h1>
            //             <p>{staged.length}</p>
            //         </div>
                    
            //         <div id="staged">
            //             {
            //                 staged.map(job =><JobCard key={job._id} desc={job.raw_desc} pn={job.cat_num} ln={job.cat_lot} jobid={job._id} due={"2022-12-31"}/>)
            //             }
            //         </div>
            //     </div>
            // </div>
            // </DragDropContext>