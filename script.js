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
        var star = "\240\240\240\240\240\u2605\240\240\240\240\240";
        var news = data["news"].join(star);

        $news.append(star + news + star);
        $news.marquee({duration: 15000});
    });
});