// navIconContainer

$(document).ready(function () {
    $.get("https://fakestoreapi.com/products", function (data, status) {
      let allItems = [];
      if (status === "success") {
        allItems = data;
      }
      
      $(".search").keyup(function () {
        let text = $(this).val();
        let filteredItems = allItems.filter((items) =>
          items.title.includes(text)
        );
        $(".tableBody").empty();
        for (let i of filteredItems) {
          let sku = `TS${Math.ceil(Math.random() * 9999) + 10000}`;
          let variant = Math.ceil(Math.random() * 10);
          let { title, category, image, price } = i;
          let statusOptions = ["Active", "Out of Stock"];
          let status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
  
          let statusBtn = "";
          if (status === "Active") {
            statusBtn = `<button class="btn border-0 bg-success bg-opacity-50 text-success rounded-5 statusBtn fw-semibold">Active</button>`;
          } else {
            statusBtn = `<button class="btn border-0 bg-danger bg-opacity-50 text-danger rounded-5 statusBtn fw-semibold">Out of Stock</button>`;
          }
          $(".tableBody").append(`
              <tr>
              <td class="checkBoxStyle"><input type="checkbox"></td>
              <td><img src=${image} alt="productImg" style="height:30px; width:30px" /></td>
              <td class="text-muted fw-semibold">${title}</td>
              <td class="text-muted fw-semibold">${category}</td>
              <td class="text-muted fw-semibold">${sku}</td>
              <td class="text-muted fw-semibold">${variant}</td>
              <td class="text-dark fw-bold">$${price}</td>
              <td>${statusBtn}</td>
              <td>
                <p class="bg-body-secondary text-muted m-0 pe-1 ps-1">
                <span class="material-symbols-outlined">
                more_horiz
                </span>
                </p>  
              </td>
              </tr>
            `);
        }
      });
  
      // productsTableContainer
  
      let pages = function (startIndex, endIndex) {
        let activePageList = allItems.slice(startIndex, endIndex);
        for (let i of activePageList) {
          let sku = Math.ceil(Math.random() * 100000);
          let variant = Math.ceil(Math.random() * 10);
          let { title, category, image, price } = i;
          let statusOptions = ["Active", "Out of Stock"];
          let status = statusOptions[Math.floor(Math.random() * statusOptions.length)];
  
          let statusBtn = "";
          if (status === "Active") {
            statusBtn = `<button class="btn statusBtn statusActiveBtn">Active</button>`;
          } else {
            statusBtn = `<button class="btn statusBtn statusOofSBtn">Out of Stock</button>`;
          }
          $(".tableBody").append(`
              <tr>
              <td class="checkBoxStyle"><input type="checkbox"></td>
              <td><img src=${image} alt="productImg" style="height:30px; width:30px" /></td>
              <td class="text-muted fw-semibold">${title}</td>
              <td class="text-muted fw-semibold">${category}</td>
              <td class="text-muted fw-semibold">${sku}</td>
              <td class="text-muted fw-semibold">${variant}</td>
              <td class="text-dark fw-bold">$${price}</td>
              <td>${statusBtn}</td>
              <td>
                <p class="bg-body-secondary text-muted m-0 pe-1 ps-1">
                <span class="material-symbols-outlined">
                more_horiz
                </span>
                </p>  
              </td>
              </tr>
            `);
        }
      };
  
      pages(0, 10);
  
      // paginationContainer
      let paginationBtn = Math.ceil(allItems.length / 10);
      for (let i = 0; i < paginationBtn; i++) {
        $(".paginationContainer").append(
          `<button class="paginationBtn btn border-0 fw-semibold " id=pageBtn${
            i + 1
          }>${i + 1}</button>`
        );
      }
  
      $(".paginationBtn").click(function () {
        let activeBtnVal = parseInt($(this).text());
        console.log(activeBtnVal);
        if (activeBtnVal === 1) {
          $(".tableBody").empty();
          pages(activeBtnVal - 1, activeBtnVal * 10);
        } else {
          $(".tableBody").empty();
          pages((activeBtnVal - 1) * 10, activeBtnVal * 10);
        }
        $(this).css({ color: "white", backgroundColor: "blue" });
        $(this)
          .siblings()
          .css({ color: "black", backgroundColor: "transparent" });
      });
    });
  });
  