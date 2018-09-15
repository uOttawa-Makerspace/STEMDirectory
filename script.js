"use strict";

$(document).ready(function () {
    // navigation buttons
    $('.location-btn').on('click', function () {
        var targetName = $(this).data('target');

        $('.directions, .bg, .text').css('display', 'none');

        $('#' + targetName + '-path').css('display', 'block');
        $('#' + targetName + '-bg').css('display', 'block');
        $('#' + targetName + '-text').css('display', 'block');
    });

    // news marquee
    $.get('assets/data/news.json').done(function (data) {
        var $news = $('#news');

        for (var i = 0; i < data["news"].length; i++)
            $news.append('<span class="item">' + data["news"][i] + '</span>');

        $news.marquee({duration: 20000});
    });
});