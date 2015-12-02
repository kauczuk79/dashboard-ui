var q = require('q');

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
		});
	});

	it('should have proper bar position', function () {
		var expectedX = [],
			expectedY = [],
			metersLocations = [];
		browser.sleep(250); //wait for animation to be finished
		meters.each(function (meter, indexOfMeter) {
			meter.getLocation().then(function (position) {
				metersLocations.push(position);
			});
		}).then(function () {
			bars.each(function (bar, indexOfBar) {
				bar.getLocation().then(function (position) {
					var relativeX = position.x - metersLocations[indexOfBar].x,
						relativeY = position.y - metersLocations[indexOfBar].y;
					console.log(relativeX + ' ' + relativeY);
				});
			})
		});
	});

	describe('Indicator', function () {
		it('should points 0 when input is empty', function () {
			browser.sleep(250); //wait for animation to be finished
			meters.each(function (meter, indexOfMeter) {
				meter.element(by.css('#bar')).getSize().then(function (size) {
					meter.getAttribute('data-vertical').then(function (vertical) {
						if (vertical === "true") {
							expect(size.width).toEqual(30);
							expect(size.height).toEqual(0);
						} else {
							expect(size.width).toEqual(0);
							expect(size.height).toEqual(30);
						}
					});
				});
			});
		});

		it('should points proper value when value is from given range', function () {

		});

		it('should points max value when value is bigger than max-value', function () {

		});

		it('should points min value when value is lower than min-value', function () {

		});
	});
});