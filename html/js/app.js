/**
 * Created by NTH.
 */
(function ($) {
    'use strict';

    $(document).foundation();

    // Start the main logic.
    $(function() {

        //...
        init_clock();

        // pre execute form with recaptcha
        // form with 'frm-recaptcha' class
        //grecaptcha_execute();

        // ToTop
        let tt = $('html');
        if (tt.hasClass('desktop')) {

            $.getScript('js/lib/jquery.ui.totop.js', function () {
                $().UItoTop({
                    text: '',
                    easingType: 'easeOutQuart',
                    containerClass: 'toTop fa fa-arrow-up'
                });
            });
        }

        // prettySocial
        let ps = $(".prettySocial");
        if (ps.length) {
            $.getScript('js/lib/jquery.prettySocial.min.js', function () {
                ps.prettySocial();
            });
        }

        // gmap
        let google_map = $("#google-map");
        if (google_map.length) {

            // toogle map
            let footer_map = $(".footer-map");
            footer_map.find(".toogle-map").on('click', function (e) {
                let map = footer_map.find(".map-model");
                if(map.hasClass("map-hide")) {

                    //$.scrollTo($(this), 900);
                    $("html, body").animate({scrollTop: $(document).height()}, 900);

                    map.slideDown().removeClass('map-hide');
                    $(this).find('span').html("Hide Google Maps");
                }
                else {
                    map.slideUp().addClass("map-hide");
                    $(this).find('span').html("View Google Maps");
                }

                e.preventDefault();
            });

            // show google map
            // styles | https://mapstyle.withgoogle.com/
            $.getScript('js/lib/jquery.gmap.js', function () {
                google_map.googleMap({
                    backgroundColor: 'none',
                    styles: [
                        {
                            "featureType": "administrative.country",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "visibility": "on"
                                }
                            ]
                        },
                        {
                            "featureType": "water",
                            "elementType": "geometry.fill",
                            "stylers": [
                                {
                                    "color": "#9dc4ce"
                                }
                            ]
                        }
                    ]
                });
            });
        }

        // waitForImages loaded
        $.getScript('js/lib/jquery.waitforimages.min.js', function () {
            $('body').waitForImages(function() {
                let preloader = $('.preloader');
                preloader.fadeOut().remove();
            }, $.noop, true);
        });

        // home slides
        if ($("#jslides_1").length) {

            $.getScript('js/lib/jssor.slider-27.2.0.min.js', function () {
                let jSlideoTransitions = [
                    [{b: -1, d: 1, o: -0.7}],
                    [{b: 900, d: 2000, x: -379, e: {x: 7}}],
                    [{b: 900, d: 2000, x: -379, e: {x: 7}}],
                    [{b: -1, d: 1, o: -1, sX: 2, sY: 2}, {
                        b: 0,
                        d: 900,
                        x: -171,
                        y: -341,
                        o: 1,
                        sX: -2,
                        sY: -2,
                        e: {x: 3, y: 3, sX: 3, sY: 3}
                    }, {b: 900, d: 1600, x: -283, o: -1, e: {x: 16}}]
                ];
                let joptions = {
                    $AutoPlay: 1,
                    $SlideDuration: 800,
                    $SlideEasing: $Jease$.$OutQuint,
                    $CaptionSliderOptions: {
                        $Class: $JssorCaptionSlideo$,
                        $Transitions: jSlideoTransitions
                    },
                    $ArrowNavigatorOptions: {
                        $Class: $JssorArrowNavigator$
                    },
                    $BulletNavigatorOptions: {
                        $Class: $JssorBulletNavigator$
                    }
                };
                let jslider = new $JssorSlider$("jslides_1", joptions);

                /*#region responsive code begin*/
                const MAX_WIDTH = 3000;

                /**
                 * ScaleSlider
                 */
                function ScaleSlider() {
                    let containerElement = jslider.$Elmt.parentNode;
                    let containerWidth = containerElement.clientWidth;

                    if (containerWidth) {

                        let expectedWidth = Math.min(MAX_WIDTH || containerWidth, containerWidth);
                        jslider.$ScaleWidth(expectedWidth);
                    }
                    else {
                        window.setTimeout(ScaleSlider, 30);
                    }
                }

                // bind
                $(window).bind("orientationchange", ScaleSlider);
                $(window).on("resize", function () { ScaleSlider(); }).resize();
                /*#endregion responsive code end*/
            });
        }

        // bxslider
        let bx = $(".bx-target");
        if(bx.length) {
            let options = {
                mode: 'fade',
                pager: false,
                controls: false,
                auto: true,
                pause: 10000,
                speed: 300,
                adaptiveHeight: true,
                adaptiveHeightSpeed: 0
            };

            $.getScript('js/lib/jquery.bxslider.min.js', function () {
                bx.bxSlider(options);
            });
        }

        // news flexslides
        let slider_news = $(".slider-news");
        if(slider_news.length) {
            let options = {
                animation: "fade",
                controlNav: false,
                touch: true,
                customDirectionNav: $(".flex-nav > span")
            };

            $.getScript('js/lib/jquery.flexslider-min.js', function () {
                slider_news.find(".flexslider").flexslider(options);
                $(window).on("resize", function () {
                    let w_tmp = slider_news.find(".slides").find("a.res").outerWidth();
                    let top = (w_tmp / 4) - 32;
                    $(".flexslider").find(".flex-nav > span").css('top', top);

                }).resize();
            });
        }

        // coindesk-widget
        let coindesk_widget = $("#coindesk-widget");
        if(coindesk_widget.length) {
            $.getScript('//widget.coindesk.com/bpiticker/coindesk-widget.min.js', function () {});
        }

        //...
        // footer contact form
        let frm_contact_f = $(".frm-contact-f");
        frm_contact_f.on('submit', function (e) {

            if (!validate_form($(this))) return false;

            // alert
            alert("form submit ok!");
            e.preventDefault();
        });

        // Invoke the resize event immediately
        // $(window).on('load resize', function () {});
        $(window).on("resize", function () {

            // fixed mobi menu
            fixed_responsive_menu();
            //...
            // remove fixed-top mobi menu
            let body = $('body');
            let main_header = body.find('.main-header');
            main_header.addClass('on-top');
            body.find('.fixed-bar').css('height', main_header.outerHeight());
            if(is_mobile()) {
                body.find('.fixed-bar').css('height', 0);
                main_header.removeClass('on-top');
            }

            // search box
            let breakpoint = Foundation.MediaQuery.current;
            let search_box = $(".search-box");
            search_box.detach().insertBefore(".news-col-wrapper .r .featured-news");
            if(breakpoint === 'small' || breakpoint === 'medium') {
                search_box.detach().insertBefore(".news-col-wrapper .l .slider-news");
            }

        }).resize();

        // window onload
        $(window).on("load", function () {

            // add .border class to table
            init_border_table();

            // scrolltofixed
            let sidebar_share = $(".sidebar-share");
            if(sidebar_share.length && Foundation.MediaQuery.atLeast('large')) {
                $.getScript('js/lib/jquery-scrolltofixed-min.js', function() {

                    sidebar_share.scrollToFixed({
                        marginTop: 90,
                        limit: function() { return $('footer').offset().top - $(this).outerHeight() - 50;},
                        //unfixed: function() { sidebar_share.css('left', '-38px') },
                        removeOffsets: true,
                        dontSetWidth: true,
                        zIndex: 9
                    })
                });
            }
        });
    });

    /**
     * validate_form
     *
     * @param selector
     * @returns {boolean}
     */
    function validate_form(selector) {
        selector.foundation('validateForm', selector);
        return !(selector.find('.form-error.is-visible').length || selector.find('.is-invalid-label').length || selector.find('.is-invalid-input').length);
    }

    /**
     * fixed responsive menu
     *
     * @param selector_node
     * @param atLeast
     */
    function fixed_responsive_menu(selector_node, atLeast) {
        let parent_node = selector_node;
        let at_least = atLeast;
        if (!selector_node) {
            parent_node = $(".parent_nav");
        }
        if (!atLeast) {
            at_least = 'large';
        }
        if (!Foundation.MediaQuery.atLeast(at_least)) {
            parent_node.addClass('vertical');
        }
        else {
            parent_node.removeClass('vertical');
        }
    }

    /**
     * is_mobile
     *
     * @param atLeast large|medium|small
     * @returns {*|jQuery|boolean}
     */
    function is_mobile(atLeast) {
        let at_least = atLeast;
        if (!atLeast) {
            at_least = 'medium';
        }

        return $('html, body').filter('html').hasClass('mobile') || !Foundation.MediaQuery.atLeast(at_least);
    }

    /**
     * init_clock
     */
    function init_clock(wrapper) {
        // Create two variable with the names of the months and days in an array
        let clock_wp = wrapper;
        if (!wrapper) {
            clock_wp = $("#clock-wp");
        }
        let newDate = new Date();
        newDate.setDate(newDate.getDate());

        let dayNames = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
        clock_wp.find(".date-txt").html(dayNames[newDate.getDay()] + ", " + newDate.getDate() + '/' + (newDate.getMonth() + 1) + '/' + newDate.getFullYear());

        // sec
        setInterval(function () {
            let seconds = new Date().getSeconds();
            clock_wp.find(".sec").html((seconds < 10 ? "0" : "") + seconds);
        }, 1000);

        // min
        setInterval(function () {
            let minutes = new Date().getMinutes();
            clock_wp.find(".min").html((minutes < 10 ? "0" : "") + minutes);
        }, 1000);

        // hours
        setInterval(function () {
            let hours = new Date().getHours();
            clock_wp.find(".hours").html((hours < 10 ? "0" : "") + hours);
        }, 1000);

        // GMT+7
        clock_wp.append("<span class='gmt'>GMT+7</span>");
    }

    /**
     * grecaptcha_execute
     */
    function grecaptcha_execute(frm_selector) {
        if (!frm_selector) {
            frm_selector = $(".frm-grecaptcha");
        }

        frm_selector.find(":submit").on('click', function (e) {

            let button_text = $(this).html();
            let button_text_loading = "<i class=\"fa fa-spinner fa-spin fa-3x fa-fw\"></i><span class=\"sr-only\">Loading...</span>";

            $(this).prop('disabled', true).html(button_text_loading);
            if (!validate_form(frm_selector)) {
                $(this).prop('disabled', false).html(button_text);
                return false;
            }

            grecaptcha.execute();
            e.preventDefault();
        });
    }

})(jQuery);
