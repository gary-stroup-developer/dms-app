import { useState } from "react";
export const ReadJobForm = ({ jobid }) => {
    //need to set correct state values
    //axios request to get job by jobid
    //populate the fields
    //fields disabled until update btn clicked
    const [username, SetUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    
      function setValue(e) {
        const { name, value } = e.target;
        switch (name) {
            case 'username':
                SetUsername(value);
                break;
            case 'password':
                setPassword(value);
                break;
            default:
                console.log(`Sorry, option not available for ${name}.`);
        }
    }
    return (
        <div className="col">
            <h3 className="text-purple-700 text-xl mx-auto py-4 md:text-2xl">Job Description</h3>
            <form className="row g-3 border-none shadow-lg shadow-slate-200 pb-5">
                <div className="col-md-6">
                <label className="form-label" htmlFor="username">Part Number</label>
                <input className="form-control shadow-md" type="text" id="cat_num" name="cat_num" value={username} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="form-label" htmlFor="password">Lot Number</label>
                <input className="form-control shadow-md" type="text" id="cat_lot" name="cat_lot" value={password} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="form-label" htmlFor="password">Cell Line Part Number</label>
                <input className="form-control shadow-md" type="text" id="raw_pn" name="raw_pn" value={password} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="form-label" htmlFor="password">Cell Line description</label>
                <input className="form-control shadow-md" type="text" id="raw_desc" name="raw_desc" value={password} onChange={setValue} />
                </div>

                <div className="col-md-9">
                <label className="block form-label" htmlFor="password">Quantity</label>
                <input className="form-control shadow-md" type="text" id="qty" name="qty" value={password} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="block form-label" htmlFor="password">Start Date</label>
                <input className="form-control shadow-md" type="text" id="start_date" name="start_date" value={password} onChange={setValue} />
                </div>

                <div className="col-md-6">
                <label className="block form-label" htmlFor="password">End Date</label>
                <input className="form-control shadow-md" type="text" id="end_date" name="end_date" value={password} onChange={setValue} />
                </div>

                <div className="col-md-12">
                <label className="block form-label" htmlFor="password">Notes</label>
                <textarea className="form-control shadow-md h-40" type="text" id="notes" name="notes" value={password} onChange={setValue} />                    
                </div>
                <div className="col-md-12 text-center mt-3">
                <input className="mx-auto mt-3 col-md-6 text-white font-bold bg-purple-400 rounded-lg p-3" type="submit" value="Update" />
                </div>
            </form>
            <h1 className="text-red-500 md:text-xl col-md-8 mt-4">{errorMessage}</h1>
            <p id="first"></p>
            <p id="last"></p>
        </div>
    )
}

