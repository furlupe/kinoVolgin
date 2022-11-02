import { post } from "../requests.js"

export function setLoginButtonEvent() {
    $("#login-form").submit((e) => {
        e.preventDefault();
        post("https://react-midterm.kreosoft.space/api/account/login", {
            "username": $("#loginfield").val(),
            "password": $("#password").val()
        })
        .then(response => {
            if (response.status == 400) {
                $("#login-form").addClass("invalid");
                $("#login-form").removeClass("valid");
                return
            }
            return response.json()
        })
        .then(user => {
            if(!user) return;
            localStorage.setItem("userToken", user.token);
            location.replace("/");
        })
    });
}