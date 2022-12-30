import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Card } from "../Components/Card";
import { SideNav } from "../Components/SideNav";
import ProgressBar from 'react-bootstrap/ProgressBar';
import {useParams} from "react-router-dom";

export const Dashboard = () => {
    const [capacity, setCapacity] = useState(0); //departments total capacity
    const [userProfile, setUserProfile] = useState([]); //holds array of the user data sent from backend
    const [errorMessage, setErrorMessage] = useState(""); //displays error message if any
    const [role, setRole] = useState(""); //the role of the current user

    let userRole = useParams(); //gets the role form the url param ex. /user/:role /user/admin return {role: admin}
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        axios.post("http://localhost:8080/dms/dashboard", {
            headers: {
                'content-type': 'application/json'
            }
        }).then((response) => {
            //set the role for the current user logged in
            setRole(userRole.role)

            let respUser = []; //hold the array of <Card />
            let totalCapacity = 0;

            for (let user of response.data) {
                totalCapacity += (user.capacity / 6.5);
                
                respUser.push(<Card key={user._id} capacity={((user.capacity / 6.5) * 100).toFixed(2)} fname={user.firstname} lname={user.lastname} id={user.uid} />)
                
                setCapacity(totalCapacity/(response.data.length))
                setUserProfile(respUser.map(u => u))
            }
            })
            .catch(function (error) {
                // handle error
                setErrorMessage(error.response.data);
            });
    },[userProfile,userRole]); // Only re-run the effect if count changes

    return (
        <div className="grid grid-cols-5 grid-rows-2 sm: grid-rows-1">
            <SideNav role={role} />
            <main className="row-start-2 col-start-1 col-span-5 bg-slate-800 text-white p-4 sm:h-screen sm:row-start-1 sm:col-start-2 sm:col-span-4">
                {errorMessage}
                <div>
                    <h1 className="mb-4">Cell Culture Capacity: { (capacity*100).toFixed(2) }%</h1>
                    <ProgressBar variant={(capacity * 100) > 80? "success": (capacity * 100) > 60 ? "warning":"danger" } now={capacity * 100} label={`${(capacity * 100).toFixed(2)}%`} />
                </div>
                <div className="mt-4 grid w-full grid-cols-1 gap-3 md:grid-cols-3">
                    {userProfile.map(card => card)}
                </div>
            </main>
        </div>
    )
}

