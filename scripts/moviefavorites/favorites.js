import { del, get } from "./../requests.js"

export function showFavorites() {
    get("https://react-midterm.kreosoft.space/api/favorites")
    .then(res => {
        $("#favoritemovies").empty();

        if(res.movies.length < 1) {
            console.log("no")
            $(".no-favorites").removeClass("d-none");
        }

        var $template = $(".favorite-template");
        for(var fav of res.movies) {
            var $f = $template.clone();

            $f.removeClass("d-none");

            $f.find(".movie-poster").attr("src", fav.poster);
            $f.find(".movie-name").text(fav.name);
            $f.find(".movie-year").text(fav.year);
            $f.find(".movie-extinfo").text(
                `${fav.country} • ${fav.genres.map((item) => { return item.name }).join(", ")}`
            );

            $f.find(".movie-rating").text(`Средняя оценка: ${countAvgRating(fav)}`)
            $f.find(".remove-from-favorites").data("movie", fav.id);

            $("#favoritemovies").append($f);
        }

        registerDeleteButtonEvents();
    });
}

function registerDeleteButtonEvents () {
    $(".remove-from-favorites").click(function() {
        del(`https://react-midterm.kreosoft.space/api/favorites/${$(this).data("movie")}/delete`)
        .then(() => {
            showFavorites();
        });
    });
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
