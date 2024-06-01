-- Group 43 Project step 3
-- Data Definition SQL queries
--
-- Authors:
--      Steven Sarber & Cameron Canfield
--

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET foreign_key_checks = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Table structure for table Airports
--
CREATE OR REPLACE TABLE Airports (
  airportID int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  name varchar(255) NOT NULL,
  city varchar(255) NOT NULL,
  numFlights int(11) NOT NULL,
  numGates int(11) NOT NULL,
  PRIMARY KEY (airportID)
);

--
-- Dumping data for table Airports
--
INSERT INTO Airports (airportID, name, city, numFlights, numGates) 
VALUES
(1, 'JFK', 'New York', 560, 78),
(2, 'OHA', 'Chicago', 978, 129),
(3, 'PDX', 'Portland', 340, 38);

--
-- Table structure for table CrewMembers
--
CREATE OR REPLACE TABLE CrewMembers (
  employeeID int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  firstName varchar(50) NOT NULL,
  lastName varchar(50) NOT NULL,
  salary int(11) NOT NULL,
  yearsExperience int(11) NOT NULL,
  role varchar(255) NOT NULL,
  homebaseAirportID int(11),
  PRIMARY KEY (employeeID),
  FOREIGN KEY (homebaseAirportID) REFERENCES Airports(airportID)
);

--
-- Dumping data for table CrewMembers
--
INSERT INTO CrewMembers (employeeID, firstName, lastName, salary, yearsExperience, role, homebaseAirportID)
VALUES
(1, "Kermit", "Frog", 123000, 12, 'Captain', 1),
(2, "Miss", "Piggy", 145000, 15, 'Flight Manager', 3),
(3, "Animal", "Drummer", 103000, 7, 'Pilot', 2);

--
-- Table structure for table Flights
--
CREATE OR REPLACE TABLE Flights (
  flightID int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  numCrew int(11) NOT NULL,
  numPassengers int(11) NOT NULL,
  srcAirportID int(11) NOT NULL,
  destAirportID int(11) NOT NULL,
  PRIMARY KEY (flightID),
  FOREIGN KEY (srcAirportID) REFERENCES Airports(airportID),
  FOREIGN KEY (destAirportID) REFERENCES Airports(airportID)
);

--
-- Dumping data for table Flights
--
INSERT INTO Flights (flightID, numCrew, numPassengers, srcAirportID, destAirportID)
VALUES
(1, 9, 140, 1, 2),
(2, 4, 60, 2, 3),
(3, 7, 150, 3, 1);

--
-- Table structure for table FlightCrew
--
CREATE OR REPLACE TABLE FlightCrew (
  flightID int(11) NOT NULL,
  employeeID int(11) NOT NULL,
  FOREIGN KEY (flightID) REFERENCES Flights(flightID)
  ON DELETE CASCADE,
  FOREIGN KEY (employeeID) REFERENCES CrewMembers(employeeID)
  ON DELETE CASCADE
);

--
-- Dumping data for table FlightCrew
--
INSERT INTO FlightCrew (flightID, employeeID)
VALUES
(3, 1),
(2, 2),
(1, 3);

--
-- Table structure for table Passengers
--
CREATE OR REPLACE TABLE Passengers (
  passengerID int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  firstName varchar(255) NOT NULL,
  lastName varchar(255) NOT NULL,
  PRIMARY KEY (passengerID)
);

--
-- Dumping data for table Passengers
--
INSERT INTO Passengers (passengerID, firstName, lastName)
VALUES
(1, 'Barack', 'Obama'),
(2, 'Joe', 'Biden'),
(3, 'Donald', 'Trump');

--
-- Table structure for table FlightPassenger
--
CREATE OR REPLACE TABLE FlightPassengers (
  flightID int(11) NOT NULL,
  passengerID int(11) NOT NULL,
  seatNum varchar(3) NOT NULL,
  isFirstClass tinyint(1) NOT NULL,
  isCheckedIn tinyint(1) NOT NULL,
  FOREIGN KEY (flightID) REFERENCES Flights(flightID)
  ON DELETE CASCADE,
  FOREIGN KEY (passengerID) REFERENCES Passengers(passengerID)
  ON DELETE CASCADE
);

--
-- Dumping data for table FlightPassengers
--
INSERT INTO FlightPassengers (flightID, passengerID, seatNum, isFirstClass, isCheckedIn)
VALUES
(1, 3, '30', 1, 0),
(2, 2, '12', 1, 0),
(3, 1, '15', 1, 1);