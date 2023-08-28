$(document).ready(function () {
    var productsPerPage = 10;
    var currentPage = 1;
    var staticData = [
      { sku: "A123", variant: "Standard", status: "Active" },
      { sku: "B456", variant: "Premium", status: "Out of Stock" },
      { sku: "C789", variant: "Deluxe", status: "Active" },
      { sku: "D123", variant: "Standard", status: "Active" },
      { sku: "B456", variant: "Premium", status: "Active " },
      { sku: "E789", variant: "Deluxe", status: "Out of Stock" },
      { sku: "F123", variant: "Standard", status: "Active" },
      { sku: "G456", variant: "Premium", status: "Out of Stock" },
      { sku: "H789", variant: "Deluxe", status: "Active" },
      { sku: "I123", variant: "Standard", status: "Active" },
      { sku: "J456", variant: "Premium", status: "Active" },
      { sku: "K789", variant: "Deluxe", status: "Out of Stock" },
      { sku: "L123", variant: "Standard", status: "Active" },
      { sku: "M456", variant: "Premium", status: "Out of Stock" },
      { sku: "N789", variant: "Deluxe", status: "Active" },
    ];
  
    function renderTablePage(page) {
      var startIndex = (page - 1) * productsPerPage;
      var endIndex = startIndex + productsPerPage;
      var productTableBody = $("#productTableBody");
      productTableBody.empty();
      var selectedCategory = $("#categorySelect").val();
      var searchText = $("#filterInput").val().toLowerCase();
    
      for (var i = startIndex; i < endIndex && i < productsData.length; i++) {
        var product = productsData[i];
        var staticInfo = staticData[i % staticData.length];
    
        var categoryMatches = selectedCategory === "" || product.category.toLowerCase() === selectedCategory.toLowerCase();
        var categoryMatches =  product.category.toLowerCase().includes(searchText);
        var variantMatches = staticInfo.variant.toLowerCase().includes(searchText);
        var titleMatches = product.title.toLowerCase().includes(searchText);
         var skuMatches = staticInfo.sku.toLowerCase().includes(searchText);
         var statusMatches = staticInfo.status.toLowerCase().includes(searchText);
        if (categoryMatches || (variantMatches||titleMatches||skuMatches||categoryMatches||statusMatches)) {
          productTableBody.append(`<tr>
              <td>
                  <input type="checkbox" id="checkbox${product.id}" name="checkbox[]" value="${product.id}">
              </td>
              <td>${product.title}</td>
              <td>${product.category}</td>
              <td>${staticInfo.sku}</td>
              <td>${staticInfo.variant}</td>
              <td>$${product.price}</td>
              <td>${staticInfo.status}</td>
          </tr>`);
        }
      }
    }
    
    function initPagination() {
      $("#pagination").twbsPagination({
        totalPages: Math.ceil(productsData.length / productsPerPage),
        visiblePages: 5,
        onPageClick: function (event, page) {
          currentPage = page;
          renderTablePage(page);
        },
        first: false,
        prev: false,
        next: "&hellip;",
        last: false,
        initiateStartPageClick: false,
        onPageRender: function (event, page) {
          var pages = "";
          var totalPages = this._options.totalPages;
  
          pages += '<li class="rounded-circle"><a href="#">1</a></li>';
          if (page > 3) {
            pages += "<li><span>&hellip;</span></li>";
          }
          for (
            var i = Math.max(2, page - 1);
            i <= Math.min(totalPages - 1, page + 1);
            i++
          ) {
            pages +=
              "<li" +
              (i === page ? ' class="active rounded-5"' : "") +
              '><a href="#">' +
              i +
              "</a></li>";
          }
          if (page < totalPages - 2) {
            pages += "<li><span>&hellip;</span></li>";
          }
          if (totalPages > 1) {
            pages += '<li><a href="#">' + totalPages + "</a></li>";
          }
  
          $("#pagination").html(pages);
        },
      });
    }
  
  
    $("#categorySelect").change(function () {
      renderTablePage(currentPage);
      $("#pagination").twbsPagination("destroy");
      initPagination();
    });
  
    $("#filterInput").on("input", function () {
      renderTablePage(currentPage);
      $("#pagination").twbsPagination("destroy");
      initPagination();
    });
    
    $.get("https://fakestoreapi.com/products", function (data) {
      productsData = data;
      initPagination();
      renderTablePage(currentPage);
    });
  });
  