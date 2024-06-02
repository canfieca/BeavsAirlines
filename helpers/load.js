
// import helper functions
var help = require('./helper');

function send_airports_page(db, res) {

    // get airport data from DB
    db.pool.query('SELECT * FROM Airports;', function(err, results, fields) {

        // use handlebars to dynamically generate the page and send it to client
        res.status(200).render('airports', {
            airports_data: results,
            js_file: 'airports.js'
        })
    })
}


function send_crew_page(db, res) {

    // construct DB query
    var query = 'SELECT c.employeeID, c.firstName, c.lastName, c.salary, ';
    query +=           'c.yearsExperience, c.role, a.name AS homebaseAirport ';
    query +=    'FROM CrewMembers c ';
    query +=    'JOIN Airports a ON c.homebaseAirportID = a.airportID ';
    query +=    'ORDER BY c.employeeID;';

    // get crew member data from DB
    db.pool.query(query, function(err, crew_results, fields) {

        // get the IDs and names of all airports in DB
        db.pool.query('SELECT airportID, name FROM Airports;', function(err, airports_results, fields) {

            res.status(200).render('crew', {
                crew_data: crew_results,
                airports_data: airports_results,
                js_file: 'crew.js'
            })
        })
    })
}


function send_flights_page(db, res) {

    // construct DB query
    var query = 'SELECT f.flightID, f.numCrew, f.numPassengers, '
    query +=           'a1.name AS srcAirport, a2.name AS destAirport ';
    query +=    'FROM Flights f ';
    query +=    'JOIN Airports a1 ON f.srcAirportID = a1.airportID ';
    query +=    'JOIN Airports a2 ON f.destAirportID = a2.airportID ';
    query +=    'ORDER BY f.flightID;';

    // get flights data from DB
    db.pool.query(query, function(err, flights_results, fields) {

        // get the IDs and names of all airports in DB
        db.pool.query('SELECT airportID, name FROM Airports;', function(err, airports_results, fields) {

            res.status(200).render('flights', {
                flights_data: flights_results,
                airports_data: airports_results,
                js_file: 'flights.js'
            })
        })
    })
}


function send_passengers_page(db, res) {

    // get passenger data from DB
    db.pool.query('SELECT * FROM Passengers;', function(err, results, fields) {

        res.status(200).render('passengers', {
            passengers_data: results,
            js_file: 'passengers.js'
        })
    })
}

function send_flight_crew_page(db, res) {

    // construct DB queries
    var fc_query = 'SELECT fc.flightID, fc.employeeID, a1.name AS srcAirport, a2.name AS destAirport, c.firstName, c.lastName ';
    fc_query +=    'FROM FlightCrew fc ';
    fc_query +=    'JOIN CrewMembers c ON fc.employeeID = c.employeeID ';
    fc_query +=    'JOIN Flights f ON fc.flightID = f.flightID ';
    fc_query +=    'JOIN Airports a1 ON f.srcAirportID = a1.airportID ';
    fc_query +=    'JOIN Airports a2 ON f.destAirportID = a2.airportID ';
    fc_query +=    'ORDER BY fc.flightID ASC;'

    var f_query = 'SELECT f.flightID, a1.name AS srcAirport, a2.name AS destAirport ';
    f_query +=    'FROM Flights f ';
    f_query +=    'JOIN Airports a1 ON f.srcAirportID = a1.airportID ';
    f_query +=    'JOIN Airports a2 ON f.destAirportID = a2.airportID;';

    var c_query = 'SELECT c.employeeID, c.firstName, c.lastName ';
    c_query +=    'FROM CrewMembers c;';

    // get flight crew data from DB
    db.pool.query(fc_query, function(err, flight_crew_results, fields) {

        // make a new array of flights that doesn't contain duplicates
        const distinct_flightcrew_flights = help.get_distinct_flights(flight_crew_results);

        // make a new array of crew members that doesn't contain duplicates
        const distinct_flightcrew_crew = help.get_distinct_crew(flight_crew_results);

        // get all flightIDs, srcAirports, and destAirports from Flights
        db.pool.query(f_query, function(err, flights_results, fields) {

            // get all employeeIDs, firstNames, and lastNames from CrewMembers
            db.pool.query(c_query, function(err, crew_results, fields) {

                // use flight crew, flights, and crew members data to render page
                res.status(200).render('flightcrew', {
                    flightcrew_data: flight_crew_results,
                    flights_data: flights_results,
                    crew_data: crew_results,
                    distinct_fc_flights_data: distinct_flightcrew_flights,
                    distinct_fc_crew_data: distinct_flightcrew_crew,
                    js_file: 'flightcrew.js'
                })
            })
        })
    })
}


function send_flight_passenger_page(db, res) {

    // construct DB queries
    var fp_query = 'SELECT fp.flightID, fp.passengerID, a1.name AS srcAirport, a2.name AS destAirport, ';
    fp_query +=           'p.firstName, p.lastName, fp.seatNum, fp.isFirstClass, fp.isCheckedIn ';
    fp_query +=    'FROM FlightPassengers fp ';
    fp_query +=    'JOIN Flights f ON fp.flightID = f.flightID ';
    fp_query +=    'JOIN Airports a1 ON f.srcAirportID = a1.airportID ';
    fp_query +=    'JOIN Airports a2 ON f.destAirportID = a2.airportID ';
    fp_query +=    'JOIN Passengers p ON fp.passengerID = p.passengerID ';
    fp_query +=    'ORDER BY fp.flightID;';

    var f_query = 'SELECT f.flightID, a1.name AS srcAirport, a2.name AS destAirport ';
    f_query +=    'FROM Flights f ';
    f_query +=    'JOIN Airports a1 ON f.srcAirportID = a1.airportID ';
    f_query +=    'JOIN Airports a2 ON f.destAirportID = a2.airportID;';

    var p_query = 'SELECT * FROM Passengers;';

    // get flight passengers data from DB
    db.pool.query(fp_query, function(err, flightpassengers_results, fields) {

        // make a new array of flights that doesn't contain duplicates
        const distinct_flightpassengers_flights = help.get_distinct_flights(flightpassengers_results);

        // make a new array of passengers that doesn't contain duplicates
        const distinct_flightpassengers_passengers = help.get_distinct_passengers(flightpassengers_results);

        console.log("distinct_flightpassengers_passengers:", distinct_flightpassengers_passengers);

        // get all flightIDs, srcAirports, and destAirports from Flights
        db.pool.query(f_query, function(err, flights_results, fields) {

            // get all existing passengers data from DB
            db.pool.query(p_query, function(err, passengers_results, fields) {

                // use flight passengers, flights, and passengers data to render page
                res.status(200).render('flightpassengers', {
                    flightpassengers_data: flightpassengers_results,
                    flights_data: flights_results,
                    passengers_data: passengers_results,
                    distinct_fp_flights_data: distinct_flightpassengers_flights,
                    distinct_fp_passengers_data: distinct_flightpassengers_passengers,
                    js_file: 'flightpassengers.js'
                })
            })
        })
    })
}

module.exports = {
    send_airports_page,
    send_crew_page,
    send_flights_page,
    send_passengers_page,
    send_flight_crew_page,
    send_flight_passenger_page
}