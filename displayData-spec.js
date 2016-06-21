var expect = require('chai').expect;
var displayDataModule = require('./displayData');
var cheerio = require('cheerio');

describe('displayDataModule', function() {
    it('should exist', function() {
        expect(displayDataModule).to.not.be.undefined;
    });
});

describe('#photoToListItem()', function() {
    it('should take a photo object and return a list item string', function() {
        var input = {
            title: 'This is a test',
            url: 'http://loremflickr.com/960/593'
        };
        var expected = '<li><figure><img src="http://loremflickr.com/960/593" alt=""/>'
            + '<figcaption>This is a test</figcaption></figure></li>';

        expect(displayDataModule.photoToListItem(input)).to.equal(expected);

        input = {
            title: 'This is another test',
            url: 'http://loremflickr.com/960/593/puppy'
        };
        expected = '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>'
            + '<figcaption>This is another test</figcaption></figure></li>';

        expect(displayDataModule.photoToListItem(input)).to.equal(expected);
    });
});

describe('#mapPhotoListToHTML()', function() {
    it('should take an array of photo objects and convert them to an HTML list', function() {
        var input = [
            {
                title: 'This is a test',
                url: 'http://loremflickr.com/960/593'
            },
            {
                title: 'This is another test',
                url: 'http://loremflickr.com/960/593/puppy'
            }
        ];
        var expected = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>'
            + '<figcaption>This is a test</figcaption></figure></li>'
            + '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>'
            + '<figcaption>This is another test</figcaption></figure></li></ul>';

        expect(displayDataModule.mapPhotoListToHTML(input)).to.equal(expected);
    });
});

describe('#addPhotosToDOM()', function() {
    it('should take an HTML string of list items and add them to an element with a given selector', function() {
        var $ = cheerio.load(`
            <html>
                <head></head>
                <body>
                    <div id="mydiv"></div>
                </body>
            </html>
        `);
        var list = '<ul><li><figure><img src="http://loremflickr.com/960/593" alt=""/>'
            + '<figcaption>This is a test</figcaption></figure></li>'
            + '<li><figure><img src="http://loremflickr.com/960/593/puppy" alt=""/>'
            + '<figcaption>This is another test</figcaption></figure></li></ul>';
        var selector = '#mydiv';
        var $div = displayDataModule.addPhotosToDOM($, selector, list);

        expect($div.find('ul').length).to.equal(1);
        expect($div.find('li').length).to.equal(2);
        expect($div.find('figure').length).to.equal(2);
        expect($div.find('img').length).to.equal(2);
        expect($div.find('figcaption').length).to.equal(2);
    });
});
