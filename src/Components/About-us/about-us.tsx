import { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Ireland from '../../resources/images/Ireland.jpg';
import Employee from '../../resources/images/Employee.jpg'
import Trophies from '../../resources/images/Trophies.jpg';
import '././about-us.scss'
import { Link } from 'react-router-dom';

function AboutUs() {

    //const [key, setKey] = useState('home');
    const [key, setKey] = useState<any | null>('About');

    return (
        <div className="container about-us-component">
            <br />
            <h1>About us <i className="fas fa-cloud-sun-rain"></i>
            </h1>
            <hr />
            <br />

            {/* <img src='images/AboutUs.jpg' className="about-us-image"/> */}
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
                        <p className="fw-bold text-decoration-underline"> About </p>

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
                        <p className="fw-bold text-decoration-underline"> FAQ</p>
                    </div>
                </Tab>
                <Tab eventKey="Contributor" title="Become an Employee">
                    <div className="tab-info">
                        <p className="fw-bold text-decoration-underline"> Employee </p>

                        <div className="row">
                            <div className="col">
                                <img src={Employee} className="employee-photo" alt="employeephoto"></img>
                            </div>
                            <div className="col"> <Link to="/send-job-application">Apply here!!</Link></div>

                        </div>
                    </div>
                </Tab>
            </Tabs>


        </div>
    )

}

export default AboutUs;
