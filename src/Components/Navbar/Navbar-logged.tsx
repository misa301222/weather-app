import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import "././Navbar-logged.scss";

function NavbarLogged() {

  const [user, setUser] = useState<any | null>(null);
  const [roles, setRoles] = useState<any | null>(null);

  const getUser = () => {
    setUser(authService.getCurrentUser);
  }

  useEffect(() => {
    getUser();
    getRoles();
  }, [user])


  const getRoles = () => {
    setRoles(authService.getRoles);
  }

  return (
    <div className="container-fluid navbar-logged">
      <Link className="navbar-brand" to="/">WeatherApp <i className="fas fa-cloud"></i></Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav static">
          <li className="nav-item li-element">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
        </ul>
        <ul className="navbar-nav">

          <li className="nav-item li-element">
            <Link className="nav-link active" aria-current="page" to="/search-by-city">Search By City</Link>
          </li>

          {!user ?
            <div className="d-flex justify-content-start">
              <li className="nav-item li-element">
                <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
              </li>

              <li className="nav-item li-element">
                <Link className="nav-link active" aria-current="page" to="/register">Register</Link>
              </li>
            </div>
            : null
          }
          {user ?

            <li className="nav-item dropdown dropdown-element li-element">

              <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
              </a>

              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/profile"><i className="fas fa-id-card"></i> Profile</Link></li>
                {roles.includes('ADMINISTRATOR') ?
                  <div className="admin-menu">
                    <li><Link className="dropdown-item" to="/admin-tools"><i className="fas fa-toolbox"></i> Admin Tools</Link></li>
                    <li><Link className="dropdown-item" to="/user-managment"><i className="fas fa-tasks"></i> User Managment</Link></li>
                  </div>
                  : null
                }
                <li><hr className="dropdown-diviier"></hr></li>
                <li><Link className="dropdown-item" to="/logout"><i className="fa fa-door-open"></i> Logout</Link></li>
              </ul>

            </li> : null
          }
        </ul>
        {
          user ?
            <ul className="navbar-nav right-navbar">
              <li className="nav-item text-white li-element"><Link to="/profile" className="text-decoration-none"> Current Logged in as: {user}</Link></li>
            </ul> : null
        }
      </div>
    </div>


  )
}

export default NavbarLogged;