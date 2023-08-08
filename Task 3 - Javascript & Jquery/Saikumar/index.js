function carouselView(data) {
  console.log(data);

  // funtion to get date from datetime format

  const getDateFromString = (str) => {
    const [date, time] = str.split(" ");
    // reformat string into YYYY-MM-DDTHH:mm:ss.sssZ
    str = `${date}T${time}.000Z`;
    return new Date(str);
  };

  //   console.log(publishedDate)

  // get month date year form at form dd-mm-yyyy format
  function formatDateToMonthDateYear(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  // carousel slide 1
  $("#carouselTitleFirst").text(data[0].title);
  $("#carouselSourceFirst").text(data[0].source.name);
  $("#carouselAuthorFirst").text(data[0].author);
  const publishedDateFirst = new Date(data[0].publishedAt)
    .toISOString()
    .split("T")[0];
  const formattedDateFirst = formatDateToMonthDateYear(publishedDateFirst);
  $("#carouselDateFirst").text(formattedDateFirst);

  // carousel slide 2
  $("#carouselTitleSecond").text(data[1].title);
  $("#carouselSourceSecond").text(data[1].source.name);
  $("#carouselAuthorSecond").text(data[1].author);
  const publishedDateSecond = new Date(data[1].publishedAt)
    .toISOString()
    .split("T")[0];
  const formattedDateSecond = formatDateToMonthDateYear(publishedDateSecond);
  $("#carouselDateSecond").text(formattedDateSecond);
}

function getNewsCards(allData) {
  const itemsPerPage = 5; // Number of items to display per page
  let currentPage = 1; // Initialize the current page to 1

  function displayData(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const dataToShow = allData.slice(startIndex, endIndex);

    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = ""; // Clear previous data
    const getDateFromString = (str) => {
      const [date, time] = str.split(" ");
      // reformat string into YYYY-MM-DDTHH:mm:ss.sssZ
      str = `${date}T${time}.000Z`;
      return new Date(str);
    };

    //   console.log(publishedDate)

    // get month date year form at form dd-mm-yyyy format
    function formatDateToMonthDateYear(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    }
    let unique=0
    for (const item of dataToShow) {
      unique+=1
      //  create card container
      const cardContainer = document.createElement("div");
      dataContainer.append(cardContainer);
      cardContainer.classList.add("news-card-container");
      $(".news-card-container").css({
        border: "1px solid grey",
        "margin-bottom": "30px",
        "border-top-left-radius": "8px",
        "border-top-right-radius": "8px",
      });

      // product image
      const productImage = document.createElement("img");
      productImage.setAttribute("src", item.urlToImage);
      productImage.classList.add("product-image");
      // const imageUrl=item.urlToImage;

      // const imageId="image"+allData[item].source.id
      // productImage.setAttribute("id", imageId);
      // $('.product-image').attr("src",imageUrl);
      $(".product-image").css({
        height: "400px",
        width: "100%",
        "border-top-left-radius": "8px",
        "border-top-right-radius": "8px",
      });
      cardContainer.appendChild(productImage);

      // content container
      const contentContainer = document.createElement("div");
      contentContainer.classList.add("content-container");
      $(".content-container").css({ padding: "20px" });
      cardContainer.appendChild(contentContainer);

      // profile name data container
      const nameDateContainer = document.createElement("div");
      nameDateContainer.classList.add("name-date-container");
      $(".name-date-container").css({ display: "flex", color: "grey" });
      //author
      const authorName = document.createElement("p");
      authorName.classList.add("author-name");
      // $(".author-name").css({"margin-right":"20px"})
      authorName.textContent = item.author;
      nameDateContainer.appendChild(authorName);

      //Date
      const publisedDate = document.createElement("p");
      const publishedDate = new Date(item.publishedAt)
        .toISOString()
        .split("T")[0];
      const formattedDate = formatDateToMonthDateYear(publishedDate);
      publisedDate.classList.add("published-date");
      publisedDate.textContent = formattedDate;
      nameDateContainer.appendChild(publisedDate);

      // message icon
      const messageIconContainer = document.createElement("div");
      const messageIcon = document.createElement("span");
      messageIcon.innerHTML = `<i class="fa-regular fa-message"></i>`;
      messageIconContainer.appendChild(messageIcon);

      const messageCount = document.createElement("span");
      messageCount.textContent = "(0)";
      messageIconContainer.appendChild(messageCount);

      nameDateContainer.appendChild(messageIconContainer);
      contentContainer.appendChild(nameDateContainer); // a
      // title
      const titleName = document.createElement("h4");
      titleName.classList.add("title-name");
      $(".title-name").css({ color: "rgb(77 69 94)", "font-weight": "500" });
      titleName.textContent = item.title;
      contentContainer.appendChild(titleName);

      // description
      const descriptionName = document.createElement("p");
      descriptionName.classList.add("description-name");
      descriptionName.textContent = item.description;
      $(".description-name").css({ color: "grey" });
      contentContainer.appendChild(descriptionName);

      // product bottom container
      const productBottomCard=document.createElement("div");
      productBottomCard.classList.add("product-bottom-card");

      const productBottomContainer = document.createElement("div");
      productBottomContainer.classList.add("product-bottom-container");
      
      $(".product-bottom-card").css({
        display: "flex",
        "justify-content": "space-between",
      });
      
     
      const productBottomIconsList = `
      <div class="d-none d-md-block">
      <ul class="header-icons-list d-flex list-unstyled">
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-facebook"
            viewBox="0 0 16 16"
          >
            <path
              d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
            />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-twitter"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"
            />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-instagram"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
            />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pinterest"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 0a8 8 0 0 0-2.915 15.452c-.07-.633-.134-1.606.027-2.297.146-.625.938-3.977.938-3.977s-.239-.479-.239-1.187c0-1.113.645-1.943 1.448-1.943.682 0 1.012.512 1.012 1.127 0 .686-.437 1.712-.663 2.663-.188.796.4 1.446 1.185 1.446 1.422 0 2.515-1.5 2.515-3.664 0-1.915-1.377-3.254-3.342-3.254-2.276 0-3.612 1.707-3.612 3.471 0 .688.265 1.425.595 1.826a.24.24 0 0 1 .056.23c-.061.252-.196.796-.222.907-.035.146-.116.177-.268.107-1-.465-1.624-1.926-1.624-3.1 0-2.523 1.834-4.84 5.286-4.84 2.775 0 4.932 1.977 4.932 4.62 0 2.757-1.739 4.976-4.151 4.976-.811 0-1.573-.421-1.834-.919l-.498 1.902c-.181.695-.669 1.566-.995 2.097A8 8 0 1 0 8 0z"
            />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-music-note"
            viewBox="0 0 16 16"
          >
            <path
              d="M9 13c0 1.105-1.12 2-2.5 2S4 14.105 4 13s1.12-2 2.5-2 2.5.895 2.5 2z"
            />
            <path fill-rule="evenodd" d="M9 3v10H8V3h1z" />
            <path
              d="M8 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 13 2.22V4L8 5V2.82z"
            />
          </svg>
        </li>
        <li>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-youtube"
            viewBox="0 0 16 16"
          >
            <path
              d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"
            />
          </svg>
        </li>
      </ul>
    </div>`;
       
      
     const productSocialIcons=document.createElement("div");
     productSocialIcons.innerHTML=productBottomIconsList;
      
       // share button for small devices
       const shareIcons=document.createElement("div");
     const shareButton=`
     <svg  class="d-md-none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share" viewBox="0 0 16 16">
  <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
</svg>
     `
     shareIcons.innerHTML=shareButton;
        productBottomContainer.appendChild(shareIcons);
        productBottomContainer.appendChild(productSocialIcons);
       

        productBottomCard.appendChild(productBottomContainer);

        // model container

       const modelContainer=document.createElement("div");
      
       modelContainer.innerHTML=`
       <button type="button " class="btn d-none d-md-block " data-bs-toggle="modal" data-bs-target="#staticBackdrop${unique}">
        Continue Reading
        <i class="fa-solid fa-chevron-right"></i>
         </button>
         <button type="button " class="btn d-md-none " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
         <i class="fas fa-ellipsis-h"></i>
        
         </button>

  <div class="modal fade" id="staticBackdrop${unique}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
       <img src=${item.urlToImage} class="model-image"/>
        ${item.content}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
`
       
productBottomCard.appendChild(modelContainer);

      contentContainer.appendChild(productBottomCard)
    }
  }

  function displayPagination() {
    const totalPages = Math.ceil(allData.length / itemsPerPage);

    const paginationContainer = document.getElementById("page-container");
    paginationContainer.innerHTML = ""; // Clear previous pagination links

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("a");
      pageLink.classList.add("page-number-link");
      pageLink.href = "#";
      pageLink.textContent = i;
      pageLink.addEventListener("click", () => {
        currentPage = i;
        displayData(currentPage);
        displayPagination();
      });
      paginationContainer.appendChild(pageLink);
    }
  }

  // Initial display on page load
  displayData(currentPage);
  displayPagination();
}

function getPopularPosts(data) {
  const popularPosts = document.getElementById("top-three-popular-posts");

  for (i = 0; i < data.length; i++) {
    const getDateFromString = (str) => {
      const [date, time] = str.split(" ");
      // reformat string into YYYY-MM-DDTHH:mm:ss.sssZ
      str = `${date}T${time}.000Z`;
      return new Date(str);
    };

    //   console.log(publishedDate)

    // get month date year form at form dd-mm-yyyy format
    function formatDateToMonthDateYear(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    }

    const popularPostCardContainer = document.createElement("div");
    // popular posts each card container
    popularPostCardContainer.classList.add("popular-posts-card");
    $(".popular-posts-card").css({ display: "flex", "margin-bottom": "20px" });

    // popular posts image
    const popularPostsImage = document.createElement("img");
    console.log(data[i].urlToImage);
    popularPostsImage.setAttribute("src", `${data[i].urlToImage}`);
    popularPostsImage.classList.add("popular-post-image");
    // $(".popular-post-image").css({"border":"rounded-circle"})
    popularPostCardContainer.appendChild(popularPostsImage);

    // popular posts card right container
    const popularPostsCardRightContainer = document.createElement("div");

    // popular post card title
    const popularPostsHeading = document.createElement("p");
    popularPostsHeading.textContent = data[i].title;
    popularPostsHeading.classList.add("popular-post-card-title");
    popularPostsCardRightContainer.appendChild(popularPostsHeading);

    const popularPostsDate = document.createElement("p");
    popularPostsDate.classList.add("popular-posts-date");
    const popularPublishedDate = new Date(data[i].publishedAt)
      .toISOString()
      .split("T")[0];
    const popularFormattedDate =
      formatDateToMonthDateYear(popularPublishedDate);
    // console.log(data[i].publishedAt);
    popularPostsDate.textContent = popularPublishedDate;
    popularPostsCardRightContainer.appendChild(popularPostsDate);
    popularPostCardContainer.appendChild(popularPostsCardRightContainer);

    // appending popular post card to container
    popularPosts.appendChild(popularPostCardContainer);
  }
}

function getCelebrationCard(data) {
  function formatDateToMonthDateYear(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  console.log(data);
  const celebrationCard = document.getElementById("celebration-card");
  // Celebration Image
  const celebrationImage = document.createElement("img");
  celebrationImage.classList.add("celebration-image");
  celebrationImage.setAttribute("src", data.urlToImage);

  celebrationCard.appendChild(celebrationImage);
  // celebration title
  const celebrationTitle = document.createElement("p");
  celebrationTitle.textContent = data.title;
  celebrationTitle.classList.add("celebration-title");
  $(".celebration-title").css({ color: "#4d455e;", "font-weight": "bold" });

  celebrationCard.appendChild(celebrationTitle);
  const celebratonNameDateCard = document.createElement("div");
  celebratonNameDateCard.classList.add("celebration-date-card");

  // name
  const celebrationAuthor = document.createElement("p");
  celebrationAuthor.classList.add("celebration-author");
  celebrationAuthor.textContent = data.author;
  celebratonNameDateCard.appendChild(celebrationAuthor);

  // date
  const celebrationDate = document.createElement("p");

  const publishedDateCelebration = new Date(data.publishedAt)
    .toISOString()
    .split("T")[0];
  const formattedDateCelebration = formatDateToMonthDateYear(
    publishedDateCelebration
  );
  celebrationDate.classList.add("celebration-date");
  $(".celebration-date").css({ "margin-left": "20px" });
  console.log(formattedDateCelebration);
  celebrationDate.textContent = formattedDateCelebration;
  celebratonNameDateCard.appendChild(celebrationDate);

  celebrationCard.appendChild(celebratonNameDateCard);
}

function getBottomImages(data) {
  // images
  const bottomImagesContainer = document.getElementById("bottom-images");
  for (i = 0; i < data.length; i++) {
    const bottomImage = document.createElement("img");
    bottomImage.setAttribute("src", data[i].urlToImage);
    bottomImage.classList.add("bottom-image");
    bottomImagesContainer.appendChild(bottomImage);
  }
}

function newsResult(data) {
  const { articles } = data;

  const getDateFromString = (str) => {
    const [date, time] = str.split(" ");
    // reformat string into YYYY-MM-DDTHH:mm:ss.sssZ
    str = `${date}T${time}.000Z`;
    return new Date(str);
  };

  // console.log(articles);

  var carouselArray = [];
  for (i = 1; i < 3; i++) {
    carouselArray.push(articles[i]);
  }
  carouselView(carouselArray);
  // products cart
  const newCards = [];
  for (i = 0; i < 30; i++) {
    newCards.push(articles[i]);
  }
  getNewsCards(newCards);

  // pupular cards
  const popularPosts = [];
  for (i = 4; i < 7; i++) {
    popularPosts.push(articles[i]);
  }
  getPopularPosts(popularPosts);

  // celebration card
  getCelebrationCard(articles[9]);

  // bottom images
  const bottomImages = [];
  for (i = 6; i < 12; i++) {
    bottomImages.push(articles[i]);
  }
  getBottomImages(bottomImages);
}

$(function () {




  var url =
    'https://newsapi.org/v2/everything?q=apple&from=2023-08-02&to=2023-08-02&sortBy=popularity&apiKey=5f607795519e46759faa6905fcd4c2c7';
    
  $.get(url, function (data) {
    console.log(data);
    newsResult(data);
  });
});

function openNav() {
  document.getElementById("mySidebar").style.width = "100%";
  document.getElementById("main").style.marginLeft = "0px";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
}