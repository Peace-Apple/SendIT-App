
fetch('http://127.0.0.1:5000/api/v2/parcels/', {
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
    if (response_object.message === 'Successfully got all parcel delivery orders'){
        let order_data = response_object.data;
        console.log(response_object);
        console.log(response_object.data);

        let output = `

                <tr id="parcels_head">
                    <th>ID</th>
                    <th>Sender</th>
                    <th>Senders Email</th>
                    <th>Senders Contact</th>
                    <th>Receiver</th>
                    <th>Pickup Location</th>
                    <th>Destination</th>
                    <th>Weight</th>
                    <th>Order Date</th>
                    <th>Delivery Status</th>
                    <th>Present Location</th>
                    <th>Edit Status</th>
                    <th>Edit Present Location</th>
                    <th>View Detail</th>
                </tr>

            `;

        for(var i=0; i < response_object.data.length; i++){
            output += `

                <tr id="parcels">
                        <td>${response_object.data[i].parcel_id}</td>
                        <td>${response_object.data[i].user_name}</td>
                        <td>${response_object.data[i].email}</td>
                        <td>${response_object.data[i].phone_number}</td>
                        <td>${response_object.data[i].receivers_name}</td>
                        <td>${response_object.data[i].pickup_location}</td>
                        <td>${response_object.data[i].destination}</td>
                        <td>${response_object.data[i].weight}</td>
                        <td>${response_object.data[i].order_date}</td>
                        <td id="statusUpdate">${response_object.data[i].delivery_status}</td>
                        <td id="locationUpdate">${response_object.data[i].present_location}</td>
                        <td><p class="links">
                        <label><button onclick = "updateStatus(${response_object.data[i].parcel_id});">Edit</button></label>
                        </p></td>
                        <td><p class="links">
                        <label><button onclick = "updatePresentLocation(${response_object.data[i].parcel_id});">Edit</button></label>
                        </p></td>
                        <td><p class="links">
                            <label><a href ='admindetail.html?parcel=${response_object.data[i].parcel_id}'>View</a></label>
                        </p></td>
                  </td>

                </tr>`;
        }

        document.getElementById('parcelOrders').innerHTML = output;

    } else {
        console.log(response_object.message);
    }
});

function updateStatus(parcel_id){
    var new_status = window.prompt("Enter new status")

    fetch(`http://127.0.0.1:5000/api/v2/parcels/${parcel_id}/status/`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        cache: 'no-cache',
        body: JSON.stringify({
            delivery_status: new_status
        })

    })
    .then((res) => res.json())
    .then((response_object) => {
        console.log(response_object);

        if(response_object.message === 'Status has been updated successfully'){
            document.getElementById('statusUpdate').innerHTML = new_status
            alert(response_object.message)
        }
        else{
            alert(response_object.error_message)
        }

    })
}

function updatePresentLocation(parcel_id){
    var new_location = window.prompt("Enter new location")

    fetch(`http://127.0.0.1:5000/api/v2/parcels/${parcel_id}/presentLocation/`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        cache: 'no-cache',
        body: JSON.stringify({
            present_location: new_location
        })

    })
    .then((res) => res.json())
    .then((response_object) => {
        console.log(response_object);
        if(response_object.message === 'Present location has been updated successfully'){
            document.getElementById('locationUpdate').innerHTML = new_location
            alert(response_object.message)
        }
        else{
            alert(response_object.error_message)
        }

    })
}







