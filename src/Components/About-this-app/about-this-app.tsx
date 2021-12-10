import './about-this-app.scss';
import NetCoreLogo from '../../resources/images/NetCoreLogo.png';
import MySQLLogo from '../../resources/images/MySQLLogo.png';
import ReactLogo from '../../resources/images/ReactLogo.png';
import JwtLogo from '../../resources/images/JwtLogo.png';
import EntityFrameworkLogo from '../../resources/images/EntityFrameworkLogo.png';
import SearchCity from '../../resources/images/SearchCity.png';
import SearchCountry from '../../resources/images/SearchCountry.png';
import Historic from '../../resources/images/Historic.png';
import AdminTools from '../../resources/images/AdminTools.png';
import ApplicationManager from '../../resources/images/ApplicationManager.png';
import { useCallback, useRef, useState } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';

function AboutThisApp() {

    const [dance, setDance] = useState(0);
    const refAnimationInstance = useRef(null as any);
    const [intervalId, setIntervalId] = useState<any | null>();

    const canvasStyles = {
        position: "fixed" as 'fixed',
        pointerEvents: "none" as 'none',
        width: "100%" as '100%',
        height: "100%" as '100%',
        top: 0 as 0,
        left: 0 as 0
    };

    function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

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

    const nextTickAnimation = useCallback(() => {
        if (refAnimationInstance.current) {
            refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
            refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
        }
    }, []);

    const startAnimation = useCallback(() => {
        if (!intervalId) {
            setIntervalId(setInterval(nextTickAnimation, 400));
        }
    }, [intervalId, nextTickAnimation]);

    const pauseAnimation = useCallback(() => {
        clearInterval(intervalId);
        setIntervalId(null);
    }, [intervalId]);

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

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    return (
        <div className="container container-data about-this-app-component">
            <div className="container">
                <div className="header">
                    <h1 className="fst-italic yellowish">About this App <i className="fas fa-laptop-code"></i></h1>
                    <hr></hr>
                    <br></br>
                </div>

                <div className="container row mb-3">
                    <h3 className="fst-italic purple">Technologies used <i className="fas fa-file-code"></i></h3>
                    <hr></hr>
                </div>

                <div className="row d-flex align-items-center justify-content-evenly mb-3">
                    <div className="col-sm-3 d-flex flex-column align-items-center">
                        <img src={ReactLogo} alt="netcoreLogo" className="thumbnail-logo" onAnimationEnd={() => setDance(0)} data-dance={dance} />
                    </div>

                    <div className="col-sm-3 d-flex flex-column align-items-center">
                        <img src={NetCoreLogo} alt="netcoreLogo" className="thumbnail-logo" onAnimationEnd={() => setDance(0)} data-dance={dance} />
                    </div>

                    <div className="col-sm-3 d-flex flex-column align-items-center">
                        <img src={MySQLLogo} alt="netcoreLogo" className="thumbnail-logo" onAnimationEnd={() => setDance(0)} data-dance={dance} />
                    </div>
                </div>

                <div className="row d-flex align-items-center justify-content-evenly">
                    <div className="col-sm-3 d-flex flex-column align-items-center">
                        <small className="text-muted fw-bold fst-italic">React With Typescript</small>
                    </div>

                    <div className="col-sm-3 d-flex flex-column align-items-center">
                        <small className="text-muted fw-bold fst-italic">Net Core 5 With Entity Framework</small>
                    </div>

                    <div className="col-sm-3 d-flex flex-column align-items-center">
                        <small className="text-muted fw-bold fst-italic">My SQL Database</small>
                    </div>
                </div>

                <div className='container d-flex align-items-center flex-column fire-row'>
                    <h1 onClick={() => setDance(1)} className='exting fw-bold'><i className="fas fa-fire-extinguisher"></i></h1>
                    <small className='text-muted fw-bold fst-italic'>Click the extinguisher to extinguish the fire it will cause. <i className="fas fa-fire"></i><i className="fas fa-fire"></i><i className="fas fa-fire"></i></small>
                </div>

                <div className='container d-flex align-items-center flex-column fire-row'>
                    <h1 className='fw-bold exting' onClick={fire}><i className="fas fa-umbrella"></i></h1>
                    <small className='text-muted fw-bold fst-talic'>Rain??</small>
                    <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                </div>

                <div className='container d-flex align-items-center flex-column fire-row'>
                    <h1 className='fw-bold exting' onClick={startAnimation}><i className="fas fa-umbrella"></i><i className="fas fa-umbrella"></i><i className="fas fa-umbrella"></i><i className="fas fa-umbrella"></i></h1>
                    <small className='text-muted fw-bold fst-talic'>A lot of Rain??????</small>
                    <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                </div>

                <div className='container d-flex align-items-center flex-column fire-row'>
                    <h1 className='fw-bold exting' onClick={pauseAnimation}><i className="fas fa-hand-paper"></i></h1>
                    <small className='text-muted fw-bold fst-talic'>STOP NOW</small>
                    <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
                </div>



                <div className="header-features">
                    <h1 className="fw-bold yellowish">Features <i className="fas fa-memory"></i></h1>
                    <hr></hr>
                </div>

                <div className="description">
                    <div className="row mb-3">
                        <div className="col">
                            <img src={JwtLogo} alt="jwtLogo" className="thumbnail-logo" />
                        </div>
                        <div className="col">
                            <h4 className="purple fw-bold fst-italic"><u>Jwt Authentication</u></h4>
                            <br></br>
                            <p className="text-start">
                                Role authorized JWT Authentication. JSON Web Token (JWT) is a compact URL-safe means of representing claims to be transferred between two parties. This way, login
                                and certain operations are more secure.
                            </p>
                        </div>
                    </div>

                    <div className="row row-content">
                        <div className="col">
                            <h4 className="purple fw-bold fst-italic"><u>Entity Framework</u></h4>
                            <br></br>
                            <p className="text-start">
                                Object-database mapper. t enables developers to work with data using objects of domain specific classes without focusing on the underlying database tables and columns where this data is stored. With the Entity Framework, developers can work at a
                                higher level of abstraction when they deal with data, and can create and maintain data-oriented applications with less code compared with traditional applications.
                            </p>
                        </div>

                        <div className="col">
                            <img src={EntityFrameworkLogo} alt="jwtLogo" className="entity-logo" />
                        </div>
                    </div>
                </div>


                <div className="header-features">
                    <h1 className="fw-bold yellowish">App Features <i className="fas fa-laptop-code"></i></h1>
                    <hr></hr>
                </div>

                <div className="description-app-features">
                    <h3 className="pink-color fw-bold">Searchers where you can filter data.</h3>
                    <br></br>
                    <div className="row mb-3">
                        <div className="card">
                            <div className="card-body d-flex flex-column">
                                <img src={SearchCountry} alt="searcher" className="searcher" />
                                <br></br>
                                <img src={SearchCity} alt="searcher" className="searcher" />
                                <small className="fw-bold text-muted fst-italic">All images were taken with dark mode enabled.</small>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="header">
                            <p className="purple fw-bold"> <u> That way you can search more accurately. </u></p>
                        </div>
                    </div>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <br></br>

                    <div className="row mb-3">
                        <h3 className="pink-color fw-bold">Historic temperatures by city and year.</h3>
                        <br></br>
                        <br></br><br></br>
                        <div className="card">
                            <div className="card-body d-flex flex-column">
                                <img src={Historic} alt="searcher" className="" />
                                <small className="fw-bold text-muted fst-italic">All images were taken with dark mode enabled.</small>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="header">
                            <p className="purple fw-bold"><u>Showing in a chart. You can see the average max temperature, min temperature, wind and precipitation of the entire year divided by month.</u></p>
                        </div>
                    </div>
                </div>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>
                <br></br>

                <div className="row mb-3">
                    <h3 className="pink-color fw-bold">Exclusive admin tools.</h3>
                    <br></br>
                    <br></br><br></br>
                    <div className="card">
                        <div className="card-body d-flex flex-column">
                            <img src={AdminTools} alt="searcher" className="" />
                            <small className="fw-bold text-muted fst-italic">All images were taken with dark mode enabled.</small>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="header">
                        <p className="purple fw-bold"><u>Exclusive admin tools where only admins can modify relevant information in the database.</u></p>
                    </div>
                </div>
                <br></br>
                <hr></hr>
                <br></br>
                <br></br>

                <div className="row mb-3">
                    <h3 className="pink-color fw-bold">Application Manager</h3>
                    <br></br>
                    <br></br><br></br>
                    <div className="card">
                        <div className="card-body d-flex flex-column">
                            <img src={ApplicationManager} alt="searcher" className="" />
                            <small className="fw-bold text-muted fst-italic">All images were taken with dark mode enabled.</small>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="header">
                        <p className="purple fw-bold"><u>Application manager for employees that sent their application. Here you can accept or reject applications.</u></p>
                    </div>
                </div>
                <br></br>
                <hr></hr>
            </div >


        </div >
    )
}

export default AboutThisApp;