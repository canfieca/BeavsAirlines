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
	flightcrew: "SELECT FlightCrew.flightID, CrewMembers.employeeID, CrewMembers.firstName, CrewMembers.lastName FROM FlightCrew INNER JOIN CrewMembers ON FlightCrew.employeeID = CrewMembers.employeeID ORDER BY FlightCrew.flightID ASC;",
	flightpassengers: "SELECT FlightPassengers.flightID, Passengers.firstName, Passengers.lastName, FlightPasssengers.seatNum, FlightPassengers.isFirstClass, FlightPassengers.isCheckedIn FROM FlightPassengers INNER JOIN Passengers ON FlightPassengers.passengerID = Passengers.passengerID GROUP BY FlightPassengers.flightID ORDER BY FlightPassengers.flightID ASC;"
};


function make_flight_crew_insert_query(record_info) {
	var query = "INSERT INTO FlightCrew (flightID, employeeID) VALUES (";
	query += record_info.flightID + ", " + record_info.employeeID + ");";

	return query;
}

function make_flight_crew_update_query(record_info) {
	var query = "UPDATE FlightCrew SET flightID = ";
	query += record_info.new_flightID;
	query += ", employeeID = ";
	query += record_info.new_employeeID;
	query += " WHERE flightID = ";
	query += record_info.flightID;
	query += " AND employeeID = ";
	query += record_info.employeeID;

	return query;
}

// TODO: modularize this function !!
function make_flight_crew_delete_query(record_info) {
	var query = "DELETE FROM FlightCrew WHERE flightID = ";
	query += record_info.flightID;
	query += " AND employeeID = ";
	query += record_info.employeeID;
	query += ";";

	return query;
}

const os = require('os')
console.log("Hostname: ", os.hostname())

// File system
const fs = require('fs');

// Express
var express = require('express'); // include express library for web server
var app = express();              // instantiate express object
PORT = 43043;                     // set a port number for server to listen on

// Connect to database
var db = require('./db_connector');

// Create & populate database entities
// db.pool.query("source ./database/DDL.sql;", function(err, results, fields) {
// 	console.log("populating database!")
// });


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

app.get('/index.html', function(req, res) {
    res.status(200).sendFile('public/html/index.html', {root: __dirname});
});

app.get('/style.css', function(req, res) {
	res.status(200).sendFile('public/css/style.css', {root: __dirname});
});

app.get('/airports.html', function(req, res) {
    res.status(200).sendFile('public/html/airports.html', {root: __dirname});
});

app.get('/crew.html', function(req, res) {
    res.status(200).sendFile('public/html/crew.html', {root: __dirname});
});

app.get('/flightCrew.js', function(req, res) {
    res.status(200).sendFile('public/js/flightCrew.js', {root: __dirname});
});

app.get('/flightCrew.html', function(req, res) {

	// get the template for the html file
	var flight_crew_html = fs.readFileSync('./templates/flightCrew.html');

	// get the data for this entity from DB
	db.pool.query(select_queries['flightcrew'], function(err, results, fields) {

		console.log(results)

		// query returns a list of JSON objects (all the records in entity)
		// loop through them, templatize them to the html
		results.forEach(function(record) {
			var tr_element = '<tr id="flightcrew-primary-key-';
			tr_element += JSON.stringify(record.flightID) + "-" + JSON.stringify(record.employeeID) + '">';
			tr_element += "<th>" + JSON.stringify(record.flightID) + "</th>";
			tr_element += "<th>" + JSON.stringify(record.employeeID) + "</th>";
			tr_element += "<th>" + record.firstName + "</th>";
			tr_element += "<th>" + record.lastName + "</th>";
			tr_element += "</tr>";

			// add record (now in html form) to html template
			flight_crew_html += tr_element;
		});

		// populate the remainder of the page and send it to client
		flight_crew_html += fs.readFileSync('./templates/flightCrew2.html');
		res.status(200).send(flight_crew_html);
	});
});

app.get('/flightPassenger.html', function(req, res) {
    res.status(200).sendFile('public/html/flightPassenger.html', {root: __dirname});
});

app.get('/flights.html', function(req, res) {
    res.status(200).sendFile('public/html/flights.html', {root: __dirname});
});

app.get('/passengers.html', function(req, res) {
    res.status(200).sendFile('public/html/passengers.html', {root: __dirname});
});

app.get('/index.js', function(req, res) {
	res.status(200).sendFile('public/js/index.js', {root: __dirname})
})


app.post('/add/:table', function(req, res) {
	var data = "";

	// get data from request body
	req.on("data", chunk => {
		data += chunk;
	});

	req.on("end", () => {
		
		// convert string into JSON object
		var record_info = JSON.parse(data);

		var query = make_flight_crew_insert_query(record_info);

		// add record to DB
		db.pool.query(query, function(err, results, fields) {
			console.log(err, results)
		});
	});

	res.status(200).send("Success");
})

app.post('/update/:table', function(req, res) {
	var data = "";

	// get data from request body
	req.on("data", chunk => {
		data += chunk;
	});

	req.on("end", () => {
		
		// convert string into JSON object
		var record_info = JSON.parse(data);

		var query = make_flight_crew_update_query(record_info);

		console.log(query)

		// update record in DB
		db.pool.query(query, function(err, results, fields) {
			console.log(err, results)
		});
	});

	res.status(200).send("Success");
})

app.delete('/delete/:table', function(req, res) {
	var table = req.params.table;
	var data = "";

	// get data from request body
	req.on("data", chunk => {
		data += chunk;
	});

	req.on("end", () => {

		// convert string into JSON object
		var record_info = JSON.parse(data);

		var query = make_flight_crew_delete_query(record_info);

		// delete record from DB
		db.pool.query(query);
	});
});


app.get('*', function(req, res) {
	res.status(404).send('<h1>Error, could not find page</h1>');
})


// Listener
app.listen(PORT);