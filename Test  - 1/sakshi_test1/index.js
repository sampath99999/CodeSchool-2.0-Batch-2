document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
    if (document.formfill.Username.value == "") {
      document.getElementById("result").innerHTML = "Enter Username*";
      return false;
    }
  
    if (document.formfill.Username.value.length < 6) {
      document.getElementById("result").innerHTML = "Atleast 6 characters*";
      return false;
    }
  
    if (document.formfill.Email.value == "") {
      document.getElementById("result").innerHTML = "Enter email*";
      return false;
    }
    
    if (document.formfill.Number.value == "") {
        if (Number.value.startsWith("91") && Number.value.length >= 10 && Number.value.length <= 12) {
        document.getElementById("result").innerHTML = "Enter valid number*";
        return false;
      }
    }

    if (document.formfill.Password.value == "") {
      document.getElementById("result").innerHTML = "Enter password*";
      return false;
    }
  
    if (document.formfill.Password.value.length < 8) {
      document.getElementById("result").innerHTML =
        "Password must have atleast 8-digit*";
      return false;
    }
  
    if (document.formfill.cPassword.value == "") {
      document.getElementById("result").innerHTML = "Confirm the password*";
      return false;
    }
  
    if (document.formfill.Password.value !== document.formfill.cPassword.value) {
      document.getElementById("result").innerHTML = "Password doesn't match*";
      return false;
    } 
    else{
        window.location.href = "newpage.html";
    }
    var mail = document.getElementById("Email").value;
    var pass = document.getElementById("Password").value;
    
  });