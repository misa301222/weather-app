import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import './country-details.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';


interface CustomState {
    SelectedCountry: 0
}

const citiesURL = "https://localhost:5001/api/Cities";
const countriesURL = "https://localhost:5001/api/Countries";

function CountryDetails() {

    const { state } = useLocation<CustomState>();
    const [cities, setCities] = useState([{
        cityId: 0,
        cityName: '',
        countryId: 0
    }]);

    const [country, setCountry] = useState({
        countryId: 0,
        countryName: ''
    });

    const getAllCitiesByCountryId = async (countryId: number) => {
        await axios.get(citiesURL + '/GetAllCitiesByCountryId/' + countryId).then(response => {
            setCities(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const getCountryById = async (countryId: number) => {
        await axios.get(countriesURL + '/' + countryId).then(response => {
            setCountry(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllCitiesByCountryId(state.SelectedCountry);
        getCountryById(state.SelectedCountry);
    }, [])

    return (
        <div className="container container-data country-details-component">
            <div className="header">
                <h2 className="fw-bold pink-color"><i className="fas fa-city"></i> Cities of {country.countryName} </h2>
                <hr></hr>
                <br></br>
            </div>

            <div className="container-cities d-flex align-items-center flex-column">
                {cities.length ?
                    cities.map((city, index) => (
                        <div className="card text-center mb-5 w-50" key={index}>
                            <div className="card-header">
                                <h6 className="fw-bold yellowish">{city.cityName}</h6>
                            </div>
                            <div className="card-body">
                                <Link to={{ pathname: `/city-details/${city.cityId}`, state: { SelectedCity: city.cityId } }}>
                                    <button className="btn btn-dark btn-outline-light">See details</button>
                                </Link>
                            </div>
                            <div className="card-footer text-muted">
                                Id: {city.cityId}
                            </div>
                        </div>
                    ))
                    :
                    <div className="error-div">
                        <h1 className="text-danger"> Whops! It seems there's not data avilable. Please contact support!</h1>
                        <br></br>
                        <br></br>
                        <img src="/images/Error.png" className="error-image" />
                    </div>
                }
            </div>
        </div>
    )
}

export default CountryDetails;