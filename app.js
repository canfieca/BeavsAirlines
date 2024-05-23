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

// SQL queries
var select_queries = {
	flightcrew: "SELECT FlightCrew.flightID, CrewMembers.employeeID, CrewMembers.firstName, CrewMembers.lastName FROM FlightCrew INNER JOIN CrewMembers ON FlightCrew.employeeID = CrewMembers.employeeID GROUP BY FlightCrew.flightID ORDER BY FlightCrew.flightID ASC;",
	flightpassengers: "SELECT FlightPassengers.flightID, Passengers.firstName, Passengers.lastName, FlightPasssengers.seatNum, FlightPassengers.isFirstClass, FlightPassengers.isCheckedIn FROM FlightPassengers INNER JOIN Passengers ON FlightPassengers.passengerID = Passengers.passengerID GROUP BY FlightPassengers.flightID ORDER BY FlightPassengers.flightID ASC;"
};

/*
*  Function to construct insert query for FlightPassengers
*  intersection table using data received from client
*/
function create_flight_passengers_insert_query(record_info) {
	var query = "INSERT INTO FlightPassengers (flightID, passengerID, seatNum, isFirstClass, isCheckedIn) VALUES (";
	query += JSON.stringify(record_info.flight_id) + ", ";
	query += JSON.stringify(record_info.passenger_id) + ", ";
	query += JSON.stringify(record_info.seat_num) + ", ";
	query += JSON.stringify(record_info.is_first_class) + ", ";
	query += JSON.stringify(record_info.is_checked_in) + ");";
	return query;
};

// File system
const fs = require('fs');

// Express
var express = require('express'); // include express library for web server
var app = express();              // instantiate express object
PORT = 43043;                     // set a port number for server to listen on

// Connect to database
var db = require('./db_connector');

// Create & populate database entities
db.pool.query("source ./database/DDL.sql;");

// Information logger function
app.use(function (req, res, next) {
	console.log("== Request made");
	console.log("  - Method:", req.method);
	console.log("  - URL:", req.url);
	next();
});



// Routing functions
app.get('/', function(req, res) {
    res.status(200).sendFile('html/index.html', {root: __dirname});
});

app.get('/index.html', function(req, res) {
    res.status(200).sendFile('html/index.html', {root: __dirname});
});

app.get('/style.css', function(req, res) {
	res.status(200).sendFile('css/style.css', {root: __dirname});
});

app.get('/airports.html', function(req, res) {
    res.status(200).sendFile('html/airports.html', {root: __dirname});
});

app.get('/crew.html', function(req, res) {
    res.status(200).sendFile('html/crew.html', {root: __dirname});
});

app.get('/flightCrew.html', function(req, res) {
    // res.status(200).sendFile('html/flightCrew.html', {root: __dirname});

	// get the template for the html file
	var flight_crew_html = fs.readFileSync('./templates/flightCrew.html');

	// get the data for this entity from DB
	db.pool.query(select_queries['flightcrew'], function(err, results, fields) {
		// query returns a list of JSON objects (all the records in entity)
		// loop through them, templatize them to the html
		// results.forEach(function(record) {
		// 	var tr_element = "<tr>";
		// 	tr_element += "<th>" + JSON.stringify(record.flightID) + "</th>";
		// 	tr_element += "<th>" + JSON.stringify(record.employeeID) + "</th>";
		// 	tr_element += "<th>" + record.firstName + "</th>";
		// 	tr_element += "<th>" + record.lastName + "</th>";
		// 	tr_element += "</tr>";

		// 	// add record (now in html form) to html template
		// 	flight_crew_html += tr_element;
		// });

		// flight_crew_html += JSON.stringify(results[0]);
		flight_crew_html += "<p>THIS IS A TEST</p>";
	});

	// after data has been retrieved from DB, send the HTML file
	flight_crew_html += "<p>AHHHHHHHHH</p> </body></html>";
	res.status(200).send(flight_crew_html);
});

app.get('/flightPassenger.html', function(req, res) {
    res.status(200).sendFile('html/flightPassenger.html', {root: __dirname});
});

app.get('/flights.html', function(req, res) {
    res.status(200).sendFile('html/flights.html', {root: __dirname});
});

app.get('/passengers.html', function(req, res) {
    res.status(200).sendFile('html/passengers.html', {root: __dirname});
});


// Database queries
app.get('/select/:table', function(req, res) {
	var table = req.params.table;
	db.pool.query(select_queries[table], function(err, results, fields) {
		let base = "<h2>Contents of " + JSON.stringify(table) + "</h2>";
		base += "<h3>Type of table: " + JSON.stringify(typeof(table)) + "</h3>";
		res.send(base + JSON.stringify(results));
	});
});

app.get('/insert/:table', function(req, res) {
	var table = req.params.table;
	var data = "";

	// get data from request body
	req.on("data", chunk => {
		data += chunk;
	});

	// once we have finished receiving data
	req.on("end", () => {
		// convert string into JSON object
		var record_info = JSON.parse(data);

		// use information for the new record to make an SQL query, and execute it
		db.pool.query(create_flight_passengers_insert_query(record_info));
	});
});


app.get('*', function(req, res) {
	res.status(404).send('<h1>Error, could not find page</h1>');
})


// Listener
app.listen(PORT);