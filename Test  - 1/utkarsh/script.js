function validateForm() {
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let email = document.getElementById("email").value;
    let phnnum = document.getElementById("phnnum").value;
    let dateOfBirth = document.getElementById("dateOfBirth").value;
  
  
    if (fname.length == 0) {
      document.getElementById("firstnameMessage").innerHTML =
        "Enter your firstname";
  
      document.getElementById("firstnameMessage").style.color = "red";
    } else {
      document.getElementById("firstnameMessage").style.display = "none";
    }
  
    if (lname.length == 0) {
      document.getElementById("lastNameMessage").innerHTML =
        "Enter your lastname";
      document.getElementById("lastNameMessage").style.color = "red";
    } else {
      document.getElementById("lastNameMessage").style.display = "none";
    }
  
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.length == 0) {
      document.getElementById("mailMessage").innerHTML = "Enter email";
      document.getElementById("mailMessage").style.color = "red";
    } else if (!emailRegex.test(email)) {
      document.getElementById("mailMessage").innerHTML = "Invalid email format.";
      document.getElementById("mailMessage").style.color = "red";
      return false;
    } else {
      document.getElementById("mailMessage").style.display = "none";
    }
  
    let phnnumRegex = /^[9]\d{9}$/;
    if (phnnum.length == 0) {
      document.getElementById("phoneNumber").innerHTML = "Enter phone number";
      document.getElementById("phoneNumber").style.color = "red";
    } else if (!phnnumRegex.test(phnnum)) {
      document.getElementById("phoneNumber").innerHTML = "Invalid phone number format. ";
      document.getElementById("phoneNumber").style.color = "red";
      return false;
    } else {
      document.getElementById("phoneNumber").style.display = "none";
    }
  
    if (dateOfBirth.length == 0) {
      document.getElementById("dateofbirth").innerHTML =
        "Enter your date of birth";
      document.getElementById("dateofbirth").style.color = "red";
    } else {
      document.getElementById("dateofbirth").style.display = "none";
    }
    
  }
  
  $(document).ready(function () {
    $.get("https://dog.ceo/api/breeds/image/random", function (data, status) {
      const image = data.message;
      console.log(data);
      $("#images").append(`
          <img src="${image}" class="card-img-top" alt="cannot display img">
        `);
    });
  
    $.get("https://catfact.ninja/fact", function (data, status) {
      const quotes = data.fact;
      console.log(data);
  
      $("#quotes").append(`
          
            <p>${quotes}</p>
       
        `);
    });
  });
  