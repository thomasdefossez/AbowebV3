/// <reference path="../lib/jquery/jquery-2.1.4.js" />

$(document).ready(function () {

    //Dummy links
    $("a[href=#]").click(function (e) { e.preventDefault(); });

    //Tooltip
    if ($(".tip").length > 0) {
        $(".tip").tooltip();
    }

    //Tool Box
    if ($(".tool-box").length > 0) {
        $(".tool-box>a").on('click', function (e) {
            var $FirstUl = $(this).parents(".tool-box").find("ul:first");
            if ($FirstUl.hasClass("active")) {
                $FirstUl.removeClass("active");
            } else {
                $FirstUl.addClass("active");
                if (typeof $FirstUl.attr('style') == 'undefined') {
                    var $BtnWidth = $(this).outerWidth();
                    var $BtnHeight = $(this).outerHeight();
                    var $FirstUlWidth = $FirstUl.outerWidth();
                    $FirstUl.css('margin-left', '-' + ($FirstUlWidth / 2 - $BtnWidth / 2) + 'px');
                    $FirstUl.css('margin-bottom', $BtnHeight + 10 + 'px');
                    $FirstUl.css('margin-top', $BtnHeight + 10 + 'px');
                    $(document).on('click', function (event) {
                        if (!$(event.target).closest('.tool-box').length) {
                            $(".tool-box").find("ul:first").removeClass("active");
                        }
                    });
                }
            }
            $(this).parents('.tool-box').find('ul>li>ul').removeClass('active');
            e.preventDefault();
        });
        $('.tool-box>ul>li').hover(function () {
            if ($(this).find('ul').length > 0) {
                var $FirstUl = $(this).parents(".tool-box").find("ul:first");
                var $FirstUlWidth = $FirstUl.outerWidth();
                $(this).find('ul').addClass('active');
                if ($(this).hasClass("ul-left")) {
                    $(this).find('ul').css('left', '-' + ($(this).find('ul').outerWidth() + 10) + 'px');
                } else {
                    $(this).find('ul').css('left', $FirstUlWidth + 'px');
                }
            }
            else {
                $(this).parents('.tool-box').find('ul>li>ul').removeClass('active');
            }
        });
    }

    //New toggle
    if ($(".new").length > 0){
        $(".new").click(function () {
            $(this).removeClass("new");
        });
    }

    //Datepicker - Daterangepicker
    if ($('[data-type="date"]').length > 0) {
        $('[data-type="date"]').datepicker({
            firstDay: 1,
            dateFormat: "dd/mm/yy"
        });
    }
    if ($('[data-type="daterangepicker"]').length > 0) {
        $('[data-type="daterangepicker"]').daterangepicker({
            "autoApply": true,
            "locale": {
                "format": "DD/MM/YYYY",
                "separator": " - ",
                "applyLabel": "Appliquer",
                "cancelLabel": "Annuler",
                "fromLabel": "De",
                "toLabel": "à",
                "customRangeLabel": "Coutume",
                "daysOfWeek": [
                    "Di",
                    "Lu",
                    "Ma",
                    "Me",
                    "Je",
                    "Ve",
                    "Sa"
                ],
                "monthNames": [
                    "Janvier",
                    "Février",
                    "Mars",
                    "Avril",
                    "Mai",
                    "Juin",
                    "Juillet",
                    "Août",
                    "Septembre",
                    "Octobre",
                    "Novembre",
                    "Décembre"
                ],
                "firstDay": 1
            },
            "opens": "left"
        }, function (start, end, label) {
            console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
        });
    }


    //PopUp functions
    if ($("[open-popup]").length > 0) {
        $("[open-popup]").click(function (e) {
            var PopUpName = $(this).attr("open-popup");
            OpenPopUp(PopUpName);
        })
    }
    if ($("[close-popup]").length > 0) {
        $("[close-popup]").click(function (e) {
            $(".PopUps").removeClass("active");
            $("[popup]").removeClass("active");
            e.preventDefault();
        })
    }
    if ($("[popup]").length > 0) {
        $("[popup]").click(function () {
            var name = $(this).attr("popup");
            RecalculatePopUp(name);
        });
        $("[popup]").mouseup(function () {
            var name = $(this).attr("popup");
            RecalculatePopUp(name);
        });
    }

    //Notifications
    if ($("[open-notification]").length > 0) {
        $("[open-notification]").click(function (e) {
            var NotificationName = $(this).attr("open-notification");
            $('[notification="' + NotificationName + '"]').addClass("active");
        })
    }
    if ($("[close-notification]").length > 0) {
        $("[close-notification]").click(function (e) {
            $(this).parents("[notification]").removeClass("active");
            e.preventDefault();
        })
    }

    //Header Notifications scroll
    if ($(".MainHeader .Notifications .dropdown-menu ul").length > 0) {
        $(".MainHeader .Notifications .dropdown-menu ul").slimScroll({
            height: '310px',
            size: '4px',
            distance: '3px',
            color: '#ffffff'
        });
    }

    //Dropdown dont close
    $('.dropdown-dont-close').click(function (event) {
        var events = $._data(document, 'events') || {};
        events = events.click || [];
        for (var i = 0; i < events.length; i++) {
            if (events[i].selector) {
                if ($(event.target).is(events[i].selector)) {
                    events[i].handler.call(event.target, event);
                }
                $(event.target).parents(events[i].selector).each(function () {
                    events[i].handler.call(this, event);
                });
            }
        }
        event.stopPropagation();
    });

    //Toggle Active
    if ($("a[data-toggle-active]").length > 0) {
        $("a[data-toggle-active]").click(function (e) {
            var target = $(e.target);
            if (target.is("input") == false) {
                
                var name = $(this).attr("data-toggle-active");
                var state = "on";
                if ($(this).hasClass("active")) { state = "off"; }

                if (state == "on") {
                    $('[data-toggle-active="' + name + '"]').addClass("active");
                } else {
                    $('[data-toggle-active="' + name + '"]').removeClass("active");
                }

                $('[data-toggle-active]').each(function (e) {
                    if ($(this).attr("data-toggle-active").indexOf(",") >= 0){
                        var values = $(this).attr("data-toggle-active").split(',');
                        for (var i = 0; i < values.length; i++) {
                            if (values[i] == name) {
                                if (state == "on") {
                                    $(this).addClass("active");
                                } else {
                                    $(this).removeClass("active");
                                }
                            }
                        }
                    }
                });
                
                if ($('div[data-toggle-active="' + name + '"]').hasClass("mouseleave-close")) {
                    $('div[data-toggle-active="' + name + '"]').one("mouseleave", function () {
                        $('div[data-toggle-active="' + name + '"]').slideUp(300, function () {
                            $('div[data-toggle-active="' + name + '"]').removeAttr("style");
                            $('[data-toggle-active="' + name + '"]').removeClass("active");
                        });
                    });
                }

                if ($('div[data-toggle-active="' + name + '"]').hasClass("outside-click-close")) {
                    $(document).on("click", function (e) {
                        if ($(e.target).closest('a[data-toggle-active="' + name + '"]').length) {
                        } else {
                            if ($(e.target).closest('div[data-toggle-active="' + name + '"]').length) {
                            } else {
                                $('[data-toggle-active="' + name + '"]').removeClass("active");
                                $(document).off("click");
                            }
                        }
                        
                    });
                }

                

                e.preventDefault();
            }
        });
    }

    //Toggle select
    if ($("[data-select-group]").length > 0) {
        $("[data-select-group]").click(function (e) {
            var name = $(this).attr("data-select-group");
            $('[data-select-group="' + name + '"]').removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
        });
    }

    //LeftSidebar Toggle
    if ($(".LeftSidebarToggleButton").length > 0) {
        $(".LeftSidebarToggleButton").click(function () {
            $(this).toggleClass("active");
            $(".MainContent").toggleClass("LeftActive");
        });
    }

    //RightSidebar Toggle
    if ($(".RightSidebarToggleButton").length > 0) {
        $(".RightSidebarToggleButton").click(function () {
            $(this).toggleClass("active");
            $(".MainContent").toggleClass("RightActive");
        });
    }

    //LeftSidebar Menu
    if ($(".LeftSidebar .menu").length > 0) {
        $(".LeftSidebar .menu li a").click(function () {
            $(".LeftSidebar .menu li").removeClass("selected");
            $(this).parents("li").addClass("selected");
        });
    }

    //RightSide TaskList
    if ($(".RightSidebar .TaskList").length > 0) {
        $(".RightSidebar .TaskList li").click(function (event) {
            var target = $(event.target);
            if (target.is("input") || target.is("a")) {
                if (target.hasClass("remove")) {
                    $(this).fadeOut(250, function () {
                        $(this).remove();
                        //delete task
                    });
                }
            } else {
                $(this).toggleClass("active");
            }
        });
    }

    //Heights
    function ContentHeight() {

        var MainHeaderHeight = $(".MainHeader").height();
        var TotalWindowHeight = $(window).height();
        var MainContentHeight = TotalWindowHeight - MainHeaderHeight;
        if ($(".MainContent").length > 0) {
            $(".MainContent").css("height", MainContentHeight + "px");
        }

        if ($(".LeftSidebar").length > 0) {
            $(".LeftSidebar").css("height", MainContentHeight + "px");
            $(".LeftSidebar .inner").slimScroll({
                height: MainContentHeight + 'px',
                width: '200px',
                size: '3px',
                distance: '2px',
                color: '#ffffff'
            });

        }

        if ($(".Content").length > 0) {

            $(".Content").css("height", MainContentHeight + "px");

            var ContentWidth = '960px';
            if($(window).width() < 975){
                ContentWidth = '740px';
            }
            if ($(window).width() < 750) {
                ContentWidth = '320px';
            }

            var ContentInnerHeight = MainContentHeight;
            if ($(".Content>.footer").length > 0) {
                ContentInnerHeight = MainContentHeight - $(".Content>.footer").outerHeight();
            }

            $(".Content .inner").slimScroll({
                height: ContentInnerHeight + 'px',
                size: '4px',
                distance: '2px',
                color: '#99a2a8'
            });
        }

        if ($(".RightSidebar").length > 0) {
            $(".RightSidebar").css("height", MainContentHeight + "px");
            $(".RightSidebar .inner").css("height", (MainContentHeight - ($(".RightSidebar .header").height() + $(".RightSidebar .subheader").height() + $(".RightSidebar .footer").height())) + 'px');
            $(".RightSidebar .inner").slimScroll({
                height: (MainContentHeight - ($(".RightSidebar .header").height() + $(".RightSidebar .subheader").height() + $(".RightSidebar .footer").height())) + 'px',
                width: '300px',
                size: '3px',
                color: '#8b969c',
                distance: '2px'
            });
        }

        if ($(window).width() > 1490) {
            $(".MainContent").addClass("LeftActive").addClass("RightActive");
            $(".LeftSidebarToggleButton").addClass("active");
            if ($(".RightSidebarToggleButton").length > 0) {
                $(".RightSidebarToggleButton").addClass("active");
            }
            
        }
        if ($(window).width() > 1200) {
            $(".MainContent").addClass("LeftActive");
            $(".LeftSidebarToggleButton").addClass("active");
        }


    }
    ContentHeight();
    $(window).resize(ContentHeight);

    //Tabs
    if ($("a[data-tab]").length > 0) {
        $("a[data-tab]").click(function (e) {
            var name = $(this).attr("data-tab");
            var group = $(this).attr("data-tabgroup");
            $('[data-tabgroup="' + group + '"]').removeClass("active");
            $('.TabPane[data-tabgroup="' + group + '"]').removeClass("active");
            $(this).addClass("active");
            $('.TabPane[data-tabgroup="' + group + '"][data-tab="' + name + '"]').addClass("active");
            if ($('.dropdown-tabs[data-tabgroup="' + group + '"]').length > 0) {
                $('.dropdown-tabs[data-tabgroup="' + group + '"]').find('[data-tab]').removeAttr("selected");
                $('.dropdown-tabs[data-tabgroup="' + group + '"]').find('[data-tab="' + name + '"]').attr("selected", "selected");
            }
            e.preventDefault();
        });
    }
    if ($(".dropdown-tabs").length > 0) {
        $(".dropdown-tabs").change(function () {
            var name = $(this).find(":selected").attr("data-tab");
            var group = $(this).find(":selected").attr("data-tabgroup");
            $('[data-tabgroup="' + group + '"]').removeClass("active");
            $('[data-tabgroup="' + group + '"][data-tab="' + name + '"]').addClass("active");
            e.preventDefault();
        });
    }
    
    //Responsive table
    if ($("table.responsive").length > 0) {
        $("table.responsive").ngResponsiveTables({});
    }

    //Refresh rotation
    if ($(".btn-refresh").length > 0){
        $(".btn-refresh").click(function () {
            var angle = 0;
            setInterval(function () {
                angle += 4;
                $(".btn-refresh img").rotate(angle);
            }, 9);
        });
    }

    // Page: Index
    if ($("body").hasClass("Index")) {
        
    }


});

function OpenPopUp(arg) {
    $(".PopUps").addClass("active");
    $('[popup="' + arg + '"]').addClass("active");
    RecalculatePopUp(arg)
    return false;
}
function RecalculatePopUp(arg) {
    var element = $('[popup="' + arg + '"]');
    var WindowHeight = $(window).height();
    var PopUpHeight = element.height();

    if (PopUpHeight < WindowHeight) {
        var $margin = (WindowHeight - PopUpHeight) / 2;
        element.css("margin-top", $margin + "px");
    } else {
        element.css("position", "absolute");
        element.css("margin-top", ($(document).scrollTop() + 10) + "px");
        var $headerH = $('[popup="' + arg + '"] .popup-main-header').outerHeight();
        var $footerH = $('[popup="' + arg + '"] .popup-main-footer').outerHeight();
        element.css("height", WindowHeight - 20 + "px");
        $('[popup="' + arg + '"] .popup-main-content').css("height", (WindowHeight - 20 - ($headerH + $footerH)) + 'px');
        $('[popup="' + arg + '"] .popup-main-content').slimScroll({
            height: (WindowHeight - 20 - ($headerH + $footerH)) + 'px',
            width: element.outerWidth() + 'px',
            size: '3px',
            color: '#8b969c',
            distance: '2px'
        });
    }
}

/* French initialisation for the jQuery UI date picker plugin. */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["../datepicker"], factory);
    } else {
        factory(jQuery.datepicker);
    }
}(function (datepicker) {
    datepicker.regional['fr'] = {
        closeText: 'Fermer',
        prevText: 'Précédent',
        nextText: 'Suivant',
        currentText: 'Aujourd\'hui',
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['janv.', 'févr.', 'mars', 'avril', 'mai', 'juin',
            'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'],
        dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
        dayNamesShort: ['dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.'],
        dayNamesMin: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
        weekHeader: 'Sem.',
        dateFormat: 'dd/mm/yy',
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ''
    };
    datepicker.setDefaults(datepicker.regional['fr']);
    return datepicker.regional['fr'];
}));