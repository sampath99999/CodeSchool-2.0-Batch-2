$(document).ready(function () {
  if (localStorage.getItem("token")) {
    createChatPage();
  } else {
    window.location.replace("/");
  }

  function createChatPage() {
    const token = localStorage.getItem("token");
    const container = createContainer("chatContainer", "shadow mt-5 mb-5");
    const row = createRow("chatRow", "");
    const usersList = createUsersList(token);
    row.append(usersList);
    container.append(row);
    $("body").append(container);
  }

  function createUsersList(token) {
    const userList = $("<ul>", {
      class: "",
      id: "userList",
    });
    $.post("api/getUsersList.php", { token: token }, function (data) {
      response = JSON.parse(data);
      if (response.status) {
        populateUserList(response.users, userList, token);
      }
    });
    return userList;
  }

  function populateUserList(users, list, token) {
    users.forEach(function (user) {
      const listItem = createUserListItem(user, token);
      list.append(listItem);
    });
  }
  function createUserListItem(user, token) {
    const listItem = $("<li>", {
      class: "list-group-item list-group-item-action",
      text: user.name,
    });
    listItem.data("userId", user.user_id);

    listItem.click(function () {
      const userId = $(this).data("userId");
      createChatBox(userId, token);
    });

    return listItem;
  }

  function createChatBox(otherUserId, token) {
    const container = $("#chatContainer");
    const messages = $("<div>");
    messages.addClass("chat-messages");
    container.empty();
    container.attr("min-height", "90vh");
    container.attr("max-height", "90vh");
    container.append(messages);
    const messageDiv = createMessageDiv();
    const input = createChatInput();
    messageDiv.append(input);
    const send = createSendBtn(messages, token, otherUserId);
    showMessages(messages, otherUserId, token);
    messageDiv.append(send);
    container.append(messageDiv);
  }

  function showMessages(messagesArea, otherUserId, token) {
    $.post(
      "api/getMessages.php",
      { token: token, otherUserId: otherUserId },
      function (data) {
        response = JSON.parse(data);
        if (response.status) {
          nameduser = response.cur.name;
          currentUser = response.cur;
          otherUser = response.otheruser;
          id = response.user;
          populateMessages(
            response.messages,
            messagesArea,
            id,
            currentUser,
            otherUser
          );
        } else {
        }
      }
    );
  }
  let nameduser;
  function populateMessages(
    messages,
    messagesArea,
    id,
    currentUser,
    otherUser
  ) {
    messages.forEach(function (message) {
      const messageBox = createMessageBox(
        message.message,
        message.sender_id,
        message.receiver_id,
        currentUser,
        otherUser,
        id,
        message.created_at
      );
      messagesArea.append(messageBox);
    });
  }

  function createMessageBox(
    message,
    sender,
    receiver,
    curname,
    othername,
    id,
    time
  ) {
    const messageBox = $("<div>");
    messageBox.addClass("message-box");
    if (checkuser(sender, id)) {
      messageBox.addClass("message-right");
    } else {
      messageBox.addClass("message-left");
    }
    messageBox.addClass("alert alert-primary m-3 p-2");
    const namediv = $("<div>", {});
    if (checkuser(sender, id)) {
      namediv.text(curname.name);
    } else {
      namediv.text(othername.name);
    }
    const timestamp = new Date(time);
    const hour = timestamp.getHours();
    const minute = timestamp.getMinutes();
    const second = timestamp.getSeconds();

    const span = $("<span>", {
      class: "ms-5",
      text: `${hour}:${minute}:${second}`,
    });
    namediv.append(span);
    messageBox.append(namediv);
    const messagetext = $("<div>", {
      text: message,
    });
    messageBox.append(messagetext);

    return messageBox;
  }

  function createMessageBox1(message, sender) {
    const messageBox = $("<div>");
    messageBox.addClass("message-box");
    if (!checkuser(sender, id)) {
      messageBox.addClass("message-right");
    } else {
      messageBox.addClass("message-left");
    }
    const namediv = $("<div>", {});
    namediv.text(sender);
    const timestamp = new Date();
    const hour = timestamp.getHours();
    const minute = timestamp.getMinutes();
    const second = timestamp.getSeconds();

    const span = $("<span>", {
      class: "mx-5 ",
      text: `${hour}:${minute}:${second}`,
    });
    namediv.append(span);
    messageBox.append(namediv);
    const messagetext = $("<div>", {
      text: message,
    });
    messageBox.append(messagetext);

    return messageBox;
  }
  function checkuser(sender, id) {
    return sender == id;
  }
  function createSendBtn(msg, token, otherUser) {
    const button = $("<button>", {
      class: "btn btn-success",
      text: "Send",
    });
    $(button).click(function (e) {
      e.preventDefault();
      const message = $("#chatInput").val().trim();
      if (message.length < 1) {
        return;
      }
      $.post(
        "api/sendMessage.php",
        { sender_id: token, receiver_id: otherUser, message: message },
        function (data) {
          response = JSON.parse(data);
          if (response.status) {
            $("#chatInput").val("");
            box = createMessageBox1(message, nameduser);
            msg.append(box);
          }
        }
      );
    });
    return button;
  }
  function createChatInput() {
    return $("<input>", {
      class: "form-control mb-3",
      attr: {
        type: "text",
        placeholder: "Enter Message",
      },
      id: "chatInput",
    });
  }

  function createMessageDiv() {
    return $("<div>", {
      class: "row",
    });
  }

  function createRow(id, classes) {
    return $("<div>", {
      class: `row ${classes}`,
      id: id,
    });
  }
  function createContainer(id, classes) {
    return $("<div>", {
      class: `container ${classes}`,
      id: id,
    });
  }
});
