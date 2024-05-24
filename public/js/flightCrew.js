// flightCrew.js

function add_flightcrew_record() {

    // get values input by user
    const flightID_val = document.getElementById('flightID-add-select').value;
    const employeeID_val = document.getElementById('employeeID-add-select').value;

    const data = {
        flightID: flightID_val,
        employeeID: employeeID_val
    }

    // Send the data to app.js using fetch
    fetch('/add/flightcrew', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        console.log("RELOADING PAGE")
        window.location.reload();
    })
}

function update_flightcrew_record() {

    // get values input by user
    const flightID_val = document.getElementById('flightID-update-select').value;
    const employeeID_val = document.getElementById('employeeID-update-select').value;
    const new_flightID_val = document.getElementById('flightID-new-value-update-select').value;
    const new_employeeID_val = document.getElementById('employeeID-new-value-update-select').value;

    const data = {
        flightID: flightID_val,
        employeeID: employeeID_val,
        new_flightID: new_flightID_val,
        new_employeeID: new_employeeID_val
    }

    // Send the data to app.js using fetch
    fetch('/update/flightcrew', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        console.log("RELOADING PAGE")
        window.location.reload();
    })
}


function delete_crew_member() {

    // Get the values entered by the user
    const flightID_val = document.getElementById('flightID-delete-select').value;
    const employeeID_val = document.getElementById('employeeID-delete-select').value;

    const data = {
        flightID: flightID_val,
        employeeID: employeeID_val
    }

    // Send the data to app.js using fetch
    fetch('/delete/flightcrew', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            console.log('Values sent successfully');
        } else {
            console.error('Error sending values');
        }
    })
    .catch(error => {
        console.error('Error sending values:', error);
    });

    // update html
    var id = "flightcrew-primary-key-" + flightID_val + "-" + employeeID_val;
    var record = document.getElementById(id);
    record.remove();
}
