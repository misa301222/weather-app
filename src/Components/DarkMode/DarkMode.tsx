import React from "react"
import { useHistory } from "react-router"
import "././DarkMode.scss"

const DarkMode = () => {
    const history = useHistory();

    let clickedClass = "clicked"
    //const body = document.body;
    //const colorApp = document.getElementsByClassName('App');
    const lightTheme = "light"
    const darkTheme = "dark"
    let theme: any;

    if (localStorage) {
        theme = localStorage.getItem("theme");
    }

    //theme = "darkTheme";

    if (theme === lightTheme || theme === darkTheme) {
        //body.classList.add(theme)
    } else {
        //body.classList.add(lightTheme)
    }

    const switchTheme = (e: any) => {
        console.log('click');
        if (theme === darkTheme) {
            console.log('switch if ' + theme);
            //body.classList.replace(darkTheme, lightTheme)
            e.target.classList.remove(clickedClass)
            //e.target.classList.add('nope');
            localStorage.setItem("theme", "light")
            theme = lightTheme
        } else {
            console.log('switch else ' + theme);
            //body.classList.replace(lightTheme, darkTheme)
            e.target.classList.add(clickedClass)
            localStorage.setItem("theme", "dark")
            theme = darkTheme
        }

        history.go(0);
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