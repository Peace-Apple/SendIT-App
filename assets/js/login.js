document.getElementById('login').addEventListener('submit', loginUser);

function loginUser(e){
     e.preventDefault()
     user_name = document.getElementById('user').value;
     password = document.getElementById('pass').value;

    console.log(user_name, password);

    fetch('http://127.0.0.1:5000/api/v2/auth/login/', {
    method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type':'application/json',
			'Access-Control-Allow-Origin': '*'

        },
        cache: 'no-cache',
        body: JSON.stringify({
            user_name: user_name,
            password: password
         })
    })

    .then((res) => res.json())
    .then((data) => {
        let token = data.access_token;
        let admin = data.logged_in_as;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("account_user", admin);
        if (data.status === 'success'){
            if (admin === 'Apple'){
                window.location.href = 'admin.html';

            }else{
                window.location.href = 'vieworder.html';
            }

        }else{
            console.log(data);
            alert(data.message);
        }
    });
}