var playTimes = 3;

$(document).ready(function () {
    createTipBar("点击红包开始摇一摇");

    $(document).on("shake", function () {
        if (playTimes <= 0) return;

        startShake();
        if (Math.random() > 0.6) {
            playTimes = 0;
            setTimeout(function () {
                $("#win_music")[0].play();
                showPrize();
            }, 1000);
        } else {
            playTimes--;
            setTimeout(function () {
                $("#lost_music")[0].play();
                getNothing();
            }, 1000);
            setTimeout(function () {
                retractCard();
            }, 3000);
        }
    });

    $(document.body).click(function (e) {
        e.preventDefault();
        $(document).trigger("shake");
    });

    bodyWidth = $("body")[0].style.width;
    window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize",
        function () {
            switch (window.orientation) {
                case 0:
                case 180:
                    $("body")[0].style.width = bodyWidth;
                    break;
                case -90:
                case 90:
                    bodyWidth = $("body")[0].style.width;
                    $("body")[0].style.width = "220px";
                    break;
            }
        }, false);
});

function startShake() {
    $(".cardbox .hint img").removeClass("shake");
    $(".cards, .cardbox").removeClass("expand");
    $(".cards").addClass("tract");

    $(".cardbox .hint img").addClass("shake");
}

function getNothing() {
    $(".cardbox .hint img").removeClass("shake");
    $(".cards").removeClass("tract");
    var cardImageUrl = "./img/get_nothing.png";
    $(".cards img").attr("src", cardImageUrl);
    $(".cards, .cardbox").addClass("expand");
}

function showPrize() {
    $(".cardbox .hint img").removeClass("shake");
    $(".cards").removeClass("tract");
    var cardImageUrl = "./img/prize.png";
    $(".cards img").attr("src", cardImageUrl);
    $(".cards .prize_state").css("display", "block");
    $(".cards, .cardbox").addClass("expand");
}

function retractCard() {
    $(".cards, .cardbox").removeClass("expand");
    $(".cards, .cardbox").addClass("retract");
    setTimeout(function () {
        $(".cards img").attr("src", "./img/card_background.png");
        $(".cards, .cardbox").removeClass("retract");
        $(".cards").addClass("tract");
        if (playTimes > 0) {
            $(".cardbox .hint p").html("还有" + playTimes + "次机会");
        } else {
            $(".cardbox .cover .hint").css("display", "none");
            $(".cardbox .result_nothing").css("display", "block");
        }
    }, 1000);
}

function createTipBar(message) {
    var tipBar = $("<div>").addClass("tip_bar").html(message).css("display", "none");
    $(document.body).append(tipBar);
    tipBar.slideDown(500, function () {
        setTimeout(function () {
            tipBar.slideUp(500, function () {
                tipBar.remove();
            });
        }, 1500);
    });
}

function destroyTipBar() {
    $(".tip_bar").remove();
}
