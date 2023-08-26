$(document).ready(function () {
  var token = localStorage.getItem("token");

  if (!token) {
    window.location.replace("login.html");
  }

  $("#addSellerBtn").click(function (e) {
    e.preventDefault();
    var sellerName = $("#sellerName").val();
    if (sellerName) {
      $.post(
        "./api/addSellers.php",
        { seller_name: sellerName },
        function (result) {
          result = JSON.parse(result);
          console.log(result);
          console.log(result.status);
          if (result.status) {
            alert(result.message);
            window.location.replace("./sellers.html");
          } else {
            alert(result.message);
          }
        }
      );
    } else {
      alert("Input Cannot Be Empty");
    }
  });
});
