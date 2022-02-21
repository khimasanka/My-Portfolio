// ===============       navigation

$("#customer").css("display","block");
$("#item").css("display","none");
$("#order").css("display","none");
$("#details").css("display","none");

$("#customerNav").click(function () {
    $("#customer").css("display","block");
    $("#item").css("display","none");
    $("#order").css("display","none");
    $("#details").css("display","none");

});

$("#itemNav").click(function () {
    $("#customer").css("display","none");
    $("#item").css("display","block");
    $("#order").css("display","none");
    $("#details").css("display","none");
});

$("#orderNav").click(function () {
    $("#customer").css("display","none");
    $("#item").css("display","none");
    $("#order").css("display","block");
    $("#details").css("display","none");
});

$("#detailsNav").click(function () {
    $("#customer").css("display","none");
    $("#item").css("display","none");
    $("#order").css("display","none");
    $("#details").css("display","block");
});
// ===================      add to table

$("#btnSaveCustomer").click(function () {
    $("#customerTable>tr").off("click");
    let customerId = $("#txtCustId").val();
    let customerName = $("#txtCustName").val();
    let customerAddress = $("#txtCustAddress").val();
    let customerSalary = $("#txtCustSalary").val();

    let row = `<tr><td>${customerId}</td><td>${customerName}</td><td>${customerAddress}</td><td>${customerSalary}</td></tr>`;
    $("#customerTable").append(row);

    $("#customerTable>tr").click(function () {
        let cusId = $(this).children(":eq(0)").text();
        let cusName = $(this).children(":eq(1)").text();
        let cusAddress = $(this).children(":eq(2)").text();
        let cusSalary = $(this).children(":eq(3)").text();

        console.log(cusId,cusName,cusAddress,cusSalary);
        $("#txtCustId").val(cusId);
        $("#txtCustName").val(cusName);
        $("#txtCustAddress").val(cusAddress);
        $("#txtCustSalary").val(cusSalary);
    });

    $("#customerTable>tr").dblclick(function () {
        $(this).remove();
    });


})

var regExCusId = /^(C00-)[0-9]{3,4}$/;

$("#txtCustId").keyup(function () {
    let input = $("#txtCustId").val();
    if (regExCusId.test(input)){
        $("#txtCustId").css('border','2px solid green');
        $("#errorCusId").text("");
    }else{
        $("#txtCustId").css('border','2px solid red');
        $("#errorCusId").text("Wrong format : C00-001");
    }
});


