$(document).ready(function () {
  
  $.get(
    "api/electronics.php",
    {
      name: $("#productname").val(),
      price: $("#price").val(),
      image_url: $("#image_url").val(),
    },
    function (result) {
      console.log(result);

      var response = JSON.parse(result);

      if (response.status === true) {
        var products = response.data;

        for (let i = 0; i < products.length; i += 4) {
          const product1 = products[i];
          const product2 = products[i + 1];
          const product3 = products[i + 2];
          const product4 = products[i + 3];

          $("#product").append(`


            <h1 style="text-align: center;">ELECTRONIC PRODUCTS</h1><br>
          
                <div class="card" style="width: 18rem; border: 1px solid; margin-bottom: 40px;">
                <img src="${product1.image_url}"class="card-img-top" alt="..." style="margin-top:10px;">
                <div class="card-body">
                  <h5 class="card-title">${product1.productname}</h5>
                  <p class="card-text">Rs. ${product1.price}</p>
                  <button type="button" class="btn btn-primary productsBtn" id="1" name="product_details">Know more</button>
                </div>
              </div>
    
                <div class="card" style="width: 18rem; border: 1px solid; margin-bottom: 40px;">
                   <img src="${product2.image_url}" class="card-img-top" alt="..."  height ="50%" style="margin-top: 50px;">
                      <div class="card-body">
                        <h5 class="card-title">${product2.productname}</h5>
                        <p class="card-text">Rs. ${product2.price}</p>
                        <button type="button" class="btn btn-primary productsBtn" id="2" name="product_details">Know more</button>
                   </div>
                </div>
    
                <div class="card" style="width: 18rem; border: 1px solid; margin-bottom: 40px;">
                   <img src="${product3.image_url}" class="card-img-top" alt="..."  height ="50%" style="margin-top: 50px;">
                      <div class="card-body">
                        <h5 class="card-title">${product3.productname}</h5>
                        <p class="card-text">Rs. ${product3.price}</p>
                        <button type="button" class="btn btn-primary productsBtn" id="3" name="product_details">Know more</button>
                   </div>
                </div>
    
                <div class="card" style="width: 18rem; border: 1px solid; margin-bottom: 40px;">
                   <img src="${product4.image_url}" class="card-img-top" alt="..."  height ="50%" style="margin-top: 50px;">
                      <div class="card-body">
                        <h5 class="card-title">${product4.productname}</h5>
                        <p class="card-text">Rs. ${product4.price}</p>
                        <button type="button" class="btn btn-primary productsBtn" id="4" name="product_details">Know more</button>
                </div>
                </div>
             `);
        }
      }
    }
  );

  $.get(
    "api/clothes.php",
    {
      dressname: $("#dressname").val(),
      price: $("#price").val(),
      image_url: $("#image_url").val(),
    },
    function (result) {
      console.log(result);

      var response = JSON.parse(result);

      if (response.status === true) {
        var clothes = response.data;

        for (let i = 0; i < clothes.length; i += 4) {
          const dress1 = clothes[i];
          const dress2 = clothes[i + 1];
          const dress3 = clothes[i + 2];
          const dress4 = clothes[i + 3];

          $("#dress").append(`
    
                <div class="card" style="width: 18rem; border: 1px solid; margin-bottom: 40px;">
                <img src="${dress1.image_url}"class="card-img-top" alt="..." height="255px;" style="margin-top: 70px;">
                <div class="card-body">
                  <h5 class="card-title">${dress1.dressname}</h5>
                  <p class="card-text">Rs. ${dress1.price}</p>
                  <button type="button" class="btn btn-primary clothesBtn" id="1" name="clothes_details">Know more</button>
                </div>
              </div>
    
                <div class="card" style="width: 18rem; border: 1px solid; margin-bottom: 40px;">
                   <img src="${dress2.image_url}" class="card-img-top" alt="..."  height ="50%" style="margin-top: 50px;">
                      <div class="card-body">
                        <h5 class="card-title">${dress2.dressname}</h5>
                        <p class="card-text">Rs. ${dress2.price}</p>
                        <button type="button" class="btn btn-primary clothesBtn" id="2" name="clothes_details">Know more</button>
                   </div>
                </div>
    
                <div class="card" style="width: 18rem; border: 1px solid; margin-bottom: 40px;">
                   <img src="${dress3.image_url}" class="card-img-top" alt="..."  height ="50%" style="margin-top: 50px;">
                      <div class="card-body">
                        <h5 class="card-title">${dress3.dressname}</h5>
                        <p class="card-text">Rs. ${dress3.price}</p>
                        <button type="button" class="btn btn-primary clothesBtn" id="3" name="clothes_details">Know more</button>
                   </div>
                </div>
    
                <div class="card" style="width: 18rem; border: 1px solid; margin-bottom: 40px;">
                   <img src="${dress4.image_url}" class="card-img-top" alt="..."  height ="50%" style="margin-top: 50px;">
                      <div class="card-body">
                        <h5 class="card-title">${dress4.dressname}</h5>
                        <p class="card-text">Rs. ${dress4.price}</p>
                        <button type="button" class="btn btn-primary clothesBtn" id="4" name="clothes_details">Know more</button>
                   </div>
                </div>
             `);
        }
      }
    }
  );

  $.get(
    "api/food.php",
    {
      foodname: $("#foodname").val(),
      price: $("#price").val(),
      image_url: $("#image_url").val(),
    },
    function (result) {
      console.log(result);

      var response = JSON.parse(result);

      if (response.status === true) {
        var dish = response.data;

        for (let i = 0; i < dish.length; i += 4) {
          const food1 = dish[i];
          const food2 = dish[i + 1];
          const food3 = dish[i + 2];
          const food4 = dish[i + 3];

          $("#food").append(`
    
                <div class="card" style="width: 18rem; border: 1px solid; margin-bottom: 40px;">
                <img src="${food1.image_url}"class="card-img-top" alt="..." height="255px;" style="margin-top: 30px;">
                <div class="card-body">
                  <h5 class="card-title">${food1.foodname}</h5>
                  <p class="card-text">Rs. ${food1.price}</p>
                  <button type="button" class="btn btn-primary foodBtn" id="1" name="food_details">Know more</button>
                </div>
              </div>
    
                <div class="card" style="width: 18rem; border: 1px solid; margin-bottom: 40px;">
                   <img src="${food2.image_url}" class="card-img-top" alt="..."  height ="50%" style="margin-top: 50px;">
                      <div class="card-body">
                        <h5 class="card-title">${food2.foodname}</h5>
                        <p class="card-text">Rs. ${food2.price}</p>
                        <button type="button" class="btn btn-primary foodBtn" id="2" name="food_details">Know more</button>
                   </div>
                </div>
    
                <div class="card" style="width: 18rem; border: 1px solid; margin-bottom: 40px;">
                   <img src="${food3.image_url}" class="card-img-top" alt="..."  height ="50%" style="margin-top: 50px;">
                      <div class="card-body">
                        <h5 class="card-title">${food3.foodname}</h5>
                        <p class="card-text">Rs. ${food3.price}</p>
                        <button type="button" class="btn btn-primary foodBtn" id="2" name="food_details">Know more</button>
                   </div>
                </div>
    
                <div class="card" style="width: 18rem; border: 1px solid; margin-bottom: 40px;">
                   <img src="${food4.image_url}" class="card-img-top" alt="..."  height ="50%" style="margin-top: 50px;">
                      <div class="card-body">
                        <h5 class="card-title">${food4.foodname}</h5>
                        <p class="card-text">Rs. ${food4.price}</p>
                        <button type="button" class="btn btn-primary foodBtn" id="4" name="food_details">Know more</button>
                   </div>
                </div>
             `);
        }
      }
    }
  );

  $(document).on("click", ".productsBtn", function () {
    var tablename = $(this).attr("name");
    var id = $(this).attr("id");
    console.log("button click");

    $.post(
      "api/gadgets.php",
      { id: id, tablename: tablename },
      function (result) {
        console.log(result);
        var result = JSON.parse(result);
        console.log(result.data);
        const { image1, image2, producttitle, productdesc, productdetails } =
          result.data[0];
        console.log(result.data);
        $("#product").empty();
        $("#product").append(`
                <div class="row">
                    <div class="col-lg-6 col-12">
                        <div class="row">
                            <div class="col-lg-6 col-12">
                                <img src="${image1}" alt="" width="300px"; height="300px" style="margin-left: -50px;">
                            </div>
                            <div class="col-lg-6 col-12">
                                <img src="${image2}" alt="" width="300px"; height="300px" style="margin-left: -60px;">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-12"><br>
                        <h1>${producttitle}</h1>
                        <h4>${productdesc}</h4><br>
                        <p>${productdetails}</p>
                                <a href="login.html" class="btn btn-success"  id="buyIphoneBtn">buy now</a>
                    </div>
                </div>`);
      }
    );
  });

  $(document).on("click", ".electronicBtn", function () {
    var id = $(this).attr("id");
    console.log("button click");

    $.post("api/electronics.php", { id: id }, function (result) {
      console.log(result);
      var parsedResult = JSON.parse(result);
      console.log(parsedResult.data);

      const products = parsedResult.data;

      $(".container").empty();

      products.forEach((product) => {
        const { productname, price, image_url } = product;

        $(".container").append(`
                <div class="row d-flex">
                <div class="col-lg-3">
                <div class="card" style="width: 18rem;">
                <img src="${image_url}" class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${productname}</h5>
                  <p class="card-text">${price}</p>
                  <button type="button" class="btn btn-primary productsBtn" id="4" name="product_details">Know more</button>
                </div>
              </div>
              </div>
              </div>
                       `);
      });
    });
  });

  $(document).on("click", ".clothesBtn", function () {
    var tablename = $(this).attr("name");
    var id = $(this).attr("id");
    console.log("button click");

    $.post(
      "api/gadgets.php",
      { id: id, tablename: tablename },
      function (result) {
        console.log(result);
        var result = JSON.parse(result);
        console.log(result.data);
        const { image1, image2, dresstitle, dressdesc } = result.data[0];
        console.log(result.data);
        $("#dress").empty();
        $("#dress").append(`
                <div class="row">
                    <div class="col-lg-6 col-12">
                        <div class="row">
                            <div class="col-lg-6 col-12">
                                <img src="${image1}" alt="" width="300px"; height="300px" style="margin-left: -50px;">
                            </div>
                            <div class="col-lg-6 col-12">
                                <img src="${image2}" alt="" width="300px"; height="300px" style="margin-left: -60px;">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-12"><br>
                        <h1>${dresstitle}</h1>
                        <p>${dressdesc}</p>
                                <a href="login.html" class="btn btn-success"  id="buyIphoneBtn">buy now</a>
                    </div>
                </div>`);
      }
    );
  });

  $(document).on("click", ".foodBtn", function () {
    var tablename = $(this).attr("name");
    var id = $(this).attr("id");
    console.log("button click");

    $.post(
      "api/gadgets.php",
      { id: id, tablename: tablename },
      function (result) {
        console.log(result);
        var result = JSON.parse(result);
        console.log(result.data);
        const { image1, image2, foodtitle, fooddesc } = result.data[0];
        console.log(result.data);
        $("#food").empty();
        $("#food").append(`
                <div class="row">
                    <div class="col-lg-6 col-12">
                        <div class="row">
                            <div class="col-lg-6 col-12">
                                <img src="${image1}" alt="" width="300px"; height="300px" style="margin-left: -50px;">
                            </div>
                            <div class="col-lg-6 col-12">
                                <img src="${image2}" alt="" width="300px"; height="300px" style="margin-left: -60px;">
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 col-12"><br>
                        <h1>${foodtitle}</h1>
                        <p>${fooddesc}</p>
                                <a href="login.html" class="btn btn-success"  id="buyIphoneBtn">buy now</a>
                    </div>
                </div>`);
              }
            );
  });
});
