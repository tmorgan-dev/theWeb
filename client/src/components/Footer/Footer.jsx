import React from "react";
import './style.css';

export default function Footer() {

    return (
        <footer className='text-center p-2'>
            <a className='hover:text-aqua'
                href='https://github.com/tmorgan-dev/theWeb.git'
                target='_blank'>
                    © Tim Morgan, PJ Rasmussen, Sam Evans, Brittany Brimley
            </a>
        </footer>
    )
};