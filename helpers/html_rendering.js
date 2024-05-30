
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
								<li><a href='flightCrew.html'>Flight Crew</a><li>
								<li><a href='flightPassenger.html'>Flight Passengers</a></li>
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
								<input name='name' id="add-airport-name"></input>
							</div>
							<div>
								<label for='city'>Enter the city the airport is located:</label>
								<input name='city' id="add-airport-city"></input>
							</div>
							<div>
							<label for='numOfFlights'>Add the number of flights it has:</label>
							<input name='numOfFlights' id="add-airport-numFlights"></input>
							</div>
							<div>
								<label for='numOfGates'>Add the number of gates it has:</label>
								<input name='numOfGates' id="add-airport-numGates"></input>
							</div>
							<button type="button" onclick="add_airport_record()">Add</button>
						</form>`;
	
	// update form
	html += `<form class='update'>
			<h1>Update an airport</h1>
			
			<div>
				<label for='pickAirport'>Pick an airport to modify</label>
				<select name='pickAirport' id="update-airport-id">`;
		
	all_airportIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html +=    `</select>
				</div>
				<div>
                  <label for="name">Update the name of the airport</label>
                  <input name="name" id="update-airport-name"></input>
                </div>
                <div>
                    <label for='city'>Update the city of the airport</label>
                    <input name='city' id="update-airport-city"></input>
                </div>
                <div>
                    <label for='numOfFlights'>Update the number of flights it has:</label>
                    <input name='numOfFlights' id="update-airport-numFlights"></input>
                </div>
                <div>
                    <label for='numOfGates'>Update the number of gates it has:</label>
                    <input name='numOfGates' id="update-airport-numGates"></input>
                </div>

                <button type="button" onclick="update_airport_record()">Update</button>
			</form>`;

	// delete form
	html += `<form class='delete'>
			<h1>Delete an Airport</h1>
			<div>
				<label for='pickAirport'>Pick an airport to delete from the list</label>
				<select name='pickAirport' id="delete-airport-id">`;
	
	all_airportIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html +=    `</select>
				<button type="button" onclick="delete_airport_record()">Delete</button>
			</div>
			</form>
			</div>
			</section>
			</body>
			</html>`;

	return html;
}

function generate_passengers_page(db, res) {
	var passengers_html =  `<!DOCTYPE html>
							<html lang="en">
							<head>
								<meta charset="UTF-8">
								<meta name="viewport" content="width=device-width, initial-scale=1.0">
								<meta http-equiv="X-UA-Compatible" content="ie=edge">
								<title>Beavs Airlines</title>
								<link rel="stylesheet" href="/style.css">
								<script src="passengers.js"></script>
							</head>
							<body>
								<nav class='navbar'>
								<a href='index.html'>Go Beavs!</a>
								<ul class='navlist'>
									<li><a href='flightCrew.html'>Flight Crew</a><li>
									<li><a href='flightPassenger.html'>Flight Passengers</a></li>
									<li><a href='airports.html'>Airports</a></li>
									<li><a href=passengers.html>Passengers</a></li>
									<li><a href='crew.html'>Crew Members</a></li>
									<li><a href='flights.html'>Flights</a></li>
								</ul>
							</nav>
								<table>
									<tr>
										<th>passengerID</th>
										<th>First Name</th>
										<th>Last Name</th>
									</tr>`;

	const select_query = `SELECT * FROM Passengers;`;

	var all_passengerIDs = [];

	// get the data for this entity from DB
	db.pool.query(select_query, function(err, results, fields) {

		// loop through each record returned from SELECT query
		results.forEach( (record) => {

			// add passengerID to array of passengerIDs
			all_passengerIDs.push(record.passengerID);

			// generate HTML
			var tr_element =   `<tr>
									<td>${record.passengerID}</td>
									<td>${record.firstName}</td>
									<td>${record.lastName}</td>
								</tr>`;

			passengers_html += tr_element;
		})

		passengers_html += generate_remaining_passengers_html(all_passengerIDs);
		res.status(200).send(passengers_html);
	})
}

function generate_remaining_passengers_html(all_passengerIDs) {
	var html = `</table>
				<section class='crud'>
				<div class='options'>
					<form class='create'>
						<h1>Add a Passenger</h1>
						<div>
							<label for='firstName'>Enter the first name of the passenger:</label>
							<input name='firstName' id="add-passenger-firstName"></input>
						</div>
						<div>
							<label for='lastName'>Enter the last name of the passenger:</label>
							<input name='lastName' id="add-passenger-lastName"></input>
						</div>
						<button type="button" onclick="add_passenger_record()">Add</button>
					</form>`;

	// update form
	html +=    `<form class='update'>
				<h1>Update a Passenger</h1>
				<div>
					<label for='pickPassenger'>Pick a passenger to modify</label>
					<select name='pickPassenger' id="update-passenger-id">`;

	all_passengerIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html += 		`</select>
				</div>
				<div>
					<label for='firstName'>Update their first name</label>
					<input name='firstName' id="update-passenger-firstName"></input>
				</div>
				<div>
					<label for='lastName'>Update their last name:</label>
					<input name='lastName' id="update-passenger-lastName"></input>
				</div>
				<button type="button" onclick="update_passenger_record()">Update</button>
			</form>`;

	// delete form
	html +=    `<form class='delete'>
				<h1>Delete a Passenger</h1>
				<div>
					<label for='deleteFlight'>Please pick which passenger that you would like to remove</label>
					<select name='deleteFlight' id="delete-passenger-id">`;

	all_passengerIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html += `</select>
				<button type="button" onclick="delete_passenger_record()">Delete</button>
			</div>
			</form>
			</div>
			</section>
			</body>
			</html>`;

	return html;
}

function generate_crew_members_page(db, res) {
	var crew_html =    `<!DOCTYPE html>
						<html lang="en">
						<head>
							<meta charset="UTF-8">
							<meta name="viewport" content="width=device-width, initial-scale=1.0">
							<meta http-equiv="X-UA-Compatible" content="ie=edge">
							<title>Beavs Airlines</title>
							<link rel="stylesheet" href="/style.css">
							<script src="crew.js"></script>
						</head>
						<body>
						
							<nav class='navbar'>
								<a href='index.html'>Go Beavs!</a>
								<ul class='navlist'>
									<li><a href='flightCrew.html'>Flight Crew</a><li>
									<li><a href='flightPassenger.html'>Flight Passengers</a></li>
									<li><a href='airports.html'>Airports</a></li>
									<li><a href=passengers.html>Passengers</a></li>
									<li><a href='crew.html'>Crew Members</a></li>
									<li><a href='flights.html'>Flights</a></li>
								</ul>
							</nav>
						
							<table style="width: 100%;">
								<tr>
									<th>employeeID</th>
									<th>First Name</th>
									<th>Last Name</th>
									<th>Salary</th>
									<th>Years of Experience</th>
									<th>Role</th>
									<th>Homebase Airport</th>
								</tr>`;

	const select_query = `SELECT * FROM CrewMembers;`;

	var all_employeeIDs = [];
	var all_airportIDs = [];

	// get the data for this entity from DB
	db.pool.query(select_query, function(err, results, fields) {

		// loop through each record returned from SELECT query
		results.forEach( (record) => {

			// add employeeID to array of employeeIDs
			all_employeeIDs.push(record.employeeID);

			// generate HTML
			var tr_element =   `<tr>
									<td>${record.employeeID}</td>
									<td>${record.firstName}</td>
									<td>${record.lastName}</td>
									<td>${record.salary}</td>
									<td>${record.yearsExperience}</td>
									<td>${record.role}</td>
									<td>${record.homebaseAirportID}</td>
								</tr>`;

			crew_html += tr_element;
		})

		// get data for what airports are present in DB
		db.pool.query("SELECT airportID FROM Airports;", function(err, results, fields) {

			// add all airportIDs from DB to array
			results.forEach( (record) => {
				all_airportIDs.push(record.airportID);
			})

			crew_html += generate_remaining_crew_members_html(all_employeeIDs, all_airportIDs);
			res.status(200).send(crew_html);
		})
	})
}

function generate_remaining_crew_members_html(all_employeeIDs, all_airportIDs) {
	var html = `</table>
				<section class='crud'>
				<div class='options'>
					<form class='create'>
						<h1>Add an Employee</h1>
						<div>
							<label for='firstName'>Enter the first name of the employee:</label>
							<input name='firstName' id="add-crew-member-firstName"></input>
						</div>
						<div>
							<label for='lastName'>Enter the last name of the employee:</label>
							<input name='lastName' id="add-crew-member-lastName"></input>
						</div>
						<div>
							<label for='salary'>Enter employee's salary:</label>
							<input name='salary' id="add-crew-member-salary"></input>
						</div>
						<div>
							<label for='yearsExpr'>Enter how many years experience the employee has:</label>
							<input name='yearsExpr' id="add-crew-member-experience"></input>
						</div>
						<div>
							<label for='role'>What's the employee's role:</label>
							<input name='role' id="add-crew-member-role"></input>    
						</div>
						<div>
							<label for='homeAirId'>What airport is their home location</label>
							<select name='homeAirId' id="add-crew-member-airportID">`;

	all_airportIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html += `</select>
				</div>
				<button type="button" onclick="add_crew_member_record()">Add</button>
			</form>`;

	// update form
	html +=    `<form class='update'>
				<h1>Update an Employee</h1>
				<div>
					<label for='pickFlight'>Pick an employee to modify</label>
					<select name='pickFlight' id="update-crew-member-employeeID">`;

	all_employeeIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html += `</select>
			</div>
			<div>
				<label for='firstName'>Enter the first name of the employee:</label>
				<input name='firstName' id="update-crew-member-firstName"></input>
			</div>
			<div>
				<label for='lastName'>Enter the last name of the employee:</label>
				<input name='lastName' id="update-crew-member-lastName"></input>
			</div>
			<div>
				<label for='salary'>Update their salary:</label>
				<input name='salary' id="update-crew-member-salary"></input>
			</div>
			<div>
				<label for='yearsExpr'>Update their years of experience:</label>
				<input name='yearsExpr' id="update-crew-member-experience"></input>
			</div>
			<div>
				<label for='role'>Update their role:</label>
				<input name='role' id="update-crew-member-role"></input>    
			</div>
			<div>
				<label for='homeAirId'>Update their home airport:</label>
				<select name='homeAirId' id="update-crew-member-airportID">`;

	all_airportIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html += 		`</select>
				</div>
				<button type="button" onclick="update_crew_member_record()">Update</button>
			</form>`;

	// delete form
	html += `<form class='delete'>
			<h1>Delete an Employee</h1>
			<div>
				<label for='deleteFlight'>Please pick which crew member that you would like to remove</label>
				<select name='deleteFlight' id="delete-crew-member-id">`;

	all_employeeIDs.forEach( (id) => {
		html += `<option value='${id}'>${id}</option>`;
	})

	html += `</select>
				<button type="button" onclick="delete_crew_member_record()">Delete</button>
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
	generate_airports_page,
	generate_passengers_page,
	generate_crew_members_page
};