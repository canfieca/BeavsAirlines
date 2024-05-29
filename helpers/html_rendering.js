
// File system
const fs = require('fs');

// generic helper functions
const helpers = require('./helpers');


function generate_flight_crew_page(db, res) {
    // get the template for the html file
	var flight_crew_html = fs.readFileSync('./templates/flightCrew.html');

	const select_query =   `SELECT FlightCrew.flightID, CrewMembers.employeeID, CrewMembers.firstName, CrewMembers.lastName
							FROM FlightCrew 
							INNER JOIN CrewMembers ON FlightCrew.employeeID = CrewMembers.employeeID
							ORDER BY FlightCrew.flightID ASC;`;

	var flightCrew_flightIDs = [];
	var flightCrew_employeeIDs = [];

	// get the data for this entity from DB
	db.pool.query(select_query, function(err, results, fields) {

		// query returns a list of JSON objects (all the records in entity)
		// loop through them, templatize them to the html
		results.forEach(function(record) {

			var tr_element = `<tr>
								<th>${JSON.stringify(record.flightID)}</th>
								<th>${JSON.stringify(record.employeeID)}</th>
								<th>${record.firstName}</th>
								<th>${record.lastName}</th>
							  </tr>`;

			// add record (now in html form) to html template
			flight_crew_html += tr_element;


			// add flightID to array of flightCrew_flightIDs if not already in there
			if ( !helpers.item_in_array(flightCrew_flightIDs, record.flightID) ) {
				flightCrew_flightIDs.push(record.flightID);
			}

			// add employeeID to array of flightCrew_employeeIDs if not already in there
			if ( !helpers.item_in_array(flightCrew_employeeIDs, record.employeeID) ) {
				flightCrew_employeeIDs.push(record.employeeID);
			}
		});

		flightCrew_flightIDs.sort();
		flightCrew_employeeIDs.sort();

		var all_flightIDs = [];
		var all_employeeIDs = [];

		// get the IDs for all flights in DB
		db.pool.query("SELECT flightID FROM Flights;", function(err, results, fields) {

			results.forEach( (record) => {
				all_flightIDs.push(record.flightID);
			})

			// get the IDs for all employees in DB
			db.pool.query("SELECT employeeID FROM CrewMembers;", function(err, results, fields) {

				results.forEach( (record) => {
					all_employeeIDs.push(record.employeeID);
				})

				flight_crew_html += generate_remaining_flight_crew_html(all_flightIDs, all_employeeIDs, flightCrew_flightIDs, flightCrew_employeeIDs);
                res.status(200).send( flight_crew_html );
			})
		})
	});
}

function generate_remaining_flight_crew_html(all_flightIDs, all_employeeIDs, flightCrew_flightIDs, flightCrew_employeeIDs) {
	var html = `</table>
				<section class='crud'>
					<div class='options'>
						<form class='create'>
							<h1>Add a Flight Crew Member</h1>
							<div>
								<label for='flightID'>Pick which flight you'd like to add a new crew member</label>
								<select name='flightID' id="flightID-add-select">`;
	
	all_flightIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html +=    `</select>
				</div>
				<div>
					<label for='passengerID'>Pick which crew member you'd like to add to the flight</label>
					<select name='passengerID' id="employeeID-add-select">`;
	
	all_employeeIDs.forEach( (id) => {
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

	all_flightIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html +=     `</select>
				<select name='pickFlightCrewID' id="employeeID-new-value-update-select">`;

	all_employeeIDs.forEach( (id) => {
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

function generate_airports_page(db, res) {
	var airports_html = `<!DOCTYPE html>
						<html lang="en">
						<head>
							<meta charset="UTF-8">
							<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<meta http-equiv="X-UA-Compatible" content="ie=edge">
							<title>Beavs Airlines</title>
							<link rel="stylesheet" href="/style.css">
							<script src="airports.js"></script>
						</head>
						<body>
							
							<nav class='navbar'>
							<a href='index.html'>Go Beavs!</a>
							<ul class='navlist'>
								<!-- <li><a href='flightCrew.html'>Flight Crew</a><li>
								<li><a href='flightPassenger.html'>Flight Passengers</a></li> -->
								<li><a href='airports.html'>Airports</a></li>
								<li><a href=passengers.html>Passengers</a></li>
								<li><a href='crew.html'>Crew Members</a></li>
								<li><a href='flights.html'>Flights</a></li>
							</ul>
							</nav>
						
							<div class='airportTable'>
								<table>
									<tr>
										<th>airportID</th>
										<th>Name</th>
										<th>City</th>
										<th>Number of Flights</th>
										<th>Number of Gates</th>
									</tr>`;

	const select_query = `SELECT * FROM Airports;`;

	var all_airportIDs = [];

	// get the data for this entity from DB
	db.pool.query(select_query, function(err, results, fields) {

		// loop through each record returned from SELECT query
		results.forEach( (record) => {

			// add airportID to array of airportIDs
			all_airportIDs.push(record.airportID);

			// generate html
			var tr_element =   `<tr>
									<td>${JSON.stringify(record.airportID)}</td>
									<td>${record.name}</td>
									<td>${record.city}</td>
									<td>${JSON.stringify(record.numFlights)}</td>
									<td>${JSON.stringify(record.numGates)}</td>
								</tr>`;

			airports_html += tr_element;
		})

		airports_html += generate_remaining_airports_html(all_airportIDs);
		res.status(200).send(airports_html);
	})
}

function generate_remaining_airports_html(all_airportIDs) {
	var html = `</table>
				</div>
				<section class='crud'>
					<div class='options'>
						<form class='create'>
							<h1>Add a Airport</h1>
							<div>
								<label for='name'>Enter the name of the airport:</label>
								<input name='name'></input>
							</div>
							<div>
								<label for='city'>Enter the city the airport is located:</label>
								<input name='city'></input>
							</div>
							<div>
							<label for='numOfFlights'>Add the number of flights it has:</label>
							<input name='numOfFlights'></input>
							</div>
							<div>
								<label for='numOfGates'>Add the number of gates it has:</label>
								<input name='numOfGates'></input>
							</div>
							<button type="button">Add</button>
						</form>`;
	
	// update form
	html += `<form class='update'>
			<h1>Update an airport</h1>
			
			<div>
				<label for='pickAirport'>Pick an airport to modify</label>
				<select name='pickAirport'>`;
		
	all_airportIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html +=    `</select>
				</div>
				<div>
					<label for='city'>Update the city of the airport</label>
					<input name='city'></input>
				</div>
				<div>
					<label for='numOfFlights'>Update the number of flights it has:</label>
					<input name='numOfFlights'></input>
				</div>
				<div>
					<label for='numOfGates'>Update the number of gates it has:</label>
					<input name='numOfGates'></input>
				</div>

				<button type="button">Update</button>
			</form>`;

	// delete form
	html += `<form class='delete'>
			<h1>Delete an Airport</h1>
			<div>
				<label for='pickAirport'>Pick an airport to delete from the list</label>
				<select name='pickAirport'>`;
	
	all_airportIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html +=    `</select>
				<button>Delete</button>
			</div>
			</form>
			</div>
			</section>
			</body>
			</html>`;

	return html;
}

module.exports = {
	generate_flight_crew_page,
	generate_airports_page
};