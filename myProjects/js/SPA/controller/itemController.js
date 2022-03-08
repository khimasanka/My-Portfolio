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
    saveItem();
    loadAllItems();
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
    updateItem();
});

function loadAllItems(){
    $("#tblItem").empty();

    for (var i of itemDB){
        let row = `<tr><td>${i.getItemId()}</td><td>${i.getItemName()}</td><td>${i.getUnitPrice()}</td><td>${i.getItemQty()}</td></tr>`;
        $("#tblItem").append(row);
    }
}