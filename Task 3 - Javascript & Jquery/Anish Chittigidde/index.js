$(document).ready(() => {
  const apiKey = "310c1ef9902c4d8c80db81c5807e52b8";
  const baseUrl = "https://newsapi.org/v2/everything";

  $.get(
    `${baseUrl}?q=apple&from=2023-08-03&to=2023-08-03&sortBy=popularity&apiKey=${apiKey}`,
    (data, status) => {
      const articles = data.articles;

      const setCarouselCard = (cardId, articleIndex) => {
        const article = articles[articleIndex];
        const cardDate = new Date(article.publishedAt);

        $(`#${cardId} img`).attr("src", article.urlToImage);
        $(`#${cardId} h5`).text(article.title);
        $(`#${cardId} p`).text(
          `${article.author} . ${cardDate.toLocaleString("en-us", {
            month: "long",
          })} ${cardDate.getDate()}, ${cardDate.getFullYear()}`
        );
      };

      setCarouselCard("carouselCard1", 0);
      setCarouselCard("carouselCard2", 1);

      const formatDate = (date) =>
        new Date(date).toLocaleString("en-us", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });

        const openNav = () => {
          $("#mySidebar").css('width','100%') ;
          $("#main").css('marginLeft','0px') ;
        }

        $(".openbtn").click(() => {
          openNav();
        })
        
        const closeNav=() => {
          $("#mySidebar").css('width','0px');
          $("#main").css('marginleft','0px');
        }

        $(".closebtn").click(() => {
          closeNav();
        })

      const createPostCard = (post) => {
        const date = new Date(post.publishedAt);
        return `
              <div class="postCard border border-light-subtle mb-4 rounded shadow-sm">
                <img src="${post.urlToImage}" class="w-100 rounded-top" />
                <p class="pe-2 ps-2 m-0">${
                  post.author
                } <span>.</span> ${formatDate(
          date
        )} <span>.</span> <i class="fa-regular fa-comment"></i> (0)</p>
                <h2 class="pe-2 ps-2">${post.title}</h2>
                <p class="pe-2 ps-2 m-0">${post.content}</p>
                <hr class="me-2 ms-2" />
                <div class="postCardFooter d-flex justify-content-between pe-2 ps-2 align-items-center pb-2">
                  <div>
                    <ul class="col p-0 m-0 gap-1 socialMedia d-flex" style="list-style: none;">
                    <li class="d-md-flex d-none">
                    <a href="/"
                      ><i
                        class="fa fa-facebook"
                        aria-hidden="true"
                        style="color: #79889E"
                      ></i
                    ></a>
                  </li>
                  <li class="d-md-flex d-none">
                    <a href="/"><i class="fa fa-twitter" aria-hidden="true" style="color: #79889E"></i></a>
                  </li>
                  <li class="d-md-flex d-none">
                    <a href="/"
                      ><i class="fa fa-instagram" aria-hidden="true" style="color: #79889E"></i
                    ></a>
                  </li>
                  <li class="d-md-flex d-none">
                    <a href="/"
                      ><i class="fa fa-pinterest" aria-hidden="true" style="color: #79889E"></i
                    ></a>
                  </li>
                  <li class="d-md-flex d-none"><a href="/"><i class="fa-brands fa-tiktok" style="color: #79889E"></i></i></a></li>
                  <li class="d-md-flex d-none">
                    <a href="/"
                      ><i class="fa fa-envelope" aria-hidden="true" style="color: #79889E"></i
                    ></a>
                  </li>
                  <li class="">
                    <a href="/"
                      ><i class="fa fa-share" aria-hidden="true" style="color: #79889E"></i
                    ></a>
                  </li>
                  <li class="">
                    <a href="/" 
                      ><i class="fa fa-ellipsis" aria-hidden="true" style="color: #79889E"></i
                    ></a>
                  </li>
                    </ul>
                  </div>
                  <div>
                    <button type="button" class="border-0 bg-transparent pt-md-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop${
                      post.publishedAt
                    }">
                      <p class="modalBtn align-items-center m-0">Continue reading <span class="material-symbols-outlined">keyboard_double_arrow_right</span></p>
                    </button>
                  </div>
                </div>
              </div>
          
              <!-- Modal -->
              <div class="modal fade" id="staticBackdrop${
                post.publishedAt
              }" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="staticBackdropLabel">${
                        post.title
                      }</h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <img src="${
                        post.urlToImage
                      }" class="w-100 rounded mb-3" />
                      <p>${post.description}</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                  </div>
                </div>
              </div>
            `;
      };

      const loadPosts = (postsList, page) => {
        const itemsPerPage = 10;
        const startIndex = (page-1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        if(page>1){
          $(".postsContainer").empty();
        }
        
        for (let i = startIndex; i < endIndex && i < postsList.length; i++) {
          $(".postsContainer").append(createPostCard(postsList[i]));
        }
      };

      loadPosts(articles, 1);

      $("#page1").click(function () {
        loadPosts(articles, 1);
      });

      $("#page2").click(function () {
        loadPosts(articles, 2);
      });

      $("#page3").click(function () {
        loadPosts(articles, 3);
      });

      $("#page4").click(function () {
        loadPosts(articles, 4);
      });

      $("#page4").click(function () {
        loadPosts(articles, 5);
      });

      const loadPopularPosts = (postsList) => {
        $(".popularContainer");
        postsList.slice(0, 3).forEach((post) => {
          const { urlToImage, title, publishedAt } = post;
          const date = new Date(publishedAt);
          const popularCard = `
          <div class="popularCard d-flex gap-3">
            <img src="${urlToImage}" class="rounded-circle" style="height:50px; width:50px"/>
            <div class="popularContentCard">
              <h6>${title}</h6>
              <p style="font-size:14px">${formatDate(date)}</p>
            </div>
          </div>`;
          $(".popularContainer").append(popularCard);
        });
      };

      const loadCelebrationItem = (post) => {
        const { urlToImage, title, publishedAt, author } = post;
        const date = new Date(publishedAt);
        $(".celebrationImg").attr("src", urlToImage);
        $(".celebrationTitle").text(title);
        $(".celebrationDate").html(
          `${author} <span>.</span> ${formatDate(date)}`
        );
      };

      const loadTagClouds = (postsList) => {
        $(".tagCard").empty();
        postsList.forEach((post) => {
          const { source } = post;
          $(".tagCard").append(
            `<p class="m-1 border border-light-subtle text-muted rounded-5 p-2">#${source.name}</p>`
          );
        });
      };

      const loadFooterImages = (postsList) => {
        $(".footerImgContainer").empty();
        postsList.forEach((post) => {
          const { urlToImage } = post;
          $(".footerImgContainer").append(
            `<img src="${urlToImage}" alt="footerImg" class="rounded shadow-sm" style="width:120px" />`
          );
        });
      };

      loadPopularPosts(articles.slice(71,81));
      loadCelebrationItem(articles[17]);
      loadTagClouds(articles.slice(51, 61));
      loadFooterImages(articles.slice(11,17));

      $(".postCard span").css({ fontSize: "40px", color: "red" });
      $(".postCard p").css({ color: "grey" });
      $(".postCardFooter p").css({
        color: "black",
        fontWeight: "bold",
        cursor: "pointer",
      });
    }
  );
});
