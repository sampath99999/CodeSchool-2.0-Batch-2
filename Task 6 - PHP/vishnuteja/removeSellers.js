$(document).ready(load());

let sellerIDs;
function load() {
  $.get("api/sellers.php", function (result) {
    console.log(result);
    var result = JSON.parse(result);
    if (result) {
      response(result);
    }
  });
}

let sellersDataShown = false;

function removeSellers() {
  console.log("remove sellers");

  let checkedSellers = $(".checkBox:checked");
  let checkedSellersIds = [];

  checkedSellers.each(function () {
    const sellerId = $(this).attr("id");
    checkedSellersIds.push(sellerId);
  });

  console.log("checked seller ids:", checkedSellersIds);
  $.post(
    "api/removeSellers.php",
    { sellers: checkedSellersIds },
    function (result) {
      console.log(result);
      var res = JSON.parse(result);
      console.log("rem products:", res);
      response(res);
    }
  );
}

function response(data) {
  console.log(data);

  sellerIDs = data.sellerId;
  console.log("product ids is :", sellerIDs);

  if (sellersDataShown) {
    $("#sellersList").empty();

    var tableCreation = ` <div id="sellersTable">
    <h4>Sellers List</h4>
    <table class="table m-2">
    <thead>
        <tr>
            <th scope="col">select seller</th>
            <th scope="col">Seller Id</th>
            <th scope="col">Seller Name</th>
            <th scope="col">Product Id</th>
        </tr>
    </thead>
    <tbody id="tableBody">
  
    </tbody>
  </table>
  </div>`;

    $(".sellers-list").append(tableCreation);

    for (var i = 0; i < data.sellerId.length; i++) {
      console.log(data.sellerId[i]);
      console.log(data.sellerName[i]);
      console.log(data.productId[i]);

      var content = `<tr>
      <td scope="row"> <input class="form-check-input checkBox" type="checkbox" value="" id=${data.sellerId[i]}>
      <label class="form-check-label" for=${data.sellerId[i]}>
         remove item
      </label></th>
     <td>${data.sellerId[i]}</td>
     <td>${data.sellerName[i]}</td>
     <td>${data.productId[i]}</td>
   </tr>;`;

      $("#tableBody").append(content);
    }
  }

  if (!sellersDataShown) {
    sellersDataShown = true;
    var tableCreation = ` <div>
      <h4>Sellers List</h4>
      <table class="table m-2">
      <thead>
      <tr>
      <th scope="col">select seller</th>
      <th scope="col">Seller Id</th>
      <th scope="col">Seller Name</th>
      <th scope="col">Product Id</th>
     </tr>
      </thead>
      <tbody id="tableBody">
    
      </tbody>
    </table>
    </div>`;

    $(".sellers-list").append(tableCreation);

    for (var i = 0; i < data.sellerId.length; i++) {
      console.log(data.sellerId[i]);
      console.log(data.sellerName[i]);
      console.log(data.productId[i]);

      var content = `<tr>
        <td scope="row"> <input class="form-check-input checkBox" type="checkbox" value="" id=${data.sellerId[i]}>
        <label class="form-check-label" for=${data.sellerId[i]}>
           remove item
        </label></th>
       <td>${data.sellerId[i]}</td>
       <td>${data.sellerName[i]}</td>
       <td>${data.productId[i]}</td>
     </tr>;`;

      $("#tableBody").append(content);
    }
  }
}
