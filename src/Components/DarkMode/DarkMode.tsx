import { useHistory } from "react-router"
import "././DarkMode.scss"
import axios from 'axios';
import Swal from "sweetalert2";

const userURL = "https://localhost:5001/api/User";
const DarkMode = () => {
    const history = useHistory();

    const changeThemeByEmail = async (themeName: string) => {
        const user = localStorage.getItem('user');
        let themeId;
        if (themeName === 'light') {
            themeId = 0;
        } else {
            themeId = 1;
        }
        let body = {
            Email: user,
            DefaultTheme: themeId
        }

        await axios.post(userURL + '/UpdateDefaultTheme', body).then(response => {
            console.log(response);
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: response.data.responseMessage,
                showConfirmButton: false,
                timer: 1100
            }).then(function () {
                history.go(0);
            })
        }).catch(err => {
            console.log(err);
        });
    }

    let clickedClass = "clicked"
    const lightTheme = "light"
    const darkTheme = "dark"
    let theme: any;

    if (localStorage) {
        theme = localStorage.getItem("theme");
    }

    const switchTheme = (e: any) => {
        if (theme === darkTheme) {
            e.target.classList.remove(clickedClass);
            localStorage.setItem("theme", "light");
            theme = lightTheme;
            changeThemeByEmail(theme);
        } else {
            e.target.classList.add(clickedClass);
            localStorage.setItem("theme", "dark");
            theme = darkTheme;
            changeThemeByEmail(theme);
        }
    }

    return (
        <button
            className={theme === "dark" ? clickedClass : ""}
            id="darkMode"
            onClick={e => switchTheme(e)}
        ></button>
    )
}

export default DarkMode;