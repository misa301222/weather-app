import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from 'axios';

const countriesURL = "https://localhost:5001/api/Countries";
const baseUrl = "https://localhost:5001/api/Cities";

function AddCity() {
    const [country, setCountry] = useState([{
        countryId: 0,
        countryName: ''
    }]);
    const [city, setCity] = useState({
        CityName: '',
        CountryId: 0
    })

    const getAllCountries = async () => {
        await axios.get(countriesURL).then(response => {
            setCountry(response.data);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getAllCountries();
    }, []);

    const handleSubmitEvent = async (event: any) => {
        event.preventDefault();
        let body = {
            CityName: city.CityName,
            CountryId: city.CountryId
        }
        await axios.post(baseUrl, body).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'City Added Succesfully!',
            showConfirmButton: false,
            timer: 1100
        }).then(function () {
            setCity(prev => ({ ...prev, CityName: '' }));
        })

    }

    const onChangeCityName = (event: any) => {
        event.preventDefault();
        setCity(prev => ({ ...prev, CityName: event.target.value }));
    }

    const onChangeCountryId = (event: any) => {
        event.preventDefault();
        setCity(prev => ({ ...prev, CountryId: event.target.value }));
    }

    return (
        <div className="container">
            <h1>Add City</h1>
            <hr></hr>

            <div className="card">
                <div className="card-header">
                    Add New City
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmitEvent}>
                        <div className="mb-3">
                            <label htmlFor="inputCityName" className="form-label">City Name</label>
                            <input value={city.CityName} onChange={onChangeCityName} name="CityName" className="form-control" id="inputCityName" />
                        </div>

                        <select className="form-select" aria-label="Default select example" onChange={onChangeCountryId} name="CountryId">
                            <option value={0}>Open this select menu</option>
                            {
                                country.map(country => (
                                    <option key={country.countryId} value={country.countryId}> {country.countryName} </option>
                                ))
                            }
                        </select>

                        <div className="mb-3 text-center">
                            <button className="btn btn-success" disabled={!city.CityName || city.CountryId === 0}>Save</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AddCity;