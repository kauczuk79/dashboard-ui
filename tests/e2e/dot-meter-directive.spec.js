'use strict';
/*global browser, element, by, describe, beforeEach, expect, it*/
describe('Dot meter demo', function () {
	var input,
		dotMeters;

	function getDisplayedDots(dotMeter) {
		return dotMeter.all(by.css('[id^=dot]')).filter(function (element, index) {
			return element.isDisplayed();
		});
	}
	beforeEach(function () {
        browser.get('http://localhost:3000/test/dot-meter-demo.html');
		input = element(by.css('input[type="number"]'));
		dotMeters = element.all(by.css('svg .dot-meter'));
	});

	it('should contains 4 bar meters', function () {
		expect(dotMeters.count()).toEqual(4);
	});

	describe('Dots', function () {
		it('should points 0 when input is empty', function () {
			var expectedDotsCount = [0, 7, 0, 0];
			dotMeters.each(function (dotMeter, indexOfDotMeter) {
				expect(getDisplayedDots(dotMeter).count()).toEqual(expectedDotsCount[indexOfDotMeter]);
			});
		});

		it('should points proper positive value when value is from given range', function () {
			var expectedDotsCount = [10, 9, 5, 10];
			input.sendKeys('10');
			dotMeters.each(function (dotMeter, indexOfDotMeter) {
				expect(getDisplayedDots(dotMeter).count()).toEqual(expectedDotsCount[indexOfDotMeter]);
			});
		});

		it('should points proper negative value when value is from given range', function () {
			var expectedDotsCount = [0, 5, 0, 0];
			input.sendKeys('-10');
			dotMeters.each(function (dotMeter, indexOfDotMeter) {
				expect(getDisplayedDots(dotMeter).count()).toEqual(expectedDotsCount[indexOfDotMeter]);
			});
		});

		it('should points max value when value is bigger than max-value', function () {
			var expectedDotsCount = [15, 13, 13, 59];
			input.sendKeys('380');
			dotMeters.each(function (dotMeter, indexOfDotMeter) {
				expect(getDisplayedDots(dotMeter).count()).toEqual(expectedDotsCount[indexOfDotMeter]);
			});
		});

		it('should points min value when value is lower than min-value', function () {
			var expectedDotsCount = [0,1,0,0];
			input.sendKeys('-50');
			dotMeters.each(function (dotMeter, indexOfDotMeter) {
				expect(getDisplayedDots(dotMeter).count()).toEqual(expectedDotsCount[indexOfDotMeter]);
			});
		});
	});
});