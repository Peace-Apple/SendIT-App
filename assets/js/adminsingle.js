if(/admindetail.html/.test(window.location.href)){

  let parcel_url = window.location.href
  let url = new URL(parcel_url)
  let parcel_id = url.searchParams.get("parcel")

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
        console.log(response_object.data.parcel_id);

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
            </tr>

        `;
            output += `

                <tr id="parcels">
                    <td>${response_object.data.parcel_id}</td>
                    <td>${response_object.data.user_name}</td>
                    <td>${response_object.data.email}</td>
                    <td>${response_object.data.phone_number}</td>
                    <td>${response_object.data.receivers_name}</td>
                    <td>${response_object.data.pickup_location}</td>
                    <td>${response_object.data.destination}</td>
                    <td>${response_object.data.weight}</td>
                    <td>${response_object.data.order_date}</td>
                    <td>${response_object.data.delivery_status}
                    <p class="links">
                        <label><a href="" onclick = "updateStatus();">Edit</a></label>
                     </p>
                    </td>
                    <td>${response_object.data.present_location}
                    <p class="links">
                        <label><a href="" onclick = "updatePresentLocation();">Edit</a></label>
                     </p>
                    </td>
              </td>

            </tr>`;

        document.getElementById('parcelDetail').innerHTML = output;

    } else {
        console.log(response_object.message);
    }
    });
  }

function updateStatus(){
    let parcel_url = window.location.href
    let url = new URL(parcel_url)
    let parcel_id = url.searchParams.get("parcel")
    var new_status = window.prompt("Enter new status")

    fetch('http://127.0.0.1:5000/api/v2/parcels/'+parcel_id+'/status/', {
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
            document.getElementById('updateParcel').innerHTML = new_status
            alert(response_object.message)
        }
        else{
            alert(response_object.error_message)
        }

    })
}

function updatePresentLocation(){
    let parcel_url = window.location.href
    let url = new URL(parcel_url)
    let parcel_id = url.searchParams.get("parcel")
    var new_location = window.prompt("Enter new location")
    console.log(parcel_id);

    fetch('http://127.0.0.1:5000/api/v2/parcels/'+parcel_id+'/presentLocation/', {
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
            document.getElementById('updateLocation').innerHTML = new_location
            alert(response_object.message)
        }
        else{
        }

    })
}

