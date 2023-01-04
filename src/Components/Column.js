import React from 'react';
import styled from "styled-components";
import { Droppable } from 'react-beautiful-dnd';
import { JobCard } from "../Components/JobCard";

const JobList = styled.div``
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    color: white;
    background-color: #9333ea;
    border-radius: 8px;
    padding: 0.75rem;
`

export const Column = ({ status,toggle,title }) => {
    function toggleContent(section) {
        let content = document.getElementById(section);
        
        if (content.style.display === "none") {
            content.style.display = "block";
        }else{content.style.display = "none";}
    };

  return (
      <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
            <Header onClick={()=>toggleContent(toggle)}>
                <h1>{ title }</h1>
                <p>{status.length}</p>
            </Header>
            <Droppable droppableId={toggle}>
                {provided => (
                    <JobList ref={provided.innerRef} {...provided.droppableProps} id={toggle}>
                        {
                            status.map((job,index) => <JobCard key={job._id} desc={job.raw_desc} pn={job.cat_num} ln={job.cat_lot} jobid={job._id} due={"2022-12-31"} index={index} />)
                        }
                        {provided.placeholder}
                    </JobList>
                )}
            </Droppable>
        </div>
  )
}