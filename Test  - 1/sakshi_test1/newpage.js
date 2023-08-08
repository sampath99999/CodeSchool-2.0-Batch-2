

$(document).ready(function() {
    $("#srchBtn").click(function() {
        var searchQuery = $("#srchFrm").val();

        $.ajax({
            url: "https://api.thecatapi.com/v1/images/search?limit=20",
            data: {
                query: searchQuery,
                apiKey: "live_2uyh6hRNftTgzNLqqR3LTbvqVvvtICma0dRNud3JJLtFubiDrLPNyPrp97SPA4FS"
            },
            success: function(response) {
                console.log(response);
                displayImages(response);
            },
            error: function() {
                alert("Error fetching images from the API.");
            }
        });
    });
    function displayImages(images) {
        var imageContainer = $("#imagecontainer");
        let  productHtml = '';

        for (var i = 0; i < 20; i++) {
            const product = images[i];
            if (product && product.url) {
            productHtml += `
             <div class="card">
                <img  class="card-img-top" src="${product.url}" alt="" width="200" height="200">
            </div>
            `;
            } 
        }
        imageContainer.html( productHtml);
    }
});