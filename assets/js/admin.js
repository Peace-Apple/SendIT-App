"use strict";
document.addEventListener("DOMContentLoaded", allOrders)
function allOrders(){
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
                output += "<tr>"+
                        "<td>"+
                            '<div class="order-content">'+
                                '<h3>'+'ORDER '+response_object.data[i].parcel_id+'</h3>'+
                                '<p class="links">'+
                                    '<label id="date"><strong>'+
                                    'Posted At :'+response_object.data[i].order_date+'</strong></label>'+
                                    "&nbsp;&nbsp;&nbsp;&nbsp;"+
                                    '<label>'+
                                    '<a href="admindetail.html" id="detail" onclick="detailedParcel('+response_object.data[i].parcel_id+')">'+
                                    'More Detail</a></label>'+
                                    "&nbsp;&nbsp;&nbsp;&nbsp;"+
                                    '<label onclick="deleteOrder()"><a href="#">Delete</a></label>'+
                                "</p>"+

                            '</div>'+
                        "</td>"+
                      "</tr>";
            }

            document.getElementById('parcels').innerHTML = output;

        } else {
            console.log(response_object.message);
        }
    });
    }


function detailedParcel(parcel_id){
    let parcel_detail = document.getElementById('detail');
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

            document.getElementById("date").innerHTML = 'Posted At : '+parcel_data.order_date;
//            document.getElementById("sender").innerHTML = parcel_data.user_name;
//            document.getElementById("semail").innerHTML = parcel_data.email;
//            document.getElementById("scontact").innerHTML = parcel_data.phone_number;
//            document.getElementById("receiver").innerHTML = parcel_data.receivers_name;
//            document.getElementById("pickup").innerHTML = parcel_data.pickup_location;
//            document.getElementById("destination").innerHTML = parcel_data.destination;
//            document.getElementById("weight").innerHTML = parcel_data.weight;
//            document.getElementById("status").innerHTML = parcel_data.delivery_status;
//            document.getElementById("presentlocation").innerHTML = parcel_data.present_location;


        } else {
            console.log(response_object.message);
        }
    });
    }





