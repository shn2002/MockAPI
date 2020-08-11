function cleanContent() {
    $("#msg").html("");
}
$(document).ready(function () {
    $("#btnok").click(function (event) {
        if (!$("#rdochquing").prop("checked") && !$("#rdosavings").prop("checked")) {
            cleanContent();
            $("#msg").html("Please choose account type");
        }else{
            cleanContent();
            let accountType;
            if ($("#rdosavings").prop("checked")) {
                accountType = "Savings";
            }
            else {
                accountType = "Chequing";
            };
            console.log("aaaaaa");
            $.post("/api/new",
            {
                type: accountType
            },
            function (data, status) {
                if (data["error"] == "1") {
                    cleanContent();
                    console.log("bbbbb");
                    $("#msg").html(data["msg"]);
                } else {
                    cleanContent();
                    console.log("cccccc");
                    let url = '/balance?id=' + data["id"] + '&type=' + data["type"] + '&amount=' + data["amount"] + '&msg=' + data["msg"];
                    window.location.replace(url);
                }

            });

        };

    });
    $("#btncancel").click(function (event) {
        window.location.href = "/profile"
    });
});