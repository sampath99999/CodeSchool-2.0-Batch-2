document.addEventListener('DOMContentLoaded', function() {

    $("#button-addon2").click(function() {
        var category = $("#categoryinput").val;
        var image = $("#catimginput").val;
        console.log(category);

        $.post("../api/add_category.php", {category:category,image:image},function(result){
            var result = JSON.parse(result);
            console.log(result);
            if(!result.status){
                alert(result.message);
            }else{
                alert("added successfully");
            }
    
        });

        // if (category.trim() !== '') {
        //     fetch('add_category.php', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded',
        //         },
        //         body: 'category=' + encodeURIComponent(category),
        //     })
        //         .then(response => response.json())
        //         .then(data => {
        //             if (data.success) {
        //                 alert('Category added successfully.');
        //                 categoryInput.value = ''; 
        //             } else {
        //                 alert('Category insertion failed.');
        //             }
        //         })
        //         .catch(error => {
        //             console.error('Error:', error);
        //         });
        // }
    });
});
