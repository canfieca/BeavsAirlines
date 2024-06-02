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

    send_custom_fetch_request('add', 'flights', data);
}


function update_flight_record() {

    const data = {
        flightID: document.getElementById('update-flight-id').value,
        numCrew: document.getElementById('update-flight-numCrew').value,
        numPassengers: document.getElementById('update-flight-numPassengers').value,
        srcAirportID: document.getElementById('update-flight-srcAirportID').value,
        destAirportID: document.getElementById('update-flight-destAirportID').value
    }

    send_custom_fetch_request('update', 'flights', data);
}
