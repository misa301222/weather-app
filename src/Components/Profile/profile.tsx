import { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import '././profile.scss'
import axios from 'axios';
import { Tab, Tabs } from 'react-bootstrap';
import { useSpring } from '@react-spring/core';
import { animated } from '@react-spring/web';
import Swal from 'sweetalert2';
import DarkMode from '../DarkMode/DarkMode';


const imageURL = 'https://localhost:5001/api/UserImages';
const userURL = 'https://localhost:5001/api/User';
const citiesURL = "https://localhost:5001/api/Cities";

function Profile() {

    const [key, setKey] = useState<any | null>('profile');

    const [imageUser, setImageUser] = useState({
        Email: '',
        ImageURL: ''
    });

    const [isSave, setIsSave] = useState(true);

    const [user, setUser] = useState({
        FullName: '',
        Email: '',
        UserName: '',
        DateCreated: '',
        Roles: [],
        DefaultCity: 0,
    });

    const [cities, setCities] = useState([{
        cityId: 0,
        cityName: '',
        countryId: 0
    }]);

    const getAllCities = async () => {
        await axios.get(citiesURL).then(response => {
            console.log(response);
            setCities(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const getImageByEmail = async (email: string) => {
        await axios.get(imageURL + '/' + email).then(response => {
            console.log(response);
            setImageUser(prev => ({ ...prev, ImageURL: response.data.imageURL }));
            setImageUser(prev => ({ ...prev, Email: response.data.email }));
            setIsSave(false);
        }).catch(err => {
            console.log(err);
        });
    }

    const getUserByEmail = async (email: string) => {
        await axios.get(userURL + '/GetCurrentUser/' + email).then(response => {
            console.log(response);
            setUser(prev => ({ ...prev, FullName: response.data.dataSet.fullName }));
            setUser(prev => ({ ...prev, Email: response.data.dataSet.email }));
            setUser(prev => ({ ...prev, UserName: response.data.dataSet.userName }));
            setUser(prev => ({ ...prev, DateCreated: response.data.dataSet.dateCreated }));
            setUser(prev => ({ ...prev, Roles: response.data.dataSet.roles }));
            setUser(prev => ({ ...prev, DefaultCity: response.data.dataSet.defaultCity }));

        }).catch(err => {
            console.log(err);
        });
    }

    const onChangeImageURL = (event: any) => {
        event.preventDefault();
        setImageUser(prev => ({ ...prev, ImageURL: event.target.value }))
    }

    const handleSubmitImageURLEvent = async (event: any) => {
        event.preventDefault();
        let body = {
            Email: user.Email,
            ImageURL: imageUser.ImageURL
        }
        await axios.post(imageURL, body).then(response => {
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Profile Picture saved succesfully!',
                showConfirmButton: false,
                timer: 1100
            })
            setIsSave(false);
        }).catch(err => {
            console.log(err);
        })
    }

    const handleSubmitImageURLEventEdit = async (event: any) => {
        event.preventDefault();
        let body = {
            Email: user.Email,
            ImageURL: imageUser.ImageURL
        }
        await axios.put(imageURL + '/' + body.Email, body).then(response => {
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Profile Picture updated succesfully!',
                showConfirmButton: false,
                timer: 1100
            })
        }).catch(err => {
            console.log(err);
        })
    }

    const handleOnChangeDefaultCity = (event: any) => {
        setUser(prev => ({ ...prev, DefaultCity: event.target.value }));
    }

    const handleSubmitDefaultCity = async (event: any) => {
        event.preventDefault();
        let body = {
            Email: user.Email,
            CityId: user.DefaultCity
        }
        await axios.post(userURL + '/UpdateDefaultCity', body).then(response => {
            console.log(response);
            Swal.fire({
                icon: 'success',
                title: 'Default City changed succesfully!',
                showConfirmButton: false,
                timer: 1100
            })
        }).catch(err => {
            console.log(err);
        })
    }

    const [{ y }, setCard] = useSpring(() => ({ y: 1 }))

    useEffect(() => {
        const email: any = authService.getCurrentUser;
        getUserByEmail(email);
        getImageByEmail(email);
        getAllCities();
    }, []);

    return (
        <div className="container profile-container container-data">
            <h1 className="text-header yellowish">Profile <i className="fas fa-id-card"></i> </h1>
            <hr></hr>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                transition={true}
                className="mb-3">
                <Tab eventKey="profile" title="Profile">
                    <div className="container container-tab shadow">
                        <div className="row">
                            <div className="col d-flex justify-content-evenly">
                                <animated.div className="card" style={{ transform: y.to(v => `scale(${v}`) }} onMouseEnter={() => setCard({ y: 1.2 })}
                                    onMouseLeave={() => setCard({ y: 1 })}>
                                    <img src={imageUser.ImageURL} className="card-img-top image-card" alt="ProfilePicture">
                                    </img>
                                    <div className="card-body">
                                        <h5 className="card-title">{imageUser.Email}</h5>
                                        <hr></hr>
                                        <p className="card-text">Roles: {user.Roles} </p>
                                        <p className="card-text">Date Created: {user.DateCreated.split('T')[0]} </p>
                                    </div>
                                </animated.div>
                            </div>
                            <div className="col">
                                <form className="form-profile text-start">
                                    <div className="mb-3">
                                        <label htmlFor="inputFullName" className="form-label">Full Name</label>
                                        <input type="text" value={user.FullName} name="Email" readOnly className="form-control" id="inputFullName" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="inputUserName" className="form-label">User Name</label>
                                        <input type="text" value={user.UserName} name="Email" readOnly className="form-control" id="inputUserName" />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="inputEmail" className="form-label">Email Address</label>
                                        <input type="email" value={user.Email} name="Email" readOnly className="form-control" id="inputEmail" aria-describedby="emailHelp" />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="image" title="Image">
                    <div className="container container-tab shadow">
                        <div className="row">
                            <div className="col d-flex justify-content-evenly">
                                <animated.div className="card" style={{ transform: y.to(v => `scale(${v}`) }} onMouseEnter={() => setCard({ y: 1.2 })}
                                    onMouseLeave={() => setCard({ y: 1 })}>
                                    <img src={imageUser.ImageURL} className="card-img-top image-card" alt="ProfilePicture">
                                    </img>
                                    <div className="card-body">
                                        <h5 className="card-title">{imageUser.Email}</h5>
                                        <hr></hr>
                                        <p className="card-text">Roles: {user.Roles} </p>
                                        <p className="card-text">Date Created: {user.DateCreated.split('T')[0]} </p>
                                    </div>
                                </animated.div>
                            </div>
                            <div className="col">
                                {!isSave ?
                                    <form className="form-profile text-start" onSubmit={handleSubmitImageURLEventEdit}>
                                        <div className="mb-3">
                                            <label htmlFor="inputImageURL" className="form-label">Image URL</label>
                                            <input type="text" value={imageUser.ImageURL} name="ImageURL" onChange={onChangeImageURL} className="form-control" id="inputImageURL" />
                                        </div>

                                        <div className="mb-3 text-center">
                                            <button type="submit" className="btn btn-success btn-sm" id="btnEdit">Edit Data</button>
                                        </div>
                                    </form>
                                    : <form className="form-profile text-start" onSubmit={handleSubmitImageURLEvent}>
                                        <div className="mb-3">
                                            <label htmlFor="inputImageURL" className="form-label">Image URL</label>
                                            <input type="text" value={imageUser.ImageURL} name="ImageURL" onChange={onChangeImageURL} className="form-control" id="inputImageURL" />
                                        </div>

                                        <div className="mb-3 text-center">
                                            <button type="submit" className="btn btn-success btn-sm" id="btnEdit">Save Data</button>
                                        </div>


                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </Tab>

                <Tab eventKey="config" title="Config">
                    <div className="container container-tab shadow">
                        <div className="row">
                            <div className="col d-flex justify-content-evenly">
                                <animated.div className="card" style={{ transform: y.to(v => `scale(${v}`) }} onMouseEnter={() => setCard({ y: 1.2 })}
                                    onMouseLeave={() => setCard({ y: 1 })}>
                                    <img src={imageUser.ImageURL} className="card-img-top image-card" alt="ProfilePicture">
                                    </img>
                                    <div className="card-body">
                                        <h5 className="card-title">{imageUser.Email}</h5>
                                        <hr></hr>
                                        <p className="card-text">Roles: {user.Roles} </p>
                                        <p className="card-text">Date Created: {user.DateCreated.split('T')[0]} </p>
                                    </div>
                                </animated.div>
                            </div>
                            <div className="col">
                                <form className="form-profile text-start" onSubmit={handleSubmitDefaultCity}>
                                    <div className="mb-3">
                                        <label htmlFor="inputDefaultCity" className="form-label">Change Default City: </label>
                                        {/*<input type="text" value={user.DefaultCity} name="DefaultCity" onChange={handleOnChangeDefaultCity} className="form-control" id="inputDefaultCity" />*/}

                                        {
                                            <select className="form-select" aria-label="Default select example" onChange={handleOnChangeDefaultCity} name="CitiesId" value={user.DefaultCity}>
                                                <option value={0}>Open this select menu</option>
                                                {
                                                    cities.map(city => (
                                                        <option key={city.cityId} value={city.cityId}> {city.cityName} </option>
                                                    ))
                                                }
                                            </select>
                                        }
                                    </div>

                                    <div className="mb-3 text-center">
                                        <button type="submit" className="btn btn-success btn-sm" id="btnEdit">Edit Data</button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>
                </Tab>

                <Tab eventKey="theme" title="Theme">
                    <div className="container container-tab shadow">
                        <div className="row">
                            <div className="col d-flex justify-content-evenly">
                                <animated.div className="card" style={{ transform: y.to(v => `scale(${v}`) }} onMouseEnter={() => setCard({ y: 1.2 })}
                                    onMouseLeave={() => setCard({ y: 1 })}>
                                    <img src={imageUser.ImageURL} className="card-img-top image-card" alt="ProfilePicture">
                                    </img>
                                    <div className="card-body">
                                        <h5 className="card-title">{imageUser.Email}</h5>
                                        <hr></hr>
                                        <p className="card-text">Roles: {user.Roles} </p>
                                        <p className="card-text">Date Created: {user.DateCreated.split('T')[0]} </p>
                                    </div>
                                </animated.div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Turn the lights off <i className="fas fa-adjust"></i> </label>

                                </div>

                                <div className="mb-3">
                                    <DarkMode />
                                </div>
                            </div>
                        </div>

                    </div>

                </Tab>

            </Tabs>
        </div >
    )
}

export default Profile;