import './show-temperatureNotification.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment';

const citiesURL = "https://localhost:5001/api/Cities";
const temperatureNotificationURL = 'https://localhost:5001/api/TemperatureNotifications';
const notificationTypesURL = "https://localhost:5001/api/NotificationTypes";

function ShowTemperatureNotification() {

    const [cities, setCities] = useState([{
        cityId: 0,
        cityName: '',
        countryId: 0
    }]);

    const [notificationTypes, setNotificationTypes] = useState([{
        notificationTypeId: 0,
        notificationTypeDescription: ''
    }]);

    const [temperatureNotifications, setTemperatureNotifications] = useState([{
        cityId: 0,
        dateTemperature: new Date(),
        notificationTypeId: 0,
        temperatureNotificationHeader: '',
        temperatureNotificationDescription: ''
    }]);

    const [selectedCity, setSelectedCity] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const getAllCitites = async () => {
        await axios.get(citiesURL).then(response => {
            setCities(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleOnChangeCity = (event: any) => {
        setSelectedCity(event.target.value);
    }

    const handleOnChangeSelectedDate = (event: any) => {
        setSelectedDate(event.target.value);
    }

    const handleOnSubmitSearch = async (event: any) => {
        event.preventDefault();

        let cityId = selectedCity;
        let dateTemperature = selectedDate;

        await axios.get(temperatureNotificationURL + '/GetTemperatureNotificationsByCityIdAndDateTemperature/' + cityId + '/' + dateTemperature).then(response => {
            console.log(response);
            setTemperatureNotifications(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const searchByCityIdButton = async () => {
        let cityId = selectedCity;

        await axios.get(temperatureNotificationURL + '/GetTemperatureNotificationsByCityId/' + cityId).then(response => {
            console.log(response);
            setTemperatureNotifications(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const getAllNotificationTypes = async () => {
        await axios.get(notificationTypesURL).then(response => {
            console.log(response);
            setNotificationTypes(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const getNotificationTypeById = (notificationTypeId: number) => {
        for (let i = 0; i < notificationTypes.length; i++) {
            if (notificationTypes[i].notificationTypeId === notificationTypeId) {
                return notificationTypes[i].notificationTypeDescription;
            }
        }
    }

    const getCityByCityId = (cityId: number) => {
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].cityId === cityId) {
                return cities[i].cityName;
            }
        }
    }

    useEffect(() => {
        getAllCitites();
        getAllNotificationTypes();
    }, []);

    return (
        <div className="container container-data show-temperature-component">
            <div className="container">
                <div className="header">
                    <h2 className="yellowish fw-bold">Show TemperatureNotification</h2>
                    <hr></hr>
                </div>

                <div className="searcher">
                    <form onSubmit={handleOnSubmitSearch}>
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col d-flex align-items-evenly">
                                        <label htmlFor="inputCity" className="col-sm-3 col-form-label fw-bold purple"><u>City</u></label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control" id="inputCity" list="datalistOptions" onChange={handleOnChangeCity} />
                                            <datalist id="datalistOptions">
                                                <option value={0}>Select a City</option>
                                                {
                                                    cities.map((city, index) => (
                                                        <option key={index} value={city.cityId}>{city.cityName}</option>
                                                    ))
                                                }
                                            </datalist>
                                        </div>
                                    </div>

                                    <div className="col d-flex align-items-evenly">
                                        <label htmlFor="inputDate" className="col-sm-3 col-form-label fw-bold purple"><u>Date</u></label>
                                        <div className="col-sm-7">
                                            <input type="date" className="form-control" id="inputDate" onChange={handleOnChangeSelectedDate} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-2">
                                    <div className="col">
                                        <button type="button" onClick={searchByCityIdButton} className="btn btn-sm btn-light btn-outline-dark">
                                            <i className="fas fa-search"></i> Search By City</button>
                                    </div>

                                    <div className="col">

                                    </div>

                                </div>

                                <div className="row text-center">
                                    <div className="col">
                                        <button type="submit" className="btn btn-light btn-outline-dark"><i className="fas fa-search"></i> Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <br></br>
                <br></br>

                <div className="data-temperatureNotification">
                    <h2 className="yellowish fw-bold">Data</h2>
                    <hr></hr>

                    <div className="temperature-notification-info">
                        {temperatureNotifications.length > 0 && temperatureNotifications[0].cityId ?
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">City</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Notification Type</th>
                                        <th scope="col">Header</th>
                                        <th scope="col">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        temperatureNotifications.map((temperatureNotification, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {temperatureNotification.cityId} - {getCityByCityId(temperatureNotification.cityId)}
                                                </td>

                                                <td>
                                                    {temperatureNotification.dateTemperature ? moment(new Date(temperatureNotification.dateTemperature.toString().split('T')[0])).format('dddd') + ' '
                                                        + moment(new Date(temperatureNotification.dateTemperature)).format('MM/DD/YYYY') : null}
                                                </td>

                                                <td>
                                                    {temperatureNotification.notificationTypeId} - {getNotificationTypeById(temperatureNotification.notificationTypeId)}
                                                </td>

                                                <td>
                                                    {temperatureNotification.temperatureNotificationHeader}
                                                </td>

                                                <td>
                                                    {temperatureNotification.temperatureNotificationDescription}
                                                </td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                            : <h4 className="text-danger">There's no data</h4>
                        }
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ShowTemperatureNotification;