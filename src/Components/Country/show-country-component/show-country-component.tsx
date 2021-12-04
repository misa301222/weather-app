import React, { Component, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './show-country.scss';
import Swal from 'sweetalert2';
import { Modal } from 'react-bootstrap';
import { useHistory } from 'react-router';

const countryURL = "https://localhost:5001/api/Countries";
const temperatureURL = "https://localhost:5001/api/Temperatures";
const citiesURL = "https://localhost:5001/api/Cities";

function ShowCountry() {
    let history = useHistory();
    const [show, setShow] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({
        countryId: 0,
        countryName: ''
    });
    const handleClose = () => setShow(false);
    const handleShow = (country: any) => {
        //console.log(country);
        setSelectedCountry(country);
        setShow(true);
    }

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const [data, setData] = useState([{
        countryId: 0,
        countryName: ''
    }]);

    const getPetition = async () => {
        await axios.get(countryURL).then(response => {
            console.log(response);
            setData(response.data);
        });
    }

    const saveCountryName = async () => {
        let id = selectedCountry.countryId;
        let body = {
            countryId: id,
            countryName: selectedCountry.countryName
        }

        await axios.put(countryURL + '/' + id, body).then(resposne => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Country edited successfully!!!',
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

    const handleOnChangeEditCountryName = (event: any) => {
        setSelectedCountry(prev => ({ ...prev, countryName: event.target.value }));
    }

    const deleteCountry = async (countryId: number) => {
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "If you delete a Country, all data(temperatures, cities) will be erased.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAll(countryId);

            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'Your imaginary file is safe :)',
                    'error'
                )
            }
        });


    }

    const deleteCountryById = async (countryId: number) => {
        await axios.delete(countryURL + '/' + countryId).then(response => {
            swalWithBootstrapButtons.fire(
                'Deleted!',
                'Everything was deleted successfully!!!.',
                'success'
            ).then(function () {
                history.go(0);
            });
        }).catch(err => {
            console.log(err);
        });
    }

    const deleteAll = async (countryId: number) => {
        await axios.get(citiesURL + '/GetAllCitiesByCountryId/' + countryId).then(response => {
            console.log(response);
            for (let i = 0; i < response.data.length; i++) {
                deleteAllTemperatures(response.data[i].cityId);
            }

            deleteCity(countryId);
        }).catch(err => {

        });

    }

    const deleteAllTemperatures = async (cityId: number) => {
        await axios.delete(temperatureURL + '/DeleteAllTemperaturesByCityId/' + cityId).then(response => {

        }).catch(err => {
            console.log(err);
        });
    }

    const deleteCity = async (countryId: number) => {
        await axios.delete(citiesURL + '/DeleteAllCitiesByCountryId/' + countryId).then(response => {
            deleteCountryById(countryId);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getPetition();
    }, []);


    return (
        <div className="container container-data show-country-component">
            <h1> All Countries </h1>
            <hr></hr>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col"># Id</th>
                        <th scope="col">Country Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((country, index) => (
                        <tr key={country.countryId}>
                            <td>{country.countryId}</td>
                            <td>{country.countryName}</td>
                            <td className="d-flex justify-content-evenly">
                                <button type="button" className="btn btn-warning btn-sm" onClick={() => handleShow(country)}><i className="fas fa-edit"></i></button>
                                <button type="button" className="btn btn-danger btn-sm" onClick={async () => deleteCountry(country.countryId)}><i className="fas fa-eraser"></i></button>
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
                    <Modal.Title>Country <i className="fas fa-flag"></i></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="card shadow">
                        <div className="card-body">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label">Country Name: </label>
                                <input type="text" className="form-control" onChange={handleOnChangeEditCountryName} value={selectedCountry.countryName} />
                            </div>
                        </div>
                    </div>
                    <br></br>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={async () => saveCountryName()} className="btn btn-success btn-sm">Accept</button>
                    <button onClick={handleClose} className="btn btn-danger btn-sm">Cancel</button>
                </Modal.Footer>
            </Modal>

        </div>
    );

}

export default ShowCountry;