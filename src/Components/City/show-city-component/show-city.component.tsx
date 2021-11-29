import { useEffect, useState } from "react";
import axios from 'axios';

const baseURL = "https://localhost:5001/api/Cities";

function ShowCity() {
    const [data, setData] = useState([{
        cityId: 0,
        cityName: '',
        countryId: 0
    }]);

    const getAllCities = async () => {
        await axios.get(baseURL).then(response => {
            setData(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllCities();
    }, []);

    return (
        <div className="container container-data">
            <h1> Show Cities</h1>
            <hr></hr>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">City Id</th>
                        <th scope="col">City Name</th>
                        <th scope="col">Country Id</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(city => (
                        <tr key={city.cityId}>
                            <td>{city.cityId}</td>
                            <td>{city.cityName}</td>
                            <td>{city.countryId}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default ShowCity;