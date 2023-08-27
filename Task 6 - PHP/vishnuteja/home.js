var productsDataShown = false;
var ordersShown = false;
var sellersShown = false;
var sellersAndProductsShown = false;

$("#productsList").click(function (e) {
  e.preventDefault();
  ordersShown = false;
  sellersShown = false;
  sellersAndProductsShown = false;
  $("#welcomeMsg").remove();
  console.log("products list clicked!");
  $.get("api/products.php", function (result) {
    console.log(result);
    var result = JSON.parse(result);
    if (result) {
      productsList(result);
    }
  });
});

function productsList(data) {
  console.log(data);

  if (!productsDataShown) {
    productsDataShown = true;
    $("#itemsList").empty();
    var tableCreation = ` <div>
  <h4>Products List</h4>
  <table class="table m-2">
  <thead>
      <tr>
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
   <th scope="row">${data.productId[i]}</th>
   <td>${data.productName[i]}</td>
   <td>${data.NumberOfItems[i]}</td>
   <td>${data.price[i]}</td>
 </tr>;`;

      $("#tableBody").append(content);
    }
  }
}

$("#ordersList").click(function (e) {
  e.preventDefault();
  productsDataShown = false;
  sellersShown = false;
  sellersAndProductsShown = false;
  $("#welcomeMsg").remove();
  console.log("orders list clicked");
  $.get("api/ordersList.php", function (result) {
    console.log("orders list", result);
    var orders = JSON.parse(result);
    ordersList(orders);
    console.log("orders List is :", orders);
  });
});

function ordersList(data) {
  if (!ordersShown) {
    ordersShown = true;
    $("#itemsList").empty();
    var tableCreation = ` <div>
    <h4>Orders List</h4>
    <table class="table m-2">
    <thead>
        <tr>
            <th scope="col">Order Id</th>
            <th scope="col">User Id</th>
            <th scope="col">Product Id</th>
            <th scope="col">Card Id</th>
            <th scope="col">Order Date</th>
            <th scope="col">Order Time</th>
            <th scope="col">Delivery Date</th>
            <th scope="col">Delivery Time</th>
        </tr>
    </thead>
    <tbody id="tableBody">
  
    </tbody>
  </table>
  </div>`;

    $(".products-list").append(tableCreation);

    for (var i = 0; i < data.orderId.length; i++) {
      var content = `<tr>
      <th scope="row">${data.orderId[i]}</th>
      <td>${data.userId[i]}</td>
      <td>${data.productId[i]}</td>
      <td>${data.cardId[i]}</td>
      <td>${data.orderDate[i]}</td>
      <td>${data.orderTime[i]}</td>
      <td>${data.deliveryDate[i]}</td>
      <td>${data.deliveryTime[i]}</td>
    </tr>;`;

      $("#tableBody").append(content);
    }
  }
}

$("#sellersList").click(function (e) {
  e.preventDefault();
  productsDataShown = false;
  ordersShown = false;
  sellersAndProductsShown = false;
  $("#welcomeMsg").remove();
  console.log("sellers list clicked");
  $.get("api/sellers.php", function (result) {
    console.log("sellers list", result);
    var sellers = JSON.parse(result);
    console.log(sellers);
    sellersList(sellers);
  });
});

function sellersList(data) {
  if (!sellersShown) {
    sellersShown = true;
    $("#itemsList").empty();
    var tableCreation = ` <div>
  <h4>Sellers List</h4>
  <table class="table m-2">
  <thead>
      <tr>
          <th scope="col">Seller Id</th>
          <th scope="col">Seller Name</th>
          <th scope="col">Product Id</th>
      </tr>
  </thead>
  <tbody id="tableBody">

  </tbody>
</table>
</div>`;

    $(".products-list").append(tableCreation);

    for (var i = 0; i < data.sellerId.length; i++) {
      var content = `<tr>
      <td scope="row">${data.sellerId[i]}</th>
      <td>${data.sellerName[i]}</td>
      <td>${data.productId[i]}</td>
    </tr>;`;

      $("#tableBody").append(content);
    }
  }
}

$("#sellersAndProducts").click(function (e) {
  e.preventDefault();
  productsDataShown = false;
  ordersShown = false;
  sellersShown = false;
  $("#welcomeMsg").remove();
  console.log("sellers list clicked");
  $.get("api/sellersAndProducts.php", function (result) {
    console.log("sellers and products list", result);
    var sellersProducts = JSON.parse(result);
    sellersAndProducts(sellersProducts);
    console.log(sellersProducts);
  });
});

function sellersAndProducts(data) {
  if (!sellersAndProductsShown) {
    sellersAndProductsShown = true;
    $("#itemsList").empty();
    var tableCreation = ` <div>
    <h4>Sellers And Products Mapping List</h4>
    <table class="table m-2">
    <thead>
        <tr>
            <th scope="col">Seller Id</th>
            <th scope="col">Seller Name</th>
            <th scope="col">Product Id</th>
            <th scope="col">Product Name</th>
            <th scope="col">Items in inventory</th>
        </tr>
    </thead>
    <tbody id="tableBody">
  
    </tbody>
  </table>
  </div>`;

    $(".products-list").append(tableCreation);

    for (var i = 0; i < data.sellerId.length; i++) {
      var content = `<tr>
      <th scope="row">${data.sellerId[i]}</th>
      <td>${data.sellerName[i]}</td>
      <td>${data.productId[i]}</td>
      <td>${data.productName[i]}</td>
      <td>${data.Items_In_Inventory[i]}</td>
    </tr>;`;

      $("#tableBody").append(content);
    }
  }
}

$("#logout").click(function () {
  localStorage.removeItem("token");
  window.location.replace("index.html");
});
