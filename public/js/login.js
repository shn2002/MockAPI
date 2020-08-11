$(document).ready(function () {
    $("#btnsubmit").click(function (event) {
        if (!$("#inputUsername").val()) {
            $("#msg").html("Username should not be blank");
            return
        }
        if (!$("#inputPassword").val()) {
            $("#msg").html("Password should not be blank");
            return
        }
        $.post("/api/login",
            {
                username: $("#inputUsername").val(),
                password: $("#inputPassword").val()
            },
            function (data, status) {
                //alert("Data: " + data + "\nStatus: " + status);
                if (data["error"] == "1") {
                    $("#msg").html(data["msg"]);

                } else {
                    location.replace("/profile");

                }

            });
    });
    $("#btnregister").click(function (event) {
        if (!$("#inputUsername").val()) {
            $("#msg").html("Username should not be blank");
            return
        }
        if (!$("#inputPassword").val()) {
            $("#msg").html("Password should not be blank");
            return
        }
        $.post("/api/register",
            {
                username: $("#inputUsername").val(),
                password: $("#inputPassword").val()
            },
            function (data, status) {
                $("#msg").html(data["msg"]);
            });
    });
});