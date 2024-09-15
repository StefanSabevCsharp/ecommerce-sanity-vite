
const express = require("express");
const cors = require("cors");

function expressConfing(app){
    app.use(express.static('public'));
    app.use(cors());
    app.use(express.json());
    
}

module.exports = {expressConfing};