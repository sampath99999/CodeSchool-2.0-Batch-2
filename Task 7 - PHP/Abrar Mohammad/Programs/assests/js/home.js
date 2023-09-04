$(document).ready(function () {
  var userToken = localStorage.getItem("access_token");
  if (!userToken) {
    window.location.href = "login.html";
  }
  var result = [];
  $("#hosHead").css({ fontSize: "15px" });

  $(".hospitalLogo").css({
    height: "25px",
    width: "25px",
    borderRadius: "50%",
  });
  var background = [
    "bg-success",
    "bg-secondary",
    "bg-info",
    "bg-primary",
    "bg-warning",
  ];
  var randBg = Math.floor(Math.random() * background.length);
  var randomBackground = background[randBg];

  let invoice_ids = [];

  let invoice_data = [];

  $("#addBtn").hide();

  $("#addAppointment").hide();

  $("#addInvoice").hide();

  $(".nameErr").hide();
  $(".nameErr").css({ color: "red", fontSize: "12px" });
  $(".ageErr").hide();
  $(".ageErr").css({ color: "red", fontSize: "12px" });
  $(".contactErr").hide();
  $(".contactErr").css({ color: "red", fontSize: "12px" });

  $("#patientName").blur(function (event) {
    var patientName = $("#patientName").val();
    if (patientName.length === 0) {
      $(".nameErr").show();
    } else {
      $(".nameErr").hide();
    }
  });

  $("#patientAge").blur(function (event) {
    var patientAge = $("#patientAge").val();
    if (patientAge.length === 0) {
      $(".ageErr").show();
    } else {
      $(".ageErr").hide();
    }
  });

  $("#patientContact").blur(function (event) {
    var patientContact = $("#patientContact").val();
    if (patientContact.length === 0) {
      $(".contactErr").show();
    } else {
      $(".contactErr").hide();
    }
  });

  function getInvoices(
    id,
    patient_name,
    hospital_name,
    doctor_name,
    invoice_date,
    address,
    disease_name,
    doc_id,
    medicine_name,
    quantity,
    medicine_total_cost,
    medicine_cost,
    bed_charges,
    consultation,
    stay_days,
    bed_charges_total,
    total_cost_per_patient,
    surgery_cost,
    patient_age,
    patient_gender
  ) {
    $.get(
      "http://localhost/programs/apiconfig/getinvoicedetails.php",
      function (data) {
        var data = JSON.parse(data);
        for (let each of data) {
          if (!invoice_ids.includes(each.invoice_id)) {
            invoice_ids.push(each.invoice_id);
          }
        }
        for (let j of invoice_ids) {
          if (j === id) {
            $(".viewBtn").append(`<!-- Button trigger modal --> 
            <!-- Modal -->
            <div class="modal fade" id="exampleModal${id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Patient Invoice</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body modalDisplay shadow-lg m-3 rounded pt-2 pb-2 pe-2 ps-2">
                  <hr/>

                 <div class = "headCont d-flex justify-content-between">
                 <div class = "logoCont d-flex align-items-center rounded">
                 <img src = "https://marketplace.canva.com/EAE8eSD-Zyo/1/0/1600w/canva-blue%2C-white-and-green-medical-care-logo-oz1ox2GedbU.jpg" class = "logoImg me-2" />
                 <div class = "hosNameCont">
                 <h1 class = "heading"> ${hospital_name} </h1>
                 <p class = "m-0 addressName" >${address}</p>
                 </div>
                 </div>
                 </div>
                 <hr/>
                 <div class = "summaryRepert d-flex justify-content-center align-items-center">
                 <p class = "invoiceHead"> Invoice Details </p>

                 </div>
                  <div class = "patientDetailCont d-flex justify-content-between p-0 m-0">
                  <div class = "detailCont p-0 d-flex flex-column me-2">
                  <p class = "namePara m-0">Name : ${patient_name} </p>
                  <p class = "namePara m-0">Age : ${patient_age}Y /${patient_gender}  </p>
                  <p class = "namePara m-0">Consultant Dr. : ${doctor_name} </p>
                  <p class = "namePara m-0">Regd.No of Doctor : ${doc_id} </p>
                  <p class = "namePara m-0">Telephone : 99${id}${id}${patient_age}${id} </p>
                  </div>
                  <div class = "anotDetailsCont">
                  <p class = "namePara m-0">Disease : ${disease_name} </p>
                  <p class = "namePara m-0">MR Number : MR${patient_age}${id} </p>
                  <p class = "namePara m-0">Bill No : AG-${id}-${patient_age} </p>
                  <p class = "namePara m-0">Bill Date : ${invoice_date} </p>
                  <p class = "namePara m-0">Address : Hyderabad,Telangana </p>
                  </div>
                  </div>
                  <hr/>
                  <div class = "servicesContainer d-flex justify-content-between">
                  <div class = "serviceNameCont">
                  <p class = "namePara m-0">Service Name</p>
                  <p class = "namePara m-0">${disease_name}</p>
                  <p class = "namePara m-0">Consultation</p>
                  <p class = "namePara m-0">Bed Charges(Per Day)</p>
                  <p class = "namePara m-0">Treatment Charges</p>
                  </div>
                  <div class = "ratesContainer d-flex justify-content-around">
                  <div class = "ratesCont me-2">
                  <p class = "namePara m-0">Medicine Name</p>
                  <p class = "namePara m-0"> ${medicine_name} </p>
                  </div>
                  <div class = "ratesCont me-2">
                  <p class = "namePara m-0">Quantity</p>
                  <p class = "namePara m-0"> ${quantity} </p>
                  <p class = "namePara m-0"> 1 </p>
                  <p class = "namePara"> ${stay_days} </p>
                  </div>
                  <div class = "ratesCont me-2">
                  <p class = "namePara m-0">Rate</p>
                  <p class = "namePara m-0"> ${medicine_cost} </p>
                  <p class = "namePara m-0"> ${consultation}.00 </p>
                  <p class = "namePara m-0"> ${bed_charges}.00 </p>
                  <p class = "namePara m-0"> ${surgery_cost}.00 </p>
                  </div>
                  <div class = "ratesCont">
                  <p class = "namePara m-0">Amount</p>
                  <p class = "namePara m-0"> ${medicine_total_cost}.00 </p>
                  <p class = "namePara m-0"> ${consultation}.00 </p>
                  <p class = "namePara m-0"> ${bed_charges_total}.00 </p>
                  <p class = "namePara m-0"> ${surgery_cost}.00 </p>
                  </div>
                  </div>
                  </div>
                  <hr/>
                  <div class = "totalBillCont d-flex justify-content-between align-items-center bg-warning pt-1 pb-1 pe-2 ps-2 bg-opacity-50 rounded">
                  <h3 class = "totalHead m-0">Total Bill</h3>
                  <h3 class = "totalBill m-0">${total_cost_per_patient}</h3>
                  </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" onclick = "window.print()" >Print</button>
                  </div>
                </div>
              </div>
            </div>`);
          }
        }
        let empty_arr = [];
        for (let i of data) {
          if (i.invoice_id === id) {
            empty_arr.push(i);
          }
        }
        $(".logoImg").css({
          height: "100px",
          width: "100px",
          borderRadius: "50%",
        });
        $(".detailCont").css({ alignSelf: "flex-start" });
        $(".invoiceHead").css({
          textDecoration: "underline",
          color: "green",
          fontFamily: "Bree Serif",
          fontSize: "18px",
        });
        $(".namePara").css({
          fontSize: "15px",
          textAlign: "left",
          fontFamily: "Bree Serif",
          fontWeight: "500",
        });
        $(".addressName").css({ fontFamily: "Bree Serif", color: "green" });
        $(".heading").css({
          fontSize: "24px",
          fontFamily: "Bree Serif",
          fontWeight: "600",
        });
        $(".totalHead").css({ fontFamily: "Bree Serif", fontSize: "18px" });
        $(".totalBill").css({ fontFamily: "Bree Serif", fontSize: "18px" });
        $(".hospitalName").css({ color: "gray", fontSize: "15px" });
        // for (let each_val of empty_arr) {
        //   $(".modal-body").append(`
        //     <div><p> ${each_val.medicine_name} </p> </div>
        //     `);
        // }
      }
    );
  }

  $.get("http://localhost/programs/apiconfig/getnavbar.php", {
    userToken: userToken,
  })
    .done(function (result) {
      var result = JSON.parse(result);
      $(".userEl").append(
        `<span class = "m-0 userName"> ${result.user_name} </span>`
      );
      for (let each in result.data) {
        if (
          result.data[each] !== "medicines" &&
          result.data[each] !== "hospital_beds" &&
          result.data[each] !== "diseases" &&
          result.data[each] !== "appointment_status" &&
          result.data[each] !== "invoice_details"
        ) {
          $("#navEl").append(`<li class="nav-item">
        <a
          class="tableName nav-link active text-light"
          aria-current="page"
          href="#"
          id = ${result.data[each]}
        >
        ${result.data[each].toUpperCase()}
        
        </a
        >
      </li>`);
        }
      }
      $(".bottomCont").append(
        `<div class = "homeCont d-flex align-items-center"> <div class = "descCont"> <h1 class = "descHead"> Making Health Care Better Together </h1> <p class = "descPara"> A hospital manager, also referred to as a hospital administrator, plays a crucial role in managing the hospital's day-to-day operations. They oversee daily work processes, devise departmental strategies, manage the infrastructure and employees and plan the finances and budget of the facility </p> <h4 class = "head"> Welcome ${result.user_name}... </h4> </div> <div class = "imageCont"><img src="https://www.yanchepcentraldental.com.au/wp-content/uploads/2021/12/doctor-image-5b5ec4258d17f2.3977554915329372535779.png" alt="-doctor-image" class = "doctorImage"> </div> </div>`
      );

      let getTableData = function (tableName) {
        if (tableName === "patients") {
          $("#addBtn").show();
          $("#addAppointment").hide();
          $("#addInvoice").hide();
        } else if (tableName === "appointments") {
          $("#addAppointment").show();
          $("#addBtn").hide();
          $("#addInvoice").hide();
        } else if (tableName === "invoices") {
          $("#addInvoice").show();
          $("#addBtn").hide();
          $("#addAppointment").hide();
        } else {
          $("#addBtn").hide();
          $("#addAppointment").hide();
          $("#addInvoice").hide();
        }
        $(".homeCont").empty();
        $.get(
          "http://localhost/programs/apiconfig/tabledata.php",
          { tableName: tableName },
          function (tableData) {
            var tableData = JSON.parse(tableData);
            $(".tableContainer").empty();
            let serialNo = 1;

            $(".tableContainer")
              .append(`<table class="table table-hover table-bordered border border-dark text-center">
        <thead class= "tableHead bg-primary bg-opacity-25 text-dark">
          <tr>
          <th> S.No </th>
          </tr>
        </thead>
        <tbody class = "tableRow">
        </tbody>
      </table>`);
            for (let each in tableData["data"][0]) {
              if (
                tableName === "invoices" &&
                (each === "doctor_name" ||
                  each === "surgery_cost" ||
                  each === "medicine_cost" ||
                  each === "quantity" ||
                  each === "medicine_name" ||
                  each === "medicine_total_cost" ||
                  each === "address" ||
                  each === "patient_age" ||
                  each === "patient_gender" ||
                  each === "bed_charges" ||
                  each === "disease_name" ||
                  each === "doc_id" ||
                  each === "consultation" ||
                  each === "stay_days" ||
                  each === "bed_charges_total" ||
                  each === "total_cost_per_patient")
              ) {
                continue;
              }
              $(".tableHead")
                .children()
                .append(`<th> ${each.toLocaleUpperCase()} </th>`);
            }
            if (tableName === "invoices") {
              $(".tableHead").children().append(`<th>View Invoice</th>`);
            }

            for (let each of tableData.data) {
              var row = `<td> ${serialNo} </td>`;
              for (let i in each) {
                if (
                  tableName === "invoices" &&
                  (i === "doctor_name" ||
                    i === "surgery_cost" ||
                    i === "medicine_cost" ||
                    i === "quantity" ||
                    i === "medicine_name" ||
                    i === "medicine_total_cost" ||
                    i === "address" ||
                    i === "patient_age" ||
                    i === "patient_gender" ||
                    i === "bed_charges" ||
                    i === "disease_name" ||
                    i === "doc_id" ||
                    i === "consultation" ||
                    i === "stay_days" ||
                    i === "bed_charges_total" ||
                    i === "total_cost_per_patient")
                ) {
                  continue;
                }
                row += `<td> ${each[i]} </td>`;
              }

              if (tableName === "invoices") {
                row += `<td class = "viewBtn">
                <button type="button" class="btn btn-primary" id = "invoiceBtn"  data-bs-toggle="modal" data-bs-target="#exampleModal${each.id}">
                View Invoice
              </button>
                </td>`;
              }
              if (tableName === "invoices") {
                getInvoices(
                  each.id,
                  each.patient_name,
                  each.hospital_name,
                  each.doctor_name,
                  each.invoice_date,
                  each.address,
                  each.disease_name,
                  each.doc_id,
                  each.medicine_name,
                  each.quantity,
                  each.medicine_total_cost,
                  each.medicine_cost,
                  each.bed_charges,
                  each.consultation,
                  each.stay_days,
                  each.bed_charges_total,
                  each.total_cost_per_patient,
                  each.surgery_cost,
                  each.patient_age,
                  each.patient_gender
                );
              }
              $(".tableRow").append(
                `<tr class ="bg-info bg-opacity-10 text-dark"> ${row} </tr>`
              );
              serialNo += 1;
            }
          }
        );
      };

      var patientsArr = [];
      var doctorsArr = [];

      $("#addPatientBtn").click(function () {
        var patientName = $("#patientName").val();
        var patientAge = $("#patientAge").val();
        var patientGender1 = $('input[name = "gender"]:checked').val();
        var patientNo = $("#patientContact").val();
        $.post(
          "http://localhost/programs/apiconfig/addpatient.php",
          {
            patient_name: patientName,
            age: patientAge,
            gender: patientGender1,
            contact: patientNo,
          },
          function (response) {
            var response = JSON.parse(response);
            if (response.status === true) {
              alert(response.message);
              var patientName = $("#patientName").val("");
              var patientAge = $("#patientAge").val("");
              var patientNo = $("#patientContact").val("");
            } else {
              alert(response.message);
            }
          }
        );
      });

      $.get(
        "http://localhost/programs/apiconfig/patients.php",
        function (responseData) {
          var responseData = JSON.parse(responseData);
          patientsArr.push(responseData.data);
          for (let each of responseData.data) {
            $("#patientEl").append(
              `<option value = ${each.id}> ${each.patient_name} </option>`
            );
          }
        }
      );

      function getDoctors(hospitalId) {
        $.get(
          "http://localhost/programs/apiconfig/getdoctorsbyhospital.php",
          { hospital_id: hospitalId },
          function (resData) {
            var resData = JSON.parse(resData);
            for (let j of resData.data) {
              $("#doctorEl").append(
                `<option value = ${j.id}> ${j.doctor_name} </option>`
              );
            }
          }
        );
      }

      $.get(
        "http://localhost/programs/apiconfig/hospitals.php",
        function (hosData) {
          var hosData = JSON.parse(hosData);
          for (let each of hosData.data) {
            $("#hospitalEl").append(
              `<option value = ${each.id}> ${each.hospital_name} </option>`
            );
          }
          for (let hos of hosData.data) {
            $("#hospitalEl2").append(
              `<option value = ${hos.id}> ${hos.hospital_name} </option>`
            );
          }
        }
      );

      $("#hospitalEl").blur(function () {
        $("#doctorEl").empty();
        var hospitalId = $(this).val();
        getDoctors(hospitalId);
      });

      $.get(
        "http://localhost/programs/apiconfig/appointments.php",
        function (appointmentData) {
          var appointmentData = JSON.parse(appointmentData);
          for (let i of appointmentData.data) {
            $("#appointmentId").append(
              `<option value = ${i.id}> ${i.patient_name} </option>`
            );
          }
        }
      );

      $("#addInvoiceBtn").click(function () {
        var appointmentId = $("#appointmentId").val();
        var appointmentDate = $("#appointmentDate").val();
        var medicineId = $("#medicineNameEl").val();
        var medQuantity = $("#medicineQuantity").val();
        var hosBedId = $("#bedTypeEl").val();
        var diseaseId = $("#treatmentEl").val();
        var invoiceId = $("#invoiceEl").val();
        $.post(
          "http://localhost/programs/apiconfig/addinvoice.php",
          {
            appointment_id: parseInt(appointmentId),
            invoice_date: appointmentDate,
          },
          function (addInv) {
            var addInv = JSON.parse(addInv);
            if (addInv.status === true) {
              alert(addInv.message);
            } else {
              alert(addInv.message);
            }
          }
        );
      });

      $("#addInvoiceDetail").click(function () {
        var medicineId = $("#medicineNameEl").val();
        var medQuantity = $("#medicineQuantity").val();
        var hosBedId = $("#bedTypeEl").val();
        var diseaseId = $("#treatmentEl").val();
        var invoiceId = $("#invoiceEl").val();
        $.post(
          "http://localhost/programs/apiconfig/addinvoicedetails.php",
          {
            invoice_id: parseInt(invoiceId),
            disease_id: parseInt(diseaseId),
            medicine_id: parseInt(medicineId),
            hospital_bed_id: parseInt(hosBedId),
            quantity: parseInt(medQuantity),
          },
          function (res) {
            var res = JSON.parse(res);
            if (res.status === true) {
              alert(res.message);
            } else {
              alert(res.message);
            }
          }
        );
      });

      $("#addAppointmentBtn").click(function () {
        var patientId = $("#patientEl").val();
        var doctorId = $("#doctorEl").val();
        var dateEl = $("#dateEl").val();
        var consultationEl = $("#amountEl").val();

        $.post(
          "http://localhost/programs/apiconfig/addappointment.php",
          {
            patient_id: parseInt(patientId),
            doctor_id: parseInt(doctorId),
            appointment_date: dateEl,
            consultation: consultationEl,
          },
          function (reqRes) {
            var reqRes = JSON.parse(reqRes);
            if (reqRes.status === true) {
              alert(reqRes.message);
            } else {
              alert(reqRes.message);
            }
          }
        );
      });

      $.get(
        "http://localhost/programs/apiconfig/getmedicines.php",
        function (medData) {
          var medData = JSON.parse(medData);
          for (let eachMed of medData.data) {
            $("#medicineNameEl").append(
              `<option value = ${eachMed.id}> ${eachMed.medicine_name} </option>`
            );
          }
        }
      );

      for (let x = 1; x <= 50; x++) {
        $("#medicineQuantity").append(`<option value = ${x}> ${x}</option>`);
        $("#bedQuantityEl").append(`<option value = ${x}> ${x}</option>`);
        $("#treatmentQuantityEl").append(`<option value = ${x}> ${x}</option>`);
      }

      function getMedicineByPrice(medicineId) {
        $.get(
          "http://localhost/programs/apiconfig/getpricebymedicine.php",
          { id: medicineId },
          function (getMed) {
            var getMed = JSON.parse(getMed);
            for (let each of getMed.data) {
              $("#medicinePrice").append(
                `<option value = ${each.cost} >${each.cost} </option>`
              );
            }
          }
        );
      }

      $.get(
        "http://localhost/programs/apiconfig/diseases.php",
        function (disData) {
          var disData = JSON.parse(disData);
          for (let eachDis of disData.data) {
            $("#treatmentEl").append(
              `<option value = ${eachDis.id}> ${eachDis.disease_name} </option>`
            );
          }
        }
      );

      $.get(
        "http://localhost/programs/apiconfig/invoices.php",
        function (invData) {
          var invData = JSON.parse(invData);
          for (let eachInv of invData.data) {
            $("#invoiceEl").append(
              `<option value = ${eachInv.id}>${eachInv.patient_name}</option>`
            );
          }
        }
      );

      function getTreatmentCost(diseaseId) {
        $.get(
          "http://localhost/programs/apiconfig/treatmentcost.php",
          { id: diseaseId },
          function (treatData) {
            var treatData = JSON.parse(treatData);
            for (let eachCost of treatData.data) {
              $("#treatmentChargesEl").append(
                `<option value = ${eachCost.id}>  ${eachCost.disease_amount} </option>`
              );
            }
          }
        );
      }

      $("#treatmentEl").blur(function () {
        var disId = $(this).val();
        $("#treatmentChargesEl").empty();
        getTreatmentCost(disId);
      });

      $("#medicinePrice").blur(function () {
        var medPrice = $(this).val();
        var medQUan = $("#medicineQuantity").val();
        var totalMedCharges = parseInt(medPrice) * parseInt(medQUan);
        $(".totalMedAmount").text(totalMedCharges);
      });

      function getBeds(hospitalId) {
        $.get(
          "http://localhost/programs/apiconfig/getbedsbyhospital.php",
          { hospital_id: hospitalId },
          function (bedData) {
            var bedData = JSON.parse(bedData);
            for (let eachBed of bedData.data) {
              $("#bedTypeEl").append(
                `<option value = ${eachBed.id}> ${eachBed.bed_type} </option>`
              );
            }
          }
        );
      }

      function getBedCharges(bedId) {
        $.get(
          "http://localhost/programs/apiconfig/getbedprice.php",
          { id: bedId },
          function (bedCost) {
            var bedCost = JSON.parse(bedCost);
            for (let eachbedCost of bedCost.data) {
              $("#BedChargesEl").append(
                `<option value = ${eachbedCost.bed_charges}> ${eachbedCost.bed_charges} </option>`
              );
            }
          }
        );
      }

      $("#treatmentChargesEl").blur(function () {
        var treatQuan = $("#treatmentQuantityEl").val();
        var treatVal = $(this).text();
        var totalTreat = parseInt(treatVal) * parseInt(treatQuan);
        $(".treatPrice").text(totalTreat);
      });

      $("#BedChargesEl").blur(function () {
        var quan = $("#bedQuantityEl").val();
        var charVal = $(this).val();
        var total = parseInt(charVal) * parseInt(quan);
        $(".totalBedPrice").text(total);
      });

      $("#hospitalEl2").blur(function () {
        var hosId = $(this).val();
        getBeds(hosId);
      });

      $("#medicineNameEl").blur(function () {
        var medId = $(this).val();
        $("#medicinePrice").empty();
        getMedicineByPrice(medId);
      });

      $("#bedTypeEl").blur(function () {
        var bedId = $(this).val();
        $("#BedChargesEl").empty();
        getBedCharges(bedId);
      });

      $("#hospitals").click(function () {
        getTableData("hospitals");
      });
      $("#doctors").click(function () {
        getTableData("doctors");
      });
      $("#patients").click(function () {
        getTableData("patients");
      });
      $("#users").click(function () {
        getTableData("users");
      });
      $("#appointments").click(function () {
        getTableData("appointments");
      });
      $("#diseases").click(function () {
        getTableData("diseases");
      });
      // $("#medicines").click(function () {
      //   getTableData("medicines");
      // });
      $("#hospital_beds").click(function () {
        getTableData("hospital_beds");
      });
      $("#invoices").click(function () {
        getTableData("invoices");
      });
      $("#appointment_status").click(function () {
        getTableData("appointment_status");
      });
      $("#invoice_details").click(function () {
        getTableData("invoice_details");
      });
    })
    .fail(function (result) {
      console.log(result.message);
    });
  $(".userName").css({ fontSize: "12px" });
  $(".head").css({ fontStyle: "italic" });
  $("#logoutBtn").click(function () {
    $.post(
      "http://localhost/programs/apiconfig/logout.php",
      {
        token: userToken,
      },
      function (data) {
        console.log(data);
      }
    );
    localStorage.removeItem("access_token");
    window.location.href = "register.html";
  });
});
