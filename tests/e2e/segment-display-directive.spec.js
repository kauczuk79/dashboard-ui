describe('segment display demo', function () {
	var input;

	beforeEach(function () {
        browser.get('http://localhost:3000/test/segment-displays-demo.html');
		input = element(by.css('input[type="text"]'));
	});

	function checkAlignment(displays) {
		displays.each(function (display, indexOfDisplay) {
			input.clear().sendKeys('1');
			var valueElement = display.element(by.css('#value')),
				displayPosition;
			display.getLocation().then(function (displayLocation) {
				displayPosition = displayLocation;
				return valueElement.getLocation().then(function (valueLocation) {
					return valueLocation.x - displayPosition.x;
				});
			}).then(function (oneDigitXPosition) {
				input.clear().sendKeys('12');
				valueElement.getLocation().then(function (newLocation) {
					var twoDigitsXPosition = newLocation.x - displayPosition.x;
					expect(twoDigitsXPosition).toBeLessThan(oneDigitXPosition);
				});
			});
		});
	}

	function checkBackgroundVisibility(displays) {
		displays.each(function (display, indexOfDisplay) {
			display.getAttribute('data-show-background', function (attributeValue) {
				return attributeValue;
			}).then(function (backgroundVisibilityAttribute) {
				expect(display.element(by.css('#background')).isDisplayed()).toEqual(Boolean(backgroundVisibilityAttribute));
			});
		});
	}

	describe('14-segment display', function () {
		var displays14;

		beforeEach(function () {
			displays14 = element.all(by.css('.fourteen-segment-display'));
		});

		it('should be twice on page', function () {
			expect(displays14.count()).toEqual(2);
		});

		it('should have right text alignment', function () {
			checkAlignment(displays14);
		});

		it('should have proper visibility of background', function () {
			checkBackgroundVisibility(displays14);
		});
	});

	describe('7-segment display', function () {
		var displays7;

		beforeEach(function () {
			displays7 = element.all(by.css('.fourteen-segment-display'));
		});

		it('should be twice on page', function () {
			expect(displays7.count()).toEqual(2);
		});

		it('should have right text alignment', function () {
			checkAlignment(displays7);
		});
		
		it('should have proper visibility of background', function () {
			checkBackgroundVisibility(displays7);
		});
	});
});