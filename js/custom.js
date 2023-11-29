/*
Author URI: http://webthemez.com/
Note: 
Licence under Creative Commons Attribution 3.0 
Do not remove the back-link in this web template 
-------------------------------------------------------*/

$('.read_more2').click(function(event){
    $('html, body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 1000);
    return false;
});

$(window).load(function() {
    jQuery('#all').click();
    return false;
});

$(document).ready(function() {
    $('#header_wrapper').scrollToFixed();
    $('.res-nav_click').click(function() {
        $('.main-nav').slideToggle();
        return false
    });

    function resizeText() {
        var preferredWidth = 767;
        var displayWidth = window.innerWidth;
        var percentage = displayWidth / preferredWidth;
        var fontsizetitle = 25;
        var newFontSizeTitle = Math.floor(fontsizetitle * percentage);
        $(".divclass").css("font-size", newFontSizeTitle)
    }

    if ($('#main-nav ul li:first-child').hasClass('active')) {
        $('#main-nav').css('background', 'none');
    }

    $('#mainNav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 1000,
        scrollThreshold: 0.2,
        filter: '',
        easing: 'swing',
        begin: function() {
        },
        end: function() {
            if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
            } else {
                $('.header').removeClass('addBg');
            }

        },
        scrollChange: function($currentListItem) {
            if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
            } else {
                $('.header').removeClass('addBg');
            }
        }
    });

    var container = $('#portfolio_wrapper');

    container.isotope({
        animationEngine: 'best-available',
        animationOptions: {
            duration: 200,
            queue: false
        },
        layoutMode: 'fitRows'
    });

    $('#filters a').click(function() {
        $('#filters a').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        container.isotope({
            filter: selector
        });
        setProjects();
        return false;
    });

    function splitColumns() {
        var winWidth = $(window).width(),
            columnNumb = 1;

        if (winWidth > 1024) {
            columnNumb = 4;
        } else if (winWidth > 900) {
            columnNumb = 2;
        } else if (winWidth > 479) {
            columnNumb = 2;
        } else if (winWidth < 479) {
            columnNumb = 1;
        }

        return columnNumb;
    }

    function setColumns() {
        var winWidth = $(window).width(),
            columnNumb = splitColumns(),
            postWidth = Math.floor(winWidth / columnNumb);

        container.find('.portfolio-item').each(function() {
            $(this).css({
                width: postWidth + 'px'
            });
        });
    }

    function setProjects() {
        setColumns();
        container.isotope('reLayout');
    }

    container.imagesLoaded(function() {
        setColumns();
    });

    $(window).bind('resize', function() {
        setProjects();
    });

   $(".fancybox").fancybox();

    function monthDiff(start_date, end_date) {
        var months;

        months = (end_date.getFullYear() - start_date.getFullYear()) * 12;
        months -= start_date.getMonth() + 1;
        months += end_date.getMonth();

        if (end_date.getDate() >= start_date.getDate()) {
            months++;
        }

        months <= 0 ? 0 : months

        if (months > 12) {
            var years = Math.floor(months/12);
            months = months - years*12;
            var years_to_str = years == 1 ? "year" : "years";
            var months_to_str = months == 1 ? "month" : "months";
            return "(" + years + " " + years_to_str + " " + months + " " + months_to_str + ")";
        }
        else {
            var months_to_str = months == 1 ? "month" : "months";
            return "(" + months + " " + months_to_str + ")";
        }
    }

    $(".epam_experience_time").replaceWith((monthDiff(new Date(2019, 9, 5), new Date())));

    document.getElementById("year").innerHTML = new Date().getFullYear();
});

$('#post-form').on('submit', function(event){
    event.preventDefault();
    $(".input-btn").val("Submitting...");
    $('.error').fadeOut("slow", function() {$(this).remove()});
    create_post();
});

function display_form_errors(errors, $form) {
    for (var error in errors) {
        var $errmsg = $('<div class="error">' + errors[error] + '</div>').hide();
        $form.find('[name='+error+']').before($errmsg);
    }
    $('.error').fadeIn("slow");
};

// AJAX for posting
function create_post() {
    $.ajax({
        url : window.location.href, // the endpoint
        type : "POST", // http method
        data : { csrfmiddlewaretoken : $('input[name="csrfmiddlewaretoken"]').val(),
                 name : $('input[name="name"]').val(),
                 email : $('input[name="email"]').val(),
                 message : $('textarea[name="message"]').val(),
                }, // data sent with the post request

        // handle a successful response
        success : function(json) {
            $('#post-form').fadeOut("slow", function() {
                $(this).remove();
                $('#results').html("<h3 class='reply'>Thank you, " + json.name + "! I'll reply to you shortly.</h3>");
            });
        },

        // handle a non-successful response
        error : function(xhr, errmsg, err) {
            $(".input-btn").val("Submit");
            display_form_errors(xhr.responseJSON, $('#post-form'));
            //$('#results').html("<h3 class='error'>Oops! Please correct the errors below</h3>"); // add the error to the dom
        }
    });
    return false;
};

wow = new WOW({
    animateClass: 'animated',
    offset: 100
});

wow.init();

//document.getElementById('').onclick = function() {
//    var section = document.createElement('section');
//    section.className = 'wow fadeInDown';
//    section.className = 'wow shake';
//    section.className = 'wow zoomIn';
//    section.className = 'wow lightSpeedIn';
//    this.parentNode.insertBefore(section, this);
//};
