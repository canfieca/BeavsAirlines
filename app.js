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

// determines if an item is in an array
function item_in_array(arr, item) {
	for (var i = 0; i < arr.length; i++) {
		if (arr[i] == item) {
			return true
		}
	}

	return false;
}

function generate_remaining_flight_crew_html(flightIDs, employeeIDs, flightCrew_flightIDs, flightCrew_employeeIDs) {
	var html = `</table>
				<section class='crud'>
					<div class='options'>
						<form class='create'>
							<h1>Add a Flight Crew Member</h1>
							<div>
								<label for='flightID'>Pick which flight you'd like to add a new passenger</label>
								<select name='flightID' id="flightID-add-select">`;
	
	flightIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html +=    `</select>
				</div>
				<div>
					<label for='passengerID'>Pick which crew member you'd like to add to the flight</label>
					<select name='passengerID' id="employeeID-add-select">`;
	
	employeeIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html +=        `</select>
				</div>
				<button type="button" onclick="add_flightcrew_record()">Add</button>
			</form>
			<form class='update'>
				<h1>Update a Flight Passenger</h1>
				<div>
					<label for='pickFlightCrewID'>Please pick which flight and crew member you'd like to update</label>
					<select name='pickFlightCrewID' id="flightID-update-select">`;

	flightCrew_flightIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html +=    `</select>
				<select name='pickFlightCrewID' id="employeeID-update-select">`;
	
	flightCrew_employeeIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html +=    `</select>
			</div>
			<div>
				<label for='pickFlightCrewID'>Please select the new flightID and/or employeeID for this record</label>
				<select name='pickFlightCrewID' id="flightID-new-value-update-select">`;

	flightIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html +=     `</select>
				<select name='pickFlightCrewID' id="employeeID-new-value-update-select">`;

	employeeIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html += 	   `</select>
				</div>
				<button type="button" onclick="update_flightcrew_record()">Update</button>
			</form>
			<form class='delete'>
				<h1>Pick which flight and crew member you'd like to remove</h1>
				<div>
					<label for='deleteFlightCrew'>Please pick which flight and crew member you'd like to remove</label>
					<select name='deleteFlightCrew' id="flightID-delete-select">`;
	
	flightCrew_flightIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html +=    `</select>
				<select name='deleteFlightCrew' id="employeeID-delete-select">`;

	flightCrew_employeeIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html += 	    `</select>
				</div>
				<button type="button" id="delete-button" onclick="delete_crew_member()">Delete</button>
			</form>
			</div>
			</section>
			</body>
			</html>`


	return html;
}


// File system
const fs = require('fs');

// Express
var express = require('express'); // include express library for web server
var app = express();              // instantiate express object
PORT = 43043;                     // set a port number for server to listen on


const os = require('os')
console.log("Hostname: http://" + os.hostname() + ":" + JSON.stringify(PORT));

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

	flightCrew_flightIDs = [];
	flightCrew_employeeIDs = [];

	// get the data for this entity from DB
	db.pool.query(select_queries['flightcrew'], function(err, results, fields) {


		// query returns a list of JSON objects (all the records in entity)
		// loop through them, templatize them to the html
		results.forEach(function(record) {

			flightID_str = JSON.stringify(record.flightID);
			employeeID_str = JSON.stringify(record.employeeID);

			var tr_element = `<tr id="flightcrew-primary-key-${flightID_str}-${employeeID_str}">
								<th>${flightID_str}</th>
								<th>${employeeID_str}</th>
								<th>${record.firstName}</th>
								<th>${record.lastName}</th>
							  </tr>`;

			// add record (now in html form) to html template
			flight_crew_html += tr_element;


			// add flightID to array of flightCrew_flightIDs if not already in there
			if ( !item_in_array(flightCrew_flightIDs, record.flightID) ) {
				flightCrew_flightIDs.push(record.flightID);
			}

			// add employeeID to array of flightCrew_employeeIDs if not already in there
			if ( !item_in_array(flightCrew_employeeIDs, record.employeeID) ) {
				flightCrew_employeeIDs.push(record.employeeID);
			}
		});

		flightCrew_flightIDs.sort();
		flightCrew_employeeIDs.sort();

		flightIDs = [];
		employeeIDs = [];

		// get the IDs for all flights in DB
		db.pool.query("SELECT flightID FROM Flights;", function(err, results, fields) {
			console.log(results)

			results.forEach( (record) => {
				flightIDs.push(record.flightID);
			})

			console.log("FlightIDs:", flightIDs)

			// get the IDs for all employees in DB
			db.pool.query("SELECT employeeID FROM CrewMembers;", function(err, results, fields) {
				console.log(results);

				results.forEach( (record) => {
					employeeIDs.push(record.employeeID);
				})
				console.log("EmployeeIDs:", employeeIDs)
				console.log("FlightIDs:", flightIDs)

				flight_crew_html += generate_remaining_flight_crew_html(flightIDs, employeeIDs, flightCrew_flightIDs, flightCrew_employeeIDs);
				res.status(200).send(flight_crew_html);
			})
		})

		



		// populate the remainder of the page and send it to client
		// flight_crew_html += fs.readFileSync('./templates/flightCrew2.html');
		
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