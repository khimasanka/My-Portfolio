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
});

function clearItemField(){
    $("#txtItemId,#txtItemName,#txtItemPrice,#txtItemQty").val("");
    $("#txtItemId,#txtItemName,#txtItemPrice,#txtItemQty").css('border','2px solid #ced4da');
    $("#txtItemName").focus();
    $("#btnSaveItem").attr('disable',true);
    loadAllItems();
    $("#lblItemId,#lblItemName,#lblPrice,#lblQTY").text("");

}