import React from "react"
import { Link } from "react-router-dom"
import { JobCard } from "../Components/JobCard";

export const UserProfile = () => {

     function toggleContent(section) {
         let content = document.getElementById(section);
         
         if (content.style.display === "none") {
             content.style.display = "block";
         }else{content.style.display = "none";}
    }
    return (
        <div>
            <div className="border-b border-black grid grid-cols-3 grid-rows-3 p-4">
                <h1 className="text-3xl row-start-1 col-start-2 col-span-2 mb-4 md:text-5xl">Gary Stroup</h1>
                <Link className="row-start-2 md:text-2xl" to="/dashboard/admin">Dashboard</Link>
                <Link className="row-start-3 md:text-2xl" to="/dashboard/user">Create Job</Link>
                <p className="row-start-2 col-start-3 md:text-3xl">Total Jobs: 54</p>
                <p className="row-start-3 col-start-3 md:text-3xl">Capacity: </p>
            </div>
            <div className="flex flex-wrap mt-5 justify-around">
                <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
                    <h1 className="text-white bg-purple-600 p-3 rounded" onClick={()=>toggleContent("queue")}>Queue</h1>
                    <div id="queue">
                        <JobCard key={1} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={2} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={3} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                    </div>
                </div>
                <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
                    <h1 className="text-white bg-purple-600 p-3 rounded" onClick={()=>toggleContent("wip")}>WIP</h1>
                    <div id="wip">
                        <JobCard key={4} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={5} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={6} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={7} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={8} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={9} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={10} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={11} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={12} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={13} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={14} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={15} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                    </div>
                </div>
                <div className="flex-col basis-10/12 mt-2 md:basis-1/4">
                    <h1 className="text-white bg-purple-600 p-3 rounded" onClick={()=>toggleContent("staged")}>Staged</h1>
                    <div id="staged">
                        <JobCard key={16} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={23} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                        <JobCard key={55} desc={"Stem Cells"} pn={"sc-456771"} ln={"3145567"} jobid={"mgd-2022-1jdye3"} due={"2022-12-31"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
