// delete_flightCrew.js

var delete_button = document.getElementById('delete-button');

console.log(document)
console.log(document.getElementById('delete-button'))

// delete_button.addEventListener('click', () => {
//     delete_crew_member();
// })

function delete_crew_member() {
    // Get the values entered by the user
    const flightID = document.getElementById('flightID').value;
    const employeeID = document.getElementById('employeeID').value;

    // Create an object with the values
    const data = {
        flightID,
        employeeID
    };

    console.log(data)

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
}
