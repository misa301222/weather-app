import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './search-by-country.scss';
import axios from 'axios';

const countriesURL = 'https://localhost:5001/api/Countries';
function SearchByCountry() {

    const [countries, setCountries] = useState([{
        countryId: 0,
        countryName: ''
    }]);

    const [selectedCountry, setSelectedCountry] = useState('');

    const getAllCountries = async () => {
        await axios.get(countriesURL).then(response => {
            console.log(response);
            setCountries(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleOnChangeCountry = (event: any) => {
        setSelectedCountry(event.target.value);
    }

    useEffect(() => {
        getAllCountries();
    }, []);

    return (
        <div className="container container-data search-by-country-component">

            <h1 className="header yellowish">
                <i className="fas fa-globe-americas"></i> Please select a Country:
            </h1>            
            <hr></hr>
            <br></br>

            <div className="searcher">

                <form className="row shadow p-3">
                    <div className="col-sm-4">
                        <label htmlFor="inputCityId" className="col col-form-label fw-bold">Search Country:</label>
                    </div>
                    <div className="col-sm-6 ">
                        <input className="form-control" list="datalistOptions" id="inputCityId" placeholder="Select A Country" onChange={handleOnChangeCountry} />
                        <datalist id="datalistOptions">
                            <option value={0} >Open this select menu</option>
                            {
                                countries.map((country, index) => (
                                    <option key={index} value={country.countryId}> {country.countryName} </option>
                                ))
                            }
                        </datalist>
                    </div>
                    <div className="col">
                        <Link to={{ pathname: `/country-details/${selectedCountry}`, state: { SelectedCountry: selectedCountry } }}>
                            <button type="button" className="btn btn-light btn-outline-dark"><i className="fas fa-search"></i></button>
                        </Link>
                    </div>
                </form>
            </div>

        </div>
    )

}

export default SearchByCountry;