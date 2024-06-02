// flightcrew.js

function add_flightcrew_record() {

    // get values input by user
    const data = {
        flightID: document.getElementById('add-flightcrew-flightID').value,
        employeeID: document.getElementById('add-flightcrew-employeeID').value
    }

    send_custom_fetch_request('add', 'flightcrew', data);
}


function delete_crew_member() {

    // Get the values entered by the user
    const data = {
        flightID: document.getElementById('delete-flightcrew-flightID').value,
        employeeID: document.getElementById('delete-flightcrew-employeeID').value
    }

    send_custom_fetch_request('delete', 'flightcrew', data);
}
