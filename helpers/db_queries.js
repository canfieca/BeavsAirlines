
function make_insert_query(table, data) {

	var query = "INSERT INTO ";

	if (table === 'airports') {
		query += `Airports (name, city, numFlights, numGates) `;
		query += `VALUES ( '${data.name}', '${data.city}', ${data.numFlights}, ${data.numGates} );`;
	}
	else if (table === 'crew') {
		query += `CrewMembers (firstName, lastName, salary, yearsExperience, role, homebaseAirportID) `;
		query += `VALUES ( '${data.firstName}', '${data.lastName}', ${data.salary}, ${data.yrsExp}, '${data.role}', ${data.homebaseAirportID} );`;
	}
	else if (table === 'flights') {
		query += `Flights (numCrew, numPassengers, srcAirportID, destAirportID) `;
		query += `VALUES ( ${data.numCrew}, ${data.numPassengers}, ${data.srcAirportID}, ${data.destAirportID} );`;
	}
	else if (table === 'passengers') {
		query += `Passengers (firstName, lastName) `;
		query += `VALUES ( '${data.firstName}', '${data.lastName}' );`;
	}
	else if (table === 'flightcrew') {
		query += `FlightCrew (flightID, employeeID) `;
		query += `VALUES ( ${data.flightID}, ${data.employeeID} );`;
	}

	return query;
}


function make_update_query(table, data) {

	var query = `UPDATE `;

	if (table === 'airports') {
		query += `Airports `;
		query += `SET name = '${data.name}', city = '${data.city}', numFlights = ${data.numFlights}, numGates = ${data.numGates} `;
		query += `WHERE airportID = ${data.id};`;
	}
	else if (table === 'crew') {
		query += `CrewMembers `;
		query += `SET firstName = '${data.firstName}', lastName = '${data.lastName}', salary = ${data.salary}, yearsExperience = ${data.yrsExp}, role = '${data.role}', homebaseAirportID = ${data.homebaseAirportID} `;
		query += `WHERE employeeID = ${data.employeeID};`;
	}
	else if (table === 'flights') {
		query += `Flights `;
		query += `SET numCrew = ${data.numCrew}, numPassengers = ${data.numPassengers}, srcAirportID = ${data.srcAirportID}, destAirportID = ${data.destAirportID} `;
		query += `WHERE flightID = ${data.flightID};`;
	}
	else if (table === 'passengers') {
		query += `Passengers `;
		query += `SET firstName = '${data.firstName}', lastName = '${data.lastName}' `;
		query += `WHERE passengerID = ${data.id};`;
	}
	else if (table === 'flightcrew') {
		query += `FlightCrew `;
		query += `SET flightID = ${data.new_flightID}, employeeID = ${data.new_employeeID} `;
		query += `WHERE flightID = ${data.flightID} AND employeeID = ${data.employeeID};`;
	}

	return query;
}


function make_delete_query(table, data) {

	var query = `DELETE FROM `;

	if (table === 'airports') {
		query += `Airports `;
		query += `WHERE airportID = ${data.id};`;
	}
	else if (table === 'crew') {
		query += `CrewMembers `;
		query += `WHERE employeeID = ${data.id};`;
	}
	else if (table === 'flights') {
		query += `Flights `;
		query += `WHERE flightID = ${data.id};`;
	}
	else if (table === 'passengers') {
		query += `Passengers `;
		query += `WHERE passengerID = ${data.id};`;
	}
	else if (table === 'flightcrew') {
		query += `FlightCrew `;
		query += `WHERE flightID = ${data.flightID} AND employeeID = ${data.employeeID};`;
	}

	return query;
}


module.exports = {
    make_insert_query,
    make_update_query,
    make_delete_query
}