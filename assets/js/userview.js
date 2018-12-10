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
                </tr>

            `;

        for(var i=0; i < response_object.data.length; i++){
            output += `

                <tr id="parcels">
                        <td>${response_object.data[i].user_name}</td>
                        <td>${response_object.data[i].receivers_name}</td>
                        <td>${response_object.data[i].pickup_location}</td>
                        <td>${response_object.data[i].destination}
                        <p class="links">
                            <label><a href='detail.html?parcel=${response_object.data[i].parcel_id}'>Edit</a></label>
                         </p>
                        </td>
                        <td>${response_object.data[i].weight}</td>
                        <td>${response_object.data[i].order_date}</td>
                        <td>${response_object.data[i].delivery_status}
                        <p class="links">
                            <label><a href='detail.html?parcel=${response_object.data[i].parcel_id}'>Cancel</a></label>
                         </p>
                        </td>
                        <td>${response_object.data[i].present_location}</td>
                  </td>

                </tr>`;
        }

        document.getElementById('user_parcels').innerHTML = output += "</table>";

    } else {
        console.log(response_object.message);
    }
});
