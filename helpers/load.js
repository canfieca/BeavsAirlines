
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
    var query = 'SELECT CrewMembers.employeeID, CrewMembers.firstName, CrewMembers.lastName, CrewMembers.salary, ';
    query +=           'CrewMembers.yearsExperience, CrewMembers.role, Airports.name AS homebaseAirport ';
    query +=    'FROM CrewMembers '
    query +=    'INNER JOIN Airports ON CrewMembers.homebaseAirportID = Airports.airportID;';

    // get crew member data from DB
    db.pool.query(query, function(err, crew_results, fields) {

        // get the name of all airports in DB
        db.pool.query('SELECT name FROM Airports;', function(err, airports_results, fields) {

            res.status(200).render('crew', {
                crew_data: crew_results,
                all_airport_names: airports_results
            })
        })
    })
}


function send_flights_page(db, res) {

    var query = 'SELECT '

    // get flights data from DB
    db.pool.query(query, function(err, flights_results, fields) {

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
    send_passengers_page
}