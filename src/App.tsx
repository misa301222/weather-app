import './App.scss';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, useLocation } from "react-router-dom";
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
import React from 'react';
import SearchByCountry from './Components/Search-by-country/search-by-country';
import CountryDetails from './Components/Country-details/country-details';
import AddTemperatureNotification from './Components/TemperatureNotification/add-temperatureNotification-component/add-temperatureNotification';
import ShowTemperatureNotification from './Components/TemperatureNotification/show-temperatureNotification-component/show-temperatureNotification';
import AboutThisApp from './Components/About-this-app/about-this-app';
import Chart from './Components/Chart/chart';
import News from './Components/News/news';
import AddNews from './Components/Add-news/add-news';
import NewsDetails from './Components/News-details/news-details';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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

  const location = useLocation();
  const nodeRef = React.useRef(null);
  const nodeRef2 = React.useRef(null);

  useEffect(() => {
    console.log('use');
    getTheme();
  }, [currentTheme])

  return (
    // <div className="App">
    <div className={currentTheme === "dark" ? 'App-dark' : 'App'}>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-logged">
        <NavbarLogged />
      </nav>
      <ScrollToTop />

      <TransitionGroup>
        <CSSTransition
          key={location.pathname}
          classNames="fade"
          timeout={400}
          nodeRef={nodeRef}
        >
          <Switch location={location}>
            <Route exact path="/" component={Home}><div ref={nodeRef}><Home /><Footer /></div></Route>
            <Route path="/add-country" component={AddCountry}><div ref={nodeRef}><AddCountry /><Footer /></div></Route>
            <Route path="/show-country" component={ShowCountry}><div ref={nodeRef}><ShowCountry /><Footer /></div></Route>
            <Route path="/add-city" component={AddCity}><div ref={nodeRef}><AddCity /><Footer /></div></Route>
            <Route path="/show-city" component={ShowCity}><div ref={nodeRef}><ShowCity /><Footer /></div></Route>
            <Route path="/login" component={Login}><div ref={nodeRef}><Login /><Footer /></div></Route>
            <Route path="/add-temperature" component={AddTemperature}><div ref={nodeRef}><AddTemperature /><Footer /></div></Route>
            <Route path="/show-temperature" component={ShowTemperature}><div ref={nodeRef}><ShowTemperature /><Footer /></div></Route>
            <Route path="/add-temperatureNotification" component={AddTemperatureNotification}><div ref={nodeRef}><AddTemperatureNotification /><Footer /></div></Route>
            <Route path="/show-temperatureNotification" component={ShowTemperatureNotification}><div ref={nodeRef}><ShowTemperatureNotification /><Footer /></div></Route>
            <Route path="/admin-tools" component={AdminTools}><div ref={nodeRef}><AdminTools /><Footer /></div></Route>
            <Route path="/profile" component={Profile} ><div ref={nodeRef}><Profile /><Footer /></div></Route>
            <Route path="/search-by-country" component={SearchByCountry}><div ref={nodeRef}><SearchByCountry /><Footer /></div></Route>
            <Route path="/search-by-city" component={SearchByCity}><div ref={nodeRef}><SearchByCity /><Footer /></div></Route>
            <Route path="/country-details/:cityId" component={CountryDetails}><div ref={nodeRef}><CountryDetails /><Footer /></div></Route>
            <Route path="/city-details/:cityId" component={CityDetails}><div ref={nodeRef}><CityDetails /><Footer /></div></Route>
            <Route path="/weather-details/:cityId/:dateTemp" component={WeatherDetails}><div ref={nodeRef}><WeatherDetails /><Footer /></div></Route>
            <Route path="/news-details/:newsId" component={NewsDetails}><div ref={nodeRef}><NewsDetails /><Footer /></div></Route>
            <Route path="/about-us" component={AboutUs}><div ref={nodeRef}><AboutUs /><Footer /></div></Route>
            <Route path="/about-this-app" component={AboutThisApp}><div ref={nodeRef}><AboutThisApp /><Footer /></div></Route>
            <Route path="/user-managment" component={UserManagment}><div ref={nodeRef}><UserManagment /><Footer /></div></Route>
            <Route path="/register" component={Register}><div ref={nodeRef}><Register /><Footer /></div></Route>
            <Route path="/job-applications" component={JobApplications}><div ref={nodeRef}><JobApplications /><Footer /></div></Route>
            <Route path="/send-job-application" component={SendJobApplication}><div ref={nodeRef}><SendJobApplication /><Footer /></div></Route>
            <Route path="/chart" component={Chart}><div ref={nodeRef}><Chart /><Footer /></div></Route>
            <Route path="/news" component={News}><div ref={nodeRef}><News /><Footer /></div></Route>
            <Route path="/add-news" component={AddNews}><div ref={nodeRef}><AddNews /><Footer /></div></Route>
            <Route path="/logout" component={logout}></Route>
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}


export default App;

