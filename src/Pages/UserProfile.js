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

    const [complete, SetComplete] = useState(0);
    const [queue, SetQueue] = useState({
        id: "queue",
        title: "Queue",
        jobs: []
    });
    const [wip, SetWip] = useState({
        id: "wip",
        title: "WIP",
        jobs: []
    });
    const [staged, SetStaged] = useState({
        id: "staged",
        title: "Staged",
        jobs: []
    });
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
        const getData = async () => {
            try {
                const response = await axios.post("http://localhost:8080/dms/userprofile/jobs", { uid: id }, {
                    headers: {
                        'content-type': 'application/json'
                    }
                });
                
                let user = await response.data.Users[0];
                let jobs = response.data.Jobs;
            
                if (user) {
                    SetFirst(user.firstname);
                    SetLast(user.lastname);
                    setCapacity(((user.capacity / 6.5) * 100).toFixed(2))
                }
                
                for (let job of jobs) {
                   
                    switch (job._id) {
                        case "queue":
                            const newQueueColumn = {
                                ...queue,
                                jobs: job.jobs.map((record) => record)
                            }
                            SetQueue(newQueueColumn)
                            break;
                        case "wip":

                            const newWIPColumn = {
                                ...wip,
                                jobs: job.jobs.map((record) => record)
                            }
                            SetWip(newWIPColumn);
                            break;
                        case "staged":

                            const newStagedColumn = {
                                ...staged,
                                jobs: job.jobs.map((record) => record)
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
        let col1 = "queue";
        let col2 = "wip";
        let col3 = "staged";
        const newState = {
            columns: {
                ...data.columns,
                [col1]: queue,
                [col2]: wip,
                [col3]: staged,
            }
        }
        SetData(newState);
        console.log({queue,wip,staged})
    },[queue,wip,staged]);

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
            <p className="text-black-500">{data.columns["wip"].jobs.length}</p>
            <p>{errorMessage}</p>
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
                    <Column key={queue.id} status={data.columns["queue"].jobs} toggle={queue.id} title={ queue.title } />
                    <Column key={wip.id} status={data.columns["wip"].jobs} toggle={wip.id} title={wip.title}/>
                    <Column key={staged.id} status={data.columns["staged"].jobs} toggle={ staged.id } title={staged.title}/>
                </Container>
            </DragDropContext>
        </div>
    )
}


                            