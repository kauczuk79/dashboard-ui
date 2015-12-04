'use strict';
/*global browser, element, by, describe, beforeEach, expect, it*/
describe('Led light demo', function () {
	var ledLights;

	beforeEach(function () {
        browser.get('http://localhost:3000/test/led-light-demo.html');
		ledLights = element.all(by.css('.led-light'));
	});

	function checkBlinking(light) {
		function waitForOpacityLevel(level, blinkingInterval) {
			browser.wait(function (time) {
				return light.getAttribute('style').then(function (style) {
					var opacity = style.match(/(?:opacity: )([0-9.]+)/);
					if (!opacity) {
						return false;
					}
					return parseFloat(opacity[1]) === level;
				});
			}, blinkingInterval);
		}
		light.getAttribute('data-turn-on-level')
		.then(function (value) {
			return parseFloat(value || '1');
		}).then(function (turnOnLevel) {
			return light.getAttribute('data-turn-off-level').then(function (value) {
				return {
					turnOnLevel: turnOnLevel,
					turnOffLevel: parseFloat(value || '0')
				};
			});
		}).then(function (levels) {
			return light.getAttribute('data-blinking-interval').then(function (value) {
				levels.blinkingInterval = parseInt(value || '500');
				return levels;
			});
		}).then(function (parameters) {
			waitForOpacityLevel(parameters.turnOffLevel, parameters.blinkingInterval);
			waitForOpacityLevel(parameters.turnOnLevel, parameters.blinkingInterval);
		});
	}

	it('should contains 5 led lights', function () {
		expect(ledLights.count()).toEqual(6);
	});
	
	describe('blinking light', function() {
		var blinking;
		beforeEach(function() {
			blinking = element.all(by.css('.led-light[data-mode="blinking"]'));
			browser.sleep(500);
		});
		
		it('should blinks with default interval and delay', function() {
			checkBlinking(blinking.get(0));
		});
		
		it('should blinks with setted up interval', function() {
			checkBlinking(blinking.get(1));
		});
		
		it('should blinks with setted up delay', function() {
			checkBlinking(blinking.get(2));
		});
	});
});