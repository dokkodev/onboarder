var speechBubbleHTML = "<div class='speech_bubble_div'><div class=\"speech_bubble\"></div></div>";

function fetchOnboardings(url) {
    jQuery.ajax({
        type: "GET",
        url: "onboarder/OnboardingSet",
        contentType: "application/json",
        data: {
            url: url
        }
    }).then(function (data) {

        var ret = JSON.parse(data);

        ret.onboardings.forEach(function(element) {
            console.log(element);

            if (element.type == 'Sequence') {

                jQuery('body').append(speechBubbleHTML);

                jQuery('.speech_bubble_div').find("img").remove();
                jQuery('.speech_bubble_div').css('margin-top', '4px');
                jQuery('.speech_bubble').css('display', 'block');

                var found_div = jQuery(document).contents().find(element['selector'] + ':eq(' + element['index'] + ')');
                found_div.css('background-color', 'red');

                console.log(found_div);

                var offset = found_div.offset();
                //offset['top'] += jQuery('#iframe').position()['top'];
                //offset['left'] += jQuery('#iframe').position()['left'];
                //var scrollTop = jQuery('#iframe').contents().scrollTop();
                //var scrollLeft = jQuery('#iframe').contents().scrollLeft();

                var height = jQuery('.speech_bubble').outerHeight();

                jQuery('.speech_bubble').css('top', offset['top'] - height - 10 + 'px');
                jQuery('.speech_bubble').css('left', offset['left'] + 'px');

                jQuery('.speech_bubble').text(element['content']);
            }
        });
    });
}


function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}

jQuery(document).ready(function () {

    if (!inIframe()) {
        fetchOnboardings('naver.html');
    }

});