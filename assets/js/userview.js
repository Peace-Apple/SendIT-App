document.addEventListener("DOMContentLoaded", userOrders)
function userOrders(){
    fetch('http://127.0.0.1:5000/api/v2/users/<int:user_id>/parcels/', {
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
        if (response_object.message === 'Successfully got all orders belonging to user'){
            let order_data = response_object.data;
            console.log(response_object);
            console.log(response_object.data);

            let output = '';

            for(var i=0; i < response_object.data.length; i++){
                output +=
                     "<tr>"+
                        "<td>"+
                            '<div class="order-content">'+
                                "<h3>PARCEL</h3>"+
                                '<p class="links">'+
                                    "<label><strong>"+
                                    "Posted At : </strong>'+response_object.data[i].order_date+'</label>"+
                                    "&nbsp;&nbsp;&nbsp;&nbsp;"+
                                    '<label><a href="detail.html">More Detail</a></label>'+
                                "</p>"+
                            "</div>"+

                        "</td>"+
                        "</tr>";
            }

            document.getElementById('user_parcels').innerHTML = output;

        } else {
            console.log(response_object.message);
        }
    })
    }


