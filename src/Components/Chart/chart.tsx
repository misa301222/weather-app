import { useEffect, useState } from 'react';
import './chart.scss';
import axios from 'axios';
import YearPicker from '../Year-Picker/year-picker';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';

const citiesURL = "https://localhost:5001/api/Cities";
const temperatureURL = "https://localhost:5001/api/Temperatures";

function Chart() {
    const [cities, setCities] = useState([{
        cityId: 0,
        cityName: '',
        countryId: 0
    }]);

    const [selectedCity, setSelectedCity] = useState(0);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [startDate, setStartDate] = useState<any | null>(new Date());
    const [monthData, setMonthData] = useState([{
        month: '',
        average: 0.0
    }]);

    const getAllCitites = async () => {
        await axios.get(citiesURL).then(response => {
            setCities(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    const handleOnChangeDate = (date: any) => {
        setSelectedDate(date);
    }

    const handleOnChangeCity = (event: any) => {
        setSelectedCity(event.target.value);
    }

    const getCityByCityId = (cityId: number) => {
        for (let i = 0; i < cities.length; i++) {
            if (cities[i].cityId === cityId) {
                console.log('return');
                return cities[i].cityName;
            }
        }
    }

    const handleOnSubmitSearch = async (event: any) => {
        event.preventDefault();
        let cityId = selectedCity;
        let dateTemperature = moment(selectedDate).format('YYYY');

        await axios.get(temperatureURL + '/GetTemperatureMonthAverageYearByCityIdAndYear/' + cityId + '/' + dateTemperature).then(response => {
            console.log(response);
            setMonthData(response.data);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllCitites();
    }, [])

    return (
        <div className="container container-data chart-component">
            <div className="container">

                <div className="header">
                    <h2 className="yellowish fw-bold">Historic Weather</h2>
                    <hr></hr>
                </div>

                <div className="searcher">
                    <form onSubmit={handleOnSubmitSearch}>
                        <div className="card">
                            <div className="card-body">
                                <div className="row mb-2">
                                    <div className="col d-flex align-items-evenly">
                                        <label htmlFor="inputCity" className="col-sm-3 col-form-label fw-bold purple"><u>City</u></label>
                                        <div className="col-sm-7">
                                            <input type="text" className="form-control" id="inputCity" list="datalistOptions" onChange={handleOnChangeCity} />
                                            <datalist id="datalistOptions">
                                                <option value={0}>Select a City</option>
                                                {
                                                    cities.map((city, index) => (
                                                        <option key={index} value={city.cityId}>{city.cityName}</option>
                                                    ))
                                                }
                                            </datalist>
                                        </div>
                                    </div>

                                    <div className="col d-flex align-items-evenly">
                                        <label htmlFor="inputDate" className="col-sm-3 col-form-label fw-bold purple"><u>Date</u></label>
                                        <div className="col-sm-7">
                                            <YearPicker onChange={handleOnChangeDate} />
                                        </div>
                                    </div>
                                </div>

                                <div className="row text-center">
                                    <div className="col">
                                        <button type="submit" className="btn btn-light btn-outline-dark"><i className="fas fa-search"></i> Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <br></br>
                <br></br>
                <br></br>

                {monthData.length > 1 ?
                    <div className="header">
                        <h2 className="yellowish fw-bold">Chart</h2>
                        <hr></hr>
                    </div> : null
                }

                <div className="container chart-data">
                    {monthData.length > 1 ?
                        <LineChart width={1200} height={750} data={monthData} className="chart">
                            <CartesianGrid strokeDasharray="3 3 3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Line type="monotone" dataKey="averageMax" name="Avg. MaxTemperature" stroke="#ca828b" activeDot={{ r: 5 }} />
                            <Line type="monotone" dataKey="averageMin" name="Avg. MinTemperature" stroke="#ca9d82" activeDot={{ r: 5 }} />
                            <Line type="monotone" dataKey="averagePrecipitation" name="Avg. Precipitation" stroke="#82afca" activeDot={{ r: 5 }} />
                            <Line type="monotone" dataKey="averageWind" name="Avg. Wind" stroke="#82ca9d" activeDot={{ r: 5 }} />

                            <Tooltip />
                            <Legend />
                        </LineChart> : null
                    }
                </div>

            </div>
        </div >
    )
}

export default Chart;