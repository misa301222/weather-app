import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from 'axios';
import '././weather-details.scss';
import WeatherList from "../Weather-list/WeatherList";
import { Link } from "react-router-dom";

const temperatureURL = "https://localhost:5001/api/Temperatures";
const descriptionTemperatureURL = "https://localhost:5001/api/DescriptionTemperatures";
const citiesURL = "https://localhost:5001/api/Cities";


interface CustomState {
    Temperature: {
        cityId: 0,
        dateTemperature: Date,
        minTemperature: 0,
        maxTemperature: 0,
        descriptionTemperature: 0,
        windTemperature: 0,
        precipitationTemperature: 0
    }
}

function WeatherDetails() {

    const { state } = useLocation<CustomState>();
    const [temperature, setTemperature] = useState({
        cityId: 0,
        dateTemperature: '',
        minTemperature: 0,
        maxTemperature: 0,
        descriptionTemperature: 0,
        windTemperature: 0,
        precipitationTemperature: 0
    });
    const [temperatureDayBefore, setTemperatureDayBefore] = useState({
        cityId: 0,
        dateTemperature: '',
        minTemperature: 0,
        maxTemperature: 0,
        descriptionTemperature: 0,
        windTemperature: 0,
        precipitationTemperature: 0
    });
    const [temperatureDayAfter, setTemperatureDayAfter] = useState({
        cityId: 0,
        dateTemperature: '',
        minTemperature: 0,
        maxTemperature: 0,
        descriptionTemperature: 0,
        windTemperature: 0,
        precipitationTemperature: 0
    });
    const [img, setImg] = useState('');
    const [description, setDescription] = useState('');
    const [cityName, setCityName] = useState('');
    const [dayBefore, setDayBefore] = useState<any | null>(null);
    const [dayAfter, setDayAfter] = useState<any | null>(null);

    const getTemperatureByCityIdAndDate = async (cityId: number, dateTemperature: Date) => {
        await axios.get(temperatureURL + '/GetTemperatureByCityIdAndDateTemperature/' + cityId + '/' + dateTemperature).then(response => {
            console.log(response);
            setTemperature(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    const getTemperatureDescriptionById = async (id: number) => {
        if (id) {
            await axios.get(descriptionTemperatureURL + '/' + id).then(response => {
                setDescription(response.data.descriptionTemperatureDescription);
                setImg('/images/' + response.data.descriptionTemperatureDescription + '-details.jpg');
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const calculateDayBefore = async (cityId: number, dateTemperature: Date) => {
        let date = new Date(dateTemperature);
        date.setDate(date.getDate() - 1);
        let dateToRedirect = date.toISOString().substring(0, 11) + '00:00:00';
        setDayBefore(dateToRedirect);

        await axios.get(temperatureURL + '/GetTemperatureByCityIdAndDateTemperature/' + cityId + '/' + dateToRedirect).then(response => {
            console.log(response);
            setTemperatureDayBefore(response.data);
        }).catch(err => {
            console.log(err);
            console.log('Theres not a date before');
            let empty = {
                cityId: -1,
                dateTemperature: '',
                minTemperature: 0,
                maxTemperature: 0,
                descriptionTemperature: 0,
                windTemperature: 0,
                precipitationTemperature: 0
            }
            setTemperatureDayBefore(empty);
        })
    }

    const calculateDayAfter = async (cityId: number, dateTemperature: Date) => {
        let date = new Date(dateTemperature);
        date.setDate(date.getDate() + 1);
        let dateToRedirect = date.toISOString().substring(0, 11) + '00:00:00';
        setDayAfter(dateToRedirect);

        await axios.get(temperatureURL + '/GetTemperatureByCityIdAndDateTemperature/' + cityId + '/' + dateToRedirect).then(response => {
            console.log(response);
            setTemperatureDayAfter(response.data);
        }).catch(err => {
            console.log(err);
            console.log('Theres not a date after');
            let empty = {
                cityId: -1,
                dateTemperature: '',
                minTemperature: 0,
                maxTemperature: 0,
                descriptionTemperature: 0,
                windTemperature: 0,
                precipitationTemperature: 0
            }
            setTemperatureDayAfter(empty);
        })
    }

    const getCityNameByCityId = async (cityId: number) => {
        await axios.get(citiesURL + '/' + cityId).then(response => {
            console.log(response);
            setCityName(response.data.cityName);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getTemperatureByCityIdAndDate(state.Temperature.cityId, state.Temperature.dateTemperature);
        getTemperatureDescriptionById(state.Temperature.descriptionTemperature);
        calculateDayBefore(state.Temperature.cityId, state.Temperature.dateTemperature);
        calculateDayAfter(state.Temperature.cityId, state.Temperature.dateTemperature);
        getCityNameByCityId(state.Temperature.cityId);
    }, [state])

    return (
        <div className="container weather-details container-data">
            <br></br>
            <br></br>
            <h3> {cityName ? cityName : null} <i className="fas fa-sun"></i> </h3>
            <hr></hr>
            <div className="card mb-3 bg-light card-detail shadow">
                <img src={img} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">{temperature.dateTemperature ? temperature.dateTemperature.split('T')[0] : null}</h5>
                    <h5 className="card-title">{description}</h5>
                    <div className="row">
                        <div className="col">
                            <h5 className="card-text">{temperature.maxTemperature}&deg;</h5>
                            <label className="card-text"><small className="text-muted">Max</small></label>
                        </div>
                        <div className="col">
                            <h5 className="card-text">{temperature.minTemperature}&deg;</h5>
                            <label className="card-text"><small className="text-muted">Min</small></label>
                        </div>
                    </div>

                    <br></br>

                    <div className="row">
                        <div className="col">
                            <h5 className="card-text">{temperature.precipitationTemperature}%</h5>
                            <label className="card-text"><small className="text-muted">Precipitation</small></label>
                        </div>

                        <div className="col">
                            <h5 className="card-text">{temperature.windTemperature} km/s</h5>
                            <label className="card-text"><small className="text-muted">Wind</small></label>
                        </div>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-around">
                    <Link to={temperatureDayBefore.cityId > -1 ? { pathname: `/weather-details/${temperature.cityId}/${dayBefore}`, state: { Temperature: temperatureDayBefore } }
                        : { pathname: `/weather-details/${temperature.cityId}/${temperature.dateTemperature}`, state: { Temperature: temperature } }} >
                        <button type="button" disabled={temperatureDayBefore.cityId < 0 ? true : false} className="btn btn-light btn-outline-dark">Prev</button>
                    </Link>

                    <Link to={temperatureDayAfter.cityId > -1 ? { pathname: `/weather-details/${temperature.cityId}/${dayAfter}`, state: { Temperature: temperatureDayAfter } }
                        : { pathname: `/weather-details/${temperature.cityId}/${temperature.dateTemperature}`, state: { Temperature: temperature } }} >
                        <button type="button" disabled={temperatureDayAfter.cityId < 0 ? true : false} className="btn btn-light btn-outline-dark">Next</button>
                    </Link>
                </div>
            </div>

            {temperature.cityId ?
                <WeatherList dataFromParent={{ CityId: temperature.cityId, DateTemperature: temperature.dateTemperature }} />
                : null
            }

        </div>
    )
}

export default WeatherDetails;