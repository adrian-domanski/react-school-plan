$(document).ready(function () {
    $('#right').tabSlideOut({
        tabLocation: 'right',
        offsetReverse: true,
        handleOffsetReverse: true,
        imageHeight: '500px',
        imageWidth: '500px',
        clickScreenToCloseFilters: [
            'button', // ignore button clicks
            function (event) { // custom filter
                // filters need to return true to filter out the click passed in the parameter
                return $('#keepTabOpen').is(':checked');
            }
        ]
    });
});




