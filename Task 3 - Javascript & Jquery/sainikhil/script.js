let currentPage = 1;
const pageSize = 10;
let totalPages = 0;

function populate(articles) {
  $("#carousel").empty();
  $("#news-card").empty();
  $("#popular-posts").empty();
  $("#footer-images").empty();

  for (let i = 0; i < 2; i++) {
    const activeClass = i === 0 ? "active" : "";
    $("#slider .carousel-inner").append(`
          <div class="carousel-item ${activeClass}">
            <img src="${
              articles[i].urlToImage
            }" class="d-block w-100" alt="Trending Post ${i + 1}">
            <div class="carousel-caption d-none d-md-block">
              <h5>${articles[i].title}</h5>
              <p class="text-secondary">${articles[i].source.name} - ${
      articles[i].publishedAt.split("T")[0]
    }</p>
            </div>
          </div>
        `);
  }
  for (let i = 0; i < 2; i++) {
    const activeClass = i === 0 ? "active" : "";
    $("#trending .carousel-inner").append(`
          <div class="carousel-item ${activeClass}">
            <img src="${
              articles[i].urlToImage
            }" class="d-block w-100" alt="Trending Post ${i + 1}">
            <div class="carousel-caption d-none d-md-block">
              <h5>${articles[i].title}</h5>
              <p class="text-secondary">${articles[i].source.name} - ${
      articles[i].publishedAt.split("T")[0]
    }</p>
            </div>
          </div>
        `);
  }

  for (let i = 2; i < articles.length; i++) {
    $("#news-card").append(`
          <div class="card w-auto m-3">
            <span class="badge badge-pill badge-dark rounded-5">Trending</span>
            <img src="${
              articles[i].urlToImage
            }" class="card-img-top object-fit-cover" alt="Image not available">
            <div class="card-body ms-4 me-4 mt-4">
              <ul class="d-flex list-unstyled gap-3 text-secondary">
                <li>${articles[i].source.name}</li>
                <li>
                  <i class="fa-solid fa-circle fa-2xs" style="color: #ff2600"></i>
                  ${articles[i].publishedAt.split("T")[0]}
                </li>
                <li>
                  <i class="fa-solid fa-circle fa-2xs" style="color: #ff2600"></i>
                  <i class="fa-regular fa-comment"></i> (0)
                </li>
              </ul>
              <h5 class="card-title">${articles[i].title}</h5>
              <p class="card-text border-bottom pb-5 text-secondary">
                ${articles[i].description}
              </p>
              <div class="social-media-icons-card d-flex justify-content-between">
                <div class="d-flex gap-3 mt-2 text-secondary">
                  <i class="fa-brands fa-facebook-f"></i>
                  <i class="fa-brands fa-x-twitter"></i>
                  <i class="fa-brands fa-instagram"></i>
                  <i class="fa-brands fa-pinterest"></i>
                  <i class="fa-brands fa-tiktok"></i>
                  <i class="fa-brands fa-youtube"></i>
                </div>
                <div>
                  <h5>
                    Continue Reading
                    <i class="fa-solid fa-chevron-right pe-5 mt-1"></i>
                  </h5>
                  
                  
                </div>
              </div>
            </div>
          </div>
        `);

    if (i < 5) {
      $("#popular-posts").append(`
            <div class="popular-post-item d-flex mt-3">
              <img src="${
                articles[i].urlToImage
              }" class="rounded-circle" style="width: 50px; height: 50px;">
              <div class="ms-3">
                <h6 class="text-secondary">${articles[i].title}</h6>
                <p class="text-secondary">${
                  articles[i].publishedAt.split("T")[0]
                }</p>
              </div>
            </div>
          `);
    }
    if (i < 7) {
      $("#footer-images").append(`<img src="${articles[i].urlToImage}" >`);
    }
  }
}

function createPaginationButtons() {
  $("#pagination").empty();

  const previousButton = `
        <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
          <a class="page-link" href="#" onclick="changePage(${
            currentPage - 1
          })">Previous</a>
        </li>
      `;

  const currentPageClass = " text-black";

  let pageNumberButtons = "";
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === currentPage ||
      (i === currentPage - 1 && currentPage === totalPages) ||
      (i === currentPage + 1 && currentPage === 1)
    ) {
      pageNumberButtons += `
            <li class="page-item ${currentPage === i ? "active" : ""}">
              <a class="page-link ${
                currentPage === i ? currentPageClass : ""
              }" href="#" onclick="changePage(${i})">${i}</a>
            </li>
          `;
    }
  }

  const nextButton = `
        <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
          <a class="page-link" href="#" onclick="changePage(${
            currentPage + 1
          })">Next</a>
        </li>
      `;

  $("#pagination").append(previousButton + pageNumberButtons + nextButton);
}

function changePage(page) {
  currentPage = page;
  const url = `https://newsapi.org/v2/everything?q=apple&from=2023-08-03&to=2023-08-03&sortBy=popularity&apiKey=d2aa01f4e28b47a896e2619bc7fe655f&pageSize=${pageSize}&page=${currentPage}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      populate(data.articles);
      createPaginationButtons();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function data() {
  const url = `https://newsapi.org/v2/everything?q=apple&from=2023-08-03&to=2023-08-03&sortBy=popularity&apiKey=d2aa01f4e28b47a896e2619bc7fe655f&pageSize=${pageSize}&page=${currentPage}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      populate(data.articles);
      totalPages = Math.ceil(data.totalResults / pageSize);
      createPaginationButtons();
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

data();
