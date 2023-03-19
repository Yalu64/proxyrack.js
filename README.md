
# proxyrack.js


[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

ProxyRack.js allows you to easily interact with the ProxyRack peer api.






## Installation

    1. Install node NodeJS via https://nodejs.org
    2. Install proxyrack JS using NPM

```bash
npm install proxyrack.js
```
    


## Documentation

#### client.token('apikey')
Set the token for your application. You can find your api key at: https://peer.proxyrack.com/profile.

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `apikey` | `string` | **Required**. Your API key |


#### client.apiurl
Returns the api url.

#### client.token
Returns the api key.

#### client.getBalance()
Get your accounts current balance.

#### client.getBandwidth(options)
Get the bandwidth usage of your devices in the last 7 days or a custom time-period.

options: 
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `device` | `string` | Enter the device ID of the device you would like to check the bandwidth for. |
| `start_date` | `string` | . Format: yyyy-mm-dd|
| `end_date` | `string` | **Required if you provice a start date**. Format: yyyy-mm-dd |

If you provide an invalid start and end date, the data for the last 7 days will be returned.


#### client.addDevice(options)
Add a new device to your proxyrack account. 

options:
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. The ID of the device you want to add. |
| `name` | `string` | The Name of the device you want to add. |


#### client.addDevice('id')
Remove a device from your proxyrack account. 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. The ID of the device you want to remove. |











## Usage/Examples

```javascript
const client = require('./src/client'); //Import the client module
let api_key = ''; //Enter your api key here

//This module is required to set the api key. Make sure to set the api key using client.token(apikey) before using any other functions.
client.token(api_key) //Set the api key
.then((status) => {
    console.log('Client status: ' + status); // If the api key is valid, status will be true.

    getBalance(); //Example how to get the balance after the client is ready.
    getBandwidth(); //Example how to get the bandwidth after the client is ready.
    addDevice(); //Example how to add a device after the client is ready.
    removeDevice(); //Example how to remove a device after the client is ready.
});


//Example function to get the balance
async function getBalance() {
    let balance = await client.getBalance(); //Get the balance using proxyrack.js
    console.log(balance); //Print the balance
};

//Example function to get the Bandwidth
async function getBandwidth() {
    //If invalid options for the date are set, the bandwidth for the last 7 days will be returned. Check the github page for more information.
    const options = {
        device: '', //Leave empty to get the bandwidth for all devices or enter the device id to get the bandwidth for a specific device.
        start_date: '', //Leave empty to get the bandwidth for the last 7 days or enter a date in the format YYYY-MM-DD to get the bandwidth for a specific timeperiod.
        end_date: '', //This value is required if you set a start_date. 
    }

    let bandwidth = await client.getBandwidth(options); //Get the bandwidth using proxyrack.js
    console.log(bandwidth); //Print the value
};

//Example function to add a device
async function addDevice() {
    client.addDevice({
        name: '', //The name of the device
        id: '', //The id of the device
    })
    .then((status) => {
        console.log('Device added: ' + status); //If the device was added successfully, status will be true.
    })
};

//Example function to remove a device
async function removeDevice() {
    client.removeDevice('') //The id of the device
    .then((status) => {
        console.log('Device removed: ' + status); //If the device was removed successfully, status will be true.
    })
};
```



## License

[MIT](https://choosealicense.com/licenses/mit/)



## Author

- [@yalu64](https://www.github.com/yalu64)



## Support

For support, email info@yalu.systems or add me on Discord Yalu64#6424.

