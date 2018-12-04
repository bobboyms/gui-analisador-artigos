import React from 'react';
import App from './app';
import ReactDOM from 'react-dom';
import axios from 'axios';


import './index.css';

var modal = document.getElementById('myModal');

function showModalLoading(valor) {   
   
    modal.style.display = "block";

    if (valor === true) {
        modal.style.display = "block";
   } else {
        modal.style.display = "none";
    }
    
    
}

axios.interceptors.request.use(function (config) {
    //showModalLoading(true);
    return config;
}, function (error) {
    //showModalLoading(false);
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    //showModalLoading(false);
    return response;
}, function (error) {
    //showModalLoading(false);
    return Promise.reject(error);
});

ReactDOM.render(
    <App />,
    document.getElementById("root")
);