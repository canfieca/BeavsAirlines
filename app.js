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


// Express
var express = require('express'); // include express library for web server
var app = express();              // instantiate express object
PORT = 43043;                     // set a port number for server to listen on

const os = require('os')
console.log("Hostname: http://" + os.hostname() + ":" + JSON.stringify(PORT));

// Connect to database
var db = require('./helpers/db_connector');

// import js file for html rendering
var render = require('./helpers/html_rendering');


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
		res.status(200).sendFile('public/html/index.html', {root: __dirname});

	else if (file === 'style.css') 
		res.status(200).sendFile('public/css/style.css', {root: __dirname});

	// if client requests a javascript file
	else if (file.slice(-3) === '.js')
		res.status(200).sendFile('/public/js/' + file, {root: __dirname});
	
	else if (file === 'airports.html') 
		render.generate_airports_page(db, res);
	
	else if (file === 'crew.html') 
		res.status(200).sendFile('public/html/crew.html', {root: __dirname});
	
	else if (file === 'flights.html') 
		res.status(200).sendFile('public/html/flights.html', {root: __dirname});
	
	else if (file === 'passengers.html') 
		res.status(200).sendFile('public/html/passengers.html', {root: __dirname});
	
	else if (file === 'flightCrew.html') 
		render.generate_flight_crew_page(db, res);
	
	else if (file === 'flightPassenger.html') 
		res.status(200).sendFile('public/html/flightPassenger.html', {root: __dirname});
	
	else 
		res.status(404).send('<h1>Error, could not find page</h1>');
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

	// send message back so client reloads page
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

	// send message back so client reloads page
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

	// send message back so client reloads page
	res.status(200).send("Success");
});

// Listener
app.listen(PORT);