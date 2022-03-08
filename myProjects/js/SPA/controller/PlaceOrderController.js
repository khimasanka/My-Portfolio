function generateOrderId(){
    try {
        let lastOId = orderDB[orderDB.length - 1].getOrderID();
        let newOId = parseInt(lastOId.substring(1, 4)) + 1;
        if (newOId < 10) {
            $("#txtOrderId").val("O00" + newOId);
        } else if (newOId < 100) {
            $("#txtOrderId").val("O0" + newOId);
        } else {
            $("#txtOrderId").val("O" + newOId);
        }
    } catch (e) {
        $("#txtOrderId").val("O001");
    }
}















let fullTotal;