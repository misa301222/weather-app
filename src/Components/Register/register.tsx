import { useEffect, useState } from 'react';
import '././register.scss';
import axios from 'axios';
import Swal from "sweetalert2";

const userURL = 'https://localhost:5001/api/User';

function Register() {

    const [user, setUser] = useState({
        fullName: '',
        email: '',
        password: '',
        roles: []
    });

    const [roles, setRoles] = useState([{
        roleName: '',
        isSelected: false
    }]);

    const handleOnChangeFullName = (event: any) => {
        setUser(prev => ({ ...prev, fullName: event.target.value }));
    }

    const handleOnChangeEmail = (event: any) => {
        setUser(prev => ({ ...prev, email: event.target.value }));
    }

    const handleOnChangePassword = (event: any) => {
        setUser(prev => ({ ...prev, password: event.target.value }));
    }

    const handleOnChangeCheckBox = (event: any) => {
        //console.log(event);
        //console.log('Event: ' + event.target.value);
        for (let value of roles) {
            if (value.roleName.includes(event.target.value)) {
                //console.log('found');                
                value.isSelected = !value.isSelected;
                //console.log(value.roleName + '---' + value.isSelected);
            }
        }
    }

    const handleOnSubmitForm = async (event: any) => {
        event.preventDefault();
        let selectedRoles = [];
        for (let role of roles) {
            if (role.isSelected) {
                selectedRoles.push(role.roleName);
            }
        }

        let body = {
            fullName: user.fullName,
            email: user.email,
            password: user.password,
            roles: selectedRoles
        }

        await axios.post(userURL + '/RegisterUser', body).then(response => {
            console.log(response);
            switch (response.data.responseCode) {
                case 1:
                    Swal.fire({
                        icon: 'success',
                        title: response.data.responseMessage,
                        showConfirmButton: true,
                    })
                    break;

                case 2:
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: response.data.dataSet,
                        showConfirmButton: true,
                    })
                    break;
                case 3:
                    break;
            }

        }).catch(err => {
            console.log(err);
        });
    }

    const getAllRoles = async () => {
        await axios.get(userURL + '/GetRoles').then(response => {
            console.log(response);
            let isFirstElement = true;
            for (let key in response.data.dataSet) {
                let value = response.data.dataSet[key];
                if (isFirstElement) {
                    setRoles([{ roleName: value, isSelected: false }]);
                    isFirstElement = false;
                } else {
                    setRoles(prev => [...prev, { roleName: value, isSelected: false }]);
                }
            }
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllRoles();
    }, [])

    return (
        <div className="container register-component container-data">

            <div className="card">
                <h5 className="card-header">Create an Account</h5>
                <div className="card-body">
                    <form className="" onSubmit={handleOnSubmitForm}>
                        <div className="mb-3">
                            <label htmlFor="inputFullName" className="form-label">Full Name</label>
                            <input type="text" value={user.fullName} onChange={handleOnChangeFullName} name="fullName" className="form-control" id="inputFullName" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputEmail" className="form-label">Email</label>
                            <input type="email" value={user.email} onChange={handleOnChangeEmail} name="email" className="form-control" id="inputEmail" />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="inputPassword" className="form-label">Password</label>
                            <input type="password" value={user.password} onChange={handleOnChangePassword} name="password" className="form-control" id="inputPassword" />
                        </div>

                        <div className="mb-3">
                            {roles.map((roles, index) => (
                                <div key={index} className="form-check">
                                    <input onChange={handleOnChangeCheckBox} className="form-check-input" type="checkbox" value={roles.roleName} id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        {roles.roleName}
                                    </label>
                                </div>
                            ))}

                        </div>
                        <button type="submit" className="btn btn-dark">Register</button>
                    </form>
                </div>

            </div>

        </div>
    )
}

export default Register;