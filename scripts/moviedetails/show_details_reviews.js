import { showMovieDetails } from "./moviedetails.js";
import { showReviews } from "./reviews.js";
import { initFavButton } from "./to_favorite_button.js";
import { get, post, del } from "./../requests.js";
import { registerReviewFormEvents } from "./review_form.js";

export function showDetailsPage(userId, movieId) {
    get(`https://react-midterm.kreosoft.space/api/movies/details/${movieId}`)
    .then(details => {

        showMovieDetails(details); 
        initFavButton(details.id);
        showReviews(details.id, userId, details.reviews)
        .then(res => {
            registerReviewFormEvents(details.id, res);
            if ( !res ) $(".user-review-form").removeClass("d-none");
        });
        
        // т.е., если пользователь не залогинен, то никакой ему формы отзыва и избранного
        get(`https://react-midterm.kreosoft.space/api/account/profile`)
        .catch(() => {
            $(".user-review-form").addClass("d-none");
            $("#add-to-favorites").addClass("d-none");
            $("#remove-from-favorites").addClass("d-none");
        })
    })
    .catch(error => console.log(error));
}