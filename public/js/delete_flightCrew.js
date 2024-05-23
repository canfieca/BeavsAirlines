// delete_flightCrew.js

function delete_crew_member() {
    // Get the values entered by the user
    const flightID = document.getElementById('flightID').value;
    const employeeID = document.getElementById('employeeID').value;

    // Create an object with the values
    const data = {
        flightID,
        employeeID
    };

    // Send the data to app.js using fetch
    fetch('http://flip3.engr.oregonstate.edu:43043/delete/flightcrew', {
        method: 'POST',
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
}