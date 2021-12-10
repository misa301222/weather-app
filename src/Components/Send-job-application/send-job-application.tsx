import { useCallback, useEffect, useRef, useState } from 'react';
import CatImage from '../../resources/images/Cat.png';
import axios from 'axios';
import '././send-job-application.scss';
import Swal from "sweetalert2";
import { Link, useHistory } from 'react-router-dom';
import ReactCanvasConfetti from "react-canvas-confetti";

const desiredPositionURL = "https://localhost:5001/api/DesiredPositions";
const jobApplicationsURL = "https://localhost:5001/api/JobApplications";

function SendJobApplication() {
    const history = useHistory();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isApplicationAlreadySent, setIsApplicationAlreadySent] = useState(false);

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

    const [jobApplicationReadOnly, setJobApplicationReadOnly] = useState({
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

    const [desiredPositions, setDesiredPositions] = useState([{
        desiredPositionId: 0,
        desiredPositionDescription: ''
    }])

    const setLoggedInUserData = async () => {
        const user = localStorage.getItem('user');
        const fullName = localStorage.getItem('fullName');

        if (user) {
            setIsLoggedIn(true);
            setJobApplication(prev => ({ ...prev, Email: user }));
            setJobApplication(prev => ({ ...prev, FullName: fullName ? fullName : '' }));
            await axios.get(jobApplicationsURL + '/GetJobApplicationByEmail/' + user).then(response => {
                console.log(response.data);
                setJobApplicationReadOnly(response.data)
                setIsApplicationAlreadySent(true);
            }).catch(err => {
                console.log(err);
            });
        }
    }

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
            ApplicationDate: new Date().toISOString(),
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
        await axios.post(jobApplicationsURL, body).then(response => {
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Application Sent Succesfully, please wait in this section until you have a response :)',
                showConfirmButton: true,
            }).then(function () {
                history.push('/send-job-application');
                history.go(0);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    //Confetti START
    const refAnimationInstance = useRef(null as any);
    const [intervalId, setIntervalId] = useState<any | null>();

    const nextTickAnimation = useCallback(() => {
        if (refAnimationInstance.current) {
            refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
            refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
        }
    }, []);

    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    const startAnimation = useCallback(() => {
        if (!intervalId) {
            setIntervalId(setInterval(nextTickAnimation, 400));
        }
    }, [intervalId, nextTickAnimation]);

    const pauseAnimation = useCallback(() => {
        clearInterval(intervalId);
        setIntervalId(null);
    }, [intervalId]);

    const canvasStyles = {
        position: "fixed" as 'fixed',
        pointerEvents: "none" as 'none',
        width: "100%" as '100%',
        height: "100%" as '100%',
        top: 0 as 0,
        left: 0 as 0
    };

    function getAnimationSettings(originXA: number, originXB: number) {
        return {
            startVelocity: 30,
            spread: 360,
            ticks: 60,
            zIndex: 1,
            particleCount: 150,
            origin: {
                x: randomInRange(originXA, originXB),
                y: Math.random() - 0.2
            }
        };
    }

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { y: 0.7 },
                particleCount: Math.floor(200 * particleRatio)
            });
    }, []);

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55
        });

        makeShot(0.2, {
            spread: 60
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45
        });
    }, [makeShot]);

    //Confetti END

    const handleCancelApplication = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will have to send another application.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, cancel current application'
        }).then((result) => {
            if (result.isConfirmed) {
                const user = localStorage.getItem('user');
                axios.delete(jobApplicationsURL + '/' + user).then(response => {
                    Swal.fire(
                        'Deleted!',
                        'You application was deleted succesfully!',
                        'success'
                    ).then(function () {
                        history.push('/send-job-application');
                        history.go(0);
                    })
                }).catch(err => {
                    console.log(err);
                });
            }
        });
    }

    useEffect(() => {
        setLoggedInUserData();
        getAllDesiredPositions();
        clearInterval(intervalId);
    }, [])

    return (
        <div className="container send-job-application-component container-data">
            {isLoggedIn ?
                !isApplicationAlreadySent ?
                    <div className="card shadow">
                        <div className="card-header">
                            Send Application
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmitJobApplicationForm}>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail" className="form-label">Email</label>
                                    <input value={jobApplication.Email} disabled onChange={handleOnChangeEmail} name="Email" className="form-control" id="inputEmail" />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="inputFullName" className="form-label">Full Name</label>
                                    <input value={jobApplication.FullName} disabled onChange={handleOnChangeFullName} name="FullName" className="form-control" id="inputFullName" />
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

                                <div className="mb-3 text-center">
                                    <button type="submit" className="btn btn-dark">Send Application</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    :

                    <div className="container">
                        {
                            isApplicationAlreadySent && jobApplicationReadOnly.applicationStatus === 1 ?
                                <div className='header d-flex flex-column align-items-center mb-3'>
                                    <h5 className="text-primary text-center">You already sent an application. Please wait patiently for a response. :)</h5>
                                    <button type="button" className='btn btn-danger' onClick={handleCancelApplication}>Cancel Application</button>
                                    <small className='text-muted fw-bold fst-italic'>If you cancel this application, you need to fill the form again.</small>
                                </div>
                                :
                                isApplicationAlreadySent && jobApplicationReadOnly.applicationStatus === 2 ?
                                    <div className="message">
                                        <h5 className="text-success text-center"> Congratulations!! Your application has been accepted.</h5>
                                        <h2 className="text-center">We will contact you pretty soon! Please wait patiently :)</h2>
                                        <br></br>
                                        <div className="card">
                                            <div className="card-body shadow">
                                                <div className="mb-3 d-flex justify-content-evenly">
                                                    <button className="btn btn-dark btn-outline-light shadow" onClick={startAnimation}>Press this button for a surprise. </button>
                                                    <button className="btn btn-light btn-outline-dark shadow" onClick={pauseAnimation}>Stop the surprise??</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container text-center cat-container">
                                            <img src={CatImage} className="cat-image-success" alt="catImage" />
                                            <br></br>
                                            <small className="text-muted fst-italic">I know you've seen this cat before...</small>
                                        </div>

                                        <div className="mb-3 text-center fire-div">
                                            <div className="row">
                                                <div className="container">
                                                    <button className="btn btn-dark shadow" onClick={fire}>Fire the surprise only once.</button>
                                                </div>
                                            </div>
                                            <div>
                                                <small className="text-muted fst-italic">You can spam this if you want.</small>
                                            </div>
                                        </div>
                                        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                                    </div>
                                    :
                                    <div className="message">
                                        <h5 className="text-danger text-center">Sorry but your application has been Rejected :(</h5>
                                        <h2 className="text-center">You will need to wait some time before you can apply again.</h2>
                                        <br></br>
                                        <div className="mb-3 text-center fire-div">
                                            <div className="row">
                                                <div className="container">
                                                    <button className="btn btn-dark shadow" onClick={fire}>Consolidation prize.</button>
                                                </div>
                                            </div>
                                            <div>
                                                <small className="text-muted fst-italic">You can spam this if you want.</small>
                                            </div>
                                        </div>
                                        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                                    </div>
                        }

                        <br></br>
                        {isApplicationAlreadySent && jobApplicationReadOnly.applicationStatus === 1 ?
                            <div className="card shadow">
                                <div className="card-header fw-bold">
                                    View Sent Application
                                </div>
                                <div className="card-body">
                                    <div className="mb-3">
                                        <label htmlFor="inputEmail" className="form-label">Email</label>
                                        <input value={jobApplicationReadOnly.email} disabled name="Email" className="form-control" id="inputEmail" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="inputFullName" className="form-label">Full Name</label>
                                        <input value={jobApplicationReadOnly.fullName} disabled name="FullName" className="form-control" id="inputFullName" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="inputFullName" className="form-label">Desired Position</label>
                                        <select className="form-select" disabled aria-label="Default select example" name="DesiredPosition" value={jobApplicationReadOnly.desiredPosition}>
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
                                        <input value={jobApplicationReadOnly.address} disabled name="Address" className="form-control" id="inputAddress" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="inputCity" className="form-label">City</label>
                                        <input value={jobApplicationReadOnly.city} disabled name="City" className="form-control" id="inputCity" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="inputPhoneNumber" className="form-label">Phone Number</label>
                                        <input value={jobApplicationReadOnly.phoneNumber} disabled name="PhoneNumber" className="form-control" id="inputPhoneNumber" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="inputEducation" className="form-label">Education</label>
                                        <input value={jobApplicationReadOnly.education} disabled name="Education" className="form-control" id="inputEducation" />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Degree?
                                        </label>
                                        <input className="form-check-input" type="checkbox" id="flexCheckDefault" disabled checked={jobApplicationReadOnly.degree} />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="inputPayment" className="form-label">Payment</label>
                                        <input value={jobApplicationReadOnly.payment} disabled name="Payment" className="form-control" id="inputPayment" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="inputDescription" className="form-label">Description</label>
                                        <input value={jobApplicationReadOnly.description} disabled name="Description" className="form-control" id="inputDescription" />
                                    </div>
                                </div>
                            </div>
                            : null}
                    </div>
                :
                <div className="notLoggedIn">
                    <h1 className="text-center text-danger">Whoops!!</h1>
                    <h2 className="text-center">It seems you are not currently logged, it's mandatory to <Link to="/register">Create an account. </Link> Or to <Link to="/login">
                        Login.</Link> In order to send your Job Application.</h2>
                    <br></br>
                    <div className="shadow image-container">
                        <img src={CatImage} className="cat-image" alt="catImageNotLoggedIn"></img>
                        <h3 className="">Look at this cat. This cat created an account <i className="fas fa-cat"></i> </h3>
                        <br></br>
                    </div>
                </div>
            }
        </div >
    )
}

export default SendJobApplication;