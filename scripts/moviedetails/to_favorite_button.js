import { get, post, del } from "./../requests.js";


export function initFavButton(movieId) {
    get("https://react-midterm.kreosoft.space/api/favorites") // если текущий фильм лежит в списке избранного, меняем на кнопку "убрать из избранного"
    .then(json => {
        for (var movie of json.movies) {
            if (movie.id != movieId) {
                continue;   
            }
            $("#add-to-favorites").addClass("d-none");
            $("#remove-from-favorites").removeClass("d-none");
            break;
        }

        registerFavoritesEvents(movieId);
    });
}

function registerFavoritesEvents(movieId) {
    $("#add-to-favorites").click(() => {
        post(`https://react-midterm.kreosoft.space/api/favorites/${movieId}/add`)
        .then(() => {
            $("#add-to-favorites").addClass("d-none");
            $("#remove-from-favorites").removeClass("d-none");
        })
        .catch(e => console.log(e));
    });

    $("#remove-from-favorites").click(() => {
        del(`https://react-midterm.kreosoft.space/api/favorites/${movieId}/delete`)
        .then(() => {
            $("#add-to-favorites").removeClass("d-none");
            $("#remove-from-favorites").addClass("d-none");
        })
        .catch(e => console.log(e));
    });
}