export function registerRegisterFieldsEvent() {
    $(".validable").on("input", function(){
        $(this).removeClass("border-danger");
        $(this).parent().addClass("valid");
        $(this).parent().removeClass("invalid");
    });
}

export function areFieldsValid() {
    const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?w+)*(.\w{2,3})+$/;
    var isInvalid = true;

    var isValid = true;

    if ($("#password").val().length < 6) { 
        makeFieldInvalid("#password"); // если длина пароля < 6, сообщить
        isValid = false;
    } 

    if ( $("#password").val() != $("#passwordcheck").val() ) {
        makeFieldInvalid("#passwordcheck"); // если не совпадают пароль и его подтверждение
        isValid = false;
    }

    if ( !mailformat.test($("#email").val()) ){
        makeFieldInvalid("#email"); // неккоректный E-mail
        isValid = false;
    }

    if ( !$("#loginfield").val().length ) {
        makeFieldInvalid("#loginfield"); // пустой логин
        isValid = false;
    }

    return isValid;
}

var makeFieldInvalid = (field) => {
    $(field).addClass("border-danger");
    $(field).parent().removeClass("valid");
    $(field).parent().addClass("invalid");
}