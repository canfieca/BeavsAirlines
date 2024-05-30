// airports.js

function add_airport_record() {

    var data = {
        name: "",
        city: "",
        numFlights: 0,
        numGates: 0
    }
    
    // get values input by user
    data.name = document.getElementById('add-airport-name').value;
    data.city = document.getElementById('add-airport-city').value;
    data.numFlights = document.getElementById('add-airport-numFlights').value;
    data.numGates = document.getElementById('add-airport-numGates').value;

    // send the data to app.js using fetch
    fetch('add/airports', {
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

function update_airport_record() {

    // get values input by user
    var data = {
        id: 0,
        name: "",
        city: "",
        numFlights: 0,
        numGates: 0
    }
    
    // get values input by user
    data.id = document.getElementById('update-airport-id').value;
    data.name = document.getElementById('update-airport-name').value;
    data.city = document.getElementById('update-airport-city').value;
    data.numFlights = document.getElementById('update-airport-numFlights').value;
    data.numGates = document.getElementById('update-airport-numGates').value;

    // send the data to app.js using fetch
    fetch('update/airports', {
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

function delete_airport_record() {

    var data = { id: 0 };

    // get record to delete (entered by user)
    data.id = document.getElementById('delete-airport-id').value;

    // send the data to app.js using fetch
    fetch('delete/airports', {
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