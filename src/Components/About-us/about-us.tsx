import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Ireland from '../../resources/images/Ireland.jpg';
import Employee from '../../resources/images/Employee.jpg'
import Trophies from '../../resources/images/Trophies.jpg';
import '././about-us.scss'
import { Link } from 'react-router-dom';
import Question from '../../resources/images/Question.jpg';

function AboutUs() {
    const [key, setKey] = useState<any | null>('About');

    return (
        <div className="container-data">
            <div className="container about-us-component">
                <br />
                <h1 className="yellowish">About us <i className="fas fa-cloud-sun-rain"></i>
                </h1>
                <hr />
                <br />

                <div className="bg">
                    <br />
                    <br />
                    <div className="container glass">
                        <h2 className="">Company Info <i className="fas fa-sitemap"></i> </h2>
                        <hr></hr>
                        <div className="row">
                            <p className="text-info"><b>Phone:</b> 91230</p>
                        </div>
                        <div className="row">
                            <p className="text-info"><b>Address:</b> New York #12911</p>
                        </div>
                        <div className="row">
                            <p className="text-info"><b>Email:</b> weatherApp@gmail.com</p>
                        </div>
                        <hr></hr>
                    </div>
                </div>

                <br></br>

                <Tabs
                    id="controlled-tab"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    transition={true}
                    className="mb-3">

                    <Tab eventKey="About" title="About Weather App">
                        <div className="tab-info">
                            <p className="fw-bold text-decoration-underline"> About <i className="fas fa-info-circle"></i></p>

                            <div className="row">
                                <div className="col">
                                    <br></br>
                                    <br></br>
                                    <p className="">We are a diverse company focused in bringing the exact weather to all the world. We currently have a 99.98%
                                        in accuracy, the 1st place in the world. We work hard every day because we always want to be this exact in bringing
                                        the right weather to all the world.
                                    </p>

                                    <img src={Trophies} className="trophie-photo align-self-end" alt='trophiephoto'></img>
                                    <br></br>
                                    <small className="text-trophie">Trophie of Accuracy 2019.</small>
                                </div>

                                <div className="col">
                                    <img src={Ireland} className="ireland-photo" alt="irelandphoto"></img>
                                </div>
                            </div>

                        </div>

                    </Tab>
                    <Tab eventKey="Faq" title="FAQ">
                        <div className="tab-info">
                            <p className="fw-bold text-decoration-underline"> FAQ <i className="fas fa-question-circle"></i></p>

                            <div className="row">
                                <div className="col">
                                    <div className="row text-start container-question">
                                        <p className="fw-bold question">Is there any dark mode?</p>
                                        <p className="">Yes, but you need to have an account first. Then go to profile and change the theme.</p>
                                    </div>

                                    <div className="row text-start container-question">
                                        <p className="fw-bold question">What do i need to do if i want to work in this company?</p>
                                        <p className="">You need to apply. Click <Link to="/send-job-application">here.</Link> Fill the form and we'll contact you soon.</p>
                                    </div>

                                    <div className="row text-start container-question">
                                        <p className="fw-bold question">How do i change the default city every time i enter this page?</p>
                                        <p className="">You need to have an account. Click <Link to="/profile">here.</Link> And then you can change it in your settings. </p>
                                    </div>

                                    <div className="row text-start container-question">
                                        <p className="fw-bold question">My application was rejected, what do i do if i still want to work here?</p>
                                        <p className="">You can apply every 3 months or so. If you got rejected please wait a little bit before applying again.</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <img src={Question} alt="QuestionImage" className="question-photo" />
                                </div>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="Contributor" title="Become an Employee">
                        <div className="tab-info">
                            <p className="fw-bold text-decoration-underline"> Employee <i className="fas fa-briefcase"></i> </p>

                            <div className="row">
                                <div className="col">
                                    <img src={Employee} className="employee-photo" alt="employeephoto"></img>
                                </div>
                                <div className="col"> <p className=""> We are always searching for good talent. We are always interested in your skills. If you feel capable of working really efficient.
                                    <Link to="/send-job-application">Apply here!!</Link> <br></br> We are proudly offering high salary jobs with an excellent working environment.</p></div>

                            </div>
                        </div>
                    </Tab>
                </Tabs>

            </div>
        </div>
    )

}

export default AboutUs;
