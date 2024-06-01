/*---------------------------------------------
*
*   Server file for:
*   Group 43 Project: Beaver Airlines
*   
*   Authors: Steven Sarber & Cameron Canfield
*
*   Date: 5/20/2024
*
---------------------------------------------*/


/*
	TODO: move these functions into their own file in helpers folder
*/

function make_insert_query(table, data) {

	var query = "INSERT INTO ";

	if (table === 'flightcrew') {
		query += `FlightCrew (flightID, employeeID) `;
		query += `VALUES ( ${data.flightID}, ${data.employeeID} );`;
	}
	else if (table === 'airports') {
		query += `Airports (name, city, numFlights, numGates) `;
		query += `VALUES ( '${data.name}', '${data.city}', ${data.numFlights}, ${data.numGates} );`;
	}
	else if (table === 'passengers') {
		query += `Passengers (firstName, lastName) `;
		query += `VALUES ( '${data.firstName}', '${data.lastName}' );`;
	}
	else if (table === 'crew') {
		query += `CrewMembers (firstName, lastName, salary, yearsExperience, role, homebaseAirportID) `;
		query += `VALUES ( '${data.firstName}', '${data.lastName}', ${data.salary}, ${data.yrsExp}, '${data.role}', ${data.homebaseAirportID} );`;
	}

	return query;
}

function make_update_query(table, data) {

	var query = `UPDATE `;

	if (table === 'flightcrew') {
		query += `FlightCrew `;
		query += `SET flightID = ${data.new_flightID}, employeeID = ${data.new_employeeID} `;
		query += `WHERE flightID = ${data.flightID} AND employeeID = ${data.employeeID};`;
	}
	else if (table === 'airports') {
		query += `Airports `;
		query += `SET name = '${data.name}', city = '${data.city}', numFlights = ${data.numFlights}, numGates = ${data.numGates} `;
		query += `WHERE airportID = ${data.id};`;
	}
	else if (table === 'passengers') {
		query += `Passengers `;
		query += `SET firstName = '${data.firstName}', lastName = '${data.lastName}' `;
		query += `WHERE passengerID = ${data.id};`;
	}
	else if (table === 'crew') {
		query += `CrewMembers `;
		query += `SET firstName = '${data.firstName}', lastName = '${data.lastName}', salary = ${data.salary}, yearsExperience = ${data.yrsExp}, role = '${data.role}', homebaseAirportID = ${data.homebaseAirportID} `;
		query += `WHERE employeeID = ${data.employeeID};`;
	}

	return query;
}

function make_delete_query(table, data) {

	var query = `DELETE FROM `;

	if (table === 'flightcrew') {
		query += `FlightCrew `;
		query += `WHERE flightID = ${data.flightID} AND employeeID = ${data.employeeID};`;
	}
	else if (table === 'airports') {
		query += `Airports `;
		query += `WHERE airportID = ${data.id};`;
	}
	else if (table === 'passengers') {
		query += `Passengers `;
		query += `WHERE passengerID = ${data.id};`;
	}
	else if (table === 'crew') {
		query += `CrewMembers `;
		query += `WHERE employeeID = ${data.id};`;
	}

	return query;
}


// Express
var express = require('express'); 			// include express library for web server
var exphbs = require('express-handlebars'); // use handlebars templating engine

var app = express(); // instantiate express object
const port = 43043;  // set a port number for server to listen on

// setting up handlebars
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

const os = require('os')
console.log("Hostname: http://" + os.hostname() + ":" + JSON.stringify(port));

// Connect to database
var db = require('./helpers/db_connector');

// import js file for html rendering
var render = require('./helpers/html_rendering');


//app.use(express.static('static')) // DO I NEED THIS?

// Information logger function
app.use(function (req, res, next) {
	console.log("== Request made");
	console.log("  - Method:", req.method);
	console.log("  - URL:", req.url);
	next();
});


// Routing functions
app.get('/', function(req, res) {
    res.status(200).sendFile('public/html/index.html', {root: __dirname});
});

app.get('/:file', function(req, res) {
	var file = req.params.file;

	if (file === 'index.html') 
		res.status(200).render('homepage');

	else if (file === 'style.css') 
		res.status(200).sendFile('public/css/style.css', {root: __dirname});

	// if client requests a javascript file
	else if (file.slice(-3) === '.js')
		res.status(200).sendFile('/public/js/' + file, {root: __dirname});
	
	else if (file === 'airports.html') {

		// get airport data from DB
		db.pool.query('SELECT * FROM Airports;', function(err, results, fields) {

			// use handlebars to dynamically generate the page and send it to client
			res.status(200).render('airports', {
				airports_data: results
			})
		})
	}
	
	else if (file === 'crew.html') 
		render.generate_crew_members_page(db, res);
	
	else if (file === 'flights.html') 
		res.status(200).sendFile('public/html/flights.html', {root: __dirname});
	
	else if (file === 'passengers.html') {

		// get passenger data from DB
		db.pool.query('SELECT * FROM Passengers;', function(err, results, fields) {

			res.status(200).render('passengers', {
				passengers_data: results
			})
		})
	}
	
	else if (file === 'flightCrew.html') 
		render.generate_flight_crew_page(db, res);
	
	else if (file === 'flightPassenger.html') 
		res.status(200).sendFile('public/html/flightPassenger.html', {root: __dirname});
	
	else 
		res.status(404).send('<h1>Error, could not find page</h1>');
})

app.post('/add/:table', function(req, res) {

	// get which entity is being added to
	var table = req.params.table;

	// get data from request body
	var data = "";
	req.on("data", chunk => {
		data += chunk;
	});

	req.on("end", () => {
		
		// convert string into JSON object
		var record_info = JSON.parse(data);

		var query = make_insert_query(table, record_info);

		console.log(query)

		// add record to DB
		db.pool.query(query, function(err, results, fields) {
			console.log(err, results)
		});
	});

	// send message back so client reloads page
	res.status(200).send("Success");
})

app.post('/update/:table', function(req, res) {

	// get which entity is being added to
	var table = req.params.table;

	// get data from request body
	var data = "";
	req.on("data", chunk => {
		data += chunk;
	});

	req.on("end", () => {
		
		// convert string into JSON object
		var record_info = JSON.parse(data);

		var query = make_update_query(table, record_info);

		console.log(query)

		// update record in DB
		db.pool.query(query, function(err, results, fields) {
			console.log(err, results)
		});
	});

	// send message back so client reloads page
	res.status(200).send("Success");
})


/*
	TODO: for deletions from normal entities, remember to
	      also delete those records from intersection tables
*/
app.delete('/delete/:table', function(req, res) {

	// get which entity is being added to
	var table = req.params.table;

	// get data from request body
	var data = "";
	req.on("data", chunk => {
		data += chunk;
	});

	req.on("end", () => {

		// convert string into JSON object
		var record_info = JSON.parse(data);

		var query = make_delete_query(table, record_info);

		console.log(query)

		// delete record from DB
		db.pool.query(query);
	});

	// send message back so client reloads page
	res.status(200).send("Success");
});

// Listener
app.listen(port);