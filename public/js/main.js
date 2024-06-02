// main.js

function send_custom_fetch_request(crud_type, table, data) {

    // send the data to app.js using fetch
    fetch(`${crud_type}/${table}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        window.location.reload();
    })
}