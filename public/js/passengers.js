// passengers.js

function add_passenger_record() {

    // get values input by user
    var data = {
        firstName: document.getElementById('add-passenger-firstName').value,
        lastName: document.getElementById('add-passenger-lastName').value
    }

    send_custom_fetch_request('add', 'passengers', data);
}

function update_passenger_record() {

    // get values input by user
    var data = {
        passengerID: document.getElementById('update-passenger-id').value,
        firstName: document.getElementById('update-passenger-firstName').value,
        lastName: document.getElementById('update-passenger-lastName').value
    }

    send_custom_fetch_request('update', 'passengers', data);
}
