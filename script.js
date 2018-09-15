"use strict";

$(document).ready(function () {
    var config = {};

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

    // navigation buttons
    $('.location-btn').on('click', function () {
        var targetName = $(this).data('target');

        $('.directions, .bg, .text').css('display', 'none');
        $('.main-navigation').css('display', 'none');

        $('#' + targetName + '-path').css('display', 'block');
        $('#' + targetName + '-bg').css('display', 'block');
        $('#' + targetName + '-text').css('display', 'block');

        $('.ceed-space-info .name').text(config["info"][targetName]["name"]);
        $('.ceed-space-info .description').text(config["info"][targetName]["description"]);
        $('.ceed-space-info').css('display', 'block');
    });

    $('.sidebar .back-btn').on('click', function () {
        $('.ceed-space-info').css('display', 'none');
        $('.directions, .bg').css('display', 'none');

        $('.main-navigation').css('display', 'block');
        $('.text').css('display', 'block');
    });

    // news marquee
    $.get('assets/data/news.json').done(function (data) {
        var $news = $('#news');

        for (var i = 0; i < data["news"].length; i++)
            $news.append('<span class="item">' + data["news"][i] + '</span>');

        $news.marquee({duration: 20000});
    });

    $.get('config.json').done(function (data) {
        config = data;
        getWeather();
    });

    setTime();
});