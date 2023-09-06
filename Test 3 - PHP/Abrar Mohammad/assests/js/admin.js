var userToken = localStorage.getItem("access_token");
if (!userToken) {
  window.location.href = "login.html";
} else {
  $(document).ready(function () {
    var fileErrMsg = true;
    var titleErrMsg = true;
    var descriptionErrMsg = true;
    var categoryErrMsg = true;
    $(".titleErr").hide();
    $(".titleErr").css({ color: "red", fontSize: "12px" });
    $(".fileErr").hide();
    $(".fileErr").css({ color: "red", fontSize: "12px" });
    $(".descriptionErr").hide();
    $(".descriptionErr").css({ color: "red", fontSize: "12px" });
    $(".categoryErr").hide();
    $(".categoryErr").css({ color: "red", fontSize: "12px" });
    $("#titleEl").blur(function () {
      if ($(this).val() === "") {
        $(".titleErr").show();
      } else {
        $(".titleErr").hide();
      }
    });
    $("#fileEl").blur(function () {
      if ($(this).val() === "") {
        $(".fileErr").show();
      } else {
        $(".fileErr").hide();
      }
    });
    $("#descriptionEl").blur(function () {
      if ($(this).val() === "") {
        $(".descriptionErr").show();
      } else {
        $(".descriptionErr").hide();
      }
    });
    $("#categoryEl").blur(function () {
      if ($(this).val() === "") {
        $(".categoryErr").show();
      } else {
        $(".categoryErr").hide();
      }
    });

    function validateTitle() {
      var titleVal = $("#titleEl").val();
      if ((titleVal, length === 0)) {
        $(".titleErr").show();
        titleErrMsg = true;
      } else {
        $(".titleErr").hide();
        titleErrMsg = false;
      }
    }

    function validateFile() {
      var fileVal = $("#fileEl").val();
      if (fileVal.length === 0) {
        $(".fileErr").show();
        fileErrMsg = true;
      } else {
        $(".fileErr").hide();
        fileErrMsg = false;
      }
    }

    function validateDescription() {
      var descVal = $("#descriptionEl").val();
      if (descVal.length === 0) {
        $(".descriptionErr").show();
        descriptionErrMsg = true;
      } else {
        $(".descriptionErr").hide();
        descriptionErrMsg = false;
      }
    }

    function validateCategory() {
      var categoryVal = $("#categoryEl").val();
      if (categoryVal.length === 0) {
        $(".categoryErr").show();
        categoryErrMsg = true;
      } else {
        $(".categoryErr").hide();
        categoryErrMsg = false;
      }
    }

    $("#addPostBtn").click(function (event) {
      event.preventDefault();
      var title = $("#titleEl").val();
      var description = $("#descriptionEl").val();
      var category = $("#categoryEl").val();
      var uploadingFile = $("#fileEl")[0].files[0];
      var postData = new FormData();
      postData.append("imageUrl", uploadingFile);
      postData.append("title", title);
      postData.append("description", description);
      postData.append("category", category);
      $.ajax({
        url: "./api/posts.php",
        method: "POST",
        data: postData,
        processData: false,
        contentType: false,
        cache: false,
        success: function (response) {
          $("#fileEl").val("");
          $("#titleEl").val("");
          $("#descriptionEl").val("");
          $("#categoryEl").val("");
        },
        error: function (xhr, status, error) {
          console.error(error);
        },
      });
    });
    $("#logoutBtn").click(function () {
      $.post("./api/logout.php", function () {
        localStorage.removeItem("access_token");
        window.location.replace("login.html");
      });
    });
  });
}
