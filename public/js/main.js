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


function delete_record(table) {

    // get record to delete (entered by user)
    const data = {
        id: document.getElementById('delete-id').value
    }

    send_custom_fetch_request('delete', table, data);
}