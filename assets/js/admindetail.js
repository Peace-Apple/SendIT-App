document.addEventListener("DOMContentLoaded", detailedParcel)
function detailedParcel(parcel){
    let parcel_detail = parcel.parentNode.id;
    fetch('http://127.0.0.1:5000/api/v2/parcels/'+parcel_detail, {
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
            let order_data = response_object.data;
            console.log(response_object);
            console.log(response_object.data);

            let output = '';

            for(var i=0; i < response_object.data.length; i++){
                output +=
                     "<tr>"+
                        "<td>"+
                            '<div class="order-content">'+
                                '<h3>'+'ORDER '+response_object.data[i].parcel_id+'</h3>'+
                                '<p class="links">'+
                                    '<label id="date"><strong>'+
                                    'Posted At :'+response_object.data[i].order_date+'</strong></label>'+
                                    "&nbsp;&nbsp;&nbsp;&nbsp;"+
                                    '<label><a href="admindetail.html">More Detail</a></label>'+
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
    })
    }


