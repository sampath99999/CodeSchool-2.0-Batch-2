$(document).ready(function () {
    
    $.ajax({
        type: "get",
        url: "login.html",
        data: {},
        success: function (data) {
            $("#loginpage").click(function () {   console.log('hello');
                $('#form').html($(data).find('#login').html());
                console.log('hello')
            });
           
        }
    });
    $('.loginbutton').click(function(){
        console.log('hello');
    })
    console.log('hello')

})

