import { useEffect, useState } from 'react';
import './add-temperatureNotification.scss';
import axios from 'axios';
import Swal from 'sweetalert2';

const citiesURL = "https://localhost:5001/api/Cities";
const notificationTypesURL = "https://localhost:5001/api/NotificationTypes";
const temperatureNotificationURL = 'https://localhost:5001/api/TemperatureNotifications';
function AddTemperatureNotification() {

    const [cities, setCities] = useState([{
        cityId: 0,
        cityName: '',
        countryId: 0
    }]);

    const [temperatureNotification, setTemperatureNotification] = useState({
        cityId: 0,
        dateTemperature: new Date(),
        notificationTypeId: 0,
        temperatureNotificationHeader: '',
        temperatureNotificationDescription: ''
    });

    const [notificationTypes, setNotificationTypes] = useState([{
        notificationTypeId: 0,
        notificationTypeDescription: ''
    }]);

    const getAllCities = async () => {
        await axios.get(citiesURL).then(response => {
            setCities(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const getAllNotificationTypes = async () => {
        await axios.get(notificationTypesURL).then(response => {
            setNotificationTypes(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleOnChangeCityId = (event: any) => {
        setTemperatureNotification(prev => ({ ...prev, cityId: event.target.value }));
    }

    const handleOnChangeDateTemperature = (event: any) => {
        setTemperatureNotification(prev => ({ ...prev, dateTemperature: event.target.value }));
    }

    const handleOnChangeNotificationTypeId = (event: any) => {
        setTemperatureNotification(prev => ({ ...prev, notificationTypeId: event.target.value }));
    }

    const handleOnChangeTemperatureNotificationHeader = (event: any) => {
        setTemperatureNotification(prev => ({ ...prev, temperatureNotificationHeader: event.target.value }));
    }

    const handleOnChangeTemperatureNotificationDescription = (event: any) => {
        setTemperatureNotification(prev => ({ ...prev, temperatureNotificationDescription: event.target.value }));
    }

    const handleOnSubmitForm = async (event: any) => {
        event.preventDefault();
        let body = {
            cityId: temperatureNotification.cityId,
            dateTemperature: temperatureNotification.dateTemperature,
            notificationTypeId: temperatureNotification.notificationTypeId,
            temperatureNotificationHeader: temperatureNotification.temperatureNotificationHeader,
            temperatureNotificationDescription: temperatureNotification.temperatureNotificationDescription
        }
        await axios.post(temperatureNotificationURL, body).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Notification Added Successfully!!!',
                showConfirmButton: false,
                timer: 1100
            });
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllCities();
        getAllNotificationTypes();
    }, []);

    return (
        <div className="container container-data add-temperature-component">
            <div className="header">
                <h2 className="yellowish fw-bold">Add TemperatureNotification</h2>
                <hr></hr>
            </div>

            <div className="container">
                <form className="form-temperatureNotification" onSubmit={handleOnSubmitForm}>
                    <div className="card w-50 card-temperatureNotification">
                        <div className="card-header fw-bold">Add New Temperature Notification</div>
                        <div className="card-body text-start">

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">City Name</label>
                                <input className="form-control" list="datalistOptions" id="inputCityId" placeholder="Select A City" onChange={handleOnChangeCityId} />
                                <datalist id="datalistOptions">
                                    <option value={0}>Open this select menu</option>
                                    {
                                        cities.map((city, index) => (
                                            <option key={index} value={city.cityId}>{city.cityName}</option>
                                        ))
                                    }
                                </datalist>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Date Temperature</label>
                                <input type="date" className="form-control" onChange={handleOnChangeDateTemperature} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Notification Type</label>
                                <input className="form-control" list="datalistOptionsNotificationTypes" id="notificationTypeId"
                                    placeholder="Select A Type" onChange={handleOnChangeNotificationTypeId} />
                                <datalist id="datalistOptionsNotificationTypes">
                                    <option value={0}>Open this select menu</option>
                                    {
                                        notificationTypes.map((notificationType, index) => (
                                            <option key={index} value={notificationType.notificationTypeId}>{notificationType.notificationTypeDescription}</option>
                                        ))
                                    }
                                </datalist>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Header</label>
                                <input type="text" className="form-control" onChange={handleOnChangeTemperatureNotificationHeader} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label fw-bold">Description</label>
                                <textarea className="form-control" rows={3} id="textAreaDescription" maxLength={256} onChange={handleOnChangeTemperatureNotificationDescription}></textarea>
                            </div>

                            <div className="mb-3 text-center">
                                <button type="submit" className="btn btn-success">Save</button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTemperatureNotification;