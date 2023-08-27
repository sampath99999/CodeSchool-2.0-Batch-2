let validProductId = false,
  validProductPrice = false,
  validProductName = false;

function validateInput(event) {
  const input = event.target;
  const currentValue = input.value;
  const newValue = currentValue.replace(/[^0-9]/g, "");
  input.value = newValue;
}

function addProduct() {
  console.log("clicked!");
  let productId = $("#product_id").val();
  let productName = $("#product_name").val();
  let productPrice = $("#product_price").val();
  let numOfProducts = $("#items_in_inventory").val();
  console.log(productId);
  console.log(productName);
  console.log(productPrice);

  if (productId.length == 0) {
    validProductId = false;
    $("#productIdErrorMessage").text("Please enter product ID");
  } else {
    validProductId = true;
    $("#productIdErrorMessage").text("");
  }

  if (productPrice.length == 0) {
    validProductPrice = false;
    $("#productPriceErrorMessage").text("Please enter product price");
  } else {
    validProductPrice = true;
    $("#productPriceErrorMessage").text("");
  }

  if (validProductId && validProductPrice) {
    $.post(
      "api/addProduct.php",
      {
        productId: productId,
        productPrice: productPrice,
        productName: productName,
        numOfProducts: numOfProducts,
      },
      function (result) {
        var result = JSON.parse(result);
        console.log(result.message);
        $("#addProductErrorMessage").text(result.message);
      }
    );
  } else {
    $("#addProductErrorMessage").text("");
  }
}
