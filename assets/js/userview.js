if(/vieworder.html/.test(window.location.href)){
var payload = JSON.parse(atob(localStorage.getItem('accessToken').split('.')[1]));
console.log(payload.identity[0]);
console.log(payload)
var user_id = payload.identity[0];

fetch(`http://127.0.0.1:5000/api/v2/users/${user_id}/parcels/`, {
method: 'GET',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
    'Access-Control-Allow-Origin': '*'

}
})

.then((res) => res.json())
.then((response_object) => {
    let profile = `
         <img src="assets/images/avatar.jpg">
         <div>
            <h2>${payload.identity[1]}</h2>
            <p><b>Email:</b> ${payload.identity[2]}</p>
            <p><b>Contact:</b> ${payload.identity[3]}</p>
         </div>

    `;
    document.getElementById('my_profile').innerHTML = profile

    if (response_object.message === 'Successfully got all orders belonging to user'){
        let order_data = response_object.data;
        console.log(response_object);
        console.log(response_object.data[0]['user_name']);

        let output = `
            <table width="99%">
                <tr id="parcels_head">
                    <th>Sender</th>
                    <th>Receiver</th>
                    <th>Pickup Location</th>
                    <th>Destination</th>
                    <th>Weight</th>
                    <th>Order Date</th>
                    <th>Delivery Status</th>
                    <th>Present Location</th>
                    <th>Edit Destination</th>
                    <th>Cancel Delivery</th>
                    <th>View Detail</th>
                </tr>

            `;

        for(var i=0; i < response_object.data.length; i++){
            output += `

                <tr id="parcels">
                        <td>${response_object.data[i].user_name}</td>
                        <td>${response_object.data[i].receivers_name}</td>
                        <td>${response_object.data[i].pickup_location}</td>
                        <td id="destinationUpdate">${response_object.data[i].destination}</td>
                        <td>${response_object.data[i].weight}</td>
                        <td>${response_object.data[i].order_date}</td>
                        <td id="parcelCancel">${response_object.data[i].delivery_status}</td>
                        <td>${response_object.data[i].present_location}</td>
                        <td>
                        <p class="links">
                        <label><button onclick = "updateDestination(${response_object.data[i].parcel_id});">Edit</button></label>
                        </p>
                        </td>
                        <td>
                        <p class="links">
                        <label><button onclick = "cancelParcel(${response_object.data[i].parcel_id});">Cancel</button></label>
                        </p>
                        </td>
                        <td><p class="links">
                            <label><a href='detail.html?parcel=${response_object.data[i].parcel_id}'>View</a></label>
                         </p></td>
                  </td>

                </tr>`;
        }

        document.getElementById('user_parcels').innerHTML = output += "</table>";

    } else {
        console.log(response_object.message);
    }
});

function updateDestination(parcel_id){
    var new_destination = window.prompt("Enter new destination")

    fetch(`http://127.0.0.1:5000/api/v2/parcels/${parcel_id}/destination/`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        cache: 'no-cache',
        body: JSON.stringify({
            destination: new_destination
        })

    })
    .then((res) => res.json())
    .then((response_object) => {
        console.log(response_object);
        if(response_object.message === 'Destination has been updated successfully'){
            document.getElementById('destinationUpdate').innerHTML = new_destination
            alert(response_object.message)
        }
        else{
            alert(response_object.error_message)
        }

    })
}

function cancelParcel(parcel_id){
    var cancel_parcel = "cancelled"

    fetch(`http://127.0.0.1:5000/api/v2/parcels/${parcel_id}/cancel/`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        cache: 'no-cache',
        body: JSON.stringify({
            delivery_status: cancel_parcel
        })

    })
    .then((res) => res.json())
    .then((response_object) => {
        console.log(response_object);
        if(response_object.message === 'Parcel delivery order has been cancelled successfully'){
            document.getElementById('parcelCancel').innerHTML = cancel_parcel
            alert(response_object.message)
        }
        else{
            alert(response_object.error_message)
        }

    })
}
}
