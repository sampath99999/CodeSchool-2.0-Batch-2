function validateAndSubmit() {
  var RegistrationObj = {
    firstname: document.getElementById("firstname").value,
    lastname: document.getElementById("lastname").value,
    phonenumber: document.getElementById("phonenumber").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    gender: document.querySelector('input[name="gender"]:checked').value,
    confirmPassword: document.getElementById("re-enterpassword").value,
    dateofbirth: document.getElementById("dateofbirth").value,
  };
  if (!validateData(RegistrationObj)) {
    return false;
  } else {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/phptask/api/register.php";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          console.log(xhr.responseText);
          var result = JSON.parse(xhr.responseText.trim());
          console.log(result);
          console.log(result.message);

          if (!result.status) {
            alert(result.message);
          } else {
            console.log(hii);
            window.location.replace("login.html");
            //document.getElementById("result").textContent = result.message;
          }
        } else {
          console.error("POST request failed:", xhr.status, xhr.statusText);
        }
      }
    };
    xhr.send(JSON.stringify(RegistrationObj));
  }
}

function validateData(RegistrationObj) {
  var flag = 1;
  if (
    RegistrationObj.firstname == "" ||
    RegistrationObj.firstname.match(/[^a-zA-Z]/g)?.length > 0
  ) {
    document.getElementById("firstnameerr").style.display = "block";
    document.getElementById("firstnameerr").innerHTML = "Enter Valid Name";
    document.getElementById("firstnameerr").style.color = "red";
    flag = 0;
  } else {
    document.getElementById("firstnameerr").style.display = "none";
  }

  if (
    RegistrationObj.lastname == "" ||
    RegistrationObj.lastname.match(/[^a-zA-Z]/g)?.length > 0
  ) {
    document.getElementById("lastnameerr").style.display = "block";
    document.getElementById("lastnameerr").innerHTML = "Enter Valid Name";
    document.getElementById("lastnameerr").style.color = "red";
    flag = 0;
  } else {
    document.getElementById("lastnameerr").style.display = "none";
  }

  var getSelectedValue = document.querySelector('input[name="gender"]:checked');
  if (getSelectedValue == null) {
    document.getElementById("checkerr").style.display = "block";
    document.getElementById("checkerr").innerHTML =
      "please, select the gender.";
    document.getElementById("checkerr").style.color = "red";
  } else {
    document.getElementById("checkerr").style.display = "none";
  }

  if (
    RegistrationObj.phonenumber.match(/\D/g)?.length > 0 ||
    RegistrationObj.phonenumber.length != 10
  ) {
    document.getElementById("phonenumbererr").style.display = "block";
    document.getElementById("phonenumbererr").innerHTML =
      "Enter valid phoneNumber";
    document.getElementById("phonenumbererr").style.color = "red";
    flag = 0;
  } else {
    document.getElementById("phonenumbererr").style.display = "none";
  }
  const presentdate = Date();

  if (RegistrationObj.dateofbirth > presentdate) {
    document.getElementById("dateerr").innerHTML = "Enter Valid dateOfBirth";
    flag = 0;
  } else {
    document.getElementById("dateerr").style.display = "none";
  }

  if (
    RegistrationObj.email.match(/@gmail.com|edu.in|@reqres.in/g)?.length != 1
  ) {
    document.getElementById("emailerr").innerHTML = "Enter valid mailId";
    document.getElementById("emailerr").style.color = "red";
    flag = 0;
  } else {
    document.getElementById("emailerr").style.display = "none";
  }
  if (RegistrationObj.password.length < 8) {
    document.getElementById("passworderr").innerHTML =
      "password length must be atleast 8.";
    document.getElementById("passworderr").style.color = "red";
    flag = 0;
  } else if (
    RegistrationObj.password.match(/[a-z]+[0-9]+[@#$%^&_*$!-]+/g)?.length != 1
  ) {
    document.getElementById("passworderr").innerHTML =
      "password must contain atleast one digit & special character";
    document.getElementById("passworderr").style.color = "red";
    flag = 0;
  } else {
    document.getElementById("passworderr").style.display = "none";
    console.log(RegistrationObj.password);
  }

  if (RegistrationObj.password != RegistrationObj.confirmPassword) {
    console.log(RegistrationObj.password);
    console.log(RegistrationObj.confirmPassword);
    document.getElementById("err").innerHTML = "Password doesn't match";
    document.getElementById("err").style.color = "red";
    flag = 0;
  } else {
    document.getElementById("err").style.display = "none";
  }
  if (flag == 1) {
    return true;
  } else {
    return false;
  }
}
