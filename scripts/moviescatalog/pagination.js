import { get } from "./../requests.js"
import { fillCatalog } from "./moviescatalog.js";

export function showPagination(page){
    get(`https://react-midterm.kreosoft.space/api/movies/${page}`)
    .then(res => {
        $(".pagination").empty();
        var $template = $(".page-template");
        for (var i = 1; i <= res.pageInfo.pageCount; i++) {
            var $page = $template.clone();
            $page.removeClass('d-none');
            $page.attr("value", i);
            $page.find('.page-link').text(i);

            if (i == page) $page.addClass("active");

            $(".pagination").append($page);
        }

        registerPaginationEvents();
    }).catch(error => console.log(error));
}

// доделать, не работает перезагрузка
function registerPaginationEvents() { 
    $(".page-template").click(function () { 
        var id = parseInt($(this).attr('value'));

        history.replaceState("a", "Page", `/${id}`);
        localStorage.setItem("currentMoviesListPage", id);
        fillCatalog(id);
        showPagination(id);
     })
}