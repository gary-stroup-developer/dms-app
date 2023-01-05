import axios from "axios";
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button, Toast } from 'react-bootstrap';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useParams } from "react-router-dom";
import { DragDropContext} from '@hello-pangea/dnd';
import styled from "styled-components";
import { Column } from "../Components/Column";

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.25rem;
    justify-content: space-around;
`

export const UserProfile = () => {

    const [complete, SetComplete] = useState(0);
    const [queue, SetQueue] = useState({
        dropID:"column-1",
        id: "queue",
        title: "Queue",
        jobs: []
    });
    const [wip, SetWip] = useState({
        dropID:"column-2",
        id: "wip",
        title: "WIP",
        jobs: []
    });
    const [staged, SetStaged] = useState({
        dropID:"column-3",
        id: "staged",
        title: "Staged",
        jobs: []
    });
    const [data, SetData] = useState({
        columns: {
            "column-1": {
                dropID:"column-1",
                id: "queue",
                title: "Queue",
                jobs: []
            },
            "column-2": {
                dropID:"column-2",
                id: "wip",
                title: "WIP",
                jobs: []
            },
            "column-3": {
                dropID:"column-3",
                id: "staged",
                title: "Staged",
                jobs: []
            }
        }
    });
    const [user, SetUser] = useState({
        _id: "",
        capacity: 0,
        email: "",
        firstname: "",
        lastname: "",
        role: "",
        status: "",
        uid: ""
    });
    
    const [showB, SetShowB] = useState(false);
    const [PN, SetPN] = useState("");
    const [LN, SetLN] = useState("");
    const [response, SetResponse] = useState("");
    const [capacity, setCapacity] = useState(0);

    const [id, setID] = useState("");

    const [errorMessage, setErrorMessage] = useState(false);

    let userID = useParams();
    
    useEffect(() => {
        setID(userID.id)
        const getData = async () => {
            try {
                const response = await axios.post("http://localhost:8080/dms/userprofile/jobs", { uid: id }, {
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                
                let respUser = response.data.Users[0];

                SetUser((prevState) => ({
                    ...prevState,
                    ...respUser
                }));

                setCapacity(((respUser.capacity / 6.5) * 100).toFixed(2));

                let jobs = response.data.Jobs;

                for (let job of jobs) {
                   
                    switch (job._id) {
                        case "queue":
                            let newQueueColumn = {
                                ...queue,
                                jobs: job.jobs.map((record) => record)
                            }
                            SetQueue(newQueueColumn)
                            break;
                        case "wip":

                            let newWIPColumn = {
                                ...wip,
                                jobs: job.jobs.map((record) =>record)
                            }
                            SetWip(newWIPColumn);
                            break;
                        case "staged":

                            let newStagedColumn = {
                                ...staged,
                                jobs: job.jobs.map((record) =>record)
                            }
                            SetStaged(newStagedColumn);
                            break;
                        case "complete":
                            SetComplete(job.jobs.length);
                            break;
                        default:
                            setErrorMessage("Jobs unavailable at this time");
                    }
                }
            } catch (error) {
                // handle error
                if (error) {
                    console.log(error)
                }
                
            }
        };

        getData();

    }, [id, userID]);

    
    useEffect(() => {
        let col1 = "column-1";
        let col2 = "column-2";
        let col3 = "column-3";
        const newState = {
            columns: {
                ...data.columns,
                [col1]: queue,
                [col2]: wip,
                [col3]: staged,
            }
        }
        SetData(newState);

        

    },[queue,wip,staged]);

    const onDragEnd = (result) => {
        const { destination, source } = result;

        //if user drags item outside list area or doesnt move it
        if (!destination) {
            return
        }

        //item dragged but ultimately placed back to original spot or just selected but not moved
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }
        
        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];
               

        //moving items within a list
        if (source.droppableId === destination.droppableId) {
            let newJobs = start.jobs.map(m => m);
            let result = newJobs.splice(source.index, 1);
            
            newJobs.splice(destination.index, 0, result[0])

            const newColumn = {
                ...start,
                jobs: newJobs
            };

            const newState = {
                ...data,
                columns: {
                    ...data.columns,
                    [source.droppableId]: newColumn
                }
            }
            SetData(newState);
            return
        }

        //Moving from one list to another
        let startJobs = start.jobs.map((s) => s);
        let startResult = startJobs.splice(source.index, 1);

        const newStart = {
            ...start,
            jobs: startJobs
        };

        let finishJobs = finish.jobs.map((f) => f);
        finishJobs.splice(destination.index, 0, startResult[0]);

        const newFinish = {
            ...finish,
            jobs: finishJobs
        };

        const newState = {
            ...data,
            columns: {
                ...data.columns,
                [newStart.dropID]: newStart,
                [newFinish.dropID]: newFinish
            }
        };

        SetData(newState);

        let newJobStatus = "queue";
        if ((source.droppableId === "column-1" && destination.droppableId === "column-3") || (source.droppableId === "column-3" && destination.droppableId === "column-1")) {
            //update status only
            if (destination.droppableId === "column-3") {
                newJobStatus = "staged";
            }

            updateStatus(newJobStatus,startResult[0],false)

        } else if ((source.droppableId === "column-1" && destination.droppableId === "column-2") || (source.droppableId === "column-3" && destination.droppableId === "column-2")) {
            //add capacity to user and change status
            SetUser((prevState) => ({
                ...prevState,
                capacity: (user.capacity + startResult[0].weight)
            }));
            newJobStatus = "wip";

            setCapacity((((user.capacity + startResult[0].weight) / 6.5) * 100).toFixed(2));
            updateStatus(newJobStatus,startResult[0],true)
        } else if ((source.droppableId === "column-2" && destination.droppableId === "column-1") || (source.droppableId === "column-2" && destination.droppableId === "column-3")) {
            //subtract capcity from user and change status

            if (destination.droppableId === "column-3") {
               newJobStatus = "staged";
            }
      
            setCapacity((((user.capacity - startResult[0].weight) / 6.5) * 100).toFixed(2));
            SetUser((prevState) => ({
                ...prevState,
                capacity: (user.capacity - startResult[0].weight)
            }));
            
            updateStatus(newJobStatus, startResult[0], true);

        } else { console.log(source.droppableId) }
    }

    const updateStatus = async (status, job, capacity) => {
        
        try {
            job.status = status;
            const response = await axios.post("http://localhost:8080/dms/update/job-status", { job, capacity }, {
                headers: {
                    'content-type': 'application/json'
                }
            });
            //add a toast
            //console.log(response)
            SetResponse(response.data);
            SetPN(job.cat_num);
            SetLN(job.cat_lot);
            SetShowB(true);

            setTimeout(() => {
                SetShowB(false);
            }, 3000);
            
        } catch (error) {
            // handle error error.response.data
            setErrorMessage(true);

            SetResponse(error.response.data);
            SetPN(job.cat_num);
            SetLN(job.cat_lot);
            SetShowB(true);

            setTimeout(() => {
                SetShowB(false);
                setErrorMessage(false);
            }, 3000);
        }
    }

    return (
        <div>
            <div className="text-slate-700 border-b border-black grid grid-cols-3 grid-rows-3 p-4">
                <h1 className="text-3xl row-start-1 col-start-2 col-span-2 mb-4 md:text-5xl">{user.firstname} {user.lastname}</h1>
                <Link className="row-start-2 self-center justify-self-center p-4 md:text-2xl hover:text-purple-600" to="/dashboard/admin">Dashboard</Link>
                {/* <Link className="row-start-3 md:text-2xl" to="/dashboard/user">Create Job</Link> */}
                <Button variant="link" className="row-start-3 text-slate-700 md:text-2xl border-none no-underline hover:text-purple-600">
                    Create Job
                </Button>
                <p className="row-start-2 col-start-3 self-center justify-self-center p-4 md:text-2xl">Total Jobs: {complete }</p>
                <p className="row-start-3 col-start-3 self-center justify-self-center p-4 md:text-2xl">Capacity: {capacity}% </p>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <Container>
                    <Column key={queue.id} id={queue.dropID} jobs={data.columns["column-1"].jobs} toggle={queue.id} title={ queue.title } />
                    <Column key={wip.id} id={wip.dropID} jobs={data.columns["column-2"].jobs} toggle={wip.id} title={wip.title}/>
                    <Column key={staged.id} id={staged.dropID} jobs={data.columns["column-3"].jobs} toggle={ staged.id } title={staged.title}/>
                </Container>
            </DragDropContext>
            <ToastContainer className="ml-3 p-3" position={"top-start"}>
                <Toast className="mt-3" show={showB}>
                    <Toast.Header>
                        <strong className="me-auto">{PN} - {LN}</strong>
                        <small>Now</small>
                    </Toast.Header>
                    <Toast.Body>{errorMessage ? <p className="text-red-500">{response}</p> : <p className="text-slate-700">{response}</p>}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}


                            