document.getElementById('orders').addEventListener('userOrders');

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

.then((res) => res.json)
.then(())