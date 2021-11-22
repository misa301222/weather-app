import { useEffect, useState } from 'react';
import axios from 'axios';
import '././send-job-application.scss'

const desiredPositionURL = "https://localhost:5001/api/DesiredPositions";

function SendJobApplication() {

    const [jobApplication, setJobApplication] = useState({
        Email: '',
        FullName: '',
        DesiredPosition: 0,
        ApplicationDate: new Date(),
        Address: '',
        City: '',
        PhoneNumber: '',
        Education: '',
        Degree: false,
        Payment: 0,
        Description: '',
        ApplicationStatus: 0,
    });

    const [desiredPositions, setDesiredPositions] = useState([{
        desiredPositionId: 0,
        desiredPositionDescription: ''
    }])

    const handleOnChangeEmail = (event: any) => {
        setJobApplication(prev => ({ ...prev, Email: event.target.value }));
    }

    const handleOnChangeFullName = (event: any) => {
        setJobApplication(prev => ({ ...prev, FullName: event.target.value }));
    }

    const handleOnChangeDesiredPosition = (event: any) => {
        setJobApplication(prev => ({ ...prev, DesiredPosition: event.target.value }));
    }

    const handleOnChangeAddress = (event: any) => {
        setJobApplication(prev => ({ ...prev, Address: event.target.value }));
    }

    const handleOnChangeCity = (event: any) => {
        setJobApplication(prev => ({ ...prev, City: event.target.value }));
    }

    const handleOnChangeEducation = (event: any) => {
        setJobApplication(prev => ({ ...prev, Education: event.target.value }));
    }

    const handleOnChangePhoneNumber = (event: any) => {
        setJobApplication(prev => ({ ...prev, PhoneNumber: event.target.value }));
    }

    const handleOnChangeDegree = (event: any) => {
        setJobApplication(prev => ({ ...prev, Degree: !jobApplication.Degree }));
    }

    const handleOnChangePayment = (event: any) => {
        setJobApplication(prev => ({ ...prev, Payment: event.target.value }));
    }

    const handleOnChangeDescription = (event: any) => {
        setJobApplication(prev => ({ ...prev, Description: event.target.value }));
    }

    const getAllDesiredPositions = async () => {
        await axios.get(desiredPositionURL).then(response => {
            console.log(response.data);
            setDesiredPositions(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleSubmitJobApplicationForm = async (event: any) => {
        event.preventDefault();
        let body = {
            Email: jobApplication.Email,
            FullName: jobApplication.FullName,
            DesiredPosition: jobApplication.DesiredPosition,
            ApplicationDate: new Date(),
            Address: jobApplication.Address,
            City: jobApplication.City,
            PhoneNumber: jobApplication.PhoneNumber,
            Education: jobApplication.Education,
            Degree: jobApplication.Degree,
            Payment: jobApplication.Payment,
            Description: jobApplication.Description,
            ApplicationStatus: 1, // 1 = Pending
        }

        console.log(body);
    }

    useEffect(() => {
        getAllDesiredPositions();
    }, [])

    return (
        <div className="container send-job-application-component">

            <div className="card">
                <div className="card-header">
                    Send Application
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmitJobApplicationForm}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input value={jobApplication.Email} onChange={handleOnChangeEmail} name="Email" className="form-control" id="inputEmail" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputFullName" className="form-label">Full Name</label>
                            <input value={jobApplication.FullName} onChange={handleOnChangeFullName} name="FullName" className="form-control" id="inputFullName" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputFullName" className="form-label">Desired Position</label>
                            <select className="form-select" aria-label="Default select example" onChange={handleOnChangeDesiredPosition} name="DesiredPosition">
                                <option value={0}>Select an option</option>
                                {
                                    desiredPositions.map((desiredPosition, index) => (
                                        <option key={index} value={desiredPosition.desiredPositionId}> {desiredPosition.desiredPositionDescription} </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputAddress" className="form-label">Address</label>
                            <input value={jobApplication.Address} onChange={handleOnChangeAddress} name="Address" className="form-control" id="inputAddress" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputCity" className="form-label">City</label>
                            <input value={jobApplication.City} onChange={handleOnChangeCity} name="City" className="form-control" id="inputCity" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputPhoneNumber" className="form-label">Phone Number</label>
                            <input value={jobApplication.PhoneNumber} onChange={handleOnChangePhoneNumber} name="PhoneNumber" className="form-control" id="inputPhoneNumber" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputEducation" className="form-label">Education</label>
                            <input value={jobApplication.Education} onChange={handleOnChangeEducation} name="Education" className="form-control" id="inputEducation" />
                        </div>

                        <div className="mb-3">
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Degree?
                            </label>
                            <input className="form-check-input" type="checkbox" id="flexCheckDefault" onChange={handleOnChangeDegree} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputPayment" className="form-label">Payment</label>
                            <input value={jobApplication.Payment} onChange={handleOnChangePayment} name="Payment" className="form-control" id="inputPayment" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputDescription" className="form-label">Description</label>
                            <input value={jobApplication.Description} onChange={handleOnChangeDescription} name="Description" className="form-control" id="inputDescription" />
                        </div>

                        <button type="submit" className="btn btn-dark">Send Application</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default SendJobApplication;