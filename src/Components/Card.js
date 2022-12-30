import React from 'react'
import { Link } from 'react-router-dom'

export const Card = ({capacity,fname,lname,id}) => {

  return (
    <div className="card border-none bg-purple-600">
          <div className="flex flex-col p-4 rounded items-center">
              <div className="flex w-full justify-around mb-3 py-2">
                  <h4 className=""><b>{fname} {lname}</b></h4> 
                  <p>{capacity}</p> 
              </div>
              <hr className="border-black border w-full mb-4" />
              <Link to={`/user/profile/${id}`}> View Workflow</Link>
        </div>
    </div>
  )
}

