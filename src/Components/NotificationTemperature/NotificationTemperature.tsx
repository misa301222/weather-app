import { useEffect, useState } from 'react';
import './NotificationTemperature.scss';
import axios from 'axios';

const temperatureNotificationsURL = 'https://localhost:5001/api/TemperatureNotifications';
const notificationTypesURL = 'https://localhost:5001/api/NotificationTypes';

function NotificationTemperature(props: any) {

    const [temperatureNotifications, setTemperatureNotifications] = useState([{
        temperatureNotificationId: 0,
        cityId: 0,
        dateTemperature: new Date(),
        notificationTypeId: 0,
        temperatureNotificationHeader: '',
        temperatureNotificationDescription: ''
    }]);

    const [notificationTypes, setNotificationTypes] = useState([{
        notificationTypeId: 0,
        notificationTypeDescription: ''
    }]);

    const getTemperatureNotificationsByCityIdAndDateTemperature = async (cityId: number, dateTemperature: Date) => {
        await axios.get(temperatureNotificationsURL + '/GetTemperatureNotificationsByCityIdAndDateTemperature/' + cityId + '/' + dateTemperature).then(response => {
            setTemperatureNotifications(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const renderSwitch = (notificaitonTypeId: number) => {
        let classText = 'card shadow card-notification mb-4 ';
        switch (notificaitonTypeId) {
            case 1:
                classText += 'bg-light';
                break;

            case 2:
                classText += 'bg-warning';
                break;

            case 3:
                classText += 'bg-danger';
                break

            case 4:
                classText += 'bg-info';
                break;
        }
        return classText;
    }

    const getNotificationTypeDescriptionByNotificationTypeId = (notificationTypeId: number) => {
        for (let i = 0; i < notificationTypes.length; i++) {
            if (notificationTypeId === notificationTypes[i].notificationTypeId) {
                return notificationTypes[i].notificationTypeDescription;
            }
        }
    }

    const getAllNotificationType = async () => {
        await axios.get(notificationTypesURL).then(response => {
            setNotificationTypes(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllNotificationType();
        getTemperatureNotificationsByCityIdAndDateTemperature(props.dataFromParent.CityId, props.dataFromParent.DateTemperature);
    }, [props.dataFromParent.DateTemperature]);

    return (
        <div className="container notification-temperature-component">
            {
                temperatureNotifications[0] ?
                    temperatureNotifications[0].cityId > 0 ?
                        temperatureNotifications.map((temperatureNotification, index) => (
                            <div className={renderSwitch(temperatureNotification.notificationTypeId)} key={index}>
                                <div className="card-header fw-bold">
                                    {temperatureNotification.temperatureNotificationHeader} - {getNotificationTypeDescriptionByNotificationTypeId(temperatureNotification.notificationTypeId)}
                                </div>

                                <div className="card-body">
                                    {temperatureNotification.temperatureNotificationDescription}
                                </div>
                            </div>
                        )) : null
                    : <div className="no-notifications container">
                        <h4 className="fw-bold text-center"> <u> It seems there's no notifications. Enjoy your day :) </u> </h4>
                    </div>
            }
        </div>
    )
}

export default NotificationTemperature;