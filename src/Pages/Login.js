import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div>
            <h1>This is the login page</h1>
            <Link to="/user/job/create">Create Job</Link>
        </div>
    )
}

export {Login}