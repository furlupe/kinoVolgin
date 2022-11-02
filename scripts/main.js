import { showProfile } from "./userprofilepage/userprofile.js";
import { showFavorites } from "./moviefavorites/favorites.js";
import { showLogin } from "./login/login.js"
import { showDetailsPage } from "./moviedetails/show_details_reviews.js";
import { showCatalogPage } from "./moviescatalog/showcatalog.js";
import { showRegistartion } from "./registration/registration.js";
import { get, post } from "./requests.js";

$(document).ready(function () {
    var userLoggedIn = false;
    get("https://react-midterm.kreosoft.space/api/account/profile")
    .then(profile => {
        $("#navbar").removeClass("user-unauthorized");
        $("#navbar").addClass("user-logged-in");

        $("#navbar").find("#nickname").text(profile.nickName);

        $("#signout").click(() => {
            post("https://react-midterm.kreosoft.space/api/account/logout")
            .then(() => {
                localStorage.setItem("userToken", "");
                location.reload()
            });
        })

        localStorage.setItem("userId", profile.id);
        userLoggedIn = true;
    })
    .catch(() => {
        $("#navbar").removeClass("user-logged-in");
        $("#navbar").addClass("user-unauthorized");

        $("#navbar").find("#nickname").text("");

        localStorage.setItem("userId", "");
    })
    .then(() => {
        var page = getContent(location.pathname);

        if (page.auth && !userLoggedIn) location.replace("/login/");
        if (page.auth === false && userLoggedIn) location.replace("/");

        var addable = ADDABLE_HTML[page.keyword];
        $('.content').load(addable.content, () => addable.show(page.param));
    });

});

// необходим для определения, что вставить в блок контента
const ADDABLE_HTML = {
    "userprofilepage": {
        content: "/userprofile.html",
        show: (p) => showProfile()
    },

    "catalogpage": {
        content: "/moviescatalog.html",
        show: (page) => showCatalogPage(page)
    },

    "detailspage": {
        content: "/moviedetails.html",
        show: (identificators) => {
            showDetailsPage(
                identificators.userId, 
                identificators.movieId
            );
        }},

    "loginpage": {
        content: "/login.html",
        show: (id) => showLogin(id)
    },

    "registrationpage": {
        content: "/registrationform.html",
        show: (p) => showRegistartion()
    },

    "favoritespage": {
        content: "/favorites.html",
        show: (p) => showFavorites()
    }
};


// через регулярки определяем, какая у нас страница -> определяем ключевое слово контента
// keyword - самое кл. слово, через которое мы получаем контент в словаре ADDABLE_HTML и функцию показа оного
// param - доп. параметры для функции показа
// auth - отображает требование быть залогиненным. Если установлено true - значит на данную страницу может пройти ТОЛЬКО залогиненный пользователь,
// false - ТОЛЬКО разлогиненный, null - не имеет значения
var getContent = (path) => {
    switch(true) {
        case /^\/profile\/$/.test(path):
            return {
                keyword: "userprofilepage",
                param: null,
                auth: true
            }
            
        case /^\/favorites\/$/.test(path):
            return {
                keyword: "favoritespage",
                param: null,
                auth: true
            }

        case /^\/registration\/$/.test(path):
            return { 
                keyword: "registrationpage",
                param: null,
                auth: false
            };

        case /^\/login\/$/.test(path):
            return {
                keyword: "loginpage",
                param: null,
                auth: false
            }

        case /^\/movie\/.+/.test(path):
            return {
                keyword: "detailspage",
                param: {
                    userId: localStorage.getItem("userId"),
                    movieId: path.length > 1 ? path.match(/^\/movie\/(.+)/)[1] : 1
                },
                auth: null
            };

        case !path.length:
        case /^\/([1-9][0-9]*)*/.test(path): 
            return { // страница каталога фильмов
                keyword: "catalogpage",
                param: path.length > 1 ? path.match(/([1-9][0-9]*)/g)[0] : 1,
                auth: null
            };
    }
}
