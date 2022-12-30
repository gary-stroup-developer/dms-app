import React from 'react'
import { Link } from "react-router-dom"
export const JobCard = ({desc,pn,ln,due,jobid}) => {
  return (
     <div className="card border-none">
        <div className="text-white justify-around flex flex-col w-full my-2 p-2 bg-purple-600 rounded">
            <p>Desc: {desc}</p>
            <p>PN: {pn}</p>
            <p>LN: {ln}</p>
            <p>Due: {due}</p>
            <Link className="self-end mr-2" to={`/user/job/read/${jobid}`}> View</Link>                  
        </div>
    </div>
  )
}
