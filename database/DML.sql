-- Group 43 Project step 3
-- Data Manipulation SQL queries
--
-- Authors:
--      Steven Sarber & Cameron Canfield
--
-- ** NOTE **
--      Throughout this file, the $ character preceding words
--      represents a variable that will be used by our backend.


--
-- INSERT queries
--

-- Passengers:
INSERT INTO Passengers (firstName, lastName)
VALUES ($fName, $lName);

-- CrewMembers:
INSERT INTO CrewMembers (firstName, lastName, salary,
                         yearsExperience, role,
                         homebaseAirportID)
VALUES ($f_name, $l_name, $salary, $yrs_exp, $role, $home_airport);

-- Flights:
INSERT INTO Flights (numCrew, numPassengers, srcAirportID,
                     destAirportID)
VALUES ($num_crew, $num_passengers, $src_airport, $dest_airport);

-- Airports:
INSERT INTO Airports (name, city, numFlights, numGates)
VALUES ($airport_name, $city, $num_flights, $num_gates);

-- FlightCrew:
INSERT INTO FlightCrew (flightID, employeeID)
VALUES ($flight_id, $employee_id);

-- FlightPassengers:
INSERT INTO FlightPassengers (flightID, passengerID, seatNum,
                              isFirstClass, isCheckedIn)
VALUES ($flight_id, $passenger_id, $seat_num, $is_first_class,
        $is_checked_in);


--
-- SELECT queries
--

-- Passengers:
SELECT * FROM Passengers;

-- CrewMembers:
SELECT c.employeeID, c.firstName, c.lastName, c.salary, 
       c.yearsExperience, c.role, a.name AS homebaseAirport 
FROM CrewMembers c
JOIN Airports a ON c.homebaseAirportID = a.airportID;

-- Flights:
SELECT f.flightID, f.numCrew, f.numPassengers, a1.name AS srcAirport, a2.name AS destAirport
FROM Flights f
JOIN Airports a1 ON f.srcAirportID = a1.airportID
JOIN Airports a2 ON f.destAirportID = a2.airportID;

-- Airports:
SELECT * FROM Airports;

-- FlightCrew:
SELECT fc.flightID, fc.employeeID, a1.name AS srcAirport, a2.name AS destAirport, c.firstName, c.lastName
FROM FlightCrew fc
JOIN CrewMembers c ON fc.employeeID = c.employeeID
JOIN Flights f ON fc.flightID = f.flightID
JOIN Airports a1 ON f.srcAirportID = a1.airportID
JOIN Airports a2 ON f.destAirportID = a2.airportID
ORDER BY fc.flightID ASC;

-- FlightPassengers:
SELECT FlightPassengers.flightID, Passengers.firstName, Passengers.lastName,
       FlightPasssengers.seatNum, FlightPassengers.isFirstClass,
       FlightPassengers.isCheckedIn
FROM FlightPassengers
INNER JOIN Passengers ON FlightPassengers.passengerID = 
                         Passengers.passengerID
GROUP BY FlightPassengers.flightID
ORDER BY FlightPassengers.flightID ASC;


--
-- DELETE query
--

-- FlightPassengers:
DELETE FROM FlightPassengers 
WHERE passengerID = $passenger_id AND flightID = $flight_id;

-- Flights:
DELETE FROM Flights
WHERE flightID = $flight_id;

-- Passengers:
DELETE FROM Passengers
WHERE passengerID = $passenger_id;

-- CrewMembers:
DELETE FROM CrewMembers
WHERE employeeID = $employee_id;

-- FlightCrew:
DELETE FROM FlightCrew
WHERE flightID = $flight_id AND employeeID = $employee_id;


--
-- UPDATE query
--

-- FlightPassengers:
UPDATE FlightPassengers
SET seatNum = $seat_num, isFirstClass = $isFirstClass,
    isCheckedIn = $is_checked_in
WHERE passengerID = $passenger_id AND flightID = $flight_id;

UPDATE FlightCrew
SET flightID = $new_flight_id, employeeID = $new_employee_id
WHERE flightID = $flight_id AND employeeID = $employee_id