var expect = require('chai').expect;
var getDataModule = require('./getData');

describe('getDataModule', function() {
    it('should exist', function() {
        expect(getDataModule).to.not.be.undefined;
    });
});

describe('#photoObjToURL()', function() {
    it('should take a photo object from Flickr and return a string', function() {
        var input = {
            id: '24770505034',
            owner: '97248275@N03',
            secret: '31a9986429',
            server: '1577',
            farm: 2,
            title: '20160229090898',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        };
        var expected = 'https://farm2.staticflickr.com/1577/24770505034_31a9986429_b.jpg';
        var actual = getDataModule.photoObjToURL(input);

        expect(actual).to.eql(expected);

        input = {
            id: '24770504484',
            owner: '97248275@N03',
            secret: '69dd90d5dd',
            server: '1451',
            farm: 2,
            title: '20160229090903',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        };
        expected = 'https://farm2.staticflickr.com/1451/24770504484_69dd90d5dd_b.jpg';
        actual = getDataModule.photoObjToURL(input);

        expect(actual).to.eql(expected);
    });
});

describe('#transformPhotoObj()', function() {
    it('should take a photo object and return an object with just title and URL', function() {
        var input = {
            id: '25373736106',
            owner: '99117316@N03',
            secret: '146731fcb7',
            server: '1669',
            farm: 2,
            title: 'Dog goes to desperate measure to avoid walking on a leash',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        },
        expected = {
            title: 'Dog goes to desperate measure to avoid walking on a leash',
            url: 'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
        },
        actual = getDataModule.transformPhotoObj(input);

        expect(actual).to.eql(expected);

        input = {
            id: '24765033584',
            owner: '27294864@N02',
            secret: '3c190c104e',
            server: '1514',
            farm: 2,
            title: 'the other cate',
            ispublic: 1,
            isfriend: 0,
            isfamily: 0
        };
        expected = {
            title: 'the other cate',
            url: 'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg'
        };
        actual = getDataModule.transformPhotoObj(input);

        expect(actual).to.eql(expected);
    });
});

describe('#getFlickrData()', function() {
    it('should take an API key and fetcher function argument and return a promise for JSON data', function() {
        var apiKey = 'this does not matter right now';
        var fakeData = {
            'photos': {
                'page':    1,
                'pages':   2872,
                'perpage': 100,
                'total':   '287170',
                'photo': [
                    {
                        'id':       '24770505034',
                        'owner':    '97248275@N03',
                        'secret':   '31a9986429',
                        'server':   '1577',
                        'farm':     2,
                        'title':    '20160229090898',
                        'ispublic': 1,
                        'isfriend': 0,
                        'isfamily': 0
                    },
                    {
                        'id':       '24770504484',
                        'owner':    '97248275@N03',
                        'secret':   '69dd90d5dd',
                        'server':   '1451',
                        'farm':     2,
                        'title':    '20160229090903',
                        'ispublic': 1,
                        'isfriend': 0,
                        'isfamily': 0
                    },
                    {
                        'id':       '24774253743',
                        'owner':    '134129189@N02',
                        'secret':   'ea9323735c',
                        'server':   '1672',
                        'farm':     2,
                        'title':    'VjIQXmFAOao',
                        'ispublic': 1,
                        'isfriend': 0,
                        'isfamily': 0
                    }
                ]
            }
        };
        var fakeFetcher = function(url) {
            var expectedURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
                apiKey + '&text=travel+spain&safe_search=1&format=json&nojsoncallback=1';

            expect(url).to.equal(expectedURL);
            return Promise.resolve(fakeData);
        };

        return getDataModule.getFlickrData(apiKey, fakeFetcher)
        .then(function(actual) {
            expect(actual).to.eql(fakeData);
        });
    });
});

describe('#getPhotosThenMap()', function() {
    it('should take an API key and fetcher function, and return a promise for transformed photos', function() {
        var apiKey = 'does not matter what this is right now';
        var expected = [
            {
                title: 'Dog goes to desperate measure to avoid walking on a leash',
                url:   'https://farm2.staticflickr.com/1669/25373736106_146731fcb7_b.jpg'
            },
            {
                title: 'the other cate',
                url:   'https://farm2.staticflickr.com/1514/24765033584_3c190c104e_b.jpg'
            }
        ];
        var fakeData = {
            'photos': {
                'page': 1,
                'pages': 2872,
                'perpage': 100,
                'total': '287170',
                'photo': [
                    {
                        id:       '25373736106',
                        owner:    '99117316@N03',
                        secret:   '146731fcb7',
                        server:   '1669',
                        farm:     2,
                        title:    'Dog goes to desperate measure to avoid walking on a leash',
                        ispublic: 1,
                        isfriend: 0,
                        isfamily: 0
                    },
                    {
                        id:       '24765033584',
                        owner:    '27294864@N02',
                        secret:   '3c190c104e',
                        server:   '1514',
                        farm:     2,
                        title:    'the other cate',
                        ispublic: 1,
                        isfriend: 0,
                        isfamily: 0
                    }
                ]
            }
        };
        var fakeFetcher = function(url) {
            var expectedURL = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' +
                apiKey + '&text=travel+spain&safe_search=1&format=json&nojsoncallback=1';

            expect(url).to.equal(expectedURL);
            return Promise.resolve(fakeData);
        };

        return getDataModule.getPhotosThenMap(apiKey, fakeFetcher)
        .then(function(actual) {
            expect(actual).to.eql(expected);
        });
    });
});
