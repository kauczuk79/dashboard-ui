describe('Alphanumeric LCD demo', function () {
	var displays,
		textarea,
		lcdForeground;

	beforeEach(function () {
        browser.get('http://localhost:3000/test/alphanumeric-lcd-demo.html');
		displays = element.all(by.css('.alphanumeric-lcd'));
		textarea = element(by.css('textarea')).clear();
		lcdForeground = element.all(by.css('#test .foreground'));
    });

	it('should contains 6 alphanumeric displays', function () {
		expect(displays.count()).toEqual(6);
	});

	it('should create right amount of lines for each display', function () {
		var expected = [5, 1, 1, 1, 1, 4];
		displays.each(function (display, indexOfDisplay) {
			expect(display.all(by.css('.foreground')).count()).toEqual(expected[indexOfDisplay]);
		});
	});

	it('only last display should have background', function () {
		var expected = [0, 0, 0, 0, 0, 4];
		displays.each(function (display, indexOfDisplay) {
			expect(display.all(by.css('.background')).count()).toEqual(expected[indexOfDisplay]);
		});
	});

	it('all displays should be in right position', function () {
		var expectedX = 10,
			expectedY = [NaN, 100, 115, 140, 170, 225];
		displays.each(function (display, indexOfDisplay) {
			display.getAttribute('transform').then(function (value) {
				var actual = value.match(/(?:translate\()(\d+)((?:,)(\d+))?(?:\))/),
					actualX = parseInt(actual[1], 10),
					actualY = parseInt(actual[3], 10);
				expect(expectedX).toEqual(actualX);
				expect(expectedY[indexOfDisplay]).toEqual(actualY);
			});
		});
	});

	it('displays 2-5 should have be scaled properly', function () {
		var scaledDisplays = element.all(by.css('[data-scale]')),
			matchPrecision = 0.01;
		expect(scaledDisplays.count()).toEqual(4);
		scaledDisplays.first().getSize().then(function (elementSize) {
			var baseWidth = elementSize.width,
				baseHeight = elementSize.height;
			scaledDisplays.each(function (display, index) {
				display.getAttribute('data-scale').then(function (value) {
					var scale = parseFloat(value),
						expectedWidth = scale * baseWidth,
						expectedHeight = scale * baseHeight;
					display.getSize().then(function (size) {
						var widthDiff = Math.abs(expectedWidth - size.width),
							heightDiff = Math.abs(expectedHeight - size.height);
						expect(widthDiff).toBeLessThan(expectedWidth * matchPrecision);
						expect(heightDiff).toBeLessThan(expectedHeight * matchPrecision);
					});
				});
			});
		});
	});

	describe('Interactive display', function () {
		it('should shows text after textarea change', function () {
			textarea.sendKeys('test');
			expect(lcdForeground.first().getText()).toEqual('test');
		});

		it('should shows cropped text in single line when text is not divided by new line character', function () {
			var given = 'Lorem ipsum dolor sit amet',
				expected = given.substring(0, 24); //24 columns in example
			textarea.sendKeys(given);
			expect(lcdForeground.first().getText()).toEqual(expected);
		});

		it('should shows text in multiple lines when text is divided by new line character', function () {
			var linesArray = ['Line 1', 'Line 2', 'Line 3 is the longest line in test', ''],
				given = linesArray.join('\n');
			textarea.sendKeys(given);
			lcdForeground.each(function (line, index) {
				var expected = linesArray[index].substring(0, 24);
				expect(line.getText()).toEqual(expected);
			});
		});
	});
});