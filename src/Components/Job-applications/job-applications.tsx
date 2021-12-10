import '././job-applications.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import CatImage from '../../resources/images/Cat.png';

const jobApplicationsURL = "https://localhost:5001/api/JobApplications";

function JobApplications() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = (application: any) => {
        console.log(application);
        setSelectedApplication(application);
        setShow(true);
    }

    const [selectedApplication, setSelectedApplication] = useState({
        email: '',
        fullName: '',
        desiredPosition: 0,
        applicationDate: new Date(),
        address: '',
        city: '',
        phoneNumber: '',
        education: '',
        degree: false,
        payment: 0,
        description: '',
        applicationStatus: 0,
    });

    const [pendingApplications, setPendingApplications] = useState([{
        email: '',
        fullName: '',
        desiredPosition: 0,
        applicationDate: new Date(),
        address: '',
        city: '',
        phoneNumber: '',
        education: '',
        degree: false,
        payment: 0,
        description: '',
        applicationStatus: 0,
    }]);

    const [acceptedApplications, setAcceptedApplications] = useState([{
        email: '',
        fullName: '',
        desiredPosition: 0,
        applicationDate: new Date(),
        address: '',
        city: '',
        phoneNumber: '',
        education: '',
        degree: false,
        payment: 0,
        description: '',
        applicationStatus: 0,
    }]);

    const [rejectedApplications, setRejctedApplications] = useState([{
        email: '',
        fullName: '',
        desiredPosition: 0,
        applicationDate: new Date(),
        address: '',
        city: '',
        phoneNumber: '',
        education: '',
        degree: false,
        payment: 0,
        description: '',
        applicationStatus: 0,
    }]);

    const getAllJobApplications = async () => {
        await axios.get(jobApplicationsURL).then(response => {
            console.log(response);
            let firstPending = true;
            let firstSuccess = true;
            let firstRejected = true;

            setPendingApplications([{
                email: '',
                fullName: '',
                desiredPosition: 0,
                applicationDate: new Date(),
                address: '',
                city: '',
                phoneNumber: '',
                education: '',
                degree: false,
                payment: 0,
                description: '',
                applicationStatus: 0,
            }]);

            setAcceptedApplications([{
                email: '',
                fullName: '',
                desiredPosition: 0,
                applicationDate: new Date(),
                address: '',
                city: '',
                phoneNumber: '',
                education: '',
                degree: false,
                payment: 0,
                description: '',
                applicationStatus: 0,
            }]);

            setRejctedApplications([{
                email: '',
                fullName: '',
                desiredPosition: 0,
                applicationDate: new Date(),
                address: '',
                city: '',
                phoneNumber: '',
                education: '',
                degree: false,
                payment: 0,
                description: '',
                applicationStatus: 0,
            }]);

            for (let object of response.data) {
                switch (object.applicationStatus) {
                    case 1:
                        if (firstPending) {
                            setPendingApplications([object]);
                            firstPending = false;
                        } else {
                            setPendingApplications(prev => [...prev, object]);
                        }
                        break;

                    case 2:
                        if (firstSuccess) {
                            setAcceptedApplications([object]);
                            firstSuccess = false;
                        } else {
                            setAcceptedApplications(prev => [...prev, object]);
                        }
                        break;

                    case 3:
                        if (firstRejected) {
                            setRejctedApplications([object]);
                            firstRejected = true;
                        } else {
                            setRejctedApplications(prev => [...prev, object]);
                        }
                        break;
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }

    const acceptApplication = async () => {
        let email = selectedApplication.email;

        let body = {
            email: selectedApplication.email,
            fullName: selectedApplication.fullName,
            desiredPosition: selectedApplication.desiredPosition,
            applicationDate: selectedApplication.applicationDate,
            address: selectedApplication.address,
            city: selectedApplication.city,
            phoneNumber: selectedApplication.phoneNumber,
            education: selectedApplication.education,
            degree: selectedApplication.degree,
            payment: selectedApplication.payment,
            description: selectedApplication.description,
            applicationStatus: 2,
        }

        await axios.put(jobApplicationsURL + '/' + email, body).then(response => {
            console.log(response);
            handleClose();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Application send to Accepted Successfully !!',
                showConfirmButton: false,
                timer: 1100
            }).then(function () {
                getAllJobApplications();
            });
        }).catch(err => {
            console.log(err);
        });
    }

    const pendingApplication = async () => {
        let email = selectedApplication.email;

        let body = {
            email: selectedApplication.email,
            fullName: selectedApplication.fullName,
            desiredPosition: selectedApplication.desiredPosition,
            applicationDate: selectedApplication.applicationDate,
            address: selectedApplication.address,
            city: selectedApplication.city,
            phoneNumber: selectedApplication.phoneNumber,
            education: selectedApplication.education,
            degree: selectedApplication.degree,
            payment: selectedApplication.payment,
            description: selectedApplication.description,
            applicationStatus: 1,
        }

        await axios.put(jobApplicationsURL + '/' + email, body).then(response => {
            console.log(response);
            handleClose();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Application send to Pending Successfully !!',
                showConfirmButton: false,
                timer: 1100
            }).then(function () {
                getAllJobApplications();
            });
        }).catch(err => {
            console.log(err);
        });
    }

    const rejectApplication = async () => {
        let email = selectedApplication.email;

        let body = {
            email: selectedApplication.email,
            fullName: selectedApplication.fullName,
            desiredPosition: selectedApplication.desiredPosition,
            applicationDate: selectedApplication.applicationDate,
            address: selectedApplication.address,
            city: selectedApplication.city,
            phoneNumber: selectedApplication.phoneNumber,
            education: selectedApplication.education,
            degree: selectedApplication.degree,
            payment: selectedApplication.payment,
            description: selectedApplication.description,
            applicationStatus: 3,
        }

        await axios.put(jobApplicationsURL + '/' + email, body).then(response => {
            console.log(response);
            handleClose();
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Application send to Rejected Successfully !!',
                showConfirmButton: false,
                timer: 1100
            }).then(function () {
                getAllJobApplications();
            });
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllJobApplications();
    }, [])

    return (
        <div className="container job-application-component container-data">
            <div className="row title">
                <h2>
                    Application Managmnet <i className="fas fa-tasks"></i>
                </h2>
            </div>

            <hr></hr>
            <br></br>

            <div className="row">
                <div className="col-sm-4">
                    <div className="card text-dark bg-warning shadow">
                        <div className="card-header fw-bold">Pending Applications <i className="far fa-clock"></i></div>
                        <div className="card-body card-body-principal">

                            {
                                pendingApplications[0].email ?
                                    pendingApplications.map((application, index) => (
                                        <div key={index}>
                                            {application.email ?
                                                <div className="card card-data shadow bg-light" key={index}>
                                                    <div className="card-header fw-bold text-start">
                                                        {application.email}
                                                    </div>
                                                    <div className="card-body text-start">
                                                        <p className="body-text"><b>Name: </b> {application.fullName} </p>
                                                        <p className="body-text"><b>Degree: </b> {application.degree == true ? 'Yes' : 'No'} </p>
                                                        <p className="body-text"><b>Desired Position: </b> {application.desiredPosition} </p>
                                                        <p className="body-text"><b>Desired Payment: </b> <u>${application.payment}</u> </p>
                                                    </div>
                                                    <div className="mb-1 text-end button-card">
                                                        <button onClick={() => handleShow(application)} type="button" className="btn btn-dark btn-sm">View Details &#8594;</button>
                                                    </div>
                                                </div> : null}
                                        </div>
                                    ))
                                    :
                                    <div className="not-found">
                                        <h4 className="text-dark">There's not pending applications. Look at this cat <i className="fas fa-cat"></i></h4>
                                        <img src={CatImage} alt="catImage" className="cat-image" />
                                    </div>
                            }
                        </div>

                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card text-white bg-success shadow">
                        <div className="card-header fw-bold">Accepted Applications <i className="fas fa-check"></i></div>
                        <div className="card-body card-body-principal">
                            {
                                acceptedApplications[0].email ?
                                    acceptedApplications.map((application, index) => (
                                        <div key={index}>
                                            {application.email ?
                                                <div className="card card-data shadow bg-light text-black" key={index}>
                                                    <div className="card-header fw-bold text-start">
                                                        {application.email} - [ {application.applicationDate ? application.applicationDate.toString().split('T')[0] : null} ]
                                                    </div>
                                                    <div className="card-body text-start">
                                                        <p className="body-text"><b>Name: </b> {application.fullName} </p>
                                                        <p className="body-text"><b>Degree: </b> {application.degree == true ? 'Yes' : 'No'} </p>
                                                        <p className="body-text"><b>Desired Position: </b> {application.desiredPosition} </p>
                                                        <p className="body-text"><b>Desired Payment: </b> <u>${application.payment}</u> </p>
                                                    </div>
                                                    <div className="mb-1 text-end button-card">
                                                        <button onClick={() => handleShow(application)} type="button" className="btn btn-dark btn-sm">View Details &#8594;</button>
                                                    </div>
                                                </div> : null}
                                        </div>
                                    ))
                                    :
                                    <div className="not-found">
                                        <h4 className="text-dark">There's not accepted applications. Look at this cat <i className="fas fa-cat"></i></h4>
                                        <img src={CatImage} alt="catImage" className="cat-image" />
                                    </div>
                            }


                        </div>
                    </div>
                </div>

                <div className="col-sm-4">
                    <div className="card text-white bg-danger shadow">
                        <div className="card-header fw-bold">Rejected Applications <i className="fas fa-times"></i></div>
                        <div className="card-body card-body-principal">
                            {
                                rejectedApplications[0].email ?
                                    rejectedApplications.map((application, index) => (
                                        <div key={index}>
                                            {application.email ?
                                                <div className="card card-data shadow bg-light text-black" key={index}>
                                                    <div className="card-header fw-bold text-start">
                                                        {application.email}
                                                    </div>
                                                    <div className="card-body text-start">
                                                        <p className="body-text"><b>Name: </b> {application.fullName} </p>
                                                        <p className="body-text"><b>Degree: </b> {application.degree == true ? 'Yes' : 'No'} </p>
                                                        <p className="body-text"><b>Desired Position: </b> {application.desiredPosition} </p>
                                                        <p className="body-text"><b>Desired Payment: </b> <u>${application.payment}</u> </p>
                                                    </div>
                                                    <div className="mb-1 text-end button-card">
                                                        <button onClick={() => handleShow(application)} type="button" className="btn btn-dark btn-sm">View Details &#8594;</button>
                                                    </div>
                                                </div> : null}
                                        </div>
                                    ))
                                    :
                                    <div className="not-found">
                                        <h4 className="text-dark">There's not Rejected applications. Look at this cat <i className="fas fa-cat"></i></h4>
                                        <img src={CatImage} alt="catImage" className="cat-image" />
                                    </div>
                            }
                        </div>
                    </div>
                </div>

            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Selected Application <i className="fas fa-file-alt"></i></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card shadow">
                        <div className="card-body">
                            <h6 className="">Date Sent: </h6> {selectedApplication.applicationDate ? selectedApplication.applicationDate.toString().split('T')[0] : null}
                        </div>
                    </div>
                    <br></br>
                    <br></br>

                    <h6>Application Details <i className="far fa-id-card"></i></h6>
                    <hr></hr>
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="mb-1">
                                <p><b>Email: </b> {selectedApplication.email} </p>
                                <p><b>Full Name: </b> {selectedApplication.fullName} </p>
                                <p><b>Desired Position: </b> {selectedApplication.desiredPosition} </p>
                                <p><b>Address: </b> {selectedApplication.address} </p>
                                <p><b>City: </b> {selectedApplication.city} </p>
                                <p><b>Phone Number: </b> {selectedApplication.phoneNumber} </p>
                                <p><b>Education: </b> {selectedApplication.education} </p>
                                <p><b>Degree: </b> {selectedApplication.degree ? 'Yes' : 'No'} </p>
                                <p><b>Desired Payment: </b> {selectedApplication.payment} </p>
                                <p><b>Application Status: </b> {selectedApplication.applicationStatus} </p>
                                <p><b>Description: </b> {selectedApplication.description} </p>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary btn-sm" onClick={handleClose}>Close</button>
                    <button onClick={async () => pendingApplication()} className="btn btn-warning btn-sm" disabled={selectedApplication.applicationStatus == 1}>Send Back to Pending</button>
                    <button onClick={async () => acceptApplication()} className="btn btn-success btn-sm" disabled={selectedApplication.applicationStatus == 2}>Accept</button>
                    <button onClick={async () => rejectApplication()} className="btn btn-danger btn-sm" disabled={selectedApplication.applicationStatus == 3} >Reject</button>
                </Modal.Footer>
            </Modal>
        </div>


    )
}

export default JobApplications;