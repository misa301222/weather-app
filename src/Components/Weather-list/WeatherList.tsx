import { useEffect, useState } from "react";
import axios from 'axios';
import '././WeatherList.scss';
import { Link } from "react-router-dom";
import moment from "moment";

const temperatureURL = "https://localhost:5001/api/Temperatures";
const descriptionTemperatureURL = "https://localhost:5001/api/DescriptionTemperatures";

function WeatherList(props: any) {

    const [nextFiveTemperatures, setNextFiveTemperatures] = useState([{
        cityId: 0,
        dateTemperature: new Date,
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

    const GetTemperatureByCityIdAndDateTemperatureNextFive = async (cityId: number, dateTemperature: Date) => {
        await axios.get(temperatureURL + '/GetTemperatureByCityIdAndDateTemperatureNextFive/' + cityId + '/' + dateTemperature).then(response => {
            console.log(response);
            setNextFiveTemperatures(response.data);
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

    const image = (id: number) => {
        for (let i = 0; i < descriptionTemperatures.length; i++) {
            if (descriptionTemperatures[i].descriptionTemperatureId === id) {
                return '/images/' + descriptionTemperatures[i].descriptionTemperatureDescription + '-details.jpg';
            }
        }
    }

    const update = (cityId: number, dateTemperature: Date) => {
        console.log('udpate');
        GetTemperatureByCityIdAndDateTemperatureNextFive(cityId, dateTemperature);
    }

    useEffect(() => {
        GetTemperatureByCityIdAndDateTemperatureNextFive(props.dataFromParent.CityId, props.dataFromParent.DateTemperature);
        getDescriptionTemperatureById();
    }, [props.dataFromParent.DateTemperature])

    return (
        <div className="container weatherList">
            <br />
            <br />
            {
                nextFiveTemperatures.length > 0 ?
                    <div className="message">
                        <h2 className="yellowish fw-bold"> <u> Next 5 Days </u><i className="fas fa-calendar-alt"></i> </h2>
                        <br />
                    </div>
                    : null
            }
            {
                nextFiveTemperatures.length > 0 ?
                    nextFiveTemperatures.map((temperature, i) => (
                        <div key={i} className="card mb-3 bg-light card-detail shadow p-3">
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={image(temperature.descriptionTemperature)} className="img-fluid rounded-start card-image" alt="Weatherphoto" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title fw-bold fst-italic purple">{temperature.dateTemperature ?
                                            moment(new Date(temperature.dateTemperature.toString())).format('dddd') + ' ' +
                                            moment(new Date(temperature.dateTemperature.toString())).format('MM/DD/YYYY') : null}</h5>
                                        <div className="row">
                                            <div className="col">
                                                <h6 className="card-text fw-bold">{temperature.maxTemperature}&deg;</h6>
                                                <label className="card-text"><small className="text-muted fw-bold">Max</small></label>
                                            </div>

                                            <div className="col">
                                                <h6 className="card-text fw-bold">{temperature.minTemperature}&deg;</h6>
                                                <label className="card-text"><small className="text-muted fw-bold">Min</small></label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col d-flex justify-content-end col-see-details">
                                <Link to={{ pathname: `/weather-details/${temperature.cityId}/${temperature.dateTemperature}`, state: { Temperature: temperature } }}>
                                    <button onClick={() => update(temperature.cityId, temperature.dateTemperature)} type="button" className="btn btn-light btn-outline-dark">See details &#8594;</button>
                                </Link>
                            </div>
                        </div>
                    ))
                    : null
            }
        </div>
    )

}

export default WeatherList;