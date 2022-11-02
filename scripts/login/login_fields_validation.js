export function registerLoginFieldsEvent() {
    $(".form-control").on("input", function() {
        $(this).parent().parent().addClass("valid");
        $(this).parent().parent().removeClass("invalid");
    });
}