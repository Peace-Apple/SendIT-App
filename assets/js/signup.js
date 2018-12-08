document.getElementById('create_account').addEventListener('submit', createAccount);

function createAccount(e){

     e.preventDefault()
     user_name = document.getElementById('username').value;
     email = document.getElementById('email').value;
     phone_number = document.getElementById('phone').value;
     password = document.getElementById('password').value;

    console.log(user_name, phone_number, email, password);

    fetch('http://127.0.0.1:5000/api/v2/auth/signup/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
			'Access-Control-Allow-Origin': '*'

        },
        cache: 'no-cache',
        body: JSON.stringify({
            user_name: user_name,
            email: email,
            phone_number: phone_number,
            password: password
         })
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.status === 'success'){
        window.location.href = 'index.html';
        }else{
        console.log(data);
        console.log(data.status);
        alert(data.error_message);
        }
    });
}