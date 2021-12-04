import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import '././city-details.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

const temperatureURL = "https://localhost:5001/api/Temperatures";
const citiesURL = "https://localhost:5001/api/Cities";
const descriptionTemperatureURL = "https://localhost:5001/api/DescriptionTemperatures";


interface CustomState {
    SelectedCity: 0
}

function CityDetails() {
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
        const dateToday = new Date().toLocaleDateString();
        let dateTodayOrdered;
        if (dateToday) {
            dateTodayOrdered = dateToday.split('/')[2] + '-' + dateToday.split('/')[0] + '-' + dateToday.split('/')[1];
        }

        await axios.get(temperatureURL + '/GetAllTemperaturesFromDateToEnd/' + cityId + '/' + dateTodayOrdered).then(response => {
            console.log(response);
            setTemperatures(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const getCityNameByCityId = async (cityId: number) => {
        await axios.get(citiesURL + '/' + cityId).then(response => {
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
        <div className="container city-details-component container-data">
            <br></br>
            <h2 className="fw-bold pink-color">
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
                <br></br>
                <hr></hr>
            </div>

            <div className="all-cities">
                {
                    temperatures.length ?
                        temperatures.map((city, i) => (
                            <div className="container city-element" key={i}>
                                <div className="row">
                                    <div className="col">
                                        <div className="card bg-light card-detail shadow">
                                            <div className="row g-0">
                                                <div className="col-md-4">
                                                    <img src={image(city.descriptionTemperature)} className="img-fluid rounded-start" alt="..." />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h5 className="card-title purple fw-bold fst-italic">{city.dateTemperature ?
                                                            moment(new Date(city.dateTemperature)).format('dddd') + ' ' +
                                                            moment(new Date(city.dateTemperature)).format('MM/DD/YYYY') : null}</h5>
                                                        <div className="row">
                                                            <div className="col"> <h5> {city.maxTemperature}&deg; </h5></div>
                                                            <div className="col"> <h5> {city.minTemperature}&deg; </h5></div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col"> <small className="text-muted fw-bold">Max</small> </div>
                                                            <div className="col"> <small className="text-muted fw-bold">Min</small> </div>
                                                        </div>

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

        </div>)
}

export default CityDetails;