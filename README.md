NOTE: for the insert query for FlightPassengers, the data must be
sent from the client as a JSON object of this format:

{
    flight_id: [fid],
    passenger_id: [pid],
    seat_num: "[seat num]",
    is_first_class: [BOOL],
    is_checked_in: [BOOL]
}