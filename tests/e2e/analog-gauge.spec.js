'use strict';
/*global browser, element, by*/
describe('Analog gauges demo', function () {
    var gauges,
        indicators,
        input;

    function getRotateInDegrees(styleAttributeValue) {
        var rotate = styleAttributeValue.match(/rotate\([\-]?([0-9]{0,3})deg\)/);
        if (rotate !== null) {
            return parseInt(rotate[0].match(/-?[0-9]\d*(\.\d+)?/)[0]);
        }
        return null;
    }

    function getTransformOrigin(styleAttributeValue) {
        var transformOrigin = styleAttributeValue.match(/(?:transform-origin:\s)(((\d+)(?:px.)){0,3})/)[1].split('px');
        return transformOrigin;
    }

    beforeEach(function () {
        browser.get('http://localhost:3000/test/analog-gauges-demo.html');
        gauges = element.all(by.css('.analog-gauge')),
        indicators = element.all(by.css('#indicator')),
        input = element(by.css('#valueInput'));
        expect(input.getAttribute('value')).toEqual('');
    });

    it('should contains 5 analog gauges with 5 indicators', function () {
        expect(gauges.count()).toEqual(5);
        expect(indicators.count()).toEqual(5);
    })

    it('should not rotate indicator when valueInput is empty', function () {
        indicators.each(function (indicator, index) {
            indicator.getAttribute('style').then(function (value) {
                expect(getRotateInDegrees(value)).toEqual(null);
            });
        });
    });

    it('should move gauges into right position', function () {
        gauges.each(function (gauge, index) {
            var actualX = 0,
                actualY = 0;
            gauge.getLocation().then(function(location) {
                actualX = location.x - 8 - 5; // body margin (8px) + gauge's circle left padding (5px) 
                actualY = location.y - 8 - 26; // body margin (8px) + gauge's circle top padding (26px)
            });
            gauge.getAttribute('transform').then(function (transform) {
                gauge.getAttribute('data-x').then(function (x) {
                    var expectedX = 0;
                    if (x !== null) {
                        expectedX = parseInt(x);
                    }
                    expect(expectedX).toEqual(actualX);
                });
                gauge.getAttribute('data-y').then(function (y) {
                    var expectedY = 0;
                    if (y !== null) {
                        expectedY = parseInt(y);
                    }
                    expect(expectedY).toEqual(actualY);
                });
            });
        });
    });

    describe('Indicator', function () {

        function checkIndicatorsRotates(expectedRotates) {
            indicators.each(function (indicator, index) {
                indicator.getAttribute('style').then(function (value) {
                    expect(getRotateInDegrees(value)).toEqual(expectedRotates[index]);
                });
            });
        }

        it('should has got right transform origin paramter', function () {
            indicators.each(function (indicator, index) {
                indicator.getAttribute('style').then(function (value) {
                    var transformOrigin = getTransformOrigin(value);
                    expect(parseInt(transformOrigin[0])).toEqual(100);
                    expect(parseInt(transformOrigin[1])).toEqual(100);
                    expect(parseInt(transformOrigin[2])).toEqual(0);
                });
            });
        });

        it('should point 0 when input\'s value is equal to 0', function () {
            var expectedRotates = [-120, 0, 120, 0, 45];
            input.sendKeys('0');
            browser.sleep(250);
            checkIndicatorsRotates(expectedRotates);
        });

        it('should point proper value from gauge range', function () {
            var expectedRotates = [0, 60, 0, -60, 90];
            input.sendKeys('50');
            browser.sleep(250);
            checkIndicatorsRotates(expectedRotates);
        });

        it('should point maximum gauge value when input\'s value is bigger than max-value', function () {
            var expectedRotates = [120, 120, -120, -120, 135];
            input.sendKeys('200');
            browser.sleep(250);
            checkIndicatorsRotates(expectedRotates);
        });

        it('should point minimum gauge value when input\'s value is lower than min-value', function () {
            var expectedRotates = [-120, -120, 120, 120, 45];
            input.sendKeys('-200');
            browser.sleep(250);
            checkIndicatorsRotates(expectedRotates);
        });

        it('should proper handle minumum and maximum values', function () {
            var expectedRotatesAt50 = [0, 60, 0, -60, 90],
                expectedRotatesAt200 = [120, 120, -120, -120, 135],
                expectedRotatesAtMinus200 = [-120, -120, 120, 120, 45];
            input.sendKeys('50');
            browser.sleep(250);
            checkIndicatorsRotates(expectedRotatesAt50);
            input.clear().sendKeys('200');
            browser.sleep(250);
            checkIndicatorsRotates(expectedRotatesAt200);
            input.clear().sendKeys('-200');
            browser.sleep(250);
            checkIndicatorsRotates(expectedRotatesAtMinus200);
        })
    });
});
