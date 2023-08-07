$(document).ready(function(){
    const apiKey = '9f1743b9d6d947c5a7ca37fc36749443';
    $.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=9f1743b9d6d947c5a7ca37fc36749443", function(data, status){
        if(status !== "success"){
            alert("news fetching unsuccessful");
        }
        console.log(data);
        displaynewsDetails(data);
        
    }); 
    function displaynewsDetails(blog) {

        const newsContainer = $('#news-card-group');
        let blogHtml = '';
       
        for (let i = 0; i < 6; i++) {
          const blogs = blog.articles[i];
          blogHtml += `
           <div class="card">
              <img  class="card-img-top" src="${blogs.urlToImage}" alt="" width="200" height="400">
              <hr>
              <div class="card-body">
                  <h6 class="card-name>${blogs.content}</h6>
                  <p class="muted-text">${blogs.publishedAt}</p>
                  <p class="muted-text">${blogs.description}</p>
              </div>
              <div>
              <hr>
              <a class="muted-text">continue reading></a>
              </div>
            </div>
          </div>
          <br>
          `;
        }
       newsContainer.html(blogHtml);
    }
}); 


