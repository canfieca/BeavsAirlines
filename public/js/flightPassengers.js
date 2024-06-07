// flightPassengers.js

function add_flightPassenger_record() {

    // get values input by user
    const data = {
        flightID: document.getElementById('add-flightPassenger-flightID').value,
        passengerID: document.getElementById('add-flightPassenger-passengerID').value,
        seatNum: document.getElementById('add-flightPassenger-seatNum').value,
        isFirstClass: Number( document.getElementById('add-flightPassenger-isFirstClass').checked ),
        isCheckedIn: Number( document.getElementById('add-flightPassenger-isCheckedIn').checked )
    }

    send_custom_fetch_request('add', 'flightPassengers', data);
}


function update_flightPassenger_record() {

    // get values input by user
    const data = {
        flightID: document.getElementById('update-flightPassenger-flightID').value,
        passengerID: document.getElementById('update-flightPassenger-passengerID').value,
        seatNum: document.getElementById('update-flightPassenger-seatNum').value,
        isFirstClass: Number( document.getElementById('update-flightPassenger-isFirstClass').checked ),
        isCheckedIn: Number( document.getElementById('update-flightPassenger-isCheckedIn').checked )
    }

    send_custom_fetch_request('update', 'flightPassengers', data);
}


function delete_flightPassenger_record(flightID, passengerID) {

    // get values input by user
    const data = {
        flightID: flightID,
        passengerID: passengerID
    }

    send_custom_fetch_request('delete', 'flightPassengers', data);
}