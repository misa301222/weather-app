import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '././search-by-city.scss';

const citiesURL = "https://localhost:5001/api/Cities";

function SearchByCity() {
    const [cities, setCities] = useState([{
        cityId: 0,
        cityName: '',
        countryId: 0
    }]);
    const [selectedCity, setSelectedCity] = useState('');

    const getAllCities = async () => {
        await axios.get(citiesURL).then(response => {
            console.log(response);
            setCities(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleOnChangeCity = (event: any) => {
        setSelectedCity(event.target.value);
    }

    useEffect(() => {
        getAllCities();
    }, [])


    return (
        <div className="container search-by-city-component container-data">

            <h1 className="header yellowish">
                <i className="fas fa-building"></i> Please select a City:
            </h1>
            <hr></hr>
            <br></br>

            <div className="searcher">
                <form className="row shadow p-3">
                    <div className="col-sm-4">
                        <label htmlFor="inputCityId" className="col col-form-label fw-bold">Search City:</label>
                    </div>
                    <div className="col-sm-6 ">
                        <input className="form-control" list="datalistOptions" id="inputCityId" placeholder="Select A City" onChange={handleOnChangeCity} />
                        <datalist id="datalistOptions">
                            <option value={0} >Open this select menu</option>
                            {
                                cities.map(city => (
                                    <option key={city.cityId} value={city.cityId}>{city.cityName}</option>
                                ))
                            }
                        </datalist>
                    </div>
                    <div className="col">
                        <Link to={{ pathname: `/city-details/${selectedCity}`, state: { SelectedCity: selectedCity } }}>
                            <button type="button" className="btn btn-light btn-outline-dark"><i className="fas fa-search"></i></button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SearchByCity;