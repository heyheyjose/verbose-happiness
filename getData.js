var getData = {
    photoObjToURL: function(photoObj) {
        return [ 'https://farm',
            photoObj.farm, '.staticflickr.com/',
            photoObj.server, '/',
            photoObj.id, '_',
            photoObj.secret, '_b.jpg'
        ].join('');
    },
    transformPhotoObj: function(photoObj) {
        return {
            title: photoObj.title,
            url: getData.photoObjToURL(photoObj)
        };
    },
    getFlickrData: function(apiKey, fetch) {
        if ((!fetch) && (typeof jQuery !== 'undefined')) {
            fetch = jQuery.getJSON.bind(jQuery);
        }
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
            apiKey + '&text=travel+spain&safe_search=1&format=json&nojsoncallback=1';

        return fetch(url);
    },
    getPhotosThenMap: function(apiKey, fetch) {
        return getData.getFlickrData(apiKey, fetch)
        .then(function(data) {
            return data.photos.photo.map(getData.transformPhotoObj);
        });
    }
};

if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = getData;
}
