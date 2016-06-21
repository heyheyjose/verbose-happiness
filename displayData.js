var displayData = {
    photoToListItem: function(photo) {
        return [
            '<li><figure><img src="',
            photo.url, '" alt=""/>',
            '<figcaption>',
            photo.title,
            '</figcaption></figure></li>'
        ].join('');
    },
    mapPhotoListToHTML: function(listItems) {
        return '<ul>' + listItems.map(displayData.photoToListItem).join('') + '</ul>';
    },
    addPhotosToDOM: function($, selector, list) {
        return $(selector).append(list);
    }
};

if ((typeof module !== 'undefined') && (typeof module.exports !== 'undefined')) {
    module.exports = displayData;
}
