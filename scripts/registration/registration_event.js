import { post } from "../requests.js";
import { areFieldsValid } from "./registration_fields.js";

export function registerRegisterButtonEvent () {
    $("#signup-form").submit((e) => {
        e.preventDefault();

        if(!areFieldsValid()) return;
        post("https://react-midterm.kreosoft.space/api/account/register", {
            "userName": $("#loginfield").val(),
            "name": $("#name").val(),
            "password": $("#password").val(),
            "email": $("#email").val(),
            "birthDate": (new Date($("#dateofbirth").val())).toISOString(),
            "gender": parseInt($("#sex").val())
        })
        .then(response => {
            return response.json();
        })
        .then(user => {
            localStorage.setItem("userToken", user.token);
            location.replace("/");
        });
    });
}