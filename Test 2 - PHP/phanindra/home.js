$(document).ready(function () {
    const sendButton = $('#sendBtn');
    const messageInput = $('.inputbox input');
    const chatContainer = $('.messagebox');
    
    sendButton.click(function () {
        const message = messageInput.val().trim();
    
        if (message !== '') {
            const userToken = localStorage.getItem("token");
        //    console.log(userToken);

            if (userToken) {
                const postData = {
                    userToken: userToken,
                    message: message
                };

    
                $.post(
                    'api/fetchUser.php', 
                    postData,
                    function (response) {
                     //   console.log(response);
                        if (response.status === true) {
                            const username = response.message;
                          //  console.log(username);
                            const timestamp = new Date().toLocaleTimeString();
                            const messageBox = `
                            <div class="d-flex align-items-center me-1">
                                <div style=" background-color:blue; margin-top:20px; " class="text-light p-2 blueMessageBox bg-primary">
                                    <div class="d-flex justify-content-between align-items-center w-100 p-0 m-0 mb-1 ms-1">
                                   <p style="font-size:14px; font-weight:bold;" class="p-0 m-0" > ${username}</p>
                                    <p style="font-size:12px;" class="p-0 m-0" >${timestamp}</p>
                                    </div>
                                    <span class="ms-1" style="font-size:14px;">${message}</span>
                                </div>
                                <img class="mt-3 ms-1" style="height:50px; border-radius:50%;" src="https://spruko.com/demo/ynex/dist/assets/images/faces/4.jpg"/>

                            </div>`
                                ;
                            chatContainer.append(messageBox);
                            messageInput.val('');
                        } else {
                            console.error("User data not found");
                        }
                    },
                    'json'
                );
            } else {
                console.error("Token is not present in local storage.");
            }
        }
    });
});
