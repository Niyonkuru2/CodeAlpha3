const registerForm = document.getElementById("registerForm");

//handling register form

registerForm.addEventListener('submit',async function(e){
    e.preventDefault();

    //user inputs to register
    const name = document.getElementById("nameRegister").value;
    const username = document.getElementById("usernameRegister").value;
    const email = document.getElementById("emailRegister").value;
    const password = document.getElementById("passwordRegister").value;
    try {
    const res = await fetch('http://localhost:7060/api/user/register',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
            name:String(name),
            username:String(username),
            email:String(email),
            password:String(password)
        })
    });
    const result= await res.json();
    if (result.success) {
        alert('User Registered Successfull')
        window.location.href="login.html";
    }else{
document.getElementById('register-error-message').textContent = result.message;
document.getElementById('register-error-message').style.display ='block'
    }

    } catch (error) {
      console.error('Error:',error);  
    }
});
