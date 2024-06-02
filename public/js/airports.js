// airports.js

function add_airport_record() {

    // get values input by user
    const data = {
        name: document.getElementById('add-airport-name').value,
        city: document.getElementById('add-airport-city').value,
        numFlights: document.getElementById('add-airport-numFlights').value,
        numGates: document.getElementById('add-airport-numGates').value
    }

    send_custom_fetch_request('add', 'airports', data);
}

function update_airport_record() {

    // get values input by user
    const data = {
        id: document.getElementById('update-airport-id').value,
        name: document.getElementById('update-airport-name').value,
        city: document.getElementById('update-airport-city').value,
        numFlights: document.getElementById('update-airport-numFlights').value,
        numGates: document.getElementById('update-airport-numGates').value
    }

    send_custom_fetch_request('update', 'airports', data);
}
