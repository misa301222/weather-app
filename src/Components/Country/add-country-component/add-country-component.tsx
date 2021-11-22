import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import './add-country-component.scss';

const baseUrl = "https://localhost:5001/api/Countries";

function AddCountry() {
    const axios = require('axios').default;

    const [country, setCountry] = useState({
        countryName: ''
    });

    const handleSubmitEvent = async (event: any) => {
        event.preventDefault();

        const body = {
            CountryName: country.countryName
        }
                
        try {
            const resp = await axios.post(baseUrl, body);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Country Added Succesfully!',
                showConfirmButton: false,
                timer: 1100
            }).then(function () {
                setCountry({ countryName: '' });
            })
            console.log(resp);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container text-start">
            <div className="card">
                <div className="card-header">
                    Add New Country
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmitEvent}>
                        <div className="mb-3">
                            <label htmlFor="inputCountryName" className="form-label">Country Name </label>
                            <input value={country.countryName} onChange={e => setCountry({ countryName: e.target.value })} type="text" name="countryName" className="form-control" id="inputCountryName" />
                        </div>
                        <div className="mb-3 text-center">
                            <button className="btn btn-success" disabled={!country.countryName}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCountry;