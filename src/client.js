var hostname = 'peer.proxyrack.com'
var path = '/api/'
var token;

exports.apiurl = 'https://' +hostname + path;
exports.token = token;
exports.token = async function(args) {
    token = args;
    let url = 'balance'
    return request(url, 'POST')
    .then((response) => {
        return true;
    })
    .catch((error) => {
        console.error('\nError:\n'+ error + '\nUse client.token(\'apikey\') to set the api key.')
        return false;
    })
}
exports.getBalance = async function() {
    let url = 'balance'
    return request(url, 'POST')
    .then((response) => {
        return response.data.balance;
    })
    .catch((error) => {
        console.error('\nError:\n'+ error)
        return false;
    })
}
exports.getBandwidth = async function(options) {
    const promise = new Promise((resolve, reject) => {
        let url = 'bandwidth'
        let query = '';
        if (options.device) query = (query == '' ? '?' : query + '&') + 'device_id=' + options.device;
        if (options.start_date) query = (query == '' ? '?' : query + '&') + 'date_start=' + options.start_date;
        if (options.end_date) query = (query == '' ? '?' : query + '&') + 'date_end=' + options.end_date;
        request(url, 'POST', query)
        .then((response) => {
            return resolve({
                device: response.data.device,
                bandwidth: response.data.bandwidth,
            });
        })
        .catch((error) => {
            console.error('\nError:\n'+ error)
            return resolve(false);
        })
    })
    return await promise.then();
}
exports.addDevice = async function(options) {
    let url = 'device/add'
    if (!options.name) options.name = 'Device added via Yalu64\'s proxyrack.js'
    if (!options.id) return console.error('\nError:\nPlease enter a device id.')
    let query = `?device_id=${options.id}&device_name=${options.name}`
    return request(url, 'POST', query)
    .then((response) => {
        return response.status;
    })
    .catch((error) => {
        console.error('\nError:\n'+ error)
        return false;
    })
}
exports.removeDevice = async function(id) {
    let url = 'device/delete'
    if (!id) return console.error('\nError:\nPlease enter a device id.')
    let query = `?device_id=${id}`
    return request(url, 'POST', query)
    .then((response) => {
        return response.status;
    })
    .catch((error) => {
        console.error('\nError:\n'+ error)
        return false;
    })
}

async function request(url, method, query = '') {
    const promise = new Promise((resolve, reject) => {
        const axios = require('axios');
        const options = {
            method: method,
            url: exports.apiurl + url + query,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Api-Key': token || '',       
            },        
        }
        axios(options)
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            reject(error.response.data.error);
        })
    })
    return promise;
}