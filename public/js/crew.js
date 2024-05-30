// crew.js

function add_crew_member_record() {

    /*
        TODO: initialize structure members directly
    */

    var data = {
        firstName: "",
        lastName: "",
        salary: 0,
        yrsExp: 0,
        role: "",
        homebaseAirportID: 0
    }

    // get values input by user
    data.firstName = document.getElementById('add-crew-member-firstName').value;
    data.lastName = document.getElementById('add-crew-member-lastName').value;
    data.salary = document.getElementById('add-crew-member-salary').value;
    data.yrsExp = document.getElementById('add-crew-member-yrsExp').value;
    data.role = document.getElementById('add-crew-member-role').value;
    data.homebaseAirportID = document.getElementById('add-crew-member-airportID').value;

    // send the data to app.js using fetch
    fetch('add/crew', {
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

function update_crew_member_record() {

    var data = {
        employeeID: 0,
        firstName: "",
        lastName: "",
        salary: 0,
        yrsExp: 0,
        role: "",
        homebaseAirportID: 0
    }

    // get values input by user
    data.employeeID = document.getElementById('update-crew-member-employeeID').value;
    data.firstName = document.getElementById('update-crew-member-firstName').value;
    data.lastName = document.getElementById('update-crew-member-lastName').value;
    data.salary = document.getElementById('update-crew-member-salary').value;
    data.yrsExp = document.getElementById('update-crew-member-yrsExp').value;
    data.role = document.getElementById('update-crew-member-role').value;
    data.homebaseAirportID = document.getElementById('update-crew-member-airportID').value;

    // send the data to app.js using fetch
    fetch('update/crew', {
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

function delete_crew_member_record() {

    var data = { id: 0 };

    // get record to delete (entered by user)
    data.id = document.getElementById('delete-crew-member-id').value;

    // send the data to app.js using fetch
    fetch('delete/crew', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        window.location.reload();
    })
}