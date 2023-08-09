function validate() {
    var RegistrationObj = {
        firstname: document.getElementById("firstName").value,
        lastname: document.getElementById("lastName").value,
        email: document.getElementById("emailId").value,
        country: document.getElementById("country").value,
        monthlyamount: document.getElementById("monthlyAmount").value,
        companywebsite: document.getElementById("companyWebsite").value,
        suggestion: document.getElementById("suggestionBox").value
    };
    if (!validateData(RegistrationObj)) {
        return false;
    }
    else {
        var userstring = JSON.stringify(RegistrationObj);
        console.log(userstring);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://reqres.in/api/register");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function () {
            var response = JSON.parse(xhr.responseText);
            document.getElementById("message").innerHTML = response.token + " is created at " + response.id;
            console.log(xhr.responseText);
        };
        xhr.send(userstring);
    }
}

function validateData(RegistrationObj) {
    var flag = 1;
    RegistrationObj.firstname = RegistrationObj.firstname.trim();
    RegistrationObj.lastname = RegistrationObj.lastname.trim();
    RegistrationObj.email = RegistrationObj.email.trim();
    RegistrationObj.companywebsite = RegistrationObj.companywebsite.trim();
    RegistrationObj.suggestion = RegistrationObj.suggestion.trim();

    if (RegistrationObj.firstname == "" || RegistrationObj.firstname.match(/[^a-zA-Z]/g)?.length > 0) {
        document.getElementById("firstnameErr").style.display = "block";
        document.getElementById("firstnameErr").innerHTML = "Enter Valid Name";
        flag = 0;
    }
    else { document.getElementById("firstnameErr").style.display = "none"; }
    console.log(RegistrationObj.country);
    console.log(RegistrationObj.monthlyamount);

    if (RegistrationObj.lastname == "" || RegistrationObj.lastname.match(/[^a-zA-Z]/g)?.length > 0) {
        document.getElementById("lastnameErr").style.display = "block";
        document.getElementById("lastnameErr").innerHTML = "Enter Valid Name";
        flag = 0;
    }
    else { document.getElementById("lastnameErr").style.display = "none"; }


    if (RegistrationObj.email.match(/@gmail.com|edu.in|@reqres.in/g)?.length != 1) {
        document.getElementById("emailErr").style.display = "block";
        document.getElementById("emailErr").innerHTML = "Enter valid mailid";
        flag = 0;
    }
    else { document.getElementById("emailErr").style.display = "none"; }

    if (RegistrationObj.companywebsite.match(/.com|.in/g)?.length != 1) {
        document.getElementById("companywebsiteErr").style.display = "block";
        document.getElementById("companywebsiteErr").innerHTML = "Enter valid website";
        flag = 0;
    }
    else { document.getElementById("companywebsiteErr").style.display = "none"; }

    if (RegistrationObj.country = "") {
        document.getElementById("countryErr").style.display = "block";
        document.getElementById("countryErr").innerHTML = "Please select country";
        flag = 0;
    }
    else { document.getElementById("countryErr").style.display = "none"; }

    if (RegistrationObj.monthlyamount == "0") {
        document.getElementById("paymentsvolumeErr").style.display = "block";
        document.getElementById("paymentsvolumeErr").innerHTML = "please select amount";
        flag = 0;
    }
    else { document.getElementById("paymentsvolumeErr").style.display = "none"; }
    console.log(typeof RegistrationObj.suggestion);
    if (RegistrationObj.suggestion.length == 0) {
        document.getElementById("textareaErr").style.display = "block";
        document.getElementById("textareaErr").innerHTML = "please enter about projects,needs and timeline";
        flag = 0;
    }
    else { document.getElementById("textareaErr").style.display = "none"; }

    if (flag == 1) {
        return true;
    }
    else {
        return false;
    }
};
$(document).ready(function () {
    $.get("https://type.fit/api/quotes", function (data, status) {
        let k = JSON.parse(data);
        console.log(k[7].text);
        $("#quote").append(`<span class="text-secondary">` + k[7].text + `</span>`);
    });
    $.get("https://fakestoreapi.com/products?limit=10", function (imagedata, status) {
        $("#quote").append(`<img class="img-fluid my-2" src="` + imagedata[8].image + `"/>`);
    });

});
