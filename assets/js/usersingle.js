if(/detail.html/.test(window.location.href)){

  let parcel_url = window.location.href
  console.log(parcel_url);
  let url = new URL(parcel_url)
  console.log(url);
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

        let output = '';
            output += `

                    <tr><td><b>Sender: </b>${response_object.data.user_name}</td></tr>
                    <tr><td><b>Receiver: </b>${response_object.data.receivers_name}</td></tr>
                    <tr><td><b>Pickup Location: </b>${response_object.data.pickup_location}</td></tr>
                    <tr><td><b>Destination: </b>${response_object.data.destination}</td></tr>
                    <tr><td><b>Weight: </b>${response_object.data.weight}</td></tr>
                    <tr><td><b>Order Date: </b>${response_object.data.order_date}</td></tr>
                    <tr><td><b>Delivery Status: </b>${response_object.data.delivery_status}</td></tr>
                    <tr><td><b>Present Location: </b>${response_object.data.present_location}</td></tr>
                    `;

        document.getElementById('parcelDetail').innerHTML = output;

    } else {
        console.log(response_object.message);
    }
    });
  }
