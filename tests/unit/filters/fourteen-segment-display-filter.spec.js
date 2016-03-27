describe('Fourteen segment display filter', function () {
    var fourteenSegmentDisplayFilter,
        supportedCharacters = "\"$%&'()*+,-./0123456789:<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\\^_`abcdefghijklmnopqrstuvwxyz|~¥¦±";

    beforeEach(module('dashboard-ui.filters'));

    beforeEach(inject(function ($injector, $filter) {
        fourteenSegmentDisplayFilter = $filter('fourteenSegmentDisplayFilter');
    }));

    it('should filter numbers properly', function () {
        expect(fourteenSegmentDisplayFilter('123')).toEqual('123');
    });

    it('should filter float numbers properly', function () {
        expect(fourteenSegmentDisplayFilter('123.0')).toEqual('123.0');
    });

    it('should cut out invalid characters in the beginning of the input', function () {
        expect(fourteenSegmentDisplayFilter('ś123.0')).toEqual('123.0');;
    });

    it('should cut out invalid characters in the middle of the input', function () {
        expect(fourteenSegmentDisplayFilter('12ś3.0')).toEqual('123.0');
    });

    it('should cut out invalid characters in the ending of the input', function () {
        expect(fourteenSegmentDisplayFilter('123.0ś')).toEqual('123.0');
    });

    it('should does not remove any of 90 supported characters', function () {
        expect(supportedCharacters.length).toEqual(90);
        expect(fourteenSegmentDisplayFilter(supportedCharacters)).toEqual(supportedCharacters);
    });
});
