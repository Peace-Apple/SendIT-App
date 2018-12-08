if(/detail.html/.test(window.location.href)){

  let parcel_url = window.location.href
  let url = new URL(parcel_url)
  let parcel_id = url.searchParams.get("parcel")
    console.log(parcel_id);

    fetch('http://127.0.0.1:5000/api/v2/parcels/'+parcel_id, {
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
    if (response_object.message === 'Successfully got one parcel delivery order'){
        console.log(response_object);
        console.log(response_object.data);
        console.log(response_object.data.parcel_id);

        let output = `

            <tr id="parcels_head">
                <th>ID</th>
                <th>Senders Name</th>
                <th>Receivers Name</th>
                <th>Pickup Location</th>
                <th>Destination</th>
                <th>Weight</th>
                <th>Order Date</th>
                <th>Delivery Status</th>
                <th>Present Location</th>
            </tr>

        `;
            output += `

                <tr id="parcels">
                    <td>${response_object.data.parcel_id}</td>
                    <td>${response_object.data.user_name}</td>
                    <td>${response_object.data.receivers_name}</td>
                    <td>${response_object.data.pickup_location}</td>
                    <td id="destinationUpdate">${response_object.data.destination}
                    <p class="links">
                        <label><button onclick = "updateDestination();">Edit</button></label>
                     </p>
                    </td>
                    <td>${response_object.data.weight}</td>
                    <td>${response_object.data.order_date}</td>
                    <td>${response_object.data.delivery_status}
                    <p class="links">
                        <label><button>Edit</button></label>
                     </p>
                    </td>
                    <td>${response_object.data.present_location}</td>
              </td>

            </tr>`;

        document.getElementById('parcelDetail').innerHTML = output;

    } else {
        console.log(response_object.message);
    }
    });
  }

function updateDestination(){
    let parcel_url = window.location.href
    let url = new URL(parcel_url)
    let parcel_id = url.searchParams.get("parcel")
    var new_destination = window.prompt("Enter new destination")
    console.log(parcel_id);

    fetch('http://127.0.0.1:5000/api/v2/parcels/'+parcel_id+'/destination/', {
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



