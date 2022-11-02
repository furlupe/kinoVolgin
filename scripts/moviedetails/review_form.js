import {post, put} from "./../requests.js"

export function registerReviewFormEvents(movieId, id) {
    $(".save-review-button").click(() => {
        post(`https://react-midterm.kreosoft.space/api/movie/${movieId}/review/add`, {
            "reviewText": $(".user-review-form #reviewText").val(),
            "rating": parseInt($(".user-review-form #reviewRating").val()),
            "isAnonymous": $(".user-review-form #reviewAnon").is(':checked')
        })
        .then(() => location.reload());
    })

    $(".edit-review-button").click(() => {
        put(`https://react-midterm.kreosoft.space/api/movie/${movieId}/review/${id}/edit`, {
            "reviewText": $(".user-review-form #reviewText").val(),
            "rating": parseInt($(".user-review-form #reviewRating").val()),
            "isAnonymous": $(".user-review-form #reviewAnon").is(':checked')
        })
        .then(() => {
            location.reload()
        });
    })

    $(".cancel-edit-review-button").click(() => {
        location.reload();
    })
}