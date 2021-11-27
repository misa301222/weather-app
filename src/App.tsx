import './App.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from "react-router-dom";
import Home from './Components/Home/home';
import Login from './Components/Login/login';
import authService from './services/auth.service';
import AdminTools from './Components/Admin-tools/admin-tools';
import NavbarLogged from './Components/Navbar/Navbar-logged';
import ShowCountry from './Components/Country/show-country-component/show-country-component';
import AddCountry from './Components/Country/add-country-component/add-country-component';
import Profile from './Components/Profile/profile';
import AddCity from './Components/City/add-city-component/add-city-component';
import ShowCity from './Components/City/show-city-component/show-city.component';
import AddTemperature from './Components/Temperature/add-temperature-component/add-temperature';
import ShowTemperature from './Components/Temperature/show-temperature-component/show-temperature';
import Footer from './Components/Footer/footer';
import WeatherDetails from './Components/Weather-details/weather-details';
import CityDetails from './Components/City-details/city-details';
import SearchByCity from './Components/Search-by-city/search-by-city';
import AboutUs from './Components/About-us/about-us';
import UserManagment from './Components/User-managment/user-managment';
import Register from './Components/Register/register';
import JobApplications from './Components/Job-applications/job-applications';
import SendJobApplication from './Components/Send-job-application/send-job-application';
import ScrollToTop from './Components/ScrollToTop/ScrollToTop';
import { useEffect, useState } from 'react';

function App() {

  const [currentTheme, setCurrentTheme] = useState<any | null>('');

  const logout = () => {
    return authService.clearData();
  }

  const getTheme = () => {
    console.log('store: ' + localStorage.getItem("theme"));
    setCurrentTheme(localStorage.getItem("theme"));
    //return localStorage.getItem("theme");
  }

  useEffect(() => {
    console.log('use');
    getTheme();
  }, [currentTheme])

  return (
    // <div className="App">
    <div className={currentTheme === "dark" ? 'App-dark' : 'App'}>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-logged shadow">
        <NavbarLogged />
      </nav>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/add-country" component={AddCountry}></Route>
        <Route path="/show-country" component={ShowCountry}></Route>
        <Route path="/add-city" component={AddCity}></Route>
        <Route path="/show-city" component={ShowCity}></Route>
        <Route path="/login" component={Login} />
        <Route path="/add-temperature" component={AddTemperature} />
        <Route path="/show-temperature" component={ShowTemperature} />
        <Route path="/admin-tools" component={AdminTools} />
        <Route path="/profile" component={Profile} />
        <Route path="/search-by-city" component={SearchByCity} />
        <Route path="/city-details/:cityId" component={CityDetails} />
        <Route path="/weather-details/:cityId/:dateTemp" component={WeatherDetails} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/user-managment" component={UserManagment} />
        <Route path="/register" component={Register} />
        <Route path="/job-applications" component={JobApplications} />
        <Route path="/send-job-application" component={SendJobApplication} />
        <Route path="/logout" component={logout} />
      </Switch>
      <Footer />
    </div>
  );
}


export default App;

