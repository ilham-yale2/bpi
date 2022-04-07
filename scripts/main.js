'use strict';
$(function () {
    function build(callback) {
        var node = callback;
        var value = node.attr("id");
        var title = node.attr("class");
        var d = node.attr("src");
        jQuery.get(d, function (t) {
            var current = jQuery(t).find("svg");
            if ("undefined" != typeof value) {
                current = current.attr("id", value);
            }
            if ("undefined" != typeof title) {
                current = current.attr("class", title + " replaced-svg");
            }
            current = current.removeAttr("xmlns:a");
            node.replaceWith(current);
        }, "xml");
    }

    function start() {
        jQuery("img.svg").each(function (a) {
            build($(this));
        });
    }

    function stickyNav() {
        var t = $(window).scrollTop();
        if (t > 10) {
            element.addClass("sticky");
        } else {
            element.removeClass("sticky");
        }
    }

    function check(event) {
        var s = (event.target, event.item.count);
        var i = event.item.index - 1;
        var e = $(".slider").find(".slider-item");
        var msg = event.item.index + 1 - event.relatedTarget._clones.length / 2;
        e.data("type");
        console.log(msg);
        if (i > s) {
            i = i - s;
        }
        if (s < 10) {
            $("#slider-index").html("0" + msg + " / 0" + s);
        } else {
            $("#slider-index").html(msg + " / " + s);
        }
    }
    start();
    var element = $("header");
    $(window).height();
    element.outerHeight() + 40;
    stickyNav();
    $(".header_burger").click(function () {
        $("body").toggleClass("main-menu-open");
        $(".has-sub").removeClass("sub-open");
    });
    $(".slider-home").each(function () {
        var $this = $(this);
        var a = $this.attr("data-items") ? parseInt($this.attr("data-items")) : 1;
        var nav = !(!$this.attr("data-nav") || "yes" != $this.attr("data-nav"));
        var DEFAULT_CENTER = !(!$this.attr("data-center") || "yes" != $this.attr("data-center"));
        var f = !$this.attr("data-dot") || "no" != $this.attr("data-dot");
        var loop = !$this.attr("data-loop") || "no" != $this.attr("data-loop");
        var autoplay = !$this.attr("data-auto") || "no" != $this.attr("data-auto");
        var out = a > 3 ? 3 : a;
        var models = a > 4 ? 4 : a;
        var autoWidth = !$this.attr("data-width") || "fix" != $this.attr("data-width");
        var isPreviousActive = (!$this.attr("data-height") || "fix" != $this.attr("data-height"), !(!$this.attr("data-fade") || "yes" != $this.attr("data-fade")) && "fadeOut");
        var u = $this.attr("data-slide") ? $this.attr("data-slide") : 1;
        var listBoxItems = $this.attr("data-ixs") ? $this.attr("data-ixs") : 1;
        var readersLength = $this.children().length;
        $this.on("initialized.owl.carousel", function (t) {
            var slideIndex = t.item.index;
            var entry = $(t.target).find(".owl-item").eq(slideIndex).find(".slider-item").data("type");
            var time = $(t.target).find(".owl-item").eq(slideIndex).find(".slider-item").data("title");
            var code = $(t.target).find(".owl-item").eq(slideIndex).find(".slider-item").data("link");
            $(".owl-item").each(function () {
                if ("" != entry) {
                    $("#slider-title h2 b").html(entry);
                    $("#slider-title h2 i").show();
                } else {
                    $("#slider-title h2 b").html("");
                    $("#slider-title h2 i").hide();
                }
                if ("" != time) {
                    $("#slider-title h2 span").html(time);
                    $("#slider-title h2 i").show();
                } else {
                    $("#slider-title h2 span").html("");
                    $("#slider-title h2 i").hide();
                }
                if ("" != code) {
                    $("#slider-title h2 a").attr("href", code);
                } else {
                    $("#slider-title h2 a").attr("href", "#");
                }
            });
        });
        if (readersLength > 1) {
            $this.addClass("owl-carousel").each(function () {
                var player = $(this);
                player.owlCarousel({
                    loop: loop,
                    dots: f,
                    nav: nav,
                    navText: ["<span class='icon prev'></span>", "<span class='icon next'></span>"],
                    autoplay: autoplay,
                    autoplayTimeout: 6e3,
                    autoplaySpeed: 1e3,
                    navSpeed: 800,
                    dotsSpeed: 800,
                    center: DEFAULT_CENTER,
                    animateOut: isPreviousActive,
                    slideBy: u,
                    autoHeight: false,
                    autoWidth: autoWidth,
                    onInitialized: check,
                    onTranslated: check,
                    startPosition: 0,
                    responsive: {
                        0: {
                            items: listBoxItems
                        },
                        768: {
                            items: out
                        },
                        992: {
                            items: models
                        },
                        1200: {
                            items: a
                        }
                    }
                });
                player.on("translated.owl.carousel", function (a) {
                    if ($(window).width() < 600) {
                        player.find(".active").eq(0).find(".autocheckbox").prop("checked", true);
                        player.find(".active").removeClass("active-last");
                        player.find(".active").eq(2).addClass("active-last");
                        if (player.hasClass("days-wrap")) {
                            $("#filter").find("input[type=submit]").click();
                        }
                    }
                });
                var syncedAnimals = player.find(".slider-item");
                player.on("changed.owl.carousel", function (a) {
                    player.currentItem;
                    syncedAnimals.each(function () {});
                });
            });
        } else {
            $this.addClass("no-slider");
            $(window).resize(function () {});
        }
        $this.on("changed.owl.carousel", function (t) {
            var slideIndex = t.item.index;
            var entry = $(t.target).find(".owl-item").eq(slideIndex).find(".slider-item").data("type");
            var time = $(t.target).find(".owl-item").eq(slideIndex).find(".slider-item").data("title");
            var code = $(t.target).find(".owl-item").eq(slideIndex).find(".slider-item").data("link");
            $(".owl-item").each(function () {
                if ("" != entry) {
                    $("#slider-title h2 b").html(entry);
                    $("#slider-title h2 i").show();
                } else {
                    $("#slider-title h2 b").html("");
                    $("#slider-title h2 i").hide();
                }
                if ("" != time) {
                    $("#slider-title h2 span").html(time);
                    $("#slider-title h2 i").show();
                } else {
                    $("#slider-title h2 span").html("");
                    $("#slider-title h2 i").hide();
                }
                if ("" != code) {
                    $("#slider-title h2 a").attr("href", code);
                } else {
                    $("#slider-title h2 a").attr("href", "#");
                }
            });
        });
    });
    $(".slider-career").each(function () {
        var $this = $(this);
        var a = $this.attr("data-items") ? parseInt($this.attr("data-items")) : 1;
        var nav = !(!$this.attr("data-nav") || "yes" != $this.attr("data-nav"));
        var DEFAULT_CENTER = !(!$this.attr("data-center") || "yes" != $this.attr("data-center"));
        var f = !$this.attr("data-dot") || "no" != $this.attr("data-dot");
        var loop = !$this.attr("data-loop") || "no" != $this.attr("data-loop");
        var autoplay = !$this.attr("data-auto") || "no" != $this.attr("data-auto");
        var out = a > 3 ? 3 : a;
        var models = a > 4 ? 4 : a;
        var autoWidth = !$this.attr("data-width") || "fix" != $this.attr("data-width");
        var isPreviousActive = (!$this.attr("data-height") || "fix" != $this.attr("data-height"), !(!$this.attr("data-fade") || "yes" != $this.attr("data-fade")) && "fadeOut");
        var c = $this.attr("data-slide") ? $this.attr("data-slide") : 1;
        var listBoxItems = $this.attr("data-ixs") ? $this.attr("data-ixs") : 1;
        var dots = ($this.attr("data-padding") ? $this.attr("data-padding") : 0, $this.children().length);
        if (dots > 1) {
            $this.addClass("owl-carousel").each(function () {
                var owl1 = $(this);
                owl1.owlCarousel({
                    loop: loop,
                    dots: f,
                    nav: nav,
                    navText: ["<span class='icon prev'></span>", "<span class='icon next'></span>"],
                    autoplay: autoplay,
                    autoplayTimeout: 6e3,
                    autoplaySpeed: 1e3,
                    navSpeed: 800,
                    dotsSpeed: 800,
                    center: DEFAULT_CENTER,
                    animateOut: isPreviousActive,
                    slideBy: c,
                    autoHeight: false,
                    autoWidth: autoWidth,
                    startPosition: 0,
                    margin: 20,
                    responsive: {
                        0: {
                            items: 3
                        },
                        768: {
                            items: out
                        },
                        992: {
                            items: models
                        },
                        1200: {
                            items: a
                        }
                    }
                });
            });
        } else {
            $this.addClass("no-slider");
            $(window).resize(function () {});
        }
    });
    $(".slider").each(function () {
        var $this = $(this);
        var a = $this.attr("data-items") ? parseInt($this.attr("data-items")) : 1;
        var nav = !(!$this.attr("data-nav") || "yes" != $this.attr("data-nav"));
        var DEFAULT_CENTER = !(!$this.attr("data-center") || "yes" != $this.attr("data-center"));
        var f = !$this.attr("data-dot") || "no" != $this.attr("data-dot");
        var loop = !$this.attr("data-loop") || "no" != $this.attr("data-loop");
        var autoplay = !$this.attr("data-auto") || "no" != $this.attr("data-auto");
        var out = a > 3 ? 3 : a;
        var models = a > 4 ? 4 : a;
        var autoWidth = !$this.attr("data-width") || "fix" != $this.attr("data-width");
        var isPreviousActive = (!$this.attr("data-height") || "fix" != $this.attr("data-height"), !(!$this.attr("data-fade") || "yes" != $this.attr("data-fade")) && "fadeOut");
        var c = $this.attr("data-slide") ? $this.attr("data-slide") : 1;
        var listBoxItems = $this.attr("data-ixs") ? $this.attr("data-ixs") : 1;
        var dots = ($this.attr("data-padding") ? $this.attr("data-padding") : 0, $this.children().length);
        if (dots > 1) {
            $this.addClass("owl-carousel").each(function () {
                var owl1 = $(this);
                owl1.owlCarousel({
                    loop: loop,
                    dots: f,
                    nav: nav,
                    navText: ["<span class='icon prev'></span>", "<span class='icon next'></span>"],
                    autoplay: true,
                    autoplayTimeout: 6e3,
                    autoplaySpeed: 1e3,
                    navSpeed: 800,
                    dotsSpeed: 800,
                    center: DEFAULT_CENTER,
                    animateOut: isPreviousActive,
                    slideBy: c,
                    autoHeight: false,
                    autoWidth: autoWidth,
                    startPosition: 0,
                    margin: 24,
                    responsive: {
                        0: {
                            items: listBoxItems
                        },
                        768: {
                            items: out
                        },
                        992: {
                            items: models
                        },
                        1200: {
                            items: a
                        }
                    }
                });
            });
        } else {
            $this.addClass("no-slider");
            $(window).resize(function () {});
        }
    });
});