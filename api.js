const axios = require('axios')
const {server} = require('./constants')
var colors = require('colors');

module.exports = api = function api(method, link, payload){
    axios[method](server+link, {payload})
        .then(res => {
            console.log("Server return: OK".rainbow);
        })
        .catch(error => {
            console.log("Server error! ", error.message);
        });
}