import '././login.scss';
import AuthService from "../../services/auth.service";
import { useRef } from 'react';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';

function Login() {
    const nameForm = useRef(null as any)
    const history = useHistory();

    const handleSubmitEvent = (event: any) => {
        event.preventDefault();
        console.log(event);
        const form = nameForm.current;
        if (form != null) {
            const email = `${form['email'].value}`;
            const password = `${form['password'].value}`;


            AuthService.login(email, password).then(
                (response => {
                    console.log('del (): ' + response);
                    switch (response.data.responseCode) {
                        case 1:
                            Swal.fire({
                                position: 'top-end',
                                icon: 'success',
                                title: 'Logged In Succesfully! [' + response.data.dataSet.email + ']',
                                showConfirmButton: false,
                                timer: 1100
                            }).then(function () {
                                history.push('/');
                                history.go(0);
                            })
                            break;
                        case 2:
                            console.log('Incorrect!!');
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: response.data.responseMessage
                            });
                            break;
                        case 3:
                            break;

                        default:
                            break;
                    }

                }),
                error => {
                    console.log(error);
                }
            );
        }
    }

    return (
        <div className="login container-data">
            <div className="card shadow">
                <div className="card-header">
                    <h4 className="fst-italic">Login here</h4>
                </div>
                <div className="card-body">
                    <form ref={nameForm} onSubmit={handleSubmitEvent}>
                        <div className="container">
                            <div className="mb-3 row">
                                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input type="text" required name="email" className="form-control" id="staticEmail" />
                                </div>
                            </div>
                            <div className="mb-3 row">
                                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input type="password" required name="password" className="form-control" id="inputPassword" />
                                </div>
                            </div>
                            <br></br>
                            <div className="mb-3 row">
                                <button type="submit" className="btn btn-dark">Login</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}

export default Login;