var speechBubbleHTML = "<div class='speech_bubble_div'><div class='speech_bubble'></div></div>";

var onboardings = [];

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

        ret.onboardings.sort(function(a, b) {
            return a.order - b.order;
        });

        // ret.onboardings.forEach(function(element) {
        //     console.log(element);
        // });

        onboardings = ret.onboardings;
        jQuery('body').append(speechBubbleHTML);
        displayOnboarding(0);
    });
}

function displayOnboarding(index) {

    console.log(index);
    var element = onboardings[index];


    jQuery('.speech_bubble_div').css('width', '100%');
    jQuery('.speech_bubble_div').css('height', '100%');
    jQuery('.speech_bubble_div').css('position', 'absolute');
    //jQuery('.speech_bubble_div').css('pointer-events', 'none');
    jQuery('.speech_bubble_div').css('z-index', '5000');
    jQuery('.speech_bubble_div').css('display', 'block');
    jQuery('.speech_bubble_div').css('background-color', 'rgba(0, 0, 0, 0.4)');
    jQuery('.speech_bubble_div').css('margin', '0');
    jQuery('.speech_bubble_div').css('top', '0');
    jQuery('.speech_bubble_div').css('left', '0');


    if (element.type == 'Sequence') {

        //jQuery('.speech_bubble_div').remove();
        //

        jQuery('.speech_bubble_div').find("img").remove();
        jQuery('.speech_bubble_div').css('margin-top', '4px');

        var found_div = jQuery(document).contents().find(element['selector'] + ':eq(' + element['index'] + ')');
        //found_div.css('border', '2px solid black');
        //jQuery('body').append("<div class='speech_bubble'></div>");

        var offset = found_div.offset();
        console.log(found_div);

        console.log($('.speech_bubble'));
        jQuery('.speech_bubble').css('display', 'block');

        var height = jQuery('.speech_bubble').outerHeight();

        console.log(offset);
        jQuery('.speech_bubble').css('top', offset['top'] - height + 'px');
        jQuery('.speech_bubble').css('left', offset['left'] + 'px');


        //offset['top'] += jQuery('#iframe').position()['top'];
        //offset['left'] += jQuery('#iframe').position()['left'];
        //var scrollTop = jQuery('#iframe').contents().scrollTop();
        //var scrollLeft = jQuery('#iframe').contents().scrollLeft();


        jQuery('.speech_bubble').text(element['content']);

    } else if (element.type == 'Swipe') {

        jQuery('.speech_bubble').css('display', 'none');

        var img = jQuery("<img src='" + element['image_url'] + "'>");
        img.css('width', '100%');
        jQuery('.speech_bubble_div').append(img);
    }

    jQuery('.speech_bubble_div').append('<button name="close" class="close_button">X</button>');

    var bubbleOffset = jQuery('.speech_bubble').offset();
    jQuery('.close_button').css('background-color', 'white');


    jQuery('.close_button').css('position', 'absolute');
    jQuery('.close_button').css('top', bubbleOffset.top + 3);
    jQuery('.close_button').css('height', 20);
    jQuery('.close_button').css('width', 20);

    if (element.type == "Sequence") {
        jQuery('.close_button').css('left', bubbleOffset.left + 103);
    }

    if (element.type == 'Swipe') {
        jQuery('.close_button').css('left', 350);
    }

    jQuery('.close_button').on('click', function() {
        jQuery('.speech_bubble_div').remove();
    });

    if (onboardings[index + 1]) {
        jQuery('.speech_bubble_div').append('<button name="next" class="next_button">Next</button>');

        jQuery('.next_button').css('background-color', 'white');

        jQuery('.next_button').css('position', 'absolute');
        jQuery('.next_button').css('top', bubbleOffset.top + 50);
        jQuery('.next_button').css('left', bubbleOffset.left + 88);
        if (element.type == 'Swipe') {
            jQuery('.next_button').css('padding', 5);

            jQuery('.next_button').css('top', 580);
            jQuery('.next_button').css('left', 330);
        }

        //jQuery('.speech_bubble').addClass('next_button');

        jQuery('.next_button').on('click', function() {
            jQuery('.speech_bubble').remove();
            console.log(jQuery('.speech_bubble'));
            jQuery('body').append(speechBubbleHTML);
            jQuery('.next_button').remove();
            displayOnboarding(index + 1);
        });
    }
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

        console.log(window.location.pathname.replace("/", ""));

        fetchOnboardings(window.location.pathname.replace("/", ""));
    }

});