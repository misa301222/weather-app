import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from 'axios';
import '././weather-details.scss';
import WeatherList from "../Weather-list/WeatherList";
import { Link } from "react-router-dom";
import moment from "moment";
import NotificationTemperature from "../NotificationTemperature/NotificationTemperature";
import { Modal } from "react-bootstrap";

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
    const [dateToday, setDateToday] = useState<any | null>(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => {
        //console.log(application);
        //setSelectedApplication(application);
        setShow(true);
    }

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

    const calculateDateToday = () => {
        const dateToday = new Date().toLocaleDateString();
        let dateTodayOrdered;
        // if (dateToday) {
        //     dateTodayOrdered = dateToday.split('/')[2] + '-' + dateToday.split('/')[0] + '-' + dateToday.split('/')[1];
        // }

        //setDateToday(dateTodayOrdered);
        const date = new Date(dateToday);
        console.log('today: ' + date);
        setDateToday(date);
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
        calculateDateToday();
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
            <h1 className="pink-color"> {cityName ? cityName : null} <i className="fas fa-sun"></i> </h1>
            <hr></hr>
            <div className="card mb-3 bg-light card-detail shadow">
                <img src={img} className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title fw-bold fst-italic purple">{temperature.dateTemperature ? moment(new Date(temperature.dateTemperature)).format('dddd') + ' ' +
                        moment(new Date(temperature.dateTemperature)).format('MM/DD/YYYY') : null}</h5>
                    <h3 className="card-title yellowish"> <u> {description} </u> </h3>
                    <div className="row">
                        <div className="col">
                            <h5 className="card-text fw-bold">{temperature.maxTemperature}&deg;</h5>
                            <label className="card-text"><small className="text-muted fw-bold">Max</small></label>
                        </div>
                        <div className="col">
                            <h5 className="card-text fw-bold">{temperature.minTemperature}&deg;</h5>
                            <label className="card-text"><small className="text-muted fw-bold">Min</small></label>
                        </div>
                    </div>

                    <br></br>

                    <div className="row">
                        <div className="col">
                            <h5 className="card-text fw-bold">{temperature.precipitationTemperature}%</h5>
                            <label className="card-text"><small className="text-muted fw-bold">Precipitation</small></label>
                        </div>

                        <div className="col">
                            <h5 className="card-text fw-bold">{temperature.windTemperature} km/s</h5>
                            <label className="card-text"><small className="text-muted fw-bold">Wind</small></label>
                        </div>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-around">
                    <Link to={temperatureDayBefore.cityId > -1 && new Date(temperatureDayBefore.dateTemperature) >= dateToday ? { pathname: `/weather-details/${temperature.cityId}/${dayBefore}`, state: { Temperature: temperatureDayBefore } }
                        : { pathname: `/weather-details/${temperature.cityId}/${temperature.dateTemperature}`, state: { Temperature: temperature } }} >
                        <button type="button" disabled={temperatureDayBefore.cityId < 0 || new Date(temperatureDayBefore.dateTemperature) < dateToday ? true : false} className="btn btn-light btn-outline-dark">Prev</button>
                    </Link>

                    <Link to={temperatureDayAfter.cityId > -1 ? { pathname: `/weather-details/${temperature.cityId}/${dayAfter}`, state: { Temperature: temperatureDayAfter } }
                        : { pathname: `/weather-details/${temperature.cityId}/${temperature.dateTemperature}`, state: { Temperature: temperature } }} >
                        <button type="button" disabled={temperatureDayAfter.cityId < 0 ? true : false} className="btn btn-light btn-outline-dark">Next</button>
                    </Link>
                </div>

                <button type="button" className="btn btn-success" onClick={handleShow}>Show Notifications</button>

            </div>

            {temperature.cityId ?
                <WeatherList dataFromParent={{ CityId: temperature.cityId, DateTemperature: temperature.dateTemperature }} />
                : null
            }



            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Notifications <i className="fas fa-exclamation-circle"></i></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {temperature.cityId ?
                        <NotificationTemperature dataFromParent={{ CityId: temperature.cityId, DateTemperature: temperature.dateTemperature }} /> : null                        
                    }
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary btn-sm" onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>


        </div >
    )
}

export default WeatherDetails;