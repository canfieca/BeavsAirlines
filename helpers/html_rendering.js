
// File system
const fs = require('fs');

// generic helper functions
const helpers = require('./helpers');

// SQL queries
var select_queries = {
	flightcrew: "SELECT FlightCrew.flightID, CrewMembers.employeeID, CrewMembers.firstName, CrewMembers.lastName FROM FlightCrew INNER JOIN CrewMembers ON FlightCrew.employeeID = CrewMembers.employeeID ORDER BY FlightCrew.flightID ASC;",
	flightpassengers: "SELECT FlightPassengers.flightID, Passengers.firstName, Passengers.lastName, FlightPasssengers.seatNum, FlightPassengers.isFirstClass, FlightPassengers.isCheckedIn FROM FlightPassengers INNER JOIN Passengers ON FlightPassengers.passengerID = Passengers.passengerID GROUP BY FlightPassengers.flightID ORDER BY FlightPassengers.flightID ASC;"
};


function generate_flight_crew_page(db, res) {
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
                res.status(200).send( flight_crew_html );
			})
		})
	});
}

function generate_remaining_flight_crew_html(flightIDs, employeeIDs, flightCrew_flightIDs, flightCrew_employeeIDs) {
	var html = `</table>
				<section class='crud'>
					<div class='options'>
						<form class='create'>
							<h1>Add a Flight Crew Member</h1>
							<div>
								<label for='flightID'>Pick which flight you'd like to add a new crew member</label>
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


module.exports = {generate_flight_crew_page};