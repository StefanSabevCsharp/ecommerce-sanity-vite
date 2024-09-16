require('dotenv').config();
const express = require("express");
const cors = require("cors");
const YOUR_DOMAIN = process.env.CLIENT_URL;

const corsOptions = {
    origin: YOUR_DOMAIN,
    credentials: true,
};


function expressConfing(app){
    app.use(express.static('public'));
    app.use(cors(corsOptions));
    app.use(express.json());
    
}

module.exports = {expressConfing};