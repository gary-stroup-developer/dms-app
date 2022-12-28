import React from "react";
import { Card } from "../Components/Card";
import { SideNav } from "../Components/SideNav";

export const Dashboard = () => {

    return (
        <div className="grid grid-cols-5 grid-rows-2 sm: grid-rows-1">
            <SideNav role={'admin'} />
            <main className="row-start-2 col-start-1 col-span-5 bg-slate-800 text-white p-4 sm:h-screen sm:row-start-1 sm:col-start-2 sm:col-span-4">
                <div>
                    <h1>Cell Culture Capacity: 95%</h1>
                    <label className="block my-4" htmlFor="progress-bar">Uploading Document</label>
                    <progress className="w-2/3 rounded p-1" id="progress-bar" value="70" max="100" />
                </div>
                <div className="col-span-2 grid w-full grid-cols-2 gap-3 md:grid-cols-3">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </main>
        </div>
    )
}

