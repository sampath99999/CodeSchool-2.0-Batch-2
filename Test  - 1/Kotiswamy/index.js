// navIconContainer

$(document).ready(function () {
  $.get("https://fakestoreapi.com/products", function (data, status) {
    let storeItemsList = [];
    if (status === "success") {
      storeItemsList = data;
    }

    // filterCard

    $(".searchInput").keyup(function () {
      let text = $(this).val().toLowerCase();
      console.log(text);
      let filterList = storeItemsList.filter((items) =>
        items.title.toLowerCase().includes(text)
      );
      $(".tableBody").empty();
      for (let i of filterList) {
        let sku = `TS${Math.ceil(Math.random() * 9999) + 10000}`;
        let variant = Math.ceil(Math.random() * 10);
        let { title, category, image, price } = i;
        let statusList = ["Active", "Out of Stock"];
        let status = statusList[Math.floor(Math.random() * statusList.length)];

        let statusBtn = "";
        if (status === "Active") {
          statusBtn = `<button class="btn border-0 bg-success bg-opacity-50 text-success rounded-5 statusBtn fw-semibold">Active</button>`;
        } else {
          statusBtn = `<button class="btn border-0 bg-danger bg-opacity-50 text-danger rounded-5 statusBtn fw-semibold">Out of Stock</button>`;
        }
        $(".tableBody").append(`
            <tr>
            <td class="checkBoxStyle"><input type="checkbox"></td>
            <td><img src=${image} alt="itemImg" class="itemImg" /></td>
            <td class="text-muted fw-semibold">${title}</td>
            <td class="text-muted fw-semibold">${category}</td>
            <td class="text-muted fw-semibold">${sku}</td>
            <td class="text-muted fw-semibold">${variant}</td>
            <td class="text-dark fw-bold">$${price}</td>
            <td>${statusBtn}</td>
            <td>
              <p class="bg-body-secondary text-muted m-0 pe-1 ps-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
              </p>  
            </td>
            </tr>
          `);
      }
    });

    // productsTableContainer

    let getPageItemsList = function (startIndex, endIndex) {
      let activePageList = storeItemsList.slice(startIndex, endIndex);
      for (let i of activePageList) {
        let sku = `TS${Math.ceil(Math.random() * 9999) + 10000}`;
        let variant = Math.ceil(Math.random() * 10);
        let { title, category, image, price } = i;
        let statusList = ["Active", "Out of Stock"];
        let status = statusList[Math.floor(Math.random() * statusList.length)];

        let statusBtn = "";
        if (status === "Active") {
          statusBtn = `<button class="btn border-0 bg-success bg-opacity-50 text-success rounded-5 statusBtn fw-semibold">Active</button>`;
        } else {
          statusBtn = `<button class="btn border-0 bg-danger bg-opacity-50 text-danger rounded-5 statusBtn fw-semibold">Out of Stock</button>`;
        }
        $(".tableBody").append(`
            <tr>
            <td class="checkBoxStyle"><input type="checkbox"></td>
            <td><img src=${image} alt="itemImg" class="itemImg" /></td>
            <td class="text-muted fw-semibold">${title}</td>
            <td class="text-muted fw-semibold">${category}</td>
            <td class="text-muted fw-semibold">${sku}</td>
            <td class="text-muted fw-semibold">${variant}</td>
            <td class="text-dark fw-bold">$${price}</td>
            <td>${statusBtn}</td>
            <td>
              <p class="bg-body-secondary text-muted m-0 pe-1 ps-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                </svg>
              </p>  
            </td>
            </tr>
          `);
      }
    };

    getPageItemsList(0, 10);

    // paginationContainer
    let noOfBtns = Math.ceil(storeItemsList.length / 10);
    for (let i = 0; i < noOfBtns; i++) {
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
        getPageItemsList(activeBtnVal - 1, activeBtnVal * 10);
      } else {
        $(".tableBody").empty();
        getPageItemsList((activeBtnVal - 1) * 10, activeBtnVal * 10);
      }
      $(this).css({ color: "white", backgroundColor: "blue" });
      $(this)
        .siblings()
        .css({ color: "black", backgroundColor: "transparent" });
    });
  });
});
