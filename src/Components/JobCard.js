import React from 'react'
import { ReadJobForm } from '../Pages/ReadJobForm'
export const JobCard = ({ desc, pn, ln, due, jobid }) => {
  //need to import the React Bootstrap modal and glitch shouold be resolved
  //update modal title to be a button that when clicked will delete job request

  return (
     <div className="card border-none">
        <div className="text-white justify-around flex flex-col w-full my-2 p-2 bg-purple-600 rounded">
        <p className='px-4'>Desc: {desc}</p>
        <div className='flex flex-wrap justify-between px-4'>
            <p>PN: {pn}</p>
            <p>LN: {ln}</p>
        </div>
        <div className='flex flex-wrap justify-between px-4'>
          <p>Due: {due}</p>
          <button type="button" className="rounded hover:text-slate-700" data-bs-toggle="modal" data-bs-target="#exampleModal">
            View
          </button>
        </div>        
      </div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Cancel Job</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body container border-none">
              <ReadJobForm />
              </div>
              <div className="flex justify-around mt-3 p-2">
                <button type="button" className="col-md-4 bg-red-500 p-3 rounded text-white" data-bs-dismiss="modal">Close</button>
                <button type="button" className="col-md-4 bg-green-600 p-3 rounded text-white">Save changes</button>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

// <Link className="self-end mr-2" to={`/user/job/read/${jobid}`}> View</Link> 
//window.open(`/user/job/read/${jobid}`,'_blank') //opens new tab