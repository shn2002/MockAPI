
function cleanContent() {
    $("#msg").html("");
}
$(document).ready(function () {
    $("#btnsubmit").click(function (event) {
        if ($("#rdoopenaccount").prop("checked")) {
            let url = "/open";
            window.location.replace(url);
            return
        }

        if (!$("#txtid").val()) {
            cleanContent();
            $("#msg").html("Account number should not be blank");
            return
        }

        if ($("#rdobalance").prop("checked") || $("#rdodeposit").prop("checked") || $("#rdowithdrawal").prop("checked")) {
            $.get("/api/checkBalance",
                {
                    id: $("#txtid").val()
                },
                function (data, status) {
                    if (data["error"] == "0") {
                        cleanContent();
                        let url;
                        if ($("#rdobalance").prop("checked")) {
                            url = '/balance?id=' + data["id"] + '&type=' + data["type"] + '&amount=' + data["amount"] + '&msg=' + data["msg"]
                        } else if ($("#rdodeposit").prop("checked")) {
                            url = '/deposit?id=' + data["id"] + '&type=' + data["type"] + '&amount=' + data["amount"]
                        } else {
                            url = '/withdraw?id=' + data["id"] + '&type=' + data["type"] + '&amount=' + data["amount"]
                        }

                        window.location.replace(url);
                    } else {
                        cleanContent();
                        $("#msg").html(data["msg"]);
                    }
                });
            return;
        }

    });

});
