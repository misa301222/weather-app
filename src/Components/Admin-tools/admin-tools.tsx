import { Link } from "react-router-dom";
import '././admin-tools.scss';

function AdminTools() {
    return (
        <div className="container admin-tools-component container-data">
            <br></br>

            <h1 className="">
                Admin Tools
            </h1>

            <hr></hr>

            <div className="container">
                <h3> Job Applications <i className="fas fa-users"></i> </h3>
                <hr></hr>

                <div className="list-group shadow">
                    <Link to="/job-applications" className="list-group-item list-group-item-action text-start" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Jobs</h5>
                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Show, accept and reject job applications.</p>
                    </Link>
                </div>
            </div>
            <br></br>

            <div className="container">
                <h3> Country <i className="fas fa-globe-americas"></i> </h3>
                <hr></hr>

                <div className="list-group shadow">
                    <Link to="/add-country" className="list-group-item list-group-item-action text-start" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Add Country</h5>
                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Add New Countries</p>
                    </Link>
                    <Link to="/show-country" className="list-group-item list-group-item-action text-start" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Show Countries</h5>
                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Show all countries</p>
                    </Link>
                </div>
            </div>


            <br></br>

            <div className="container">
                <h3> City <i className="fas fa-city"></i> </h3>
                <hr></hr>
                <div className="list-group shadow">
                    <Link to="/add-city" className="list-group-item list-group-item-action text-start" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Add City</h5>
                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Add New City</p>
                    </Link>
                    <Link to="/show-city" className="list-group-item list-group-item-action text-start" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Show Cities</h5>
                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Show all Cities</p>
                    </Link>
                </div>
            </div>


            <br></br>

            <div className="container">
                <h3> Temperature <i className="fas fa-thermometer-half"></i></h3>
                <hr></hr>
                <div className="list-group shadow">
                    <Link to="/add-temperature" className="list-group-item list-group-item-action text-start" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Add Temperature</h5>
                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Add New Temperature</p>
                    </Link>
                    <Link to="/show-temperature" className="list-group-item list-group-item-action text-start" aria-current="true">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">Show Temperature</h5>
                            <small>3 days ago</small>
                        </div>
                        <p className="mb-1">Show all Temps</p>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default AdminTools;