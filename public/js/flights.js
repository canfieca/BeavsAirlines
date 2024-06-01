// flights.js

/*
    TODO: modularize the fetch request into it's own function
*/

function add_flight_record() {

    const data = {
        numCrew: document.getElementById('add-flight-numCrew').value,
        numPassengers: document.getElementById('add-flight-numPassengers').value,
        srcAirportID: document.getElementById('add-flight-srcAirportID').value,
        destAirportID: document.getElementById('add-flight-destAirportID').value
    }

    // send the data to app.js using fetch
    fetch('add/flights', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        window.location.reload();
    })
}


function update_flight_record() {

    const data = {
        flightID: document.getElementById('update-flight-id').value,
        numCrew: document.getElementById('update-flight-numCrew').value,
        numPassengers: document.getElementById('update-flight-numPassengers').value,
        srcAirportID: document.getElementById('update-flight-srcAirportID').value,
        destAirportID: document.getElementById('update-flight-destAirportID').value
    }

    // send the data to app.js using fetch
    fetch('update/flights', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        window.location.reload();
    })
}


function delete_flight_record() {

    const data = {
        id: document.getElementById('delete-flight-id').value
    }

    // send the data to app.js using fetch
    fetch('delete/flights', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        window.location.reload();
    })
}