const APIKEY = "a360668d8d86492384761fb890481480";

var arrayOfObjects = [];

var newsData = {};
var url =
  "https://newsapi.org/v2/everything?q=keyword&apiKey=a360668d8d86492384761fb890481480";

$(function () {
  $.get(url, function (data, status) {
    console.log(data);
    console.log(data.articles);
    newsData = data;
    console.log("news data is:", newsData);

    dataItems(data);
    footer(data);
    celbrationData(data);
    mainNews(data);
    popularPosts(data);
    displayPage(1);
  });
});

function formatDate(dateString) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const date = new Date(dateString);
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${months[monthIndex]} ${day}, ${year}`;
}

function celbrationData(data) {
  var dataArray = data.articles;
  let obj = dataArray[12];
  let title = obj.title;
  let img = obj.urlToImage;
  let date = obj.publishedAt;
  let author = obj.author;
  let formatedDate = formatDate(date);

  var element = ` 
  <div class="card-title celebrations pt-1 ms-3">
    Celebrations
</div>
<div class="card-body">
    <img class="card-img" src="${img}">
    <div class="card-text celebrationsTitle text-black">
        ${title}
    </div>
    <div class="d-flex">
        <span class="celebration-container-author"><span class="text-danger">.</span>${author}</span>
        <span class="celebration-container-date ms-2"><span class="text-danger">.</span>${formatedDate}</span>
    </div>
</div>`;

  $(".celebrationsCard").append(element);
}

function popularPosts(data) {
  var numOfPosts = 3;
  var dataArray = data.articles;
  for (var i = 0; i < numOfPosts; i++) {
    let obj = dataArray[i];
    let title = obj.title;
    let img = obj.urlToImage;
    let date = obj.publishedAt;
    let formatedDate = formatDate(date);

    var element = `<div class="card-text d-flex pt-1">
    <div class="popularPostsImg">
        <img class="card-img" src="${img}" alt="">
    </div>
    <div class="ps-2">
        <div class="card-text popularPostsText text-black">${title}
            </div>
        <div class="card-text popularPostsDate text-black-50">${formatedDate}</div>
    </div>
</div>`;

    $(".popularPosts").append(element);
  }
}

function mainNews(data) {
  var num = 2;
  var dataArray = data.articles;

  let obj1 = dataArray[num];
  let author = obj1.author;
  let title = obj1.title;
  let date = obj1.publishedAt;
  let img = obj1.urlToImage;
  let formatedDate = formatDate(date);

  $(".imgOne").prop("src", img);
  $(".imgOnetitle").text(title);
  $(".author").text(author);
  $(".imgOneDate").text(formatedDate);

  num = num + 1;
  let obj2 = dataArray[num];
  let title2 = obj2.title;
  let img2 = obj2.urlToImage;
  let date2 = obj2.publishedAt;
  let author2 = obj2.author;
  let formatedDate2 = formatDate(date2);

  $(".imgTwo").prop("src", img2);
  $(".imgTwoTitle").text(title2);
  $(".authorTwo").text(author2);
  $(".imgTwoDate").text(formatedDate2);
}

function dataItems(data) {
  var numOfObjects = 30;
  var dataArray = data.articles;

  for (var i = 0; i < numOfObjects; i++) {
    var obj = dataArray[i + 21];
    var newObj = {
      title: obj.title,
      img: obj.urlToImage,
      date: obj.publishedAt,
      author: obj.author,
      description: obj.description,
    };

    arrayOfObjects.push(newObj);
    console.log("object is" + i + " ", newObj);
  }
}

function footer(data) {
  var dataArray = data.articles;

  for (var i = 20; i < 26; i++) {
    var obj = dataArray[i];
    var img = obj.urlToImage;
    var element = `<img src="${img}" class="col  col-md-1 footerImg">`;
    $(".footer").append(element);
  }
}

function displayPage(index) {
  var startIndex;
  var endIndex;

  if (index === 1) {
    startIndex = 0;
    endIndex = 4;
  }

  if (index === 2) {
    startIndex = 5;
    endIndex = 9;
  }

  if (index === 3) {
    startIndex = 10;
    endIndex = 14;
  }
  $(".items").remove();

  var newDiv = $("<div>").addClass("items");

  $(".newsItems").append(newDiv);
  for (var i = startIndex; i <= endIndex; i++) {
    var id = i;
    var obj = arrayOfObjects[i];
    var img = obj.img;
    console.log("image is " + i + "", img);
    var author = obj.author;
    var date = obj.date;
    var title = obj.title;
    var description = obj.description;
    var formattedDate = formatDate(date);

    var element = `
    <div class="card container-fluid mt-3">
      <div class=" image1 w-100 " >
        <img class="card-img" src="${img}" class="w-100 image" alt="" />
      </div>
      <div class="card-text authorAndDate d-flex pt-2">
        <div class="author ms-3 card-text"><span class="dot me-2">.</span> ${author}</div>
        <div class="date ms-3 card-text"><span class="dot me-2">.</span>  ${formattedDate}</div>
        <div class="d-flex ms-3 comment "> <span class="dot me-2">.</span>
          <i class="fa-regular fa-comment pt-3 comment me-1"></i>
         <span class="zero pt-2 mt-1" > (0) </span>
        </div>
      </div>
      <div class="titleDiv mt-2">
        <h5 class="card-title title">
         ${title}
        </h5>
      </div>
      <div class="descriptionDiv mt-2">
        <p class="card-text description">
         ${description}
        </p>
      </div>
      <div class="icons d-flex justify-content-between mt-3">
        <div class="d-flex socialIcons">
          <i class="fa-brands fa-facebook-f m-1 text-black-50"></i>
          <i class="fa-brands fa-twitter m-1 text-black-50"></i>
          <i class="fa-brands fa-instagram m-1 text-black-50"></i>
          <i class="fa-brands fa-pinterest m-1 text-black-50"></i>
          <i class="fa-brands fa-tiktok m-1 text-black-50"></i>
          <i class="fa-brands fa-youtube m-1 text-black-50"></i>
        </div>
  
        <div class="d-flex mb-3">
          <span class="text-black continueReading" data-bs-toggle="modal"
          data-bs-target="#${id}">Continue Reading</span>
          <i class="fa-solid fa-chevron-right pt-1 ms-2 arrow"></i>
        </div>
      </div>
    </div>
    
    <div class=" modal fade" id="${id}" tabindex="-1" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <img class="card-img" src="${img}">
            </div>
            <div class="p-2">
                ${description}
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>
    
    `;

    $(".items").append(element);
  }
}
