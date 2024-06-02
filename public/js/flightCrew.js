// flightCrew.js

function add_flightCrew_record() {

    // get values input by user
    const data = {
        flightID: document.getElementById('add-flightCrew-flightID').value,
        employeeID: document.getElementById('add-flightCrew-employeeID').value
    }

    send_custom_fetch_request('add', 'flightCrew', data);
}


function delete_crew_member() {

    // Get the values entered by the user
    const data = {
        flightID: document.getElementById('delete-flightCrew-flightID').value,
        employeeID: document.getElementById('delete-flightCrew-employeeID').value
    }

    send_custom_fetch_request('delete', 'flightCrew', data);
}
