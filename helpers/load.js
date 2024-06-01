
function send_airports_page(db, res) {

    // get airport data from DB
    db.pool.query('SELECT * FROM Airports;', function(err, results, fields) {

        // use handlebars to dynamically generate the page and send it to client
        res.status(200).render('airports', {
            airports_data: results
        })
    })
}


function send_crew_page(db, res) {

    // construct DB query
    var query = 'SELECT c.employeeID, c.firstName, c.lastName, c.salary, ';
    query +=           'c.yearsExperience, c.role, a.name AS homebaseAirport ';
    query +=    'FROM CrewMembers c ';
    query +=    'JOIN Airports a ON c.homebaseAirportID = a.airportID;';

    // get crew member data from DB
    db.pool.query(query, function(err, crew_results, fields) {

        // get the IDs and names of all airports in DB
        db.pool.query('SELECT airportID, name FROM Airports;', function(err, airports_results, fields) {

            res.status(200).render('crew', {
                crew_data: crew_results,
                airports_data: airports_results
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
    query +=    'JOIN Airports a2 ON f.destAirportID = a2.airportID;';

    // get flights data from DB
    db.pool.query(query, function(err, flights_results, fields) {

        // get the IDs and names of all airports in DB
        db.pool.query('SELECT airportID, name FROM Airports;', function(err, airports_results, fields) {

            res.status(200).render('flights', {
                flights_data: flights_results,
                airports_data: airports_results
            })
        })
    })
}


function send_passengers_page(db, res) {

    // get passenger data from DB
    db.pool.query('SELECT * FROM Passengers;', function(err, results, fields) {

        res.status(200).render('passengers', {
            passengers_data: results
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

        // get all flightIDs, srcAirports, and destAirports from Flights
        db.pool.query(f_query, function(err, flights_results, fields) {

            // get all employeeIDs, firstNames, and lastNames from CrewMembers
            db.pool.query(c_query, function(err, crew_results, fields) {

                // use flight crew, flights, and crew members data to render page
                res.status(200).render('flightcrew', {
                    flightcrew_data: flight_crew_results,
                    flights_data: flights_results,
                    crew_data: crew_results
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
    send_flight_crew_page
}