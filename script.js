"use strict";

$(document).ready(function () {
    var config = {};
    var timer = null;

    var info = {
        "makerspace": {
            "name_en": "Richard l'Abbé Makerspace",
            "name_fr": "Atelier Richard l'Abbé",
            "description_en": "Invent, build and play at the Richard L’Abbé Makerspace. It’s equipped with 3D printers, Arduinos, laser cutters and much more. A student-run space, it allows everyone to collaborate and build their dream projects for free!",
            "description_fr": "Si vous aimez inventer, construire et jouer, l’atelier Makerspace Richard-L’Abbé est fait pour vous. Vous y trouverez un équipement varié : imprimantes 3D, module Arduinos, découpeurs au laser, et bien d’autres instruments de pointe. Cet emplacement, géré par des étudiants, vous permet de concrétiser gratuitement et en collaboration vos projets rêvés!"
        },
        "makerlab1": {
            "name_en": "Makerlab",
            "name_fr": "Makerlab",
            "description_en": "The uOttawa Makerlab offers a course-based laboratory setting focused on rapid prototyping technologies. University courses can include lab sessions at the Makerlab to give students a structured experience learning about many of the technologies available at the Richard L’Abbé Makerspace.",
            "description_fr": "Le Makerlab de l’Université d’Ottawa est un laboratoire axé sur les technologies à prototype rapide. Certains cours comportent des séances au Makerlab afin de procurer aux étudiants une expérience d’apprentissage structurée, au cours de laquelle ils utilisent un nombre de technologies offertes à l’Atelier Makerspace Richard-L’Abbé."
        },
        "makerlab2": {
            "name_en": "Makerlab",
            "name_fr": "Makerlab",
            "description_en": "The uOttawa Makerlab offers a course-based laboratory setting focused on rapid prototyping technologies. University courses can include lab sessions at the Makerlab to give students a structured experience learning about many of the technologies available at the Richard L’Abbé Makerspace.",
            "description_fr": "Le Makerlab de l’Université d’Ottawa est un laboratoire axé sur les technologies à prototype rapide. Certains cours comportent des séances au Makerlab afin de procurer aux étudiants une expérience d’apprentissage structurée, au cours de laquelle ils utilisent un nombre de technologies offertes à l’Atelier Makerspace Richard-L’Abbé."
        },
        "mtc": {
            "name_en": "Manufacturing Training Centre",
            "name_fr": "Centre de formation en fabrication",
            "description_en": "The Manufacturing Training Centre (MTC) provides training on a variety of traditional equipment, such as lathes, milling machines and saws, as well as on the latest processes, such as additive manufacturing. Students can register for free workshops throughout the year.",
            "description_fr": "Le Centre offre une formation sur de nombreux équipements traditionnels, tels que des tours, des fraiseuses et des scies, ainsi que sur des processus de pointe, comme la fabrication additive. Les étudiants peuvent s’inscrire gratuitement aux ateliers, toute l’année."
        },
        "brunsfield": {
            "name_en": "Brunsfield Centre",
            "name_fr": "Centre Brunsfield",
            "description_en": "The Brunsfield Centre is a shared space open to Engineering undergraduate and graduate students, Faculty and Staff at the Faculty of Engineering. The Centre is also available to engineering students working on projects leading to start-ups, engaged in student competitions or entrepreneurial activities!",
            "description_fr": "Le Centre Brunsfield est un espace partagé ouvert aux étudiants inscrits à un programme de génie du premier cycle ou des cycles supérieurs, aux membres du corps professoral et au personnel de la Faculté de génie. Le Centre est également mis à la disposition des étudiants en génie qui participent soit à des projets menant au démarrage d’entreprises, à des concours pour étudiants ou à des activités liées à l’entrepreneuriat!"
        },
        "jmts": {
            "name_en": "John McEntyre Team Space",
            "name_fr": "Espace de collaboration John McEntyre",
            "description_en": "The John McEntyre Team Space (JMTS) at the Faculty of Engineering is a collaborative space that provides precompetitive teams involved in large-scale projects with the space and infrastructure required to push technological and mechanical boundaries, promote the development of skills and expertise and strive for success.",
            "description_fr": "L’Espace de collaboration John McEntyre (ECJM) de la Faculté de génie est un espace de collaboration où les étudiants en génie participant à des concours de niveau préprofessionnels peuvent travailler sur des projets à grande échelle. Ces équipes représentent l’Université dans le cadre de divers concours internationaux."
        },
        "sndc": {
            "name_en": "Simon Nehme Design Commons",
            "name_fr": "Espace de conception Simon Nehme",
            "description_en": "The Simon Nehme Design Commons is a collaborative space, covered with whiteboards, where student teams can pool talent, brainstorm and develop creative ideas.",
            "description_fr": "L’Espace de conception Simon-Nehme est un espace collaboratif, recouvert de tableaux blancs, où des groupes d'étudiants peuvent mettre en commun leurs talents, réfléchir et développer des idées créatives."
        }
    };

    // weather
    function getWeather() {
        var options = {
            "appid": config["weather"]["appid"],
            "lat": config["weather"]["latitude"],
            "lon": config["weather"]["longitude"]
        };

        $.get('https://api.openweathermap.org/data/2.5/weather?' + $.param(options)).done(function (data) {
            var weather = data["weather"][0];
            var icon = iconFromWeatherCode(weather["id"], data["sys"]["sunrise"], data["sys"]["sunset"]);

            $(".weather").html('<i class="wi wi-' + icon + '"></i>')
        });

        setTimeout(getWeather, 15 * 60 * 1000); // 15 minutes
    }

    function iconFromWeatherCode(code, sunrise, sunset) {
        var unix = Date.now() / 1000;
        var isDaytime = unix > sunrise && unix < sunset;
        var prefix = isDaytime ? "day-" : "night-alt-";

        switch (code) {
            case 200: // thunderstorm with light rain
            case 201: // thunderstorm with rain
            case 202: // thunderstorm with heavy rain
            case 210: // light thunderstorm
            case 211: // thunderstorm
            case 212: // heavy thunderstorm
                return prefix + "thunderstorm";
            case 221: // ragged thunderstorm
            case 230: // thunderstorm with light drizzle
            case 231: // thunderstorm with drizzle
            case 232: // thunderstorm with heavy drizzle
                return prefix + "storm-showers";
            case 300: // light intensity drizzle
            case 301: // drizzle
            case 302: // heavy intensity drizzle
                return prefix + "sprinkle";
            case 310: // light intensity drizzle rain
            case 311: // drizzle rain
            case 312: // heavy intensity drizzle rain
            case 313: // shower rain and drizzle
            case 314: // heavy shower rain and drizzle
            case 321: // shower drizzle
                return prefix + "showers";
            case 500: // light rain
            case 501: // moderate rain
            case 502: // heavy intensity rain
            case 503: // very heavy rain
            case 504: // extreme rain
                return prefix + "rain";
            case 511: // freezing rain
                return prefix + "hail";
            case 520: // light intensity shower rain
            case 521: // shower rain
            case 522: // heavy intensity shower rain
            case 531: // ragged shower rain
                return prefix + "rain";
            case 600: // light snow
            case 601: // snow
            case 602: // heavy snow
                return prefix + "snow";
            case 611: // sleet
            case 612: // shower sleet
                return prefix + "sleet";
            case 615: // light rain and snow
            case 616: // rain and snow
            case 620: // light shower snow
            case 621: // shower snow
            case 622: // heavy shower snow
                return prefix + "snow";
            case 701: // mist
                return isDaytime ? "day-fog" : "night-fog";
            case 711: // smoke
                return "smoke";
            case 721: // haze
                return isDaytime ? "day-haze" : "night-fog";
            case 731: // sand, dust whirls
                return "sandstorm"; // darude
            case 741: // fog
                return isDaytime ? "day-fog" : "night-fog";
            case 751: // sand
            case 761: // dust
                return "dust";
            case 762: // volcanic ash
                return "volcano";
            case 771: // squalls
                return "strong-wind";
            case 781: // tornado
                return "tornado";
            case 800: // clear sky
                return isDaytime ? "day-sunny" : "night-clear";
            case 801: // few clouds
            case 802: // scattered clouds
            case 803: // broken clouds
                return isDaytime ? "day-sunny-overcast" : "night-alt-partly-cloudy";
            case 804: // overcast clouds
                return prefix + "cloudy";
        }

        return "na";
    }

    function setTime() {
        var time = new Date();

        var hrs = time.getHours().toString();
        var mins = time.getMinutes().toString();
        var secs = time.getSeconds().toString();

        var timeStr = hrs.padStart(2, '0') + ":" + mins.padStart(2, '0') + ":" + secs.padStart(2, '0');

        $('.time').text(timeStr);

        setTimeout(setTime, 1000);
    }

    function showOverlay() {
        $(".overlay").fadeIn(1000);
    }

    function backToMainNavigation() {
        $('.ceed-space-info').css('display', 'none');
        $('.directions, .bg').css('opacity', 0);

        $('.main-navigation').css('display', 'block');
        $('.text').css('opacity', 1);
    }

    // navigation buttons
    $('.location-btn').on('click', function () {
        var targetName = $(this).data('target');

        $('.directions, .bg, .text').css('opacity', 0);
        $('.main-navigation').css('display', 'none');

        $('#' + targetName + '-path').css('opacity', 1);
        $('#' + targetName + '-bg').css('opacity', 1);
        $('#' + targetName + '-text, #' + targetName + '-text-en, #' + targetName + '-text-fr').css('opacity', 1);

        $('.ceed-space-info .name.en').text(info[targetName]["name_en"]);
        $('.ceed-space-info .name.fr').text(info[targetName]["name_fr"]);
        $('.ceed-space-info .description.en').text(info[targetName]["description_en"]);
        $('.ceed-space-info .description.fr').text(info[targetName]["description_fr"]);
        $('.ceed-space-info').css('display', 'block');
    });

    $('.sidebar .back-btn').on('click', function () {
        backToMainNavigation();
    });

    // news marquee
    $.get('assets/data/news.json').done(function (data) {
        var $news = $('#news');

        for (var i = 0; i < data["news"].length; i++)
            $news.append('<span class="item">' + data["news"][i] + '</span>');

        $news.marquee({duration: 20000});
    });

    $(".overlay").on("click", function () {
        backToMainNavigation();
        $(".overlay").fadeOut(1000);
    });

    $(".language-switch").on("click", function () {
        var target = $(this).data("target");

        if (target === "en") {
            $(".fr").css("display", "none");
            $(".en").css("display", "block");
        } else if (target === "fr") {
            $(".en").css("display", "none");
            $(".fr").css("display", "block");
        }
    });

    $(".fr").css("display", "none");

    $(document).on("click", function () {
        if (timer !== null)
            clearTimeout(timer);

        timer = setTimeout(showOverlay, 30 * 1000); // 30s

        return false;
    });

    $.get('config.json').done(function (data) {
        config = data;
        getWeather();
    });

    setTime();
});