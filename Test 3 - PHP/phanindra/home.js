$(document).ready(function () {
  var userId = localStorage.getItem("token");
  if (!userId) {
    window.location.replace("login.html");
  }
  var token = localStorage.getItem("token");

  $("#dashboardBtn").click(function () {
    $.get("api/send_data.php", { products: "" }, function (tableData) {
      var tableData = JSON.parse(tableData);
      console.log(tableData);

      $("#tableContainer").empty();

      $("#tableContainer").append(`
                    <table style="height:300px;"  class="table table-hover table-bordered border border-dark table-responsive text-center">
                        <thead class="tableHead bg-primary bg-opacity-25 text-dark">
                            <tr></tr>
                        </thead>
                        <tbody class="tableRow">
                        </tbody>
                    </table>`);

      for (let each in tableData["data"][0]) {
        $(".tableHead tr").append(`<th>${each.toLocaleUpperCase()}</th>`);
      }

      for (let each of tableData.data) {
        var row = "";
        for (let i in each) {
          console.log(i);
          if (i === "productimage") {
            row += `<td><img style="height:50px;width:50px; border-radius:50%;" src="${each[i]}" alt="Product Image" width="100"></td>`;
          } else {
            row += `<td>${each[i]}</td>`;
          }
        }
        $(".tableRow").append(
          `<tr class="bg-info bg-opacity-10 text-dark">${row}</tr>`
        );
      }
    });
  });

  $("#addBtn").click(function () {
    var productImage = $("#productImage").val();
    var productName = $("#productName").val();
    var category = $("#category").val();
    console.log(category);
    var sku = $("#sku").val();

    var price = $("#price").val();

    var variant = $("#variant").val();

    $.post(
      "api/add_user_data.php",
      {
        productImage: productImage,
        productName: productName,
        category: category,
        sku: sku,
        price: price,
        variant: variant,
      },
      function (result) {
        console.log(result);
        var parsedResult = JSON.parse(result);
        var trimmedResult = result.trim();
        var parsedResult = JSON.parse(trimmedResult);

        if (!parsedResult.status) {
          alert(parsedResult.message);
        } else {
          $("#modalMessage").text(parsedResult.message);

          var productId = parsedResult.id;

          var newRow = '<tr class="bg-info bg-opacity-10 text-dark">';
          newRow += "<td>" + productId + "</td>";
          newRow += "<td>" + `<img src=${productImage}/>` + "</td>";
          newRow += "<td>" + productName + "</td>";
          newRow += "<td>" + category + "</td>";
          newRow += "<td>" + sku + "</td>";
          newRow += "<td>" + price + "</td>";
          newRow += "<td>" + variant + "</td>";

          newRow = +"</tr>";

          $(".tableRow").append(newRow);

          $("#productImage").val("");
          $("#productName").val("");
          $("#category").val("");
          $("#sku").val("");
          $("#price").val("");
          $("#variant").val("");
        }
      }
    );
  });
});
