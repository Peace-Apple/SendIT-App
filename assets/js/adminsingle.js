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
        console.log(response_object.data);
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
                    <td>${response_object.data.delivery_status}</td>
                    <td >${response_object.data.present_location}</td>
            </tr>`;

        document.getElementById('parcelDetail').innerHTML = output;

    } else {
        console.log(response_object.message);
    }
    });
  }

