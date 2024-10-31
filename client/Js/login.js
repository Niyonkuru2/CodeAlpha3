const loginForm = document.getElementById("loginForm");

//handling register form

loginForm.addEventListener('submit',async function(e){
    e.preventDefault();

    //user inputs to register
    const username = document.getElementById("usernameLogin").value;
    const password = document.getElementById("passwordLogin").value;
    try {
    const res = await fetch('http://localhost:7060/api/user/login',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            username:String(username), 
            password:String(password)
        })
    });
    const result= await res.json();
    if (result.success) {
        window.location.href="index.html";
        alert('Login Successfull')
    }else{
document.getElementById('login-error-message').textContent = result.message;
document.getElementById('login-error-message').style.display ='block'
    }

    } catch (error) {
      console.error('Error:',error);  
    }
});
//check if user is logged in for a token

document.addEventListener(function(){
    const token = localStorage.getItem('authToken');
    if (!token) {
        window.location.href='/login'
    }
})
