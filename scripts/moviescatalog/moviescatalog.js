import {get} from "./../requests.js"

export function fillCatalog(page){
    get(`https://react-midterm.kreosoft.space/api/movies/${page}`)
    .then(res => {
        $("#movies").empty()
        var $template = $(".movie-template");
        for (var movie of res.movies) {
            var $movieCard = $template.clone(true, true);
            $movieCard.removeClass("d-none");
            $movieCard.attr("movie-id", movie.id);
            $movieCard.find(".movie-poster").attr("src", movie.poster)
            $movieCard.find(".movie-name").text(movie.name);
            $movieCard.find(".movie-year").text(movie.year);
            $movieCard.find(".movie-extinfo").text(
                `${movie.country} • ${movie.genres.map((item) => { return item.name }).join(", ")}`
            ) // из json'а выдернуть все названия жанров и соединить их через ,

            $movieCard.find(".movie-rating").text(`Средняя оценка: ${countAvgRating(movie)}`)
            $("#movies").append($movieCard);
        }

        registerPressMovieEvents();
    }).catch(error => console.log(error));

}

function registerPressMovieEvents() {
    $(".movie-template").click(function() {
        location.replace(`/movie/${$(this).attr("movie-id")}`); // переходим на страницу
    })
}

function countAvgRating(movie) {
    return ((movie.reviews.length < 1) ? 0 : // если рецензий нет, вернуть 0 как среднюю оценку
    movie.reviews.map((review) => { 
        return review.rating 
    })
    .reduce((a, b) => {
        return a + b
    }, 0) / movie.reviews.length).toFixed(1);
}