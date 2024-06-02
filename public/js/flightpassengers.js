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

    // Send the data to app.js using fetch
    fetch('/add/flightpassengers', {
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


function update_flightpassenger_record() {

    // get values input by user
    const data = {
        flightID: document.getElementById('update-flightpassenger-flightID').value,
        passengerID: document.getElementById('update-flightpassenger-passengerID').value,
        seatNum: document.getElementById('update-flightpassenger-seatNum').value,
        isFirstClass: Number( document.getElementById('update-flightpassenger-isFirstClass').checked ),
        isCheckedIn: Number( document.getElementById('update-flightpassenger-isCheckedIn').checked )
    }

    // Send the data to app.js using fetch
    fetch('/update/flightpassengers', {
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


function delete_flightpassenger_record() {

    // get values input by user
    const data = {
        flightID: document.getElementById('delete-flightpassenger-flightID').value,
        passengerID: document.getElementById('delete-flightpassenger-passengerID').value
    }

    // Send the data to app.js using fetch
    fetch('/delete/flightpassengers', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        window.location.reload();
    })
}