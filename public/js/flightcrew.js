// flightCrew.js

function add_flightcrew_record() {

    // get values input by user
    const flightID_val = document.getElementById('add-flightcrew-flightID').value;
    const employeeID_val = document.getElementById('add-flightcrew-employeeID').value;

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


function delete_crew_member() {

    // Get the values entered by the user
    const flightID_val = document.getElementById('delete-flightcrew-flightID').value;
    const employeeID_val = document.getElementById('delete-flightcrew-employeeID').value;

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
        window.location.reload();
    })
}
