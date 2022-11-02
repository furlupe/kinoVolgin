export function registerFieldEvents() {
    $("input").on("input", function() {
        console.log($(this));
        $(this).parent().removeClass("invalid");
        $(this).parent().addClass("valid");
    });
}