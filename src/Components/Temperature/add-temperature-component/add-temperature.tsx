import { useEffect, useState } from "react";
import '././add-temperature.scss';
import axios from 'axios';
import Swal from "sweetalert2";

const cityURL = "https://localhost:5001/api/Cities";
const temperatureURL = "https://localhost:5001/api/Temperatures";
const descriptionTemperatureURL = "https://localhost:5001/api/DescriptionTemperatures";

function AddTemperature() {

    const [cities, setCities] = useState([{
        cityId: 0,
        cityName: '',
        countryId: 0
    }]);
    const [descriptions, setDescriptions] = useState([{
        descriptionTemperatureId: 0,
        descriptionTemperatureDescription: ''
    }]);
    const [temperature, setTemperature] = useState({
        CityId: 0,
        DateTemperature: '',
        MinTemperature: 0,
        MaxTemperature: 0,
        DescriptionTemperature: 0,
        WindTemperature: 0,
        PrecipitationTemperature: 0
    });

    const handleSubmitEvent = async (event: any) => {
        event.preventDefault();
        const body = {
            CityId: temperature.CityId,
            DateTemperature: temperature.DateTemperature,
            MinTemperature: temperature.MinTemperature,
            MaxTemperature: temperature.MaxTemperature,
            DescriptionTemperature: temperature.DescriptionTemperature,
            WindTemperature: temperature.WindTemperature,
            PrecipitationTemperature: temperature.PrecipitationTemperature
        }

        await axios.post(temperatureURL, body).then(response => {
            console.log(response);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Temperature Added Succesfully!',
                showConfirmButton: false,
                timer: 1100
            })
        }).catch(err => {
            console.log(err);
        });
    }

    const onChangeCityId = (event: any) => {
        event.preventDefault();
        setTemperature(prev => ({ ...prev, CityId: event.target.value }));
    }

    const onChangeDateTemperature = (event: any) => {
        event.preventDefault();
        setTemperature(prev => ({ ...prev, DateTemperature: event.target.value }));
    }

    const onChangeMinTemperature = (event: any) => {
        event.preventDefault();
        setTemperature(prev => ({ ...prev, MinTemperature: event.target.value }));
    }

    const onChangeMaxTemperature = (event: any) => {
        event.preventDefault();
        setTemperature(prev => ({ ...prev, MaxTemperature: event.target.value }));
    }

    const onChangeDescriptionTemperature = (event: any) => {
        event.preventDefault();
        setTemperature(prev => ({ ...prev, DescriptionTemperature: event.target.value }));
    }

    const onChangeWindTemperature = (event: any) => {
        event.preventDefault();
        setTemperature(prev => ({ ...prev, WindTemperature: event.target.value }));
    }

    const onChangePrecipitationTemperature = (event: any) => {
        event.preventDefault();
        setTemperature(prev => ({ ...prev, PrecipitationTemperature: event.target.value }));
    }

    const getAllCities = async () => {
        await axios.get(cityURL).then(response => {
            console.log(response);
            setCities(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const getAllDescriptions = async () => {
        await axios.get(descriptionTemperatureURL).then(response => {
            console.log(response);
            setDescriptions(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllCities();
        getAllDescriptions();
    }, [])

    return (
        <div className="container add-temperature">
            <div className="card">
                <div className="card-header">
                    Add Temperature
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmitEvent}>
                        <div className="mb-3">
                            <label htmlFor="inputCityId" className="form-label">City Id</label>
                            <select className="form-select" value={temperature.CityId} onChange={onChangeCityId} aria-label="Default select example" name="CountryId">
                                <option value={0}>Open this select menu</option>
                                {
                                    cities.map(city => (
                                        <option key={city.cityId} value={city.cityId}> {city.cityName} </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputDateTemperature" className="form-label">Date</label>
                            <input type="date" value={temperature.DateTemperature} onChange={onChangeDateTemperature} name="DateTemperature" className="form-control" id="inputDateTemperature" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputMinTemperature" className="form-label">Temperature Min</label>
                            <input type="number" value={temperature.MinTemperature} onChange={onChangeMinTemperature} name="TemperatureMin" className="form-control" id="inputTemperatureMin" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputMaxTemperature" className="form-label">Temperature Max</label>
                            <input type="number" value={temperature.MaxTemperature} onChange={onChangeMaxTemperature} name="TemperatureMax" className="form-control" id="inputTemperatureMax" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputDescriptionTemperature" className="form-label">Description Temperature</label>
                            <select value={temperature.DescriptionTemperature} onChange={onChangeDescriptionTemperature} name="DescriptionTemperature" className="form-select" id="inputDescriptionTemperature">
                                <option value={0}>Open this select menu</option>
                                {
                                    descriptions.map(desc => (
                                        <option key={desc.descriptionTemperatureId} value={desc.descriptionTemperatureId}>{desc.descriptionTemperatureDescription}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputWindTemperature" className="form-label">Wind</label>
                            <input value={temperature.WindTemperature} onChange={onChangeWindTemperature} type="number" name="WindTemperature" className="form-control" id="inputWindTemperature" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputPrecipitationTemperature" className="form-label">Precipitation</label>
                            <input value={temperature.PrecipitationTemperature} onChange={onChangePrecipitationTemperature} type="number" name="PrecipitationTemperature" className="form-control" id="inputPrecipitationTemperature" />
                        </div>

                        <div className="mb-3 text-center">
                            <button type="submit" className="btn btn-success">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>)

}

export default AddTemperature;