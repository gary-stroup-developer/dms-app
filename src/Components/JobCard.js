import axios from 'axios';
import React, { useState } from 'react';
import { ReadJobForm } from '../Pages/ReadJobForm'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Draggable } from '@hello-pangea/dnd';
import styled from "styled-components";

const Container = styled.div`
  border: none;
  
`
const Card = styled.div`
  background-color: ${(props) => (props.isDragging ? "#1e293b":"#9333ea")}
`

export const JobCard = ({ job, jobid, index }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

    const cancelJob = async () => {
        try {
            const response = await axios.post("http://localhost:8080/dms/delete-job/")
        } catch (error) {
            console.log(error.response.data)
          }
    }

  return (
    <>
      <Draggable draggableId={jobid} index={index}>
        {(provided,snapshot) => (
          <Container
            ref={provided.innerRef}
            {...provided.draggableProps}
            
          >
            <Card
              {...provided.dragHandleProps}
              isDragging={snapshot.isDragging}
              className="text-white justify-around flex flex-col w-full my-2 p-2 bg-purple-600 rounded"
            >
            <p className='px-4'>Desc: {job.raw_desc}</p>
            <div className='flex flex-wrap justify-between px-4'>
                <p>PN: {job.cat_num}</p>
                <p>LN: {job.cat_lot}</p>
            </div>
            <div className='flex flex-wrap items-center justify-between px-4'>
              <p>Due: {job.end_date}</p>
              <Button variant="link" className="text-white border-none no-underline hover:shadow-md hover:shadow-stone-300" onClick={handleShow}>
                View
              </Button>
            </div>        
          </Card>
        </Container>
        )}
      </Draggable>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><Button className="col-md-12 bg-red-500 p-3 rounded border-none text-white hover:bg-red-500" onClick={cancelJob}>Cancel Job</Button></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReadJobForm data={job} />
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
    </>
  )
}
