
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");

const emailErrorMsgEl =document.getElementById("emailErrorMsg");
const passwordErrorMsgEl = document.getElementById("passwordErrorMsg");

const password = passwordEl.value.trim();


let passwordValidate;
let emailValidate;

function passwordValidation(){
    const password = passwordEl.value.trim();
    
if(password===""){
    passwordErrorMsgEl.innerHTML="*Password must not be empty";
    passwordValidate=false;
  } else if(password.length<8){
    passwordErrorMsgEl.innerHTML="*Password must be at least 8 characters long."
    passwordValidate=false;
  } else if(!/[A-Z]/.test(password)){
    passwordErrorMsgEl.innerHTML="*Password must contain at least one uppercase letter."
    passwordValidate=false;
  } else if(!/[a-z]/.test(password) ){
    passwordErrorMsgEl.innerHTML="*Password must contain at least one lowercase letter."
    passwordValidate=false;
  } else if(!/[0-9]/.test(password)){
    passwordErrorMsgEl.innerHTML="*Password must contain at least one digit"
    passwordValidate=false;
  }else if (!/[!@#$%^&*]/.test(password)) {
    passwordErrorMsgEl.innerHTML = 'Password must contain at least one special character (!@#$%^&*).';
    passwordValidate=false;
  } else {
    passwordValidate=true;
  }
     
}


function emailValidattion(){
    const email = emailEl.value.trim();
   // const alphabeticRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(email===""){
      emailErrorMsgEl.innerHTML="*Email must not be empty"
      emailValidate=false;
    } else if(!(emailRegex).test(email)){
      emailErrorMsgEl.innerHTML="*Please enter valid email"
      emailValidate=false;
    } else {
      emailValidate=true;
    }
}


function onSubmitForm(){
    event.preventDefault();
    emailValidattion(); 
    passwordValidation();

}

$(document).ready(function(){
  
    $("#pswdIcon").click(function(){
      if(password.type==="password"){
        password.type="text";
      } else {
        password.type="password"
      }
    }) 

    if(passwordValidate && emailValidate){
      
      $("#loginBtn").click(function(){
       
        $.get('https://api.api-ninjas.com/v1/quotes?category=R3vOy79QCZrlAZjkLRLXyg==ozuc4kUKFMuznnlh',function(data,response){
             console.log(data)
        })
      })
    }





}) 




// R3vOy79QCZrlAZjkLRLXyg==ozuc4kUKFMuznnlh
