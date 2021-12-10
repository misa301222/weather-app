import { useEffect } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";

function Logout() {
    const history = useHistory();

    const clearData = () => {
        localStorage.removeItem("user");
        localStorage.removeItem('roles');
        localStorage.removeItem('theme');
        
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Logged Out Succesfully!',
            showConfirmButton: false,
            timer: 900
        }).then(function () {
            history.push('/login');
            history.go(0);
        })
    }

    useEffect(() => {
        console.log('effect');
        clearData();
    })

    return (
        null
    )
}

export default Logout;