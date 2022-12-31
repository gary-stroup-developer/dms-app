import React, { useState } from 'react';
import { ReadJobForm } from '../Pages/ReadJobForm'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';


export const JobCard = ({ desc, pn, ln, due, jobid }) => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <div className="card border-none">
        <div className="text-white justify-around flex flex-col w-full my-2 p-2 bg-purple-600 rounded">
          <p className='px-4'>Desc: {desc}</p>
          <div className='flex flex-wrap justify-between px-4'>
              <p>PN: {pn}</p>
              <p>LN: {ln}</p>
          </div>
          <div className='flex flex-wrap items-center justify-between px-4'>
            <p>Due: {due}</p>
            <Button variant="link" className="text-white border-none no-underline hover:shadow-md hover:shadow-stone-300" onClick={handleShow}>
              View
            </Button>
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
    </>
  )
}
