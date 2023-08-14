$(document).ready(function () {
    $.get("https://fakestoreapi.com/products", function (data, status) {
        console.log("function called");
        var status = ["Active", "Out of Stock"];
        var startIndex = 0;
        var endIndex = 10;
        function gettabledata(startIndex, endIndex) {
            for (let i = startIndex; i < endIndex; i++) {
                var sku = "TS" + Math.floor(Math.random() * 100000);
                var Variant = Math.ceil(Math.random() * 10);
                var statusItem = status[Math.floor(Math.random() * status.length)];
                const { image, title, price, category } = data[i];
                if (statusItem == "Active") {
                    var badgecolored = "badge-pill bg-success opacity-10";
                } else {
                    var badgecolored = "badge-pill bg-danger opacity-10";
                }
                $("#addProduct").append(
                    `<tr><td><input type="checkbox"/></td>
            <td><img src="${image}"/>${title}</td>
            <td>${category}</td><td>` +
                    sku +
                    `</td><td>` +
                    Variant +
                    `</td><td>${price}</td><td><div class="badge  ` +
                    badgecolored +
                    `">` +
                    statusItem +
                    `</div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm-7 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 3 7.8zm14 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 17 7.8z"/></svg></td></tr>`
                );
            }
        }
        $("#startingPage").css({ "background-color": "blue", color: "white" });
        gettabledata(startIndex, endIndex);
        $("#startingPage").click(function () {
            $(this).css({ "background-color": "blue", color: "white" });
            $("#endingPage").css({ "background-color": "white", color: "gray" });
            var paginationvalue = $(this).text();
            paginationvalue = parseInt(paginationvalue);
            startIndex = (paginationvalue - 1) * 10;
            endIndex = paginationvalue * 10;
            $("#addProduct").empty();
            gettabledata(startIndex, endIndex);
        });
        $("#endingPage").click(function () {
            $(this).css({ "background-color": "blue", color: "white" });
            $("#startingPage").css({ "background-color": "white", color: "gray" });
            var paginationvalue = $(this).text();
            paginationvalue = parseInt(paginationvalue);
            startIndex = (paginationvalue - 1) * 10;
            endIndex = paginationvalue * 10;
            $("#addProduct").empty();
            gettabledata(startIndex, endIndex);
        });
        function gettabledata(startIndex, endIndex) {
            for (let i = startIndex; i < endIndex; i++) {
                var sku = "TS" + Math.floor(Math.random() * 100000);
                var Variant = Math.ceil(Math.random() * 10);
                var statusItem = status[Math.floor(Math.random() * status.length)];
                const { image, title, price, category } = data[i];
                if (statusItem == "Active") {
                    var badgecolored = "badge-pill bg-success bg-opacity-10 text-success";
                } else {
                    var badgecolored = "badge-pill bg-danger bg-opacity-10 text-danger";
                }
                $("#addProduct").append(
                    `<tr><td><input type="checkbox"/></td>
        <td><img src="${image}"/>${title}</td>
        <td>${category}</td><td>` +
                    sku +
                    `</td><td>` +
                    Variant +
                    `</td><td>${price}</td><td><div class="badge  ` +
                    badgecolored +
                    `">` +
                    statusItem +
                    `</div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path fill="currentColor" d="M10.001 7.8a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 10 7.8zm-7 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 3 7.8zm14 0a2.2 2.2 0 1 0 0 4.402A2.2 2.2 0 0 0 17 7.8z"/></svg></td></tr>`
                );
            }
        }
    });
    $("#searchinput").keyup(function () {
        var searchinput = $(this).val().toLowerCase();
        $("#addProduct > tr").filter(function () {
            console.log(typeof $(this).text());
            $(this).toggle($(this).text().toLowerCase().indexOf(searchinput) > -1);
        });
    });
});
