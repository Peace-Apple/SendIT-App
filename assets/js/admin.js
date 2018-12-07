
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

            let output = '';

            for(var i=0; i < response_object.data.length; i++){
                output += `<tr>
                        <td>
                            <div class="order-content">
                                <h3>ORDER ${response_object.data[i].parcel_id}</h3>
                                <p class="links">
                                    <label id="date"><strong>
                                    Posted At: ${response_object.data[i].order_date}</strong></label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <label><button onclick = "detailedParcel(${response_object.data[i].parcel_id});"><a href="admindetail.html">More Detail</a></button></label>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <label><button onclick="deleteOrder()"><a href="#">Delete</a></button></label>
                                </p>

                            </div>
                        </td>
                      </tr>`;
            };

            document.getElementById('parcelOrders').innerHTML = output;

        } else {
            console.log(response_object.message);
        }
    });

function detailedParcel(parcel_id){
    let modal = document.getElementById('detail');
    fetch(`http://127.0.0.1:5000/api/v2/parcels/${parcel_id}`, {
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
            let parcel_data = response_object.data;
            console.log(response_object);
            console.log(response_object.data);

            tab_data = '';
            for(var i=0; i < response_object.data.length; i++){

                tab_data += `<tr>
                        <td><b>Senders Name:</b></td><td>${response_object.data[i].user_name}</td></tr>
                        <tr><td><b>Senders Email:</b></td><td>${response_object.data[i].email}</td></tr>
                        <tr><td><b>Senders Contact:</b></td><td>${response_object.data[i].phone_number}</td></tr>
                        <tr><td><b>Receivers Name:</b></td><td>${response_object.data[i].receivers_name}</td></tr>
                        <tr><td><b>Pickup Location:</b></td><td>${response_object.data[i].pickup_location}</td></tr>
                        <tr><td><b>Destination:</b></td><td>${response_object.data[i].destination}</td></tr>
                        <tr><td><b>Weight:</b></td><td>${response_object.data[i].weight}</td></tr>
                        <tr><td><b>Order Date:</b></td><td>${response_object.data[i].order_date}</td></tr>
                        <tr><td><b>Delivery Status:</b></td><td>${response_object.data[i].delivery_status}</td>
                        <td class="links"><label onclick="editOrder()"><a href="#">Edit</a></label>
                                                &nbsp;&nbsp;&nbsp;&nbsp;</td></tr>
                        <tr><td><b>Present Location:</b></td><td>${response_object.data[i].present_location}</td>
                        <td class="links"><label onclick="editOrder()"><a href="#">Edit</a></label>
                                                &nbsp;&nbsp;&nbsp;&nbsp;</td></tr>`;


            document.getElementById('parcel_detail').innerHTML = tab_data;
            modal.style.display = "block";
        };
    }
    });
    }





