function test() {
    $.ajax({
        type: "GET",
        url: "asdf/OnboardingSet",
        contentType: "application/json",
        data: {
            id: 1
        }
    }).then(function (data) {
        var onboarding = JSON.parse(data);
        console.log(onboarding);
        console.log(onboarding.id);
        $('.onboarding-id').append(onboarding.id);
        $('.onboarding-content').append(onboarding.content);
    });
}

$(document).ready(function () {


});