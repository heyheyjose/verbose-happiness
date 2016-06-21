getData.getPhotosThenMap('<--api key here-->')
.then(displayData.mapPhotoListToHTML)
.then(function(photosHTML) {
    displayData.addPhotosToDOM($, '#mydiv', photosHTML);
});
