function saveItem() {
    //gather customer information
    let itemId = $("#txtItemId").val();
    let itemName = $("#txtItemName").val();
    let price = $("#txtItemPrice").val();
    let qty = $("#txtItemQty").val();

    //create Object

    var item = new ItemDTO(itemId, itemName, price, qty);

    customerDB.push(item);
}