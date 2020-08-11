function cleanContent() {
    $("#msg").html("");
}
$(document).ready(function () {
    $("#btnok").click(function (event) {
        let acct_id=parseInt($("#txtid").text());
        let acct_amt=parseFloat($("#dep_amt_id").val()) * (-1);
        $.post("/api/updateBalance",
                {
                    id: $("#txtid").text(),
                    amount: $("#dep_amt_id").val() * (-1)
                },
                function (data, status) {
                    if (data["error"] == "0") {
                        cleanContent();
                        let url = '/balance?id=' + data["id"] + '&type=' + data["type"] + '&amount=' + data["amount"] + '&msg=' + "Deposit " + data["msg"]
                        window.location.replace(url);
                    } else {
                        cleanContent();
                        $("#msg").html(data["msg"]);
                    }

                });
    });
    $("#btncancel").click(function (event) {
        window.location.href = "/profile"
    });
});