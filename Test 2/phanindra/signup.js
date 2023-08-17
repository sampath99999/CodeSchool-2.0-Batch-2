const emailEl = document.getElementById("email2");
const passwordEl = document.getElementById("createPassword");

const confirmPasswordEl = document.getElementById("confirmPassword");
const confirmPasswordErrorMsgEl = document.getElementById("confirmPasswordErrorMsg")

const emailErrorMsgEl =document.getElementById("emailErrorMsg");
const passwordErrorMsgEl = document.getElementById("passwordErrorMsg");

const phoneNumberEl = document.getElementById("phoneNumber");
const phoneNumberErrorMsgEl =document.getElementById("phoneNumberErrorMsg");



function confirmPasswordFun(){
    const confirmPassword = confirmPasswordEl.value.trim();  
    const password = passwordEl.value.trim();

    if(confirmPassword===""){
        confirmPasswordErrorMsgEl.innerHTML="*Password must not be empty";
    } else if(password !== confirmPassword){
        confirmPasswordErrorMsgEl.innerHTML="*Password do not match";
    }
}


function passwordValidation(){
    const password = passwordEl.value.trim();
    
if(password===""){
    passwordErrorMsgEl.innerHTML="*Password must not be empty";
  } else if(password.length<8){
    passwordErrorMsgEl.innerHTML="*Password must be at least 8 characters long."
  } else if(!/[A-Z]/.test(password)){
    passwordErrorMsgEl.innerHTML="*Password must contain at least one uppercase letter."
  } else if(!/[a-z]/.test(password) ){
    passwordErrorMsgEl.innerHTML="*Password must contain at least one lowercase letter."
  } else if(!/[0-9]/.test(password)){
    passwordErrorMsgEl.innerHTML="*Password must contain at least one digit"
  }else if (!/[!@#$%^&*]/.test(password)) {
    passwordErrorMsgEl.innerHTML = 'Password must contain at least one special character (!@#$%^&*).';
  }
  
    
}

function emailValidattion(){
    const email = emailEl.value.trim();
   // const alphabeticRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(email===""){
      emailErrorMsgEl.innerHTML="*Email must not be empty"
    } else if(!(emailRegex).test(email)){
      emailErrorMsgEl.innerHTML="*Please enter valid email"
    }

}







function onSubmitForm(){
    event.preventDefault();
   
    emailValidattion(); 
    passwordValidation();
    confirmPasswordFun();

  const number = phoneNumberEl.value.trim();

    if(number===""){
      phoneNumberErrorMsg.innerHTML="*Number must not be empty";
    } else if (!numValidation(number)){
      phoneNumberErrorMsg.innerHTML="*Please enter valid phone number";
    }
    
    function numValidation(){
      const numbericNumber = number.replace(/\D/g, '');
    
      if(numbericNumber.length !==10){
        return false;
      }
      return true;
    }

}