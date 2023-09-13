const modal = document.getElementById("myModal");
const closeModal = document.getElementById("closeModal");
const modalcon = document.getElementById("modal-content");
const showModalLink = document.getElementById("show-modal-link");

function openModal() {
  modal.style.display = "block";
  modalcon.style.display = "block";
}

function close() {
  modal.style.display = "none";
}

showModalLink.addEventListener("click", openModal);

closeModal.addEventListener("click", close);

modal.addEventListener("click", close);

modal.addEventListener("click", function (event) {
  event.stopPropagation();
});

modal.querySelectorAll("input").forEach(function (input) {
  input.addEventListener("click", function (event) {
    event.stopPropagation();
  });
});

$("#submit").click(function () {
  var name = $("#name").val();
  var email = $("#email").val();
  var number = $("#number").val();
  var password = $("#password").val();

  $.post(
    "api/modal.php",
    { name: name, email: email, number: number, password: password },
    function (result) {
      var result = JSON.parse(result);
      if (!result.status) {
        alert(result.message);
      } else {
        window.location.replace("home.html");
      }
    }
  );
});
