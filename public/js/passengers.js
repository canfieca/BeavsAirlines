// passengers.js

function add_passenger_record() {

    var data = {
        firstName: "",
        lastName: ""
    }

    // get values input by user
    data.firstName = document.getElementById('add-passenger-firstName').value;
    data.lastName = document.getElementById('add-passenger-lastName').value;

    // send the data to app.js using fetch
    fetch('add/passengers', {
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

function update_passenger_record() {

    var data = {
        id: 0,
        new_firstName: "",
        new_lastName: ""
    }

    // get values input by user
    data.id = document.getElementById('update-passenger-id').value;
    data.firstName = document.getElementById('update-passenger-firstName').value;
    data.lastName = document.getElementById('update-passenger-lastName').value;

    // send the data to app.js using fetch
    fetch('update/passengers', {
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

function delete_passenger_record() {

    var data = { id: 0 };

    // get record to delete (entered by user)
    data.id = document.getElementById('delete-passenger-id').value;

    // send the data to app.js using fetch
    fetch('delete/passengers', {
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