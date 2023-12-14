let validSellerId = false,
  validProductId = false,
  validSellerName = false;

function validateInput(event) {
  const input = event.target;
  const currentValue = input.value;
  const newValue = currentValue.replace(/[^0-9]/g, "");
  input.value = newValue;
}

function addSeller() {
  console.log("clicked!");
  let productId = $("#product_id").val();
  let sellerName = $("#seller_name").val();
  let sellerId = $("#seller_id").val();
  console.log(productId);
  console.log(sellerName);
  console.log(sellerId);

  if (productId.length == 0) {
    validProductId = false;
    $("#productIdErrorMessage").text("Please enter product ID");
  } else {
    validProductId = true;
    $("#productIdErrorMessage").text("");
  }

  if (sellerName.length == 0) {
    validSellerName = false;
    $("#sellerNameErrorMessage").text("Please enter seller name");
  } else {
    validProductPrice = true;
    $("#sellerNameErrorMessage").text("");
  }

  if (sellerId.length == 0) {
    validSellerId = false;
    $("#sellerIdErrorMessage").text("Please enter seller Id");
  } else {
    validSellerId = true;
    $("#sellerIdErrorMessage").text("");
  }

  if (validProductId && validProductPrice && validSellerId) {
    $.post(
      "api/addSeller.php",
      {
        productId: productId,
        sellerId: sellerId,
        sellerName: sellerName,
      },
      function (result) {
        var result = JSON.parse(result);
        console.log(result.message);
        $("#addSellerErrorMessage").text(result.message);
      }
    );
  } else {
    $("#addSellerErrorMessage").text("");
  }
}
