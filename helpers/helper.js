
function get_distinct_flights(arr) {

    var distinct_flights = [];

    // loop through all records in the array
    arr.forEach( (record) => {

        // determine if the current record's corresponding flight has been accounted for already
        var found = false;
        distinct_flights.forEach( (flight) => {

            if (record.flightID === flight.flightID)
                found = true;
        })

        // add flight information to distinct_flights if not already in distinct_flights
        if (!found) {
            distinct_flights.push({
                flightID: record.flightID,
                srcAirport: record.srcAirport,
                destAirport: record.destAirport
            })
        }
    })

    return distinct_flights;
}


function get_distinct_crew(arr) {

    var distinct_crew = [];

    // loop through all records in the array
    arr.forEach( (record) => {

        // determine if the current record's corresponding crew member has been accounted for already
        var found = false;
        distinct_crew.forEach( (employee) => {

            if (record.employeeID === employee.employeeID)
                found = true;
        })

        // add employee information to distinct_crew if not already in distinct_crew
        if (!found) {
            distinct_crew.push({
                employeeID: record.employeeID,
                firstName: record.firstName,
                lastName: record.lastName
            })
        }
    })

    return distinct_crew;
}


function get_distinct_passengers(arr) {

    var distinct_passengers = [];

    // loop through all records in the array
    arr.forEach( (record) => {

        // determine if the current record's corresponding crew member has been accounted for already
        var found = false;
        distinct_passengers.forEach( (passenger) => {

            if (record.passengerID === passenger.passengerID)
                found = true;
        })

        // add passenger information to distinct_passengers if not already in distinct_passengers
        if (!found) {
            distinct_passengers.push({
                passengerID: record.passengerID,
                firstName: record.firstName,
                lastName: record.lastName
            })
        }
    })

    return distinct_passengers;
}


module.exports = {
    get_distinct_flights,
    get_distinct_crew,
    get_distinct_passengers
}