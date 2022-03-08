function saveItem() {
    //gather customer information
    let itemId = $("#txtItemId").val();
    let itemName = $("#txtItemName").val();
    let price = $("#txtItemPrice").val();
    let qty = $("#txtItemQty").val();

    //create Object

    var item = new ItemDTO(itemId, itemName, price, qty);

    itemDB.push(item);
}

$("#btnSaveItem").click(function () {
    if (confirm("Are You sure, you want to Save")){
        saveItem();
        loadAllItems();
        clearItemField();
        generateItemId();
    }else{
    }
});

function updateItem(){
    let itemId = $("#txtItemId").val();
    let item;
    for (var i=0; i <itemDB.length; i++){
        if (itemId == itemDB[i].getItemId()){
            item=itemDB[i];
            item.setItemName($("#txtItemName").val());
            item.setItemQTY($("#txtItemQty").val());
            item.setUnitPrice($("#txtItemPrice").val());
        }
    }
}

$("#btnUpdateItem").click(function () {
    if (confirm("Are You sure, you want to update this Item")){
        updateItem();
        loadAllItems();
        clearItemField();
        generateItemId();
    }else{
    }
});

function loadAllItems(){
    $("#tblItem").empty();

    for (var i of itemDB){
        let row = `<tr><td>${i.getItemId()}</td><td>${i.getItemName()}</td><td>${i.getUnitPrice()}</td><td>${i.getItemQty()}</td></tr>`;
        $("#tblItem").append(row);

        $("#tblItem>tr").dblclick(function () {
            $("#txtItemId").val($(this).children(":eq(0)").text());
            $("#txtItemName").val($(this).children(":eq(1)").text());
            $("#txtItemPrice").val($(this).children(":eq(2)").text());
            $("#txtItemQty").val($(this).children(":eq(3)").text());
        });
    }
}

function deleteItem(){
    let itemId = $("#txtItemId").val();
    let item;
    if (itemId!=null){
        for (var i=0; i<itemDB.length; i++){
            if (itemId == itemDB[i].getItemId()){
                item = itemDB[i];
            }
        }
        let index = itemDB.indexOf(item);
        itemDB.splice(index,1);
        return true;
    }else{
        return false;
    }
}

$("#btnDeleteItem").click(function () {
    let id = $("#txtItemId").val();
    let option = confirm(`Do you want to delete ID :${id}`);
    if (option){
        let erase = deleteItem();
        if (erase){
            alert("Item Deleted");
        }else{
            alert("Something Went wrong , Try Again");
        }
    }
    loadAllItems();
    clearItemField();
    generateItemId();
});

function clearItemField(){
    $("#txtItemId,#txtItemName,#txtItemPrice,#txtItemQty").val("");
    $("#txtItemId,#txtItemName,#txtItemPrice,#txtItemQty").css('border','2px solid #ced4da');
    $("#txtItemName").focus();
    $("#btnSaveItem").attr('disable',true);
    loadAllItems();
    $("#lblItemId,#lblItemName,#lblPrice,#lblQTY").text("");
    generateItemId();
}

function generateItemId(){
    try{
        let lastItemId = itemDB[itemDB.length-1].getItemId();
        let newItemCode = parseInt(lastItemId.substring(1,4))+1;
        if (newItemCode < 10){
            $("#txtItemId").val("I00" + newItemCode);
        }else if (newItemCode < 100){
            $("#txtItemId").val("I0"+ newItemCode);
        }else{
            $("#txtItemId").val("I" + newItemCode);
        }
    }catch (e) {
        $("#txtItemId").val("I001");
    }
}

function searchItem(id){
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemId() === id) {
            return itemDB[i];
        }
    }
    /*for (var i =0; itemDB.length; i++){
        if ($("#txtSearchItem").val()==itemDB[i].getItemId()){
            $("#txtItemId").val(itemDB[i].getItemId());
            $("#txtItemName").val(itemDB[i].getItemName());
            $("#txtItemPrice").val(itemDB[i].getUnitPrice());
            $("#txtItemQty").val(itemDB[i].getItemQty());
        }
    }*/
}

$("#btnSearchItem").click(function () {
    var searchID = $("#txtSearchItem").val();

    var response = searchItem(searchID);
    if (response) {
        $("#txtItemId").val(response.getItemId());
        $("#txtItemName").val(response.getItemName());
        $("#txtItemPrice").val(response.getUnitPrice());
        $("#txtItemQty").val(response.getItemQty());
    } else {
        clearItemField();
        alert("No Such a Item");
    }
});

