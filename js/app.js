$(function () {

    window.localStorage.removeItem('filter');
    const worksSlider = $('[data-slider="slick"]');

    /* Filter
    =======================================*/

    let filter = $("[data-filter]");

    filter.on("click", function (event) {
        event.preventDefault();

        let cat = $(this).data('filter');
        localStorage.setItem('filter', cat);

        if (cat == 'all') {
            $("[data-cat]").removeClass("hide");
        } else {
            $("[data-cat]").each(function () {
                let workCat = $(this).data('cat');

                if (workCat != cat) {
                    $(this).addClass('hide');
                } else {
                    $(this).removeClass('hide');
                }
            });
        }
    });

    /* Modal
    =======================================*/

    const modalCall = $("[data-modal]");
    const modalClose = $("[data-close]");

    modalCall.on("click", function (event) {
        event.preventDefault();

        let $this = $(this);
        let modalId = $this.data('modal');

        $(modalId).addClass('show');
        $("body").addClass('no-scroll');

        setTimeout(function () {
            $(modalId).find(".modal__dialog").css({
                transform: "scale(1)"
            });
        }, 200);

        worksSlider.slick("setPosition");
    });

    modalClose.on("click", function (event) {
        event.preventDefault();

        let $this = $(this);
        let modalParent = $this.parents('.modal');

        modalParent.find(".modal__dialog").css({
            transform: "scale(0)"
        });

        setTimeout(function () {
            modalParent.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 200);
    });

    $(".modal").on("click", function (event) {
        let $this = $(this);

        $this.find(".modal__dialog").css({
            transform: "scale(0)"
        });

        setTimeout(function () {
            $this.removeClass('show');
            $("body").removeClass('no-scroll');
        }, 200);
    });

    $(".modal__dialog").on("click", function (event) {
        event.stopPropagation();
    });


    /* Slider: https://kenwheeler.github.io/slick/
    =======================================*/
    worksSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        dots: true,
    });
    $(".slickPrev").on("click", function (event) {
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick("slickPrev");
    });
    $(".slickNext").on("click", function (event) {
        event.preventDefault();

        let currentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

        currentSlider.slick("slickNext");
    });


    /* Hidden Content
   =======================================*/

    function toggle(elem) {
        if (elem.style.display === "none") {
            elem.style.display = "block";
        } else {
            elem.style.display = "none";
        }
    }

    $("#load").click(function (e) {
        e.preventDefault();

        let x = document.getElementsByClassName("portfolio__col_hidden");
        let storage_filter = localStorage.getItem('filter');

        for (var i = 0; i < x.length; i++) {
            let i_filter = x[i].getAttribute("data-cat");
            if (storage_filter == 'all' || storage_filter == null ) {
                toggle(x[i]);
            }
            else if (i_filter == storage_filter) {
                toggle(x[i]);
            }
        }
    });

    /* Mobile nav
      =======================================*/

    const navToggle = $("#navToggle");
    const nav = $("#nav");

    navToggle.on("click", function (e) {
        e.preventDefault();
        nav.toggleClass("show");
    });


    // sending email
    function send_email(e) {
        let email = this.elements['input-email'].value;
        let message = this.elements['input-text'].value;
        e.preventDefault();
        $.ajax({
          type: 'POST',
          url: 'https://api.dev.readyforsky.com/notification-center/v1/send_email/',
          headers: {"X-API-Key": "test"},
          data: JSON.stringify({
              "from": email,
              "to": "yana955@mail.ru",
              "subject": "Сообщение из формы для портфолио",
              "text": email + '\n\n' + message
            }),
            success: function(){
                  alert('Спасибо!');
                  document.location.reload();
                },
            error: function(){
                    alert('Извините, сообщение не отправилось, попробуйте позже');
                }
         }).done(function(response) {
             console.log(response);
         });
    }

    var form = document.getElementById("emailForm");
    form.addEventListener("submit", send_email, true);


});
