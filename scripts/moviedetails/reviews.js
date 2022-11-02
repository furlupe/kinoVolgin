import { put, del } from "./../requests.js";

// обернуто в промис, чтобы позже в show_details_reviews.js отрисовывать форму для отзыва
export function showReviews(movieId, userId, reviews) {
    return new Promise((resolve) => {
        var $template = $(".review-template");

        var userReviewId = null;
        for(var review of reviews) {
            var $r = $template.clone();
            $r.removeClass("d-none");

            var avatar = review.author.avatar;
            var color = (review.rating > 5) ? "success" : "danger";

            $r.addClass(`border-${color}`);
            
            if (!review.isAnonymous) {
                $r.find(".user-avatar").attr("src", avatar ? 
                    avatar :
                    $r.find(".user-avatar").attr("src")
                );
            }

            $r.find(".user-name").text((review.isAnonymous) ? "Аноним" : review.author.nickName);
            $r.find(".review-date").text((new Date(review.createDateTime)).toLocaleDateString());

            $r.find(".review-rating").text(review.rating)
            .addClass(`bg-${color}`);

            $r.find(".review-text").text(review.reviewText)
            .addClass(`text-${color}`);
            
            if (userId != review.author.userId) {
                $(".reviews-container").append($r);
                continue;
            }

            $r.find(".card-footer").removeClass( "d-none");

            userReviewId = review.id;

            $('.reviews-container').prepend($r);
        }
        registerReviewEvents(movieId, userReviewId);
        resolve(userReviewId);
    })
}

function registerReviewEvents(movieId, id) {
    $(".modify-user-review").click(function() {
        var $parent = $(this).parent().parent();
        console.log($parent.find(".review-rating").val())

        $parent.addClass("d-none");
        $("#reviews .user-review-form").removeClass("new-review d-none");
        $("#reviews .user-review-form").addClass("edit-review");

        $(".user-review-form #reviewText").val(
            $parent.find(".review-text").text()
        );

        $(".user-review-form #reviewRating").val(
            $parent.find(".review-rating").text()
        );
    });

    $(".delete-user-review").click(() => {
        del(`https://react-midterm.kreosoft.space/api/movie/${movieId}/review/${id}/delete`)
        .then(() => {
            console.log("removed");
            location.reload();
        });
    });
}
