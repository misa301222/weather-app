import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import '././city-details.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const temperatureURL = "https://localhost:5001/api/Temperatures";
const citiesURL = "https://localhost:5001/api/Cities";
const descriptionTemperatureURL = "https://localhost:5001/api/DescriptionTemperatures";


interface CustomState {
    SelectedCity: 0
}

function CityDetails() {

    //const { state } = useLocation();
    const { state } = useLocation<CustomState>();

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
    const [cities, setCities] = useState([{
        cityId: 0,
        cityName: '',
        countryId: 0
    }]);
    const [selectedCity, setSelectedCity] = useState({
        cityId: 0
    });

    const getAllTemperaturesByCityId = async (cityId: number) => {
        await axios.get(temperatureURL + '/GetTemperatureByCityId/' + cityId).then(response => {
            console.log(response);
            setTemperatures(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const getCityNameByCityId = async (cityId: number) => {
        await axios.get(citiesURL + '/' + cityId).then(response => {
            //console.log(response.data);
            setCity(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const getDescriptionTemperatures = async () => {
        await axios.get(descriptionTemperatureURL + '/').then(response => {
            console.log(response.data);
            setDescriptionTemperatures(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const image = (id: number) => {
        for (let i = 0; i < descriptionTemperatures.length; i++) {
            if (descriptionTemperatures[i].descriptionTemperatureId === id) {
                return '/images/' + descriptionTemperatures[i].descriptionTemperatureDescription + '-details.jpg';
            }
        }
    }

    const handleOnChangeCity = (event: any) => {
        setSelectedCity(event.target.value);
    }

    const getAllCities = async () => {
        await axios.get(citiesURL).then(response => {
            console.log(response);
            setCities(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getDescriptionTemperatures();
        getAllTemperaturesByCityId(state.SelectedCity);
        getCityNameByCityId(state.SelectedCity);
        getAllCities();
    }, [state])

    return (
        <div className="container city-details">
            <br></br>
            <h2 className="">
                {city.cityName} <i className="fas fa-sun"></i>
            </h2>

            <br></br>

            <div className="searcher">                
                <form className="row shadow p-3">
                    <div className="col-sm-4">
                        <label htmlFor="inputCityId" className="col col-form-label fw-bold"><i className="fas fa-building"></i> Search City:</label>
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

            <div className="all-cities">
                {

                    temperatures.length ?
                        temperatures.map((city, i) => (
                            <div className="container city-element" key={i}>
                                <div className="row">
                                    <div className="col">
                                        <div className="card mb-3 bg-light card-detail shadow">
                                            <img src={image(city.descriptionTemperature)} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{city.dateTemperature.split('T')[0]}</h5>
                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-text">{city.maxTemperature}&deg;</h5>
                                                        <label className="card-text"><small className="text-muted">Max</small></label>
                                                    </div>
                                                    <div className="col">
                                                        <h5 className="card-text">{city.minTemperature}&deg;</h5>
                                                        <label className="card-text"><small className="text-muted">Min</small></label>
                                                    </div>
                                                </div>

                                                <br></br>

                                                <div className="row">
                                                    <div className="col">
                                                        <h5 className="card-text">{city.precipitationTemperature}%</h5>
                                                        <label className="card-text"><small className="text-muted">Precipitation</small></label>
                                                    </div>

                                                    <div className="col">
                                                        <h5 className="card-text">{city.windTemperature} km/s</h5>
                                                        <label className="card-text"><small className="text-muted">Wind</small></label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                    </div>

                                    <div className="col d-flex align-items-end col-see-details">
                                        <Link to={{ pathname: `/weather-details/${city.cityId}/${city.dateTemperature}`, state: { Temperature: city } }}>
                                            <button type="button" className="btn btn-light btn-outline-dark">See details &#8594;</button>
                                        </Link>
                                    </div>
                                </div>
                                <br></br>
                                <hr></hr>

                            </div>
                        ))
                        :
                        <div className="container shadow">
                            <h1 className="text-danger"> Whops! It seems there's not data avilable. Please contact support!</h1>
                            <br></br>
                            <br></br>
                            <img src="/images/Error.png" className="error-image" />
                        </div>
                }

            </div>


            {/*
            <div className="card mb-3 bg-light">
                <img src="..." className="card-img-top" alt="..." />
                <div className ="card-body">
                <h5 className ="card-title">Card title</h5>
                <p className ="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.This content is a little bit longer.</p>
                <p className ="card-text"><small className ="text-muted">Last updated 3 mins ago</small></p>
                </div>
            </div>*/
            }
        </div>)
}

export default CityDetails;