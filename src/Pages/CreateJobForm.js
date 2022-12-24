import axios from "axios"

export const CreateJobForm = () => {
    //const [value, setValue] = useState({});
    const payload = {"firstname":"Gary","lastname":"stroup"}
    axios.post("http://localhost:8080/dms/create/job",payload, {
        headers: {
            'content-type': 'application/json'
        }
    })
    .then((response) => response.data).then(function (data) {
    // handle success
        document.getElementById("first").innerHTML = data.firstname;
        document.getElementById("last").innerHTML = data.lastname;
        
  })
  .catch(function (error) {
    // handle error
    console.log(error.message);
  })
    return (
        <div>
            <h1>This page will hold a form to create a new job and submit data into the database</h1>
            <p>Firstname is: <span id="first"></span></p>
            <p>Lastname is: <span id="last"></span></p>
           
        </div>
    )
}