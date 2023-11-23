function displayEmails() {
  $.getJSON("api/subscribers.php")
    .done(function (data) {
      const tableBody = $("#email-list");
      tableBody.empty();

      data.emails.forEach(function (entry) {
        const newRow = $("<tr>");
        const emailCell = $("<td>").text(entry.email);
        const statusCell = $("<td>");
        const statusSelect = $("<select>");

        const statusOptions = ["Registered", "Suspended", "Active"];

        statusOptions.forEach(function (option) {
          const optionElement = $("<option>").text(option);
          statusSelect.append(optionElement);
        });

        statusSelect.val(entry.status);
        statusCell.append(statusSelect);
        newRow.append(emailCell, statusCell);
        tableBody.append(newRow);

        statusSelect.on("change", function () {
            entry.status = $(this).val();
        });
      });
    })
    .fail(function (error) {
      console.error("Error fetching emails:", error);
    });
}

$(document).ready(function () {
  $("#submit").click(function () {
    displayEmails();
  });
});
