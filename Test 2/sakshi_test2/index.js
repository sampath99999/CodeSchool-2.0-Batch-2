
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    const errorElement = document.getElementById("error");
    const dataTableBody = document.getElementById("data-table-body");
    

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const name = document.getElementById("Name").value;
        const email = document.getElementById("Email").value;
        const subject = document.getElementById("Subject").value;
        const dob = document.getElementById("dob").value;
        const message = document.getElementById("message").value;

        if (name === "" || email === "" || subject === "" || dob === "" || message === "") {
            event.preventDefault();
            errorElement.value = "All fields are required.";
        }
        const formData = {
            "Name": name,
            "Email": email,
            "dob": dob,
            "Subject": subject,
            "Message": message,
        };
        const response = await fetch("https://demo-api-wh0x.onrender.com/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error("API request failed");
        }

        const newUser = await response.json();
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${newUser.name}</td>
            <td>${newUser.email}</td>
            <td>${newUser.subject}</td>
            <td>${newUser.dob}</td>
            <td>${newUser.message}</td>
         `;
        dataTableBody.appendChild(newRow);
            // form.reset();
    });
});