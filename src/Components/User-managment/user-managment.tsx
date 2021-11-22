import '././user-managment.scss'
import axios from 'axios';
import { useEffect, useState } from 'react';

const userURL = 'https://localhost:5001/api/User';

function UserManagment() {

    const [users, setUsers] = useState([{
        fullName: '',
        email: '',
        userName: '',
        dateCreated: Date(),
        roles: ''
    }]);

    const getAllUsers = async () => {
        const token = localStorage.getItem('token') || '{}';
        await axios.get(userURL + '/GetAllUsers', {
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + token,
            }
        }).then(response => {
            console.log(response);
            setUsers(response.data.dataSet);
        }).catch(err => {
            console.log(err);
        });
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <div className="container user-managment">
            <br></br>
            <h3>User Managment <i className="fas fa-users"></i></h3>
            <hr></hr>
            <div className="user-info">
                <table className="table table-bordered table-light table-users">
                    <thead>
                        <tr>
                            <th scope="col">Email</th>
                            <th scope="col">FullName</th>
                            <th scope="col">UserName</th>
                            <th scope="col">Date Created</th>
                            <th scope="col">Roles</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td> {user.email} </td>
                                <td> {user.fullName} </td>
                                <td> {user.userName} </td>
                                <td> {user.dateCreated} </td>
                                <td> {user.roles} </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
    )
}

export default UserManagment;