import React, { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import '././home.scss';
import cloudImage from '../../resources/images/Clouds.jpg';
import { useSpring, useTransition } from '@react-spring/core';
import { animated } from '@react-spring/web';
import axios from 'axios';
import { Link } from 'react-router-dom';

const temperatureURL = "https://localhost:5001/api/Temperatures";
const descriptionTemperatureURL = "https://localhost:5001/api/DescriptionTemperatures";
const citiesURL = 'https://localhost:5001/api/Cities';
const userURL = 'https://localhost:5001/api/User';

function Home() {

    const [userName, setUserName] = useState('');
    const [city, setCity] = useState({
        cityId: 0,
        cityName: '',
        countryId: 0
    });
    const [temperatures, setTemperatures] = useState([{
        cityId: 0,
        dateTemperature: '',
        minTemperature: 0,
        maxTemperature: 0,
        descriptionTemperature: 0,
        windTemperature: 0,
        precipitationTemperature: 0
    }]);
    const [descriptionTemperatures, setDescriptionTemperatures] = useState([{
        descriptionTemperatureId: 0,
        descriptionTemperatureDescription: ''
    }]);
    const [{ size }] = useSpring(() => ({ size: 1 }));
    const [cities, setCities] = useState([{
        cityId: 0,
        cityName: '',
        countryId: 0
    }]);
    const [selectedCity, setSelectedCity] = useState('');

    const getDefaultCity = async () => {
        let user = authService.getCurrentUser;
        if (user) {
            setUserName(user);
            await axios.get(userURL + '/GetCurrentUser/' + user).then(response => {
                console.log(response);
                getAllTemperaturesByCityId(response.data.dataSet.defaultCity);
                getDefaultCityName(response.data.dataSet.defaultCity);
            }).catch(err => {
                console.log(err);
            });
        } else {
            getAllTemperaturesByCityId(3);
            getDefaultCityName(3);
        }
    }

    const setNotLoggedMessageText = () => {
        return <p className='fw-bold text-danger'>It seems you're not currently logged In. If you want to login click on <Link to="/login">Here.</Link></p>;
    }

    const getDefaultCityName = async (cityId: number) => {
        await axios.get(citiesURL + '/' + cityId).then(response => {
            console.log(response);
            setCity(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const getAllTemperaturesByCityId = async (cityId: number) => {
        await axios.get(temperatureURL + '/GetTemperatureByCityId/' + cityId).then(response => {
            console.log(response);
            setTemperatures(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const getDescriptionTemperatureById = async () => {
        await axios.get(descriptionTemperatureURL + '/').then(response => {
            console.log(response.data);
            setDescriptionTemperatures(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    /*
    const transition = useTransition(({ cloudImage }), {
        config: { duration: 400 },
        from: { opacity: 0, marginLeft: 0, marginRight: 0, transform: 'scale(0)' },
        enter: { opacity: 1, marginLeft: 0, marginRight: 0, transform: 'scale(1)' },
    });

    const ImageFragment = transition((style) => {
        return <animated.img style={style} className="principal-image" src={cloudImage}></animated.img>
    });
    
    const headerFragment = transition((style) => {
        return <animated.h1 style={style}>Weather App</animated.h1>
    })
    */

    const text = (id: number) => {
        for (let i = 0; i < descriptionTemperatures.length; i++) {
            if (descriptionTemperatures[i].descriptionTemperatureId === id) {
                return descriptionTemperatures[i].descriptionTemperatureDescription;
            }
        }
    }

    const image = (id: number) => {
        for (let i = 0; i < descriptionTemperatures.length; i++) {
            if (descriptionTemperatures[i].descriptionTemperatureId === id) {
                return 'images/' + descriptionTemperatures[i].descriptionTemperatureDescription + '-details.jpg';
            }
        }
    }

    const getAllCities = async () => {
        await axios.get(citiesURL).then(response => {
            console.log(response);
            setCities(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleOnChangeCity = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event);
        setSelectedCity(event.target.value);
    }

    useEffect(() => {
        getDescriptionTemperatureById();
        getAllCities();
        getDefaultCity();
    }, []);

    return (
        <div className="container home">
            <div className="contenedor card shadow">
                <div className="card-body">
                    <br></br>
                    <h1 className="text-decoration-underline"> WeatherApp <i className="fas fa-laptop"></i></h1>
                    <br></br>
                    <br></br>

                    <img src={cloudImage} className="principal-image" alt="ImageCloud" />

                    <br></br>
                    <br></br>
                    <br></br>

                    { /* TODO ARREGLAR IMAGENES CUANDO SE ESCRIBE ACA */}
                    <div className="searcher">
                        <h1> <i className="fas fa-building"></i> </h1>
                        <form className="row form-search-city p-3">
                            <div className="col-sm-4">
                                <label htmlFor="inputCityId" className="col col-form-label fw-bold">Search City:</label>
                            </div>
                            <div className="col-sm-6 ">
                                <input className="form-control" list="datalistOptions" id="inputCityId" placeholder="Select A City" onChange={handleOnChangeCity} />
                                <datalist id="datalistOptions">
                                    <option value={0}>Open this select menu</option>
                                    {
                                        cities.map(city => (
                                            <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                                        ))
                                    }
                                </datalist>
                            </div>
                            <div className="col">
                                <Link to={{ pathname: `/city-details/${selectedCity}`, state: { SelectedCity: selectedCity } }}>
                                    <button type="button" className="btn btn-light btn-outline-dark"><i className="fas fa-search"></i></button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

            <div className="weather-contenedor">
                <h1>Weather <i className="fas fa-cloud-moon-rain"></i></h1>
                <hr></hr>
                {!userName ? setNotLoggedMessageText() : null}
                {city.cityName ? <h4>Weather of {city.cityName}</h4> : null}
                <br></br>
                <div className="card-group">
                    {
                        temperatures.length > 0 ?
                            temperatures.slice(0, 3).map((temperature, index) => (
                                <div key={index} className="card weather-card shadow">
                                    { /* style={{ transform: size.to(s => `scale(${s})`) }} */}
                                    <img src={image(temperature.descriptionTemperature)} className="weather-image shadow-sm card-img-top" alt="WeatherPhoto" />
                                    <div className="card-body">
                                        <h5 className="card-text">{temperature.dateTemperature.split('T')[0]}</h5>
                                        <h5 className="card-text">{text(temperature.descriptionTemperature)}</h5>
                                        <h5 className="card-text">Max: {temperature.maxTemperature}&deg;</h5>
                                        <h5 className="card-text">Min: {temperature.minTemperature}&deg;</h5>
                                        <h5 className="card-text">Precipitation: {temperature.precipitationTemperature}%</h5>
                                        <h5 className="card-text">Wind: {temperature.windTemperature} km/s</h5>
                                        <div className="mb-3 text-center"></div>
                                    </div>
                                    <div className="card-footer">
                                        <Link to={{ pathname: `/weather-details/${temperature.cityId}/${temperature.dateTemperature}`, state: { Temperature: temperature } }}>
                                            <button className="btn btn-light btn-outline-dark">Details</button> </Link>
                                    </div>
                                </div>
                            ))
                            :
                            <div className="container shadow p-3">
                                <h1 className="text-danger"> Whops! It seems there's not data avilable. Please contact support!</h1>
                                <br></br>
                                <br></br>
                                <img src="images/Error.png" className="error-image" alt="errorimg" />
                            </div>
                    }
                </div>
            </div>



        </div>
    );

}

export default Home;
