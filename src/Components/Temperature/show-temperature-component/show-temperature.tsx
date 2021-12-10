import { useEffect, useState } from "react";
import axios from 'axios';
import '././show-temperature.scss'

const temperatureURL = "https://localhost:5001/api/Temperatures";
function ShowTemperature() {

    const [temperatures, setTemperatures] = useState([{
        cityId: 0,
        dateTemperature: '',
        minTemperature: 0,
        maxTemperature: 0,
        descriptionTemperature: 0,
        windTemperature: 0,
        precipitationTemperature: 0
    }]);

    const getAlltemperatures = async () => {
        axios.get(temperatureURL).then(response => {
            setTemperatures(response.data);
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAlltemperatures();
    }, [])

    return (
        <div className="container container-data show-temperature-component">
            <br></br>
            <br></br>
            <h2>Show Temperatures</h2>
            <hr></hr>
            <br></br>
            <br></br>

            <div className="container-datos">

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">City Id</th>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Max Temperature</th>
                            <th scope="col">Min Temperature</th>
                            <th scope="col">Precipitation</th>
                            <th scope="col">Wind</th>
                        </tr>
                    </thead>
                    <tbody>
                        {temperatures.map((temperature, index) => (
                            <tr key={index}>
                                <td>{temperature.cityId}</td>
                                <td>{temperature.dateTemperature.split('T')[0]}</td>
                                <td>{temperature.descriptionTemperature}</td>
                                <td>{temperature.maxTemperature}</td>
                                <td>{temperature.minTemperature}</td>
                                <td>{temperature.precipitationTemperature}</td>
                                <td>{temperature.windTemperature}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>)
}

export default ShowTemperature;