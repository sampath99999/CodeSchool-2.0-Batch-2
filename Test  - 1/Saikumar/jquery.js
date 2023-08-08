
function insertImages(data)
{

  for(let item of data)
  { let url=item.image;
    console.log(url);
    const image=`<img src=${url} class="each-image" alt=${data.title}>`
    $(".images-container").append(image);
    $(".images-container").css({"display":"flex","flex-wrap":"wrap"});
    $(".each-image").css({"width":"150px","margin-right":"50px","margin-bottom":"50px"});
  }
}

$(
  function()
  {
    $(".input-section").css({"height":"8vh","display":"flex","justify-content":"center","align-items":"center","width":"40%"});
    $(".images-list-container").css({"padding-left":"30px"});
    $(".images-title").css({"color":"grey","margin-bottom":"30px","font-size":"30px","text-align":"center"});
    $(".input-container").css({"background-color":"white","display":"flex"})
    $(".input-icon").css({"color":"white","background-color":"orange","cursor":"pointer"});
    $(".input-icon-container").css({"background-color":"orange","padding":"5px"});
    $(".search-field").css({"border":"none","margin-left":"5px","outline":"none"});
    $(".navbar-list").css({"font-size":"20px","color":"grey"});
    $.get("https://fakestoreapi.com/products", function (data, status) {
      
    let filteredData=data;
    function getFilteredData()
    {
        let searchText=$("#search").val().toLowerCase();
        // console.log(searchText);
        filteredData=[]
        const newData=data.forEach((element) =>{
          
          // console.log(element)
          // let cetegory=element.category.toLowerCase();
          const category=element.category.toLowerCase();
          // console.log(category);
          if(category.includes(searchText))
          {
            filteredData.push(element);
          }      
        });
        // console.log(filteredData);
        $(".images-container").html("");
        if(filteredData.length==0)
        {
            const noResults=`<div class="no-results"><p>Not Results<p></div>`
            $(".images-container").append(noResults);
            $(".no-results").css({"display":"flex","align-items":"center","justify-content":"center","width":"100%","font-size":"45px","color":"grey"});
        }
        insertImages(filteredData);
    }
      $("#search-icon").click(function(){

        getFilteredData();
        
      }); 
     
    //   console.log(filteredData);
      insertImages(filteredData);      
    });
  }
)
