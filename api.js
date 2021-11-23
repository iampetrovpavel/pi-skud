const axios = require('axios')
const {server} = require('./constants')

module.exports = api = function api(method, link, payload){
    axios[method](server+link, {payload})
        .then(res => {
            console.log("Server return: OK");
        })
        .catch(error => {
            console.log("Server error! ", error.message);
        });
}