$("document").ready(function () {
  $.get(
    "https://newsapi.org/v2/everything?q=apple&from=2023-08-03&to=2023-08-03&sortBy=popularity&apiKey=b36e57e288a14b6291766108e2e4d762",
    function (data, status) {
      console.log(data);

      //  let {author,content,description,publishedAt,source,title,url,urlToImage}=data;

      let date1 = new Date(data.articles[0].publishedAt);
      let date2 = new Date(data.articles[1].publishedAt);
      let date3 = new Date(data.articles[2].publishedAt);

      //navbar
      $(".nav-item").css({ color: "red", fontWeight: "600" });

      $(".contact-box p").css({
        fontSize: "15px",
        color: "#999999",
        textAlign: "center",
      });
      $(".header-icons-container").css({ color: "#353535" });

      //carousal item-1
      $(".carousel-item-1 img")
        .attr("src", data.articles[1].urlToImage)
        .css({ height: "450px", objectfir: "cover", borderRadius: "8px" });
      $(".carousel-item-1 div h5")
        .text(data.articles[1].title)
        .css({ fontSize: "25px", fontWeight: "800" });
      $(".carousel-item-1 div p")
        .text(
          `${data.articles[1].author}, ${date1.toLocaleString("en-us", {
            month: "long",
          })} ${date1.getDate()},  ${date1.getUTCFullYear()} `
        )
        .css({ fontSize: "15px", fontWeight: "600", color: "#999999" });

      //carousal item-2
      $(".carousel-item-2 img")
        .attr("src", data.articles[0].urlToImage)
        .css({ height: "450px", objectfir: "cover", borderRadius: "8px" });
      $(".carousel-item-2 div h5")
        .text(data.articles[0].title)
        .css({ fontSize: "25px", fontWeight: "800" });
      $(".carousel-item-2 div p")
        .text(
          `${data.articles[0].author},  ${date2.toLocaleString("en-us", {
            month: "long",
          })} ${date2.getDate()},${date2.getUTCFullYear()} `
        )
        .css({ fontSize: "15px", fontWeight: "600", color: "#999999" });

      //pagination-container
      $(".pagination-btn").css({
        color: "#999999",
        background: "transparent",
        border: "1px solid rgb(221, 217, 217)",
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        cursor: "pointer",
      });

      //popular-posts
      $(".popular-posts-box").css({
        borderRadius: "8px",
        border: "1px solid rgb(221, 217, 217)",
      });
      $(".popular-posts-box h1").css({
        fontSize: "25px",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: "50px",
        color: "#09033b",
      });

      $(".popular-posts-box div img")
        .attr("src", data.articles[0].urlToImage)
        .css({ borderRadius: "50%", height: "50px", width: "50px" });
      $(".popular-posts-box div div p")
        .text(data.articles[0].title)
        .css({ fontSize: "16px", fontWeight: "700", color: "#09033b" });
      $(".popular-posts-box div div span")
        .text(
          `${date1.toLocaleString("en-us", {
            month: "long",
          })} ${date1.getDate()},${date1.getUTCFullYear()} `
        )
        .css({ fontSize: "15px", color: "#999999" });

      $(".popular-posts-sub-box2  img")
        .attr("src", data.articles[1].urlToImage)
        .css({ borderRadius: "50%", height: "50px", width: "50px" });
      $(".popular-posts-sub-box2  div p")
        .text(data.articles[1].title)
        .css({ fontSize: "16px", fontWeight: "700", color: "#09033b" });
      $(".popular-posts-sub-box2  div span")
        .text(
          `${date2.toLocaleString("en-us", {
            month: "long",
          })} ${date2.getDate()},${date2.getUTCFullYear()} `
        )
        .css({ fontSize: "15px", color: "#999999" });

      $(".popular-posts-sub-box3 img")
        .attr("src", data.articles[2].urlToImage)
        .css({ borderRadius: "50%", height: "50px", width: "50px" });
      $(".popular-posts-sub-box3 div p")
        .text(data.articles[2].title)
        .css({ fontSize: "16px", fontWeight: "700", color: "#09033b" });
      $(".popular-posts-sub-box3 div span")
        .text(
          `${date3.toLocaleString("en-us", {
            month: "long",
          })} ${date3.getDate()},${date3.getUTCFullYear()} `
        )
        .css({ fontSize: "15px", color: "#999999" });

      //Explore Topics
      $(".topics-container").css({
        borderRadius: "8px",
        border: "1px solid rgb(221, 217, 217)",
        marginTop: "20px",
      });
      $(".topics-container h1").css({
        fontSize: "25px",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: "50px",
        color: "#09033b",
      });
      $(".topic-item-box div p").css({
        fontSize: "16px",
        fontWeight: "600",
        color: "#09033b",
      });
      $(".topic-item-box div span i").css({ color: "#ff9380" });
      $(".topic-item-box  span").css({ color: "#bfbfbf" });

      //Newsletter
      $(".news-letter-box").css({
        borderRadius: "8px",
        border: "1px solid rgb(221, 217, 217)",
        marginTop: "20px",
        textAlign: "center",
      });
      $(".news-letter-box h1").css({
        fontSize: "25px",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: "50px",
        color: "#09033b",
      });
      $(".news-letter-box p").css({
        fontSize: "16px",
        color: "#09033b",
        fontWeight: "600",
      });
      $(".news-letter-box div button").css({
        width: "80%",
        height: "45px",
        padding: "8px",
        borderRadius: "15px",
        border: "1px solid rgb(221, 217, 217)",
        color: "#999999",
        fontSize: "14px",
      });
      $(".emailbtn").css({ backgroundColor: "transparent" });

      $(".signupbtn").css({
        background: "linear-gradient(to right, #ff6347,#ffa899)",
        color: "#fff",
      });

      $(".privacy-text").css({ color: "#999999", fontSize: "13px" });

      //Celebration-container
      $(".Celebration-container").css({
        borderRadius: "8px",
        border: "1px solid rgb(221, 217, 217)",
        marginTop: "20px",
      });
      $(".Celebration-container h1").css({
        fontSize: "25px",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: "50px",
        color: "#09033b",
      });
      $(".Celebration-container img")
        .attr("src", data.articles[1].urlToImage)
        .css({ borderRadius: "15px", height: "250px", width: "100%" });
      $(".Celebration-container h2")
        .text(data.articles[0].title)
        .css({
          fontSize: "20px",
          fontWeight: "700",
          marginBottom: "50px",
          color: "#09033b",
        });
      $(".Celebration-container p")
        .text(
          `${data.articles[0].author},  ${date3.toLocaleString("en-us", {
            month: "long",
          })} ${date3.getDate()},${date3.getUTCFullYear()} `
        )
        .css({ fontSize: "15px", fontWeight: "600", color: "#999999" });

      $(".Celebration-container div i").css({ color: "#999999" });
      $(".icon-circle").css({
        background: "transparent",
        border: "1px solid rgb(221, 217, 217)",
        height: "30px",
        width: "30px",
        borderRadius: "50%",
        cursor: "pointer",
      });

      //tag-clouds-container
      $(".tag-clouds-container").css({
        borderRadius: "8px",
        border: "1px solid rgb(221, 217, 217)",
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      });
      $(".tag-clouds-container h1").css({
        fontSize: "25px",
        fontWeight: "700",
        textAlign: "center",
        marginBottom: "40px",
        color: "#09033b",
      });
      $(".tags-box").css({ display: "flex", flexWrap: "wrap", width: "80%" });
      $(".tags-box div").css({
        margin: "6px",
        background: "transparent",
        border: "1px solid rgb(221, 217, 217)",
        height: "30px",
        color: "#999999",
        fontSize: "12px",
        width: "80px",
        borderRadius: "15px",
        cursor: "pointer",
      });

      $(".images-container").css({
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      });

      //footer-container

      $(".footer-container span").css({
        fontSize: "13px",
        color: "#999999",
        fontWeight: "600",
      });
      $(".backbtn").css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
        border: "1px solid rgb(221, 217, 217)",
        height: "35px",
        width: "80px",
        padding: "6px",
        color: "#999999",
        fontSize: "12px",
        width: "110px",
        borderRadius: "10px",
        cursor: "pointer",
      });
      $("#firstpage").css({
        background: "linear-gradient(to right, #ff6347,#ffa899)",
        color: "#fff",
      })
      $("#home").css({
        background: "linear-gradient(to right, #ff6347,#ffa899)",
        color: "#fff",
        width:"90px",
        height:"35px",
        borderRadius:"20px",
        color:"#fff",
        textAlign:"center",
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      })
      

      //-------------------------------------------------------------------------------------------------------//

      let alldata = data.articles;

      for (let i in alldata) {
        let {
          author,
          content,
          description,
          publishedAt,
          source,
          title,
          url,
          urlToImage,
        } = alldata[i];

        let date = new Date(publishedAt);

        let firstpagedata = alldata.slice(67, 72);
        let secondpagedata = alldata.slice(55, 60);
        let thirdpagedata = alldata.slice(53, 58);

        // console.log(firstpagedata);
        // console.log(secondpagedata);
        // console.log(thirdpagedata);

        let paginationFunction = function (alldata) {
          $(".posts-container").empty();

          for (let i in alldata) {
            const {
              urlToImage,
              author,
              publishedAt,
              title,
              content,
              description,
            } = alldata[i];

            let date = new Date(publishedAt);
          //  console.log(date);

            product = `
              <div class="product-content">
              <img class="product-image" src="${urlToImage}"/> 
              <div class="product-box-description">
                
                 <div d-flex justify-content-center align-items-center>
                 
                 <img src="${urlToImage}" class="rounded-img me-2"/>
                 <span class="me-2">${author}</span> <span><i class="fa-solid fa-circle red-dot"></i></span>
     
                  <span  class="me-2"> ${date.toLocaleString("en-us", {
                    month: "long",
                  })} ${date.getDate()}, ${date.getFullYear()}</span> 
                
               <span><i class="fa-solid fa-circle red-dot"></i></span>
     
                 <i class="fa-regular fa-comment"></i>
                 <span>(0)
              </div>
              <h1 class="mb-4" >${title}</h1>
              <p class="mb-2">${description}</p>
              <hr class="line"/>
              <div class="card-bottom-container d-flex  align-items-center justify-content-between">
                 <div>
                  <i class="fa-brands fa-facebook-f ms-1"></i>
                  <i class="fa-brands fa-twitter ms-1"></i>
                  <i class="fa-brands fa-instagram ms-1"></i>
                  <i class="fa-brands fa-pinterest ms-1"></i>
                  <i class="fa-brands fa-tiktok ms-1"></i>
                  <i class="fa-brands fa-youtube  ms-1"></i>
                 </div> 
     
                 <!-- Button trigger modal -->
     <p  class="text-decoration-underline mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal${i}">
       Continue Reading <i style="font-size:13px; color:#999999" class=" ms-1 fa-solid fa-chevron-right"></i>
     </p>
     
     <!-- Modal -->
     <div class="modal fade" id="exampleModal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered">
         <div class="modal-content">
           <div class="modal-header">
             <h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
           <div class="modal-body">
             <img class="modal-image" src="${urlToImage}"/>
             <p>${content}</p>
           </div>
           <div class="modal-footer">
             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            
             </div>
            </div>
           </div>
         </div>          
                  
           </div>
           </div>
           </div>
     
              `;

            $(".posts-container").append(product);

            //  $(".product-box").append(product);
            $(".product-image").css({ height: "300px", width: "100%" });
            $(".product-box").css({ borderRadius: "8px" });
            $(".product-box-description").css({ padding: "15px" });
            $(".product-content h1").css({
              fontWeight: "800",
              fontSize: "25px",
              color: "#09033b",
              marginBottom: "8px",
            });
            $(".product-content p").css({ fontSize: "15px", color: "#999999" });
            $(".product-box-description div").css({
              fontSize: "13px",
              color: "#999999",
              marginBottom: "20px",
              marginTop: "30px",
            });
            $(".rounded-img").css({
              height: "25px",
              width: "25px",
              borderRadius: "50%",
            });
            $(".red-dot").css({
              color: "#ff7d66",
              fontSize: "4px",
              marginRight: "5px",
            });
            $(".card-bottom-container p").css({
              fontWeight: "600",
              color: "#09033b",
              cursor: "pointer",
            });
            $(".modal-image").css({
              height: "200px",
              width: "100%",
              marginBottom: "20px",
              borderRadius: "10px",
            });

            $(".contact-box p").css({
              fontSize: "15px",
              color: "#999999",
              textAlign: "center",
            });
            $(".header-icons-container").css({ color: "#353535" });
          }
        };

        paginationFunction(firstpagedata);

        $("#firstpage").click(function () {
          $(".posts-container").empty;
          paginationFunction(firstpagedata);
        });

        $("#secondpage").click(function () {
          $(".posts-container").empty;
          paginationFunction(secondpagedata);
        });

        $("#thirdpage").click(function () {
          $(".posts-container").empty;
          paginationFunction(thirdpagedata);
        });
      }

      let imagesdata = alldata.slice(94, 100);

      const $imagesContainer = $(".images-container");

      for (let imageData of imagesdata) {
        const imageUrl = imageData.urlToImage;
        const imageElement = $("<img>").attr("src", imageUrl).css({
          width: "160px",
          height: "160px",
          borderRadius: "10px",
          padding: "5px",
        });
        $imagesContainer.append(imageElement);
      }
    }
  );
});


