'use strict';
/*global browser, element, by, describe, beforeEach, expect, it*/
describe('Bar meter demo', function () {
	var input,
		meters,
		bars;
	beforeEach(function () {
        browser.get('http://localhost:3000/test/bar-meter-demo.html');
		input = element(by.css('input[type="number"]'));
		meters = element.all(by.css('svg .bar-meter'));
		bars = element.all(by.css('svg .bar-meter #bar'));
	});

	it('should contains 6 bar meters', function () {
		expect(meters.count()).toEqual(6);
	});

	it('should have proper orientation', function () {
		var expectedOrientations = [null, null, null, 'true', 'true', 'true'];
		meters.each(function (meter, indexOfMeter) {
			expect(meter.getAttribute('data-vertical')).toEqual(expectedOrientations[indexOfMeter]);
			meter.getSize().then(function (size) {
				var vertical = Boolean(expectedOrientations[indexOfMeter]);
				if (vertical) {
					expect(size.width).toBeLessThan(size.height);
				} else {
					expect(size.height).toBeLessThan(size.width);
				}
			});
		});
	});

	describe('Indicator', function () {
		
		beforeEach(function() {
			browser.sleep(250); //wait for animation to be finished
		});

		it('should points 0 when input is empty', function () {
			var expectedX = [10, 100, 55, 5, 5, 5],
				expectedY = [5, 5, 5, 190, 100, 145],
				expectedWidths = [0, 0, 0, 30, 30, 30],
				expectedHeights = [30, 30, 30, 0, 0, 0];
			bars.each(function (bar, indexOfBar) {
				bar.getAttribute('x').then(function (x) {
					expect(parseInt(x)).toEqual(expectedX[indexOfBar]);
				});
				bar.getAttribute('y').then(function (y) {
					expect(parseInt(y)).toEqual(expectedY[indexOfBar]);
				});
				bar.getSize().then(function (size) {
					expect(size.width).toEqual(expectedWidths[indexOfBar]);
					expect(size.height).toEqual(expectedHeights[indexOfBar]);
				});
			});
		});

		it('should points proper positive value when value is from given range', function () {
			var expectedX = [10, 100, 55, 5, 5, 5],
				expectedY = [5, 5, 5, 100, 55, 100],
				expectedWidths = [90, 45, 45, 30, 30, 30],
				expectedHeights = [30, 30, 30, 90, 45, 45];
			input.sendKeys('25');
			browser.sleep(250);
			bars.each(function (bar, indexOfBar) {
				bar.getAttribute('x').then(function (x) {
					expect(parseInt(x)).toEqual(expectedX[indexOfBar]);
				});
				bar.getAttribute('y').then(function (y) {
					expect(parseInt(y)).toEqual(expectedY[indexOfBar]);
				});
				bar.getSize().then(function (size) {
					expect(size.width).toEqual(expectedWidths[indexOfBar]);
					expect(size.height).toEqual(expectedHeights[indexOfBar]);
				});
			});
		});
		
		it('should points proper negative value when value is from given range', function() {
			var expectedX = [0, 82, 37, 5, 5, 5],
				expectedY = [5, 5, 5, 190, 100, 145],
				expectedWidths = [0, 18, 18, 30, 30, 30],
				expectedHeights = [30, 30, 30, 0, 18, 18];
			input.sendKeys('-10');
			browser.sleep(250);
			bars.each(function (bar, indexOfBar) {
				bar.getAttribute('x').then(function (x) {
					expect(parseInt(x)).toEqual(expectedX[indexOfBar]);
				});
				bar.getAttribute('y').then(function (y) {
					expect(parseInt(y)).toEqual(expectedY[indexOfBar]);
				});
				bar.getSize().then(function (size) {
					expect(size.width).toEqual(expectedWidths[indexOfBar]);
					expect(size.height).toEqual(expectedHeights[indexOfBar]);
				});
			});
		});

		it('should points max value when value is bigger than max-value', function () {
			var expectedX = [10, 100, 55, 5, 5, 5],
				expectedY = [5, 5, 5, 10, 10, 10],
				expectedWidths = [180, 90, 135, 30, 30, 30],
				expectedHeights = [30, 30, 30, 180, 90, 135];
			input.sendKeys('100');
			browser.sleep(250);
			bars.each(function (bar, indexOfBar) {
				bar.getAttribute('x').then(function (x) {
					expect(parseInt(x)).toEqual(expectedX[indexOfBar]);
				});
				bar.getAttribute('y').then(function (y) {
					expect(parseInt(y)).toEqual(expectedY[indexOfBar]);
				});
				bar.getSize().then(function (size) {
					expect(size.width).toEqual(expectedWidths[indexOfBar]);
					expect(size.height).toEqual(expectedHeights[indexOfBar]);
				});
			});
		});

		it('should points min value when value is lower than min-value', function () {
			var expectedX = [0, 10, 10, 5, 5, 5],
				expectedY = [5, 5, 5, 190, 100, 145],
				expectedWidths = [0, 90, 45, 30, 30, 30],
				expectedHeights = [30, 30, 30, 0, 90, 45];
			input.sendKeys('-100');
			browser.sleep(250);
			bars.each(function (bar, indexOfBar) {
				bar.getAttribute('x').then(function (x) {
					expect(parseInt(x)).toEqual(expectedX[indexOfBar]);
				});
				bar.getAttribute('y').then(function (y) {
					expect(parseInt(y)).toEqual(expectedY[indexOfBar]);
				});
				bar.getSize().then(function (size) {
					expect(size.width).toEqual(expectedWidths[indexOfBar]);
					expect(size.height).toEqual(expectedHeights[indexOfBar]);
				});
			});
		});
	});
});