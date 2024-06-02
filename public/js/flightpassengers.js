// flightpassengers.js

function add_flightpassenger_record() {

    // get values input by user
    const data = {
        flightID: document.getElementById('add-flightpassenger-flightID').value,
        passengerID: document.getElementById('add-flightpassenger-passengerID').value,
        seatNum: document.getElementById('add-flightpassenger-seatNum').value,
        isFirstClass: Number( document.getElementById('add-flightpassenger-isFirstClass').checked ),
        isCheckedIn: Number( document.getElementById('add-flightpassenger-isCheckedIn').checked )
    }

    send_custom_fetch_request('add', 'flightpassengers', data);
}


function update_flightpassenger_record() {

    // get values input by user
    const data = {
        flightID: document.getElementById('update-flightpassenger-flightID').value,
        passengerID: document.getElementById('update-flightpassenger-passengerID').value,
        seatNum: document.getElementById('update-flightpassenger-seatNum').value,
        isFirstClass: Number( document.getElementById('update-flightpassenger-isFirstClass').checked ),
        isCheckedIn: Number( document.getElementById('update-flightpassenger-isCheckedIn').checked )
    }

    send_custom_fetch_request('update', 'flightpassengers', data);
}


function delete_flightpassenger_record() {

    // get values input by user
    const data = {
        flightID: document.getElementById('delete-flightpassenger-flightID').value,
        passengerID: document.getElementById('delete-flightpassenger-passengerID').value
    }

    send_custom_fetch_request('delete', 'flightpassengers', data);
}