// crew.js

function add_crew_member_record() {

    // get values input by user
    const data = {
        firstName: document.getElementById('add-crew-member-firstName').value,
        lastName: document.getElementById('add-crew-member-lastName').value,
        salary: document.getElementById('add-crew-member-salary').value,
        yrsExp: document.getElementById('add-crew-member-yrsExp').value,
        role: document.getElementById('add-crew-member-role').value,
        homebaseAirportID: document.getElementById('add-crew-member-airportID').value
    }

    send_custom_fetch_request('add', 'crew', data);
}

function update_crew_member_record() {

    // get values input by user
    const data = {
        employeeID: document.getElementById('update-crew-member-employeeID').value,
        firstName: document.getElementById('update-crew-member-firstName').value,
        lastName: document.getElementById('update-crew-member-lastName').value,
        salary: document.getElementById('update-crew-member-salary').value,
        yrsExp: document.getElementById('update-crew-member-yrsExp').value,
        role: document.getElementById('update-crew-member-role').value,
        homebaseAirportID: document.getElementById('update-crew-member-airportID').value
    }

    send_custom_fetch_request('update', 'crew', data);
}
