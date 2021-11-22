import React, { Component, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import './show-country.scss';

const baseUrl = "https://localhost:5001/api/Countries";

function ShowCountry() {

    const [data, setData] = useState([{
        countryId: 0,
        countryName: ''
    }]);

    const getPetition = async () => {
        await axios.get(baseUrl).then(response => {
            console.log(response);
            setData(response.data);
        });
    }

    useEffect(() => {
        getPetition();
    }, []);


    return (
        <div className="container">
            <h1> All Countries </h1>
            <hr></hr>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Row</th>
                        <th scope="col"># Id</th>
                        <th scope="col">Country Name</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((country, index) => (
                        <tr key={country.countryId}>
                            <th scope="row">{index + 1}</th>
                            <td>{country.countryId}</td>
                            <td>{country.countryName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {
                /*
            {data.map(country => (
                <h3 key={country.countryId}> {country.countryName} </h3>
            ))}
        */
            }
        </div >
    );

}

export default ShowCountry;