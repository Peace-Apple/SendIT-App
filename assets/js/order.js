document.getElementById('order').addEventListener('submit', makeOrder);

function makeOrder(e){
     e.preventDefault()
     receivers_name = document.getElementById('receiver').value;
     pickup_location = document.getElementById('pickup').value;
     destination = document.getElementById('destination').value;
     weight = document.getElementById('weight').value;

     console.log(receivers_name, pickup_location, destination, weight);

     fetch('http://127.0.0.1:5000/api/v2/parcels/', {
     method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
			'Access-Control-Allow-Origin': '*'

        },
        body: JSON.stringify({
            receivers_name: receivers_name,
            pickup_location: pickup_location,
            destination: destination,
            weight: weight
         })

     })
     .then((res) => res.json())
     .then((response_object) => {
        let message = response_object.message
        console.log(response_object);
        if(message === 'Successfully posted a parcel delivery order'){
            alert(message);
            window.location.href = 'vieworder.html';
        }else{
            alert(response_object.error_message);
        }
     });

}