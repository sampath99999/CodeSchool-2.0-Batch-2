$(document).ready(function () {
    $.get(
      "https://newsapi.org/v2/everything?q=apple&from=2023-08-04&to=2023-08-04&sortBy=popularity&apiKey=35237a169a294d72aaffc41859f9b064",
  
      function (articlesData, status) {
        let k = 0;
        for (i in articlesData.articles) {
          if (k == 3) {
            break;
          }
          const { title, urlToImage, publishedAt, author } =
            articlesData.articles[i];
          const activeClass = k === 0 ? "active" : "";
          $("#mainSlides").append(`
            <div class="carousel-item ${activeClass}">
              <img src=${urlToImage} style="width:100%;height:500px;border-radius:10px; opacity:0.7;" alt="">
              <div class="carousel-caption d-md-block">
                <div class="slide_title">
                  <div class="btn btn-rounded bg-danger text-white" style="border-radius:25px;">Politic</div>
                  <div class="sli_sub_title display-4 fs-1 fw-bold text-white">${title}</div>
                  <div class="sli_title gap-2 d-flex">
                    <span class="fs-5 text-secondary">${author}</span> 
                    <span class="fs-5 text-secondary">${publishedAt}</span> 
                  </div>
                </div>
              </div>
            </div>
          `);
          k++;
        }
        $("#mycarousel").carousel();
      }
    );
  });
  
  const cardsPerPage = 10;
  let currentPage = 1;
  
  $(document).ready(function () {
    loadArticles();
  });
  
  function loadArticles() {
    $.get(
      "https://newsapi.org/v2/everything?q=tesla&from=2023-07-05&sortBy=publishedAt&apiKey=35237a169a294d72aaffc41859f9b064",
      function (data, status) {
        const totalResults = data.totalResults;
        const totalPages = Math.ceil(totalResults / cardsPerPage);
  
        renderPagination(totalPages);
  
        displayCards(data.articles);
      }
    );
  }
  
  function displayCards(articles) {
    const startIndex = (currentPage - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
  
    const cardContainer = $("#cards");
    cardContainer.empty();
  
    for (let i = startIndex; i < endIndex && i < articles.length; i++) {
      const { title, urlToImage, publishedAt, author, description } = articles[i];
      cardContainer.append(`<div class="card my-4 mx-sm-3">
            <img class="card-img-top img-fluid p-2" src="${urlToImage}" style="height:20rem;" alt="Card image cap">
            <div class="card-body">
              <span>${author}</span>${publishedAt}<span>(0)</span><span></span>
              <h5 class="card-title">${title}</h5>
              <p class="card-text">${description}</p>
              <h4></h4>
              <hr>
              <div class="d-flex justify-content-between">
                <div class="d-flex icons gap-2 icon-container mt-2">
                  <i class="fab fa-facebook-f"></i>
                  <i class="fab fa-twitter"></i>
                  <i class="fab fa-instagram"></i>
                  <i class="fab fa-pinterest"></i>
                  <i class="fab fa-tiktok"></i>
                  <i class="fab fa-youtube"></i>
                </div>
                <div>
                  <a href="#" style="font-size:14px;text-decoration:none;color:#000;">Continue reading <i class="fa-solid fa-chevron-right"></i></a>
                </div>
              </div>
            </div>
          </div>`);
    }
  }
  
  function renderPagination(totalPages) {
    const pagination = $("#pagination");
    pagination.empty();
  
    for (let i = 1; i <= 3; i++) {
      const listItem = $(
        `<li class="page-item"><a class="page-link btn bg-danger btn-outline-danger  align-items-center rounded-circle border-0 mx-2" style="color:#fff; text-decoration:none;">${i}</a></li>`
      );
      if (i === currentPage) {
        listItem.addClass("active");
      }
      pagination.append(listItem);
    }
  
    pagination.on("click", "a.page-link", function (event) {
      event.preventDefault();
      const pageNumber = parseInt($(this).text());
      if (pageNumber !== currentPage) {
        currentPage = pageNumber;
        loadArticles();
      }
    });
    const nextButton = $(
      `<li class="page-item"><a class="page-link btn btn-outline-danger text-black align-items-center rounded-circle"
       href="#"><i class="fa-solid fa-angles-right"></i></a></li>`
    );
  }
  
  $(document).ready(function () {
    $.get(
      "https://newsapi.org/v2/everything?q=apple&from=2023-08-04&to=2023-08-04&sortBy=popularity&apiKey=35237a169a294d72aaffc41859f9b064",
      function (data, status) {
        for (i = 0; i < 3; i++) {
          const { title, urlToImage, publishedAt, author, description } =
            data.articles[i];
          $("#popularPosts")
            .append(`<div class="d-flex icons gap-2"><div><img class="image-fluid" src="${urlToImage}" style="height:50px; width:50px; border-radius:50%; object-fit:cover;" alt="Card image">
                   </div><div> <h4 style="font-size:16px;font-weight:700;">${title}</h4><p>${publishedAt}</p><hr class="bg-secondary"></div>`);
        }
  
        for (i = 0; i < 12; i++) {
          const { source } = data.articles[i];
          $("#tagClouds").append(
            `<div class="p-2 m-2 rounded-5" style="border:1px solid grey;">#${source.name}</div>`
          );
        }
        for (let i = 54; i < 60; i++) {
          const { urlToImage } = data.articles[i];
          $("#bottomPictures")
            .append(`<div class="col-6 col-md-2 card  p-0 my-md-4  border-1">
                  <img class="card-img-top img-fluid" src="${urlToImage}" style="height:180px; width:180px;" alt="Card image cap">
                  </div>`);
        }
      }
    );
  });
  
  $(document).ready(function () {
    $.get(
      "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=35237a169a294d72aaffc41859f9b064",
      function (data, status) {
        const { title, urlToImage, publishedAt, author, description } =
          data.articles[4];
        $("#celebrationCard")
          .append(`<img class="card-img-top image-fluid my-2 rounded-4" src="${urlToImage}"  alt="Card image">
                 <h4 style="font-size:18px;">${title}</h4><p class="d-flex icons text-secondary g-3"><span >${author}</span><span>${publishedAt}</span></p>`);
      }
    );
  });
  
  $("#backToTop").click(function () {
    $(window).scrollTop(0);
  });
  