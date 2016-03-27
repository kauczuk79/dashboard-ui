describe('Seven segment display filter', function () {
    var sevenSegmentDisplayFilter,
        regularExpressions,
        supportedCharacters = "-.0123456789:ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    beforeEach(module('dashboard-ui.filters'));

    beforeEach(inject(function ($injector, $filter) {
        sevenSegmentDisplayFilter = $filter('sevenSegmentDisplayFilter');
    }));

    it('should filter numbers properly', function () {
        expect(sevenSegmentDisplayFilter('123')).toEqual('123');
    });

    it('should filter float numbers properly', function () {
        expect(sevenSegmentDisplayFilter('123.0')).toEqual('123.0');
    });

    it('should cut out invalid characters in the beginning of the input', function () {
        expect(sevenSegmentDisplayFilter('@123.0')).toEqual('123.0');;
    });

    it('should cut out invalid characters in the middle of the input', function () {
        expect(sevenSegmentDisplayFilter('12@3.0')).toEqual('123.0');
    });

    it('should cut out invalid characters in the ending of the input', function () {
        expect(sevenSegmentDisplayFilter('123.0@')).toEqual('123.0');
    });

    it('should does not remove any of 65 supported characters', function () {
        expect(supportedCharacters.length).toEqual(65);
        expect(sevenSegmentDisplayFilter(supportedCharacters)).toEqual(supportedCharacters);
    });
});
