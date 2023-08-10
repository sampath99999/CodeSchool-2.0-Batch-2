const APIKEY = "831f2f6063b34bf0897d27fa67c978a8";
const monthNames = [
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
var url =
  "https://newsapi.org/v2/top-headlines?" + "country=us&" + `apiKey=${APIKEY}`;

var img_url = "https://randomuser.me/api/?inc=picture&results=20";
var popular_posts = [];
var source_names = [];
var post = 0;
var newsData = [];
var currentPage = 1;
var newsPerPage = 5;
$.get(url, function (news) {
  let images = [];
  $.get(img_url, function (data) {
    const results = data.results;
    for (const result of results) {
      const pictureUrl = result.picture.large;
      images.push(pictureUrl);
    }
    generateNewsPage(images, news);
  });
});

function generateNewsPage(images, data) {
  createNewsPageNav();

  generateNewsBody(images, data);
  createHeader();
  createRightSidebar();
  createFooterImg();
  createFooter();
}

function createFooterImg() {
  const footer_img = $("<img>", {
    class: "img-fluid mx-4 mb-5",
    src: "images/footer.png",
    width: "95%",
  }).after();
  $("#footer").append(footer_img);
  $("#footer").append(createHorizontalLine().addClass(" my-4 w-75"));
}

function appendFooterElement(container, className, content) {
  var element = $("<div>").addClass(className).text(content);
  container.append(element, createLogos());
}

function appendFooterButton(container, className, content) {
  var button = $("<button>")
    .addClass("btn btn-outline-secondary ")
    .text(content);
  var element = $("<div>").addClass(className).append(button);
  container.append(element);
}

function createFooter() {
  var footerContainer = $("#footer-container");
  appendFooterElement(footerContainer, "footer-element-1", "2023 News");
  appendFooterButton(footerContainer, "badge", "^ Back To Top");
}

function createRightSidebar() {
  createInfoCard();
  createPopularPostsCard();
  createExploreTopicsCard();
  createNewsLetterCard();
  createCelebrationCard();
  createTagsCard();
}

function createTagsCard() {
  tagsCard = createCard();
  tagsHeader = createCardHeader("Tags");
  tags_list = createTagsList(source_names);
  tagsCard.append(tagsHeader, tags_list);
  $("#rightSidebar").append(tagsCard);
}

function createTagsList(tags) {
  const container = $("<div>", {
    class: "d-flex flex-wrap m-3",
  });
  for (const tag of tags) {
    const item = $("<span>", {
      class:
        " card p-2 text-secondary border-1 rounded-start-5 rounded-end-circle m-1",
      text: `#${tag}`,
    });
    container.append(item);
  }
  return container;
}

function createCelebrationCard() {
  celebrationCard = createCard();
  celebrationHeader = createCardHeader("Celebration");

  celebration_text = createcelebrationTextHeader(popular_posts[post]["title"]);
  celebration_img = createCardImg(popular_posts[post]["image"]).addClass("m-4");
  celebration_author = createCelebrationAuthor(
    popular_posts[post]["author"],
    popular_posts[post]["date"]
  );
  button = createButtons();
  celebrationCard.append(
    celebrationHeader,
    celebration_img,
    celebration_text,
    celebration_author,
    button
  );

  $("#rightSidebar").append(celebrationCard);
}

function createCelebrationAuthor(author, date) {
  const container = $("<div>", {
    class: "d-flex justify-content-space-around m-1",
  });
  return container.append(author, date);
}

function createButtons() {
  container = $("<div>", {
    class: "d-flex flex-wrap justify-content-center align-items-center",
  });
  left_button = createCelebrationLeftBtn();
  right_button = createCelebrationRightBtn();
  container.append(left_button, right_button);
  return container;
}

function createCelebrationLeftBtn() {
  const btn = $("<button>", {
    class: "btn rounded-circle border-1 p-2 m-1  text-secondary",
    id: "c-left-btn",
    type: "button",
    text: "<",
  });
  btn.click(function () {
    post = (post - 1 + popular_posts.length) % popular_posts.length;
    updateCelebrationCard();
  });
  return btn;
}

function createCelebrationRightBtn() {
  const btn = $("<button>", {
    class: "btn rounded-circle border-1 p-2 m-2  text-secondary",
    id: "c-right-btn",
    type: "button",
    text: ">",
  });
  btn.click(function () {
    post = (post + 1) % popular_posts.length;
    updateCelebrationCard();
  });
  return btn;
}

function updateCelebrationCard() {
  celebration_text.text(popular_posts[post]["title"]);
  celebration_img.html(createCardImg(popular_posts[post]["image"]));
  celebration_author.html(
    createCelebrationAuthor(
      popular_posts[post]["author"],
      popular_posts[post]["date"]
    )
  );
}

function createcelebrationTextHeader(text) {
  return $("<p>", {
    class: "fw-bold small c-text mx-4",
    text: text,
  });
}

function createNewsLetterCard() {
  newsLetterCard = createCard();
  newsLetterHeader = createCardHeader("Newsletter");
  newsletter_text = newsletterText();
  newsletterEmail = newsletterEmailInput();
  newsletterButton = newsletterButtonInput();
  newsletterPrivacy = newsletterPrivacyText();
  newsLetterCard.append(
    newsLetterHeader,
    newsletter_text,
    newsletterEmail,
    newsletterButton,
    newsletterPrivacy
  );

  $("#rightSidebar").append(newsLetterCard);
}

function newsletterPrivacyText() {
  return $("<p>", {
    class: "small text-secondary py-3",
    text: "By signing up you agree to our Privacy Policy",
  });
}

function newsletterEmailInput() {
  return $("<input>", {
    class: "form-control p-2 my-2 rounded-5",
    type: "email",
    placeholder: "Enter email",
  });
}

function newsletterButtonInput() {
  return $("<button>", {
    class: "btn my-2 m-1 rounded-5 btn-block",
    text: "Sign Up",
    style: "background-color:orange; width:100%",
  });
}

function newsletterText() {
  return $("<p>", {
    class: "fw-bold small",
    text: "Join 70,000 subscibers!",
  });
}

function createExploreTopicsCard() {
  topicsCard = createCard();
  topicsHeader = createCardHeader("Explore Topics");
  topicsCard.append(topicsHeader);
  topics = [
    "Celebration",
    "Culture",
    "Fashion",
    "Inspiration",
    "Lifestyle",
    "Politic",
    "Trending",
  ];
  container = $("<div>", {
    class: "container-fluid",
  });
  for (topic in topics) {
    topic_text = topics[topic];
    topic_number = parseInt(topic) + 1; // ParseInt to convert the string to a number
    topic_div = createTopic(topic_text, topic_number);
    container.append(createHorizontalLine(), topic_div);
  }
  topicsCard.append(container);
  $("#rightSidebar").append(topicsCard);
}

function createTopic(text, number) {
  const mainDiv = $("<div>", {
    class: "numbered-div p-3",
  });

  const leftDiv = createTopicLeftDiv(text);
  const rightDiv = createTopicRightDiv(number);

  mainDiv.append(createHorizontalLine(), leftDiv, rightDiv);

  return mainDiv;
}

function createTopicLeftDiv(text) {
  const leftDiv = $("<div>", {
    class: "left-div d-flex justify-content-start",
  });

  const textElement = $("<span>", {
    class: "ms-2 small fw-bold",
    text: `˃ ${text}`,
  });

  leftDiv.append(textElement);

  return leftDiv;
}

function createTopicRightDiv(number) {
  const rightDiv = $("<div>", {
    class: "right-div d-flex justify-content-end text-secondary",
  });

  const numberElement = $("<span>", {
    class: "me-2 small",
    text: `(${number})`,
  });

  rightDiv.append(numberElement);

  return rightDiv;
}

function createHorizontalLine() {
  return $("<hr>");
}

function createPopularPostsCard() {
  postsCard = createCard();
  postsContent = createPopularPostsCardContent();
  postsCard.append(postsContent);
  $("#rightSidebar").append(postsCard);
}

function createPopularPostsCardContent() {
  postsMain = $("<div>", {});
  postHeader = createCardHeader("Popular Posts");
  postsMain.append(postHeader);
  for (const post of popular_posts) {
    post_title = post["title"];
    post_img_url = post["image"];
    post_date = post["date"];
    posts_container = createPostsContainer(post_img_url, post_title, post_date);
    postsMain.append(posts_container);
  }
  return postsMain;
}

function createPostsContainer(img, title, date) {
  return $("<div>", {
    class: "row mx-3 p-2 mb-3",
  }).append(createPopularPostImg(img), createPopularPostContent(title, date));
}

function createPopularPostImg(img) {
  return $("<img>", {
    src: img,
    class: "col-3 rounded-circle",
    style: "object-fit: cover; max-width: 100%; max-height: 50px;",
  });
}
function createPopularPostContent(title, date) {
  content = $("<div>", {
    class: "col-9",
  });
  const limitedTitle = limitWords(title, 10);
  heading = $("<h5>", {
    class: "row fs-6 fw-bolder",
    text: limitedTitle,
  });
  date.addClass("row");
  content.append(heading, date);
  return content;
}

function limitWords(text, limit) {
  const words = text.split(" ");

  if (words.length <= limit) {
    return text;
  } else {
    const limitedWords = words.slice(0, limit);
    return limitedWords.join(" ") + "...";
  }
}

function createInfoCard() {
  const card = createCard();
  const content = createInfoCardContent();
  const logos = createLogos();
  card.append(content, logos);
  $("#rightSidebar").append(card);
}

function createInfoCardContent() {
  content = $("<p>", {
    class: "text-center text-secondary p-1 mx-2 my-4",
    text: "Hello, We're content writer who is fascinated by content fashion, celebrity and lifestyle. We helps clients bring the right content to the right people.",
  });
  return content;
}
function createCard() {
  card = $("<div>", {
    class:
      "card p-2 mt-3 mb-5 ms-2 me-sm-2 me-5 border-1 d-flex flex-column justify-content-center align-items-center rounded-3",
  });
  return card;
}

function createCardHeader(text) {
  card = $("<div>", {
    class: "fs-5 text-center my-3 fw-bold",
    text: text,
  });
  return card;
}

function createHeader() {
  $("#headerNav").append(createHeaderNav());
  const carousel = createCarousel();
  $("#slider").append(carousel);
  const carouselInstance = new bootstrap.Carousel(
    $("#carouselExampleCaptions")[0]
  );
  $(".carousel-control-prev").on("click", function () {
    carouselInstance.prev();
  });
  $(".carousel-control-next").on("click", function () {
    carouselInstance.next();
  });
}

function createHeaderNav() {
  const navLeftContainer = createLeftNavContainer();
  const navRightContainer = createRightNavContainer();
  navContainer = $("<div>", {
    class: "container-fluid",
  });
  row = $("<div>", {
    class: "row d-flex justify-content-around   mx-4 main-nav", // Added a custom class for leftNavContainer
  });
  navContainer.append(row);
  row.append(navLeftContainer, navRightContainer);
  return navContainer;
}

function createRoundedButton(text) {
  const button = $("<button>", {
    class: "btn rounded-5 my-2 mx-3 text-secondary",
    text: text,
  });
  button.hover(
    function () {
      $(this).addClass("btn-hover-color text-white");
    },
    function () {
      $(this).removeClass("btn-hover-color text-white");
    }
  );
  return button;
}

function createIconButton(iconClass) {
  const button = $("<button>", {
    class: "btn rounded-5",
  });

  const icon = $("<i>", {
    class: `fa-${iconClass}`,
    "aria-hidden": "true",
  });
  button.hover(
    function () {
      $(this).addClass("btn-hover-color text-white");
    },
    function () {
      $(this).removeClass("btn-hover-color text-white");
    }
  );
  button.append(icon);
  return button;
}

function createLeftNavContainer() {
  const navContainer = $("<div>", {
    class: "col-sm-9 ",
  });

  const nav = $("<div>", {
    class:
      "d-flex d-none d-md-flex justify-content-start align-items-center left-nav",
  }); // Removed the "navbar" class

  const navButton = createRoundedButton("Home");
  const navButton2 = createRoundedButton("Lifestyle");
  const navButton3 = createRoundedButton("Culture");
  const navButton4 = createRoundedButton("Features");
  const navButton5 = createRoundedButton("Contact");

  nav.append(navButton, navButton2, navButton3, navButton4, navButton5);
  navContainer.append(nav);
  return navContainer;
}

function createRightNavContainer() {
  const navContainer = $("<div>", {
    class: "col-md-3 ",
  });
  let bars;
  const nav = $("<nav>", {
    class: "d-flex justify-content-around align-items-center",
  });
  bars = createIconButton("solid fa-bars ms-auto d-sm-inline d-md-none");
  const search = createIconButton("solid fa-search me-auto");
  nav.append(search, bars);
  navContainer.append(nav);

  bars.on("click", function () {
    if ($(window).width() < 768) {
      const icon = $(this).find("i");

      if (icon.hasClass("fa-bars")) {
        icon.removeClass("fa-bars");
        icon.addClass("fa-times");
      } else {
        icon.removeClass("fa-times");
        icon.addClass("fa-bars");
      }
      const leftNavContainer = $(".left-nav");
      const mainNav = $(".main-nav");
      const body = $("#body");
      const slider = $("#slider");
      const footer = $("#footer");
      const footer_container = $("#footer-container")
      body.toggleClass("d-none");
      slider.toggleClass("d-none");
      footer.toggleClass("d-none");
      footer_container.toggleClass("d-none")
      mainNav.toggleClass("flex-column-reverse");
      leftNavContainer.toggleClass("d-none flex-column");
    }
  });

  return navContainer;
}

function createCarouselIndicators() {
  const carouselIndicators = $("<div>", {
    class: "carousel-indicators",
  });

  for (let i = 0; i < 3; i++) {
    const indicator = $("<button>", {
      type: "button",
      "data-bs-target": "#carouselExampleCaptions",
      "data-bs-slide-to": i,
      "aria-label": `Slide ${i + 1}`,
    });

    indicator.addClass(i === 0 ? "active" : "");
    indicator.attr("aria-current", i === 0 ? "true" : "false");

    carouselIndicators.append(indicator);
  }

  return carouselIndicators;
}

function createCarouselItem(index, sliderImg) {
  const carouselItem = $("<div>", {
    class: index === 0 ? "carousel-item active" : "carousel-item",
  });

  const img = $("<img>", {
    src: sliderImg,
    class: "d-block w-100 rounded-4",
    alt: `Slide ${index + 1}`,
    height: "500px",
  });

  const carouselCaption = $("<div>", {
    class: "carousel-caption d-md-block",
  });

  const h2 = $("<h2>", {
    text: `${popular_posts[index]["title"]}`,
  });

  const details = $("<div>", {});

  details.append(popular_posts[index]["author"]);
  details.append(popular_posts[index]["date"]);
  carouselCaption.append(h2, details);
  carouselItem.append(img, carouselCaption);

  return carouselItem;
}

function createCarouselControls() {
  function createControlButton(classNames, slideDirection, label) {
    return $("<button>", {
      class: classNames,
      type: "button",
      "data-bs-target": "#carouselExampleCaptions",
      "data-bs-slide": slideDirection,
    }).append(
      $("<span>", {
        class: `${classNames}-icon`,
        "aria-hidden": "true",
      }),
      $("<span>", {
        class: "visually-hidden",
        text: label,
      })
    );
  }

  const prevButton = createControlButton(
    "carousel-control-prev",
    "prev",
    "Previous"
  );
  const nextButton = createControlButton(
    "carousel-control-next",
    "next",
    "Next"
  );

  return { prevButton, nextButton };
}

function createCarousel() {
  const carouselIndicators = createCarouselIndicators();
  const carouselInner = $("<div>", { class: "carousel-inner" });
  const { prevButton, nextButton } = createCarouselControls();
  img = [
    "https://wallpapercave.com/dwp2x/wp5574222.jpg",
    "https://wallpapercave.com/wp/wp4922106.jpg",
    "https://wallpapertag.com/wallpaper/middle/d/6/4/263992-free-aesthetic-background-tumblr-1920x1080-picture.jpg",
  ];
  for (let i = 0; i < 3; i++) {
    const carouselItem = createCarouselItem(i, img[i]);
    carouselInner.append(carouselItem);
  }

  const carouselContainer = $("<div>", {
    id: "carouselExampleCaptions",
    class: "carousel slide",
  }).append(carouselIndicators, carouselInner, prevButton, nextButton);

  return carouselContainer;
}

function createNewsPageNav() {
  $("#nav").append(
    $("<div>", {
      class:
        "col d-flex justify-content-between align-items-center px-2 py-4 mx-5 my-auto",
    }).append(createNavLeftSide(), createNavRightSide())
  );
  $("#nav").after("<hr>");
}

function createNavLeftSide() {
  return $("<div>", {
    class: "fs-6 fw-bold",
    text: "News",
  }).css({ color: "orange" });
}

function createNavRightSide() {
  return $("<div>", {}).append(createLogos());
}

function generateNewsBody(images, data) {
  var news = data.articles;
  for (var i in news) {
    let sourceName = news[i].source.name;
    let author = news[i].author;
    let authorImg = images[i];
    let description = news[i].description;
    let title = news[i].title;
    let url = news[i].url;
    let urlToImage = news[i].urlToImage;
    let publishedAt = news[i].publishedAt;
    let content = news[i].content;
    if (i < 3) {
      var post = {
        title: title,
        image: urlToImage,
        date: getPublishedDate(publishedAt),
        author: getAuthorName(author),
      };
      popular_posts.push(post);
    }
    news_post = {
      title: title,
      image: urlToImage,
      publishedAt: publishedAt,
      author: author,
      description: description,
      authorImg: authorImg,
      url: url,
      urlToImage: urlToImage,
      publishedAt: publishedAt,
      content: content,
    };
    newsData.push(news_post);
    source_names.push(sourceName);
  }
  showNewsPage(currentPage);
}

function showNewsPage(pageNumber) {
  var startIndex = (pageNumber - 1) * newsPerPage;
  var endIndex = startIndex + newsPerPage;
  $("#news").empty();
  for (var i = startIndex; i < endIndex; i++) {
    if (i >= newsData.length) {
      break;
    }
    var newsCardData = newsData[i];
    $("#news").append(
      createNewsCard(
        newsCardData.author,
        newsCardData.authorImg,
        newsCardData.title,
        newsCardData.url,
        newsCardData.urlToImage,
        newsCardData.publishedAt,
        newsCardData.description,
        newsCardData.content
      )
    );
  }
  showPagination();
}

function showPagination() {
  var totalPages = Math.ceil(newsData.length / newsPerPage);
  page = $("<div>", {
    id: "pagination",
    class: "d-flex justify-content-center my-5",
  });
  console.log("hi");
  for (var i = 1; i <= totalPages; i++) {
    $(page).append(
      $("<span>", {
        text: i,
        class:
          "rounded-circle border border-secondary m-2 text-center " +
          (i === currentPage ? "bg-info-subtle " : ""),
        click: function () {
          currentPage = parseInt($(this).text());
          showNewsPage(currentPage);
        },
        style: "height:35px;width:35px;",
      })
    );
  }
  $("#news").append(page);
}

function createNewsCard(
  author,
  authorImg,
  title,
  url,
  urlToImage,
  publishedAt,
  description,
  content
) {
  return $("<div>", {
    class:
      "card p-0 my-3 me-2 ms-5 ms-sm-2 border-1 d-flex flex-column justify-content-center align-items-center rounded-3",
  }).append(
    createNewsCardBody(
      author,
      authorImg,
      title,
      url,
      urlToImage,
      publishedAt,
      description,
      content
    )
  );
}

function createNewsCardBody(
  author,
  authorImg,
  title,
  url,
  urlToImage,
  publishedAt,
  description,
  content
) {
  return $("<div>", {
    class: "card-body p-0",
  }).append(
    createCardImg(urlToImage),
    createAuthorDetails(author, authorImg, publishedAt),
    createNewsCardHeader(title),
    createNewsCardDescription(description),
    createNewsCardFooter(title, urlToImage, content)
  );
}

function createNewsCardFooter(title, urlToImage, content) {
  return $("<div>", {
    class: "card-footer m-3 bg-white",
  }).append(createFooterContainer(title, urlToImage, content));
}

function createLogos() {
  logos = [
    "facebook",
    "twitter",
    "linkedin",
    "pinterest",
    "telegram",
    "facebook-messenger",
  ];
  footerLogos = createFooterLogos();
  for (logo in logos) {
    footerLogos.append(getLogos(logos[logo]));
  }
  return footerLogos;
}

function createFooterContainer(title, urlToImage, content) {
  continueReadingBtn = createContinuedReadingBtn(title, urlToImage, content);
  return $("<div>", {
    class: "d-flex justify-content-between align-items-center",
  }).append(createLogos(), continueReadingBtn);
}

function getLogos(logo) {
  return $("<i>", {
    class: `fa-brands fa-${logo} px-1 text-secondary`,
  });
}

function createContinuedReadingBtn(title, urlToImage, content) {
  const btn = $("<a>", {
    class: "btn btn-primary bg-white text-dark fw-bold border-0",
    text: `Continue Reading ˃`,
  });

  btn.click(function () {
    const card = createExpandedCard(title, urlToImage, content);
    const overlay = createOverlay(card);

    $("body").append(overlay);
  });

  return btn;
}

function createOverlay(content) {
  const overlay = $("<div>", {
    class: "overlay d-flex align-items-center justify-content-center",
    style:
      "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6);",
  });

  overlay.append(content);

  return overlay;
}

function createExpandedCard(title, imagePath, description) {
  const card = $("<div>", {
    class: "card p-3",
    style: "max-width: 500px; margin: 0 auto;",
  });

  const cardHeader = $("<div>", {
    class:
      "card-header d-flex justify-content-between align-items-center fw-bold",
    html: `${title}<button type="button" class="btn-close" aria-label="Close"></button>`,
  });

  const cardImage = $("<img>", {
    class: "card-img-top",
    src: imagePath,
    alt: "Card Image",
  });

  const cardBody = $("<div>", {
    class: "card-body",
  }).append(
    $("<p>", {
      class: "card-text",
      text: description,
    })
  );

  card.append(cardHeader, cardImage, cardBody);

  card.find(".btn-close").click(function () {
    card.closest(".overlay").remove();
  });

  return card;
}

function createFooterLogos() {
  return $("<div>", {});
}

function createNewsCardDescription(description) {
  return $("<p>", {
    class: "card-text mx-4 mt-3 text-secondary small px-3",
    text: description,
  });
}

function createAuthorDetails(author, authorImg, publishedAt) {
  return $("<div>", {
    class: "container-fluid d-flex gap-3 align-items-center mx-3 mt-3",
  }).append(
    createAuthorImg(authorImg),
    getAuthorName(author),
    createRedDot(),
    getPublishedDate(publishedAt),
    createRedDot(),
    createCommentlogo()
  );
}

function createCommentlogo() {
  return $("<i>", {
    class: "small fa-regular fa-comment px-1 text-secondary",
    text: " (0)",
  });
}

function createRedDot() {
  return $('<div class="red-dot"></div>');
}

function createAuthorImg(authorImg) {
  return $("<img>", {
    src: authorImg,
    class: "rounded-circle",
    alt: "...",
    width: "30px",
    height: "30px",
  });
}

function getAuthorName(author) {
  return $("<p>", {
    class: "small-f text-secondary my-auto",
    text: author,
  });
}

function getPublishedDate(publishedAt) {
  const dateObject = new Date(publishedAt);
  const month = monthNames[dateObject.getMonth()];
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  return $("<p>", {
    class: "small-f text-secondary my-auto",
    text: `${month} ${day},${year}`,
  });
}

function cardImg(urlToImage) {
  return $("<img>", {
    src: urlToImage,
    class: "card-img-top d-inline-block",
    alt: "...",
  });
}

function createImgTag() {
  return $("<div>", {
    class: "badge img-tag",
    text: "Headlines",
  });
}

function createCardImg(urlToImage) {
  const container = $('<div class="card-img-container"></div>');
  container.append(createImgTag());
  cardImg(urlToImage).prependTo(container);
  return container;
}

function createNewsCardHeader(title) {
  return $("<div>", {
    class: "card-header mx-3 bg-white fs-3 fw-bolder border-0 pb-1",
    text: title,
  });
}
