// delete_flightCrew.js

function delete_crew_member() {

    console.log("INSIDE DELETE_CREW_MEMBER")

    /*---------------------------------------------------------
    TODO: grabbing the values from the document caused an
          error, so for until this gets fixed, I commented
          it out and am just sending a test string back to
          the server.
    ---------------------------------------------------------*/

    // // Get the values entered by the user
    // const flightID = document.getElementById('flightID').value;
    // const employeeID = document.getElementById('employeeID').value;

    // // Create an object with the values
    // const data = {
    //     flightID,
    //     employeeID
    // };

    // console.log(data)

    // Send the data to app.js using fetch
    fetch('/delete/flightcrew', {               
        method: 'POST',                            // TODO: use DELETE method
        headers: {
            'Content-Type': 'application/json'
        },
        // body: JSON.stringify(data)
        body: "TEST MESSAGE"            // this is the test message I'm sending back
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
