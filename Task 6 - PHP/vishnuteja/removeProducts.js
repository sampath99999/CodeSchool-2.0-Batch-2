$(document).ready(load());

let productIDs;
function load() {
  $.get("api/products.php", function (result) {
    console.log(result);
    var result = JSON.parse(result);
    if (result) {
      response(result);
    }
  });
}

let productsDataShown = false;

function removeProducts() {
  console.log("remove products");

  let checkedProducts = $(".checkBox:checked");
  let checkedProductIds = [];

  checkedProducts.each(function () {
    const productId = $(this).attr("id");
    checkedProductIds.push(productId);
  });

  $.post(
    "api/removeProducts.php",
    { products: checkedProductIds },
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

  productIDs = data.productId;
  console.log("product ids is :", productIDs);

  if (productsDataShown) {
    $("#productsList").empty();

    var tableCreation = ` <div id="productsTable">
    <h4>Products List</h4>
    <table class="table m-2">
    <thead>
        <tr>
            <th scope="col">select products</th>
            <th scope="col">Product Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Items in inventory</th>
            <th scope="col">Price</th>
        </tr>
    </thead>
    <tbody id="tableBody">
  
    </tbody>
  </table>
  </div>`;

    $(".products-list").append(tableCreation);

    for (var i = 0; i < data.productId.length; i++) {
      console.log(data.productId[i]);
      console.log(data.productName[i]);
      console.log(data.NumberOfItems[i]);
      console.log(data.price[i]);

      var content = `<tr>
      <td scope="row"> <input class="form-check-input checkBox" type="checkbox" value="" id=${data.productId[i]}>
      <label class="form-check-label" for=${data.productId[i]}>
         remove item
      </label></th>
     <td>${data.productId[i]}</td>
     <td>${data.productName[i]}</td>
     <td>${data.NumberOfItems[i]}</td>
     <td>${data.price[i]}</td>
   </tr>;`;

      $("#tableBody").append(content);
    }
  }

  if (!productsDataShown) {
    productsDataShown = true;
    var tableCreation = ` <div>
      <h4>Products List</h4>
      <table class="table m-2">
      <thead>
          <tr>
              <th scope="col">select products</th>
              <th scope="col">Product Id</th>
              <th scope="col">Product Name</th>
              <th scope="col">Items in inventory</th>
              <th scope="col">Price</th>
          </tr>
      </thead>
      <tbody id="tableBody">
    
      </tbody>
    </table>
    </div>`;

    $(".products-list").append(tableCreation);

    for (var i = 0; i < data.productId.length; i++) {
      console.log(data.productId[i]);
      console.log(data.productName[i]);
      console.log(data.NumberOfItems[i]);
      console.log(data.price[i]);

      var content = `<tr>
        <td scope="row"> <input class="form-check-input checkBox" type="checkbox" value="" id=${data.productId[i]}>
        <label class="form-check-label" for=${data.productId[i]}>
           remove item
        </label></th>
       <td>${data.productId[i]}</td>
       <td>${data.productName[i]}</td>
       <td>${data.NumberOfItems[i]}</td>
       <td>${data.price[i]}</td>
     </tr>;`;

      $("#tableBody").append(content);
    }
  }
}
