import { useEffect, useState } from "react";
import axios from 'axios';
import './show-city-component.scss';
import { Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { useHistory } from "react-router";

const baseURL = "https://localhost:5001/api/Cities";
const countryURL = "https://localhost:5001/api/Countries";

function ShowCity() {
    let history = useHistory();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (selectedCity: any) => {
        setSelectedCity(selectedCity);
        setShow(true);
    }

    const [countryList, setCountryList] = useState([{
        countryId: 0,
        countryName: ''
    }]);

    const [data, setData] = useState([{
        cityId: 0,
        cityName: '',
        countryId: 0
    }]);

    const [selectedCity, setSelectedCity] = useState({
        cityId: 0,
        cityName: '',
        countryId: 0
    });

    const getAllCities = async () => {
        await axios.get(baseURL).then(response => {
            setData(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleOnChangeCityName = (event: any) => {
        setSelectedCity(prev => ({ ...prev, cityName: event.target.value }));
    }

    const handleOnChangeCountryName = (event: any) => {
        setSelectedCity(prev => ({ ...prev, countryId: event.target.value }));
    }

    const getAllCountries = async () => {
        await axios.get(countryURL).then(response => {
            setCountryList(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const editSelectedCity = async () => {
        let id = selectedCity.cityId;
        let body = {
            cityId: id,
            cityName: selectedCity.cityName,
            countryId: selectedCity.countryId
        }
        await axios.put(baseURL + '/' + id, body).then(response => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'City edited successfully!!!',
                showConfirmButton: false,
                timer: 1100
            }).then(function () {
                setShow(false);
                history.go(0);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllCities();
        getAllCountries();
    }, []);

    return (
        <div className="container container-data show-city-component">
            <h1> Show Cities</h1>
            <hr></hr>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">City Id</th>
                        <th scope="col">City Name</th>
                        <th scope="col">Country Id</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(city => (
                        <tr key={city.cityId}>
                            <td>{city.cityId}</td>
                            <td>{city.cityName}</td>
                            <td>{city.countryId}</td>
                            <td className="d-flex justify-content-evenly">
                                <button type="button" onClick={() => handleShow(city)} className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></button>
                                <button type="button" className="btn btn-danger btn-sm"><i className="fas fa-eraser"></i></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>City <i className="fas fa-building"></i></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">City Name: </label>
                                <input type="text" onChange={handleOnChangeCityName} className="form-control" value={selectedCity.cityName} />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Country: </label>
                                <select className="form-select" aria-label="Default select example" onChange={handleOnChangeCountryName} value={selectedCity.countryId} name="countryId">
                                    <option value={0}>Open this select menu</option>
                                    {
                                        countryList.map(country => (
                                            <option key={country.countryId} value={country.countryId}> {country.countryName} </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <br></br>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={editSelectedCity} className="btn btn-success btn-sm">Accept</button>
                    <button onClick={handleClose} className="btn btn-danger btn-sm">Cancel</button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

export default ShowCity;