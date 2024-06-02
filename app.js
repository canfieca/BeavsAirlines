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


// Express
var express = require('express'); 			// include express library for web server
var exphbs = require('express-handlebars'); // use handlebars templating engine

var app = express(); // instantiate express object
const port = 43043;  // set a port number for server to listen on

// setting up handlebars
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// Connect to database
var db = require('./helpers/db_connector');

// import helper functions
var db_queries = require('./helpers/db_queries');
var load = require('./helpers/load');

// print the URL the website can be accessed at
const os = require('os');
console.log("Hostname: http://" + os.hostname() + ":" + JSON.stringify(port));


// Information logger function
app.use(function (req, res, next) {
	console.log("== Request made");
	console.log("  - Method:", req.method);
	console.log("  - URL:", req.url);
	next();
});


// Routing functions
app.get('/', function(req, res) {
    res.status(200).render('homepage');
});

app.get('/:file', function(req, res) {
	const file = req.params.file;

	if (file === 'index') 
		res.status(200).render('homepage');

	else if (file === 'style.css') 
		res.status(200).sendFile('public/css/style.css', {root: __dirname});

	// if client requests a javascript file
	else if (file.slice(-3) === '.js')
		res.status(200).sendFile('/public/js/' + file, {root: __dirname});
	
	else if (file === 'airports')
		load.send_airports_page(db, res);
	
	else if (file === 'crew')
		load.send_crew_page(db, res);
	
	else if (file === 'flights')
		load.send_flights_page(db, res);
	
	else if (file === 'passengers')
		load.send_passengers_page(db, res);
	
	else if (file === 'flightCrew')
		load.send_flight_crew_page(db, res);
	
	else if (file === 'flightPassenger')
		load.send_flight_passenger_page(db, res);
	
	else /* TODO: make real 404 page */
		res.status(404).send('<h1>Error, could not find page</h1>');
})

app.post('/add/:table', function(req, res) {

	// get which entity is being added to
	const table = req.params.table;

	// get data from request body
	var data = "";
	req.on("data", chunk => {
		data += chunk;
	});

	req.on("end", () => {
		
		// convert string into JSON object
		var record_info = JSON.parse(data);

		var query = db_queries.make_insert_query(table, record_info);

		console.log(query)

		// add record to DB
		db.pool.query(query, function(err, results, fields) {
			console.log(err, results)
		});
	});

	// send message back so client reloads page
	res.status(200).send("Success");
})

app.post('/update/:table', function(req, res) {

	// get which entity is being added to
	const table = req.params.table;

	// get data from request body
	var data = "";
	req.on("data", chunk => {
		data += chunk;
	});

	req.on("end", () => {
		
		// convert string into JSON object
		var record_info = JSON.parse(data);

		var query = db_queries.make_update_query(table, record_info);

		console.log(query)

		// update record in DB
		db.pool.query(query, function(err, results, fields) {
			console.log(err, results)
		});
	});

	// send message back so client reloads page
	res.status(200).send("Success");
})


app.post('/delete/:table', function(req, res) {

	// get which entity is being added to
	const table = req.params.table;

	// get data from request body
	var data = "";
	req.on("data", chunk => {
		data += chunk;
	});

	req.on("end", () => {

		// convert string into JSON object
		var record_info = JSON.parse(data);

		var query = db_queries.make_delete_query(table, record_info);

		// delete record from DB
		db.pool.query(query);
	});

	// send message back so client reloads page
	res.status(200).send("Success");
});

// Listener
app.listen(port);