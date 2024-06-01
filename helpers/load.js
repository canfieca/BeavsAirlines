
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


module.exports = {
    send_airports_page,
    send_crew_page,
    send_flights_page,
    send_passengers_page
}