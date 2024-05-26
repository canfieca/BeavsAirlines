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

// app.get('/index.html', function(req, res) {
//     res.status(200).sendFile('public/html/index.html', {root: __dirname});
// });

// app.get('/style.css', function(req, res) {
// 	res.status(200).sendFile('public/css/style.css', {root: __dirname});
// });

// app.get('/airports.html', function(req, res) {
//     res.status(200).sendFile('public/html/airports.html', {root: __dirname});
// });

// app.get('/crew.html', function(req, res) {
//     res.status(200).sendFile('public/html/crew.html', {root: __dirname});
// });

// app.get('/flightCrew.js', function(req, res) {
//     res.status(200).sendFile('public/js/flightCrew.js', {root: __dirname});
// });

app.get('/:file', function(req, res) {
	var file = req.params.file;

	var flight_crew_html = ``;

	if (file === 'index.html') {
		res.status(200).sendFile('public/html/index.html', {root: __dirname});
	} else
	if (file === 'style.css') {
		res.status(200).sendFile('public/css/style.css', {root: __dirname});
	} else
	if (file.slice(-3) === '.js') {  // if client requests a javascript file
		res.status(200).sendFile('/public/js/' + file, {root: __dirname});
	} else
	if (file === 'airports.html') {
		res.status(200).sendFile('public/html/airports.html', {root: __dirname});
	} else
	if (file === 'crew.html') {
		res.status(200).sendFile('public/html/crew.html', {root: __dirname});
	} else
	if (file === 'flights.html') {
		res.status(200).sendFile('public/html/flights.html', {root: __dirname});
	} else
	if (file === 'passengers.html') {
		res.status(200).sendFile('public/html/passengers.html', {root: __dirname});
	} else
	if (file === 'flightCrew.html') {
		render.generate_flight_crew_page(db, res);
	}
})

// app.get('/flightCrew.html', function(req, res) {

// 	// get the template for the html file
// 	var flight_crew_html = fs.readFileSync('./templates/flightCrew.html');

// 	flightCrew_flightIDs = [];
// 	flightCrew_employeeIDs = [];

// 	// get the data for this entity from DB
// 	db.pool.query(select_queries['flightcrew'], function(err, results, fields) {

// 		// query returns a list of JSON objects (all the records in entity)
// 		// loop through them, templatize them to the html
// 		results.forEach(function(record) {

// 			flightID_str = JSON.stringify(record.flightID);
// 			employeeID_str = JSON.stringify(record.employeeID);

// 			var tr_element = `<tr id="flightcrew-primary-key-${flightID_str}-${employeeID_str}">
// 								<th>${flightID_str}</th>
// 								<th>${employeeID_str}</th>
// 								<th>${record.firstName}</th>
// 								<th>${record.lastName}</th>
// 							  </tr>`;

// 			// add record (now in html form) to html template
// 			flight_crew_html += tr_element;


// 			// add flightID to array of flightCrew_flightIDs if not already in there
// 			if ( !item_in_array(flightCrew_flightIDs, record.flightID) ) {
// 				flightCrew_flightIDs.push(record.flightID);
// 			}

// 			// add employeeID to array of flightCrew_employeeIDs if not already in there
// 			if ( !item_in_array(flightCrew_employeeIDs, record.employeeID) ) {
// 				flightCrew_employeeIDs.push(record.employeeID);
// 			}
// 		});

// 		flightCrew_flightIDs.sort();
// 		flightCrew_employeeIDs.sort();

// 		flightIDs = [];
// 		employeeIDs = [];

// 		// get the IDs for all flights in DB
// 		db.pool.query("SELECT flightID FROM Flights;", function(err, results, fields) {
// 			console.log(results)

// 			results.forEach( (record) => {
// 				flightIDs.push(record.flightID);
// 			})

// 			console.log("FlightIDs:", flightIDs)

// 			// get the IDs for all employees in DB
// 			db.pool.query("SELECT employeeID FROM CrewMembers;", function(err, results, fields) {
// 				console.log(results);

// 				results.forEach( (record) => {
// 					employeeIDs.push(record.employeeID);
// 				})
// 				console.log("EmployeeIDs:", employeeIDs)
// 				console.log("FlightIDs:", flightIDs)

// 				flight_crew_html += render.generate_remaining_flight_crew_html(flightIDs, employeeIDs, flightCrew_flightIDs, flightCrew_employeeIDs);
// 				res.status(200).send(flight_crew_html);
// 			})
// 		})
// 	});
// });

// app.get('/flightPassenger.html', function(req, res) {
//     res.status(200).sendFile('public/html/flightPassenger.html', {root: __dirname});
// });

// app.get('/flights.html', function(req, res) {
//     res.status(200).sendFile('public/html/flights.html', {root: __dirname});
// });

// app.get('/passengers.html', function(req, res) {
//     res.status(200).sendFile('public/html/passengers.html', {root: __dirname});
// });

// app.get('/index.js', function(req, res) {
// 	res.status(200).sendFile('public/js/index.js', {root: __dirname})
// })


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