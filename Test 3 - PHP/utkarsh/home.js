$(document).ready(function () {
  $.get(
    "api/index.php",
    {
      dress_name: $("#dressname").val(),
      rating: $("#rating").val(),
      price: $("#price").val(),
      dress_size: $("#dress_size").val(),
      image_url: $("#image_url").val(),
    },
    function (result) {
      console.log(result);

      var response = JSON.parse(result);

      if (response.status === true) {
        var clothes = response.data;

        for (let i = 0; i < clothes.length; i += 6) {
          const dress1 = clothes[i];
          const dress2 = clothes[i + 1];
          const dress3 = clothes[i + 2];
          const dress4 = clothes[i + 3];
          const dress5 = clothes[i + 4];
          const dress6 = clothes[i + 5];

          $("#data").append(`
          <div class="size">
             <h4>Products</h4>
              <div class="card">
              <div class="card-body">
                <div class="d-flex">
                  <img
                    src="${dress1.image_url}"
                    alt="..."
                    height="150px"
                    width="150px"
                    style="border: 2px solid"
                  />
                  <div class="content p-3">
                    <h3 class="card-title"><b>${dress1.dress_name}</b></h3>
                    <p class="card-text">ratings: ${dress1.rating} ⭐️</p>
                    <div class="d-flex justify-content-between">
                    <p class="card-text">
                      size:
                      <button type="button" class="btn btn-dark">
                        ${dress1.dress_size}
                      </button>
                    </p>
                    <p class="card-text px-5"><b>Rs. ${dress1.price}</b></p>
                    </div>
                  </div>
                </div>
              </div>
            </div> <br>

            <div class="card">
            <div class="card-body">
              <div class="d-flex">
                <img
                  src="${dress2.image_url}"
                  alt="..."
                  height="150px"
                  width="150px"
                  style="border: 2px solid"
                />
                <div class="content p-3">
                  <h3 class="card-title"><b>${dress2.dress_name}</b></h3>
                  <p class="card-text">ratings: ${dress2.rating} ⭐️</p>
                  <div class="d-flex justify-content-between">
                  <p class="card-text">
                    size:
                    <button type="button" class="btn btn-dark">
                      ${dress2.dress_size}
                    </button>
                  </p>
                  <p class="card-text px-5"><b>Rs. ${dress2.price}</b></p>
                  </div>
                </div>
              </div>
            </div>
          </div> <br>

          <div class="card">
          <div class="card-body">
            <div class="d-flex">
              <img
                src="${dress3.image_url}"
                alt="..."
                height="150px"
                width="150px"
                style="border: 2px solid"
              />
              <div class="content p-3">
                <h3 class="card-title"><b>${dress3.dress_name}</b></h3>
                <p class="card-text">ratings: ${dress3.rating} ⭐️</p>
                <div class="d-flex justify-content-between">
                <p class="card-text">
                  size:
                  <button type="button" class="btn btn-dark">
                    ${dress3.dress_size}
                  </button>
                </p>
                <p class="card-text px-5"><b>Rs. ${dress3.price}</b></p>
                </div>
              </div>
            </div>
          </div>
        </div> <br>

        <div class="card">
        <div class="card-body">
          <div class="d-flex">
            <img
              src="${dress4.image_url}"
              alt="..."
              height="150px"
              width="150px"
              style="border: 2px solid"
            />
            <div class="content p-3">
              <h3 class="card-title"><b>${dress4.dress_name}</b></h3>
              <p class="card-text">ratings: ${dress4.rating} ⭐️</p>
              <div class="d-flex justify-content-between">
              <p class="card-text">
                size:
                <button type="button" class="btn btn-dark">
                  ${dress4.dress_size}
                </button>
              </p>
              <p class="card-text px-5"><b>Rs. ${dress4.price}</b></p>
              </div>
            </div>
          </div>
        </div>
      </div> <br>

      <div class="card">
      <div class="card-body">
        <div class="d-flex">
          <img
            src="${dress5.image_url}"
            alt="..."
            height="150px"
            width="150px"
            style="border: 2px solid"
          />
          <div class="content p-3">
            <h3 class="card-title"><b>${dress5.dress_name}</b></h3>
            <p class="card-text">ratings: ${dress5.rating} ⭐️</p>
            <div class="d-flex justify-content-between">
            <p class="card-text">
              size:
              <button type="button" class="btn btn-dark">
                ${dress5.dress_size}
              </button>
            </p>
            <p class="card-text px-5"><b>Rs. ${dress5.price}</b></p>
            </div>
          </div>
        </div>
      </div>
    </div> <br>

    <div class="card">
    <div class="card-body">
      <div class="d-flex">
        <img
          src="${dress6.image_url}"
          alt="..."
          height="150px"
          width="150px"
          style="border: 2px solid"
        />
        <div class="content p-3">
          <h3 class="card-title"><b>${dress6.dress_name}</b></h3>
          <p class="card-text">ratings: ${dress6.rating} ⭐️</p>
          <div class="d-flex justify-content-between">
          <p class="card-text">
            size:
            <button type="button" class="btn btn-dark">
              ${dress6.dress_size}
            </button>
          </p>
          <p class="card-text px-5"><b>Rs. ${dress6.price}</b></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div> `);
        }
      }
    }
  );
});

$(document).on("click", ".logout", function () {
  window.location.replace("login.html");
});
