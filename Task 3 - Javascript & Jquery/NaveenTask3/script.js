// index.js repeated
$(document).ready(function() {
    var slideIndex = 0;
    var totalSlides = 0; // Declare totalSlides at the outer scope
    var apiURL = 'https://newsapi.org/v2/everything?q=apple&from=2023-08-03&to=2023-08-03&sortBy=popularity&apiKey=ff99f6ea83d64ce481e9eb5958c7cbcb'; // Replace with your actual API endpoint
  
    function showSlide(index) {
      $.get({
        url: apiURL,
        method: 'GET',
        success: function(data) {
          totalSlides = data.articles.length; // Set the totalSlides here
          var sliderHTML = '';
  
          for (var i = 0; i < totalSlides; i++) {
            var slide = data.articles[i];
  
            sliderHTML += `<div class="slide" style="background-image: url('${slide.urlToImage}');">`;
            sliderHTML += '<div class="slide-content">';
            sliderHTML += '<h1>' + slide.title + '</h1>';
            sliderHTML += '<div style="display: flex;margin-left:30%">';
            sliderHTML += '<p>'+ slide.author +'</p>';
            sliderHTML += '<p>'+ formatDate(slide.publishedAt) +'</p>';
            sliderHTML += '</div>';
            sliderHTML += '</div></div>';
          }
          function formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        }
  
          $('.slider').html(sliderHTML);
          slideIndex = index;
          updateSlideVisibility();
        },
        error: function(error) {
          console.error('Error fetching data:', error);
        }
      });
    }
  
    function nextSlide() {
      slideIndex = (slideIndex + 1) % totalSlides;
      updateSlideVisibility();
    }
  
    function prevSlide() {
      slideIndex = (slideIndex - 1 + totalSlides) % totalSlides;
      updateSlideVisibility();
    }
  
    function updateSlideVisibility() {
      var slides = $('.slide');
      slides.hide();
      slides.eq(slideIndex).show();
    }
  
    // Call the showSlide function to display the first slide on page load
    showSlide(slideIndex);
    
    setInterval(nextSlide, 4000);
    
    // Event listeners for the navigation icons
    $('.prev').on('click', prevSlide);
    $('.next').on('click', nextSlide);
  });
  

  
//div2-------------------------------------  



$(document).ready(function() {
  const apiUrl = 'https://newsapi.org/v2/everything?q=apple&from=2023-08-04&to=2023-08-04&sortBy=popularity&apiKey=ff99f6ea83d64ce481e9eb5958c7cbcb'; // API URL with the provided data
  const cardsPerPage = 5;
  let currentPage = 1;

  // Function to fetch data from API
  function fetchDataFromAPI() {
    return $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json'
    });
  }

// Function to create a card
function createCard(article) {
  return `
    <div class="card">
      <img src="${article.urlToImage}" alt="Card Image">
      <div style="display: flex;">
       <p>${article.source.name}</p>
       <p>${formatDate(article.publishedAt)}</p> 
      </div>
      <h1>${article.title}</h1>
      <p>${article.description}</p>
      <br/>
      <hr> <!-- Add horizontal line after description -->
      <br/>
      <div class="card-footer"> <!-- Wrap social media icons and 'Continue Reading' link in a div -->
        <div class="social-media-icons">
          <a href="#" target="_blank"><i class="fa-brands fa-facebook"></i></a>
          <a href="#" target="_blank"><i class="fa-brands fa-twitter"></i></a>
          <a href="#" target="_blank"><i class="fa-brands fa-linkedin"></i></a>
          <a href="#" target="_blank"><i class="fa-brands fa-pinterest"></i></a>
          <a href="#" target="_blank"><i class="fa fa-envelope" aria-hidden="true"></i></a>
        </div>
        <div class="continue-reading">
          <a href="${article.url}" target="_blank">Continue Reading &nbsp;<i class="fa-solid fa-angle-right"></i></a>
        </div>
      </div>
    </div>
  `;
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}



  // Function to render the cards based on the page number
  function renderCards(pageNumber, data) {
    const start = (pageNumber - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    const cardContainer = $('#cardContainer');
    cardContainer.empty();

    for (let i = start; i < end && i < data.articles.length; i++) {
      const card = createCard(data.articles[i]);
      cardContainer.append(card);
    }
  }

  // Function to create pagination buttons and handle click events
  function createPaginationButtons(data) {
    const numPages = Math.ceil(data.articles.length / cardsPerPage);
    const numButtonsToShow = 2;

    const pagination = $('#pagination');
    pagination.empty();

    function addButton(pageNumber) {
      const button = $(`<button>${pageNumber}</button>`);
      pagination.append(button);

      button.click(function() {
        currentPage = pageNumber;
        renderCards(currentPage, data);
      });
    }

    function addAngleButton(direction) {
      const button = $(`<button><i class="fa fa-angle-${direction}" aria-hidden="true"></i></button>`);
      pagination.append(button);

      button.click(function() {
        if (direction === 'right') {
          if (currentPage < numPages) {
            currentPage++;
          }
        } else {
          if (currentPage > numButtonsToShow) {
            currentPage--;
          }
        }
        renderPagination(data);
        renderCards(currentPage, data);
      });
    }

    // Add previous button
    if (currentPage > numButtonsToShow) {
      addAngleButton('left');
    }

    // Add pagination buttons
    for (let i = 1; i <= numPages; i++) {
      if (i === currentPage) {
        addButton(i);
      } else if (
        i > currentPage - numButtonsToShow &&
        i < currentPage + numButtonsToShow
      ) {
        addButton(i);
      }
    }

    // Add next button
    if (currentPage + numButtonsToShow <= numPages) {
      addAngleButton('right');
    }
  }

  function renderPagination(data) {
    const pagination = $('#pagination');
    pagination.empty();

    createPaginationButtons(data);
  }

  // Fetch data from API and handle response
  fetchDataFromAPI()
    .done(function(data) {
      renderPagination(data);
      renderCards(currentPage, data);
    })
    .fail(function() {
      alert('Failed to fetch data from the API.');
    });
});


/*------------*/



$(document).ready(function () {
  let currentIndex = 0;
  let articles = [];

  // Fetch data from the API
  const apiUrl = 'https://newsapi.org/v2/everything?q=apple&from=2023-08-04&to=2023-08-04&sortBy=popularity&apiKey=ff99f6ea83d64ce481e9eb5958c7cbcb';
  
  $.get(apiUrl, function (data) {
      articles = data.articles;
      updateNews();
  });

  // Update the news container with current data
  function updateNews() {
      const article = articles[currentIndex];
      const container = $('#news-container');

      container.empty();
      container.append(`
          <div class="image-container">
              <img src="${article.urlToImage}" alt="Image">
          </div>
          <div class="title">${article.title}</div>
          <div class="author-date">
              <span>Author: ${article.author}</span>
              <span style="float: right;">Published Date: ${formatDate(article.publishedAt)}</span>
          </div>
      `);
  }

  // Format the date in a human-readable format
  function formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  // Event listener for the previous button
  $('#prev-btn').on('click', function () {
      if (currentIndex > 0) {
          currentIndex--;
          updateNews();
      }
  });

  // Event listener for the next button
  $('#next-btn').on('click', function () {
      if (currentIndex < articles.length - 1) {
          currentIndex++;
          updateNews();
      }
  });
});



/*--------------------------*/


$(document).ready(function() {
  // Replace this URL with the actual API URL
  const apiUrl = "https://newsapi.org/v2/everything?q=apple&from=2023-08-05&to=2023-08-05&sortBy=popularity&apiKey=ff99f6ea83d64ce481e9eb5958c7cbcb";

  // Fetch data from the API
  $.ajax({
    url: apiUrl,
    method: "GET",
    dataType: "json",
    success: function(data) {
      if (data.status === "ok") {
        const articles = data.articles;

        // Loop through each article and create the HTML structure
        articles.forEach(function(article) {
          const image = $("<img>").attr("src", article.urlToImage).addClass("news-image");
          const title = $("<div>").text(article.title).addClass("news-title");
          const publishedAt = $("<div>").text(formatDate(article.publishedAt)).addClass("news-publishedAt");

          const details = $("<div>").addClass("news-details").append(title, publishedAt);
          const articleDiv = $("<div>").addClass("news-article").append(image, details);
          $("#newsContainer").append(articleDiv);
        });
      }
      function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    }
  
    },
    error: function(error) {
      console.error("Error fetching data:", error);
    }
  });
});

















/*--------------*/

$(document).ready(function () {
    const apiUrl = 'https://newsapi.org/v2/everything?q=apple&from=2023-08-04&to=2023-08-04&sortBy=popularity&apiKey=ff99f6ea83d64ce481e9eb5958c7cbcb';

    let currentIndex = 0;
    let imageUrls = [];
    
    function getImagesFromAPI() {
      $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function (data) {
          if (data.status === 'ok' && data.articles) {
            imageUrls = data.articles.map(article => article.urlToImage);
            displayImages();
            setInterval(rotateImages, 4000);
          }
        },
        error: function (error) {
          console.log('Error fetching data from the API:', error);
        }
      });
    }
    
    function displayImages() {
      const imageContainer = $('#repeatimages');
      imageContainer.empty();
    
      // Display the first six images in the container
      for (let i = currentIndex; i < currentIndex + 6; i++) {
        const imageUrl = imageUrls[i % imageUrls.length];
        const imageElement = $('<img>').attr('src', imageUrl);
        imageContainer.append(imageElement);
      }
    }
    
    function rotateImages() {
      // Update the currentIndex to shift the images
      currentIndex = (currentIndex + 5) % imageUrls.length;
      displayImages();
    }
    
    // Get images from the API and start the rotation
    getImagesFromAPI();
    
 
   
});
