$("#btnSaveCustomer").click(function () {

    //remove all the row click events
    $("#tblCustomer>tr").off("click");

    let cID = $("#txtCId").val();
    let CName =$("#txtCName").val();
    let address =$("#txtAddress").val();
    let salary =$("#txtSalary").val();

    $("#tblCustomer").append(`<tr><th>${cID}</th><td>${CName}</td><td>${address}</td><td>${salary}</td></tr>`);

    $("#tblCustomer>tr").click(function () {

        //gather customer information
        let cusTblId = $(this).children(":eq(0)").text();
        let cusTblName = $(this).children(":eq(1)").text();
        let cusTblAddress= $(this).children(":eq(2)").text();
        let cusTblSalary = $(this).children(":eq(3)").text();

        //set values for the input field
        $("#txtCId").val(cusTblId);
        $("#txtCName").val(cusTblName);
        $("#txtAddress").val(cusTblAddress);
        $("#txtSalary").val(cusTblSalary);

    });


});

