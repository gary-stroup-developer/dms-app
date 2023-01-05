import axios from "axios";
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap';
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
                    setCapacity(((user.capacity / 6.5) * 100).toFixed(2));
                }

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
        const { destination, source} = result;

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
            
            newJobs.splice(destination.index,0,result[0])

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
    }

    return (
        <div>
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
            <DragDropContext onDragEnd={onDragEnd}>
                <Container>
                    <Column key={queue.id} id={queue.dropID} jobs={data.columns["column-1"].jobs} toggle={queue.id} title={ queue.title } />
                    <Column key={wip.id} id={wip.dropID} jobs={data.columns["column-2"].jobs} toggle={wip.id} title={wip.title}/>
                    <Column key={staged.id} id={staged.dropID} jobs={data.columns["column-3"].jobs} toggle={ staged.id } title={staged.title}/>
                </Container>
            </DragDropContext>
        </div>
    )
}


                            