$(document).ready(function () {
    $('.location-btn').on('click', function () {
        var targetName = $(this).data('target');

        $('.directions, .bg, .text').css('display', 'none');

        $('#' + targetName + '-path').css('display', 'block');
        $('#' + targetName + '-bg').css('display', 'block');
        $('#' + targetName + '-text').css('display', 'block');
    });
});