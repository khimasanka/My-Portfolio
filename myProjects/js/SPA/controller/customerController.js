/*$("#btnSaveCustomer").click(function () {

    //remove all the row click events
    $("#tblCustomer>tr").off("click");

    let cID = $("#txtCId").val();
    let CName =$("#txtCName").val();
    let address =$("#txtAddress").val();
    let salary =$("#txtSalary").val();

    $("#tblCustomer").append(`<tr><th>${cID}</th><td>${CName}</td><td>${address}</td><td>${salary}</td></tr>`);

    $("#tblCustomer>tr").dblclick(function () {

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

    /!*$("#tblCustomer>tr").dblclick(function () {
       $(this).remove();
    })*!/


});*/

/*
var regex = /^(C00-)[0-9]{3,4}$/;

$("#txtCId").keyup(function () {
    let input = $("#txtCId").val();
    if (regex.test(input)){
        $("#txtCId").css('border','2px solid green');
        $("#lblCusIdError").text("");
    }else{
        $("#txtCId").css('border','2px solid red');
        $("#lblCusIdError").text("Wrong format : C00-000");
    }
});


*/

$("#btnSaveCustomer").click(function () {
    saveCustomer();
    clearAll();
    loadAllCustomers();
});

// search customer
$("#btnSearchCustomer").click(function () {
    var searchID = $("#txtSearchCusID").val();

    var response = searchCustomer(searchID);
    if (response) {
        $("#txtCId").val(response.id);
        $("#txtCName").val(response.name);
        $("#txtAddress").val(response.address);
        $("#txtSalary").val(response.salary);
    }else{
        clearAll();
        alert("No Such a Customer");
    }
});

// Events end


// CRUD OPERATIONS START
function loadAllCustomers() {
    $("#tblCustomer").empty();
    for (var i of customerDB) {
        /*create a html row*/
        let row = `<tr><td>${i.id}</td><td>${i.name}</td><td>${i.address}</td><td>${i.salary}</td></tr>`;
        /*select the table body and append the row */
        $("#tblCustomer").append(row);
    }
}

function saveCustomer() {
    //gather customer information
    let customerID = $("#txtCId").val();
    let customerName = $("#txtCName").val();
    let customerAddress = $("#txtAddress").val();
    let customerSalary = $("#txtSalary").val();

    //create Object
    var customerObject = {
        id: customerID,
        name: customerName,
        address: customerAddress,
        salary: customerSalary
    };

    customerDB.push(customerObject);
}

function searchCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
        }
    }
}

function deleteCustomer(){
    //write the code
}

function updateCustomer(){
    //write the code
}

// CRUD OPERATIONS ENDED


//validation started
// customer regular expressions
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{5,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#txtCId,#txtCName,#txtAddress,#txtSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#txtCId,#txtCName,#txtAddress,#txtSalary').on('blur', function () {
    formValid();
});

//focusing events
$("#txtCId").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }

    if (eventOb.key == "Control") {
        var typedCustomerID = $("#txtCId").val();
        var srcCustomer = searchCustomerFromID(typedCustomerID);
        $("#txtCId").val(srcCustomer.getCustomerID());
        $("#txtCName").val(srcCustomer.getCustomerName());
        $("#txtAddress").val(srcCustomer.getCustomerAddress());
        $("#txtSalary").val(srcCustomer.getCustomerSalary());
    }


});

$("#txtCName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});

$("#txtSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfValid();
    }
});
// focusing events end
$("#btnSaveCustomer").attr('disabled', true);

function clearAll() {
    $('#txtCId,#txtCName,#txtAddress,#txtSalary').val("");
    $('#txtCId,#txtCName,#txtAddress,#txtSalary').css('border', '2px solid #ced4da');
    $('#txtCId').focus();
    $("#btnSaveCustomer").attr('disabled', true);
    loadAllCustomers();
    // $("#lblcusid,#lblcusname,#lblcusaddress,#lblcussalary").text("");
}

function formValid() {
    var cusID = $("#txtCId").val();
    $("#txtCId").css('border', '2px solid green');
    $("#lblCusIdError").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#txtCName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtCName").css('border', '2px solid green');
            // $("#lblcusname").text("");
            var cusAddress = $("#txtAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#txtSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#txtAddress").css('border', '2px solid green');
                // $("#lblcusaddress").text("");
                if (resp) {
                    $("#txtSalary").css('border', '2px solid green');
                    // $("#lblcussalary").text("");
                    return true;
                } else {
                    $("#txtSalary").css('border', '2px solid red');
                    // $("#lblcussalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#txtAddress").css('border', '2px solid red');
               // $("#lblcusaddress").text("Cus Name is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#txtCName").css('border', '2px solid red');
            //$("#lblcusname").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#txtCId").css('border', '2px solid red');
        //$("#lblcusid").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#txtCId").val();
    if (cusIDRegEx.test(cusID)) {
        $("#txtCName").focus();
        var cusName = $("#txtCName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#txtAddress").focus();
            var cusAddress = $("#txtAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#txtSalary").focus();
                var cusSalary = $("#txtSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#txtSalary").focus();
                }
            } else {
                $("#txtAddress").focus();
            }
        } else {
            $("#txtCName").focus();
        }
    } else {
        $("#txtCId").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnSaveCustomer").attr('disabled', false);
    } else {
        $("#btnSaveCustomer").attr('disabled', true);
    }
}

$('#btnSaveCustomer').click(function () {
    checkIfValid();
});
