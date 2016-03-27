describe('Alphanumeric LCD Filter', function () {
    var alphanumericLcdFilter,
        supportedCharacters = "\u000d !\u0022#$%\u0026'()*+,-.\\/0123456789:;\u003c=\u003e?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u00a0\u00a1\u00a2\u00a3\u00a4\u00a5\u00a6\u00a7\u00a8\u00a9\u00aa\u00ab\u00ac\u00ad\u00ae\u00af\u00b0\u00b1\u00b2\u00b3\u00b4\u00b5\u00b6\u00b7\u00b8\u00b9\u00ba\u00bb\u00bc\u00bd\u00be\u00bf\u00c0\u00c1\u00c2\u00c3\u00c4\u00c5\u00c6\u00c7\u00c8\u00c9\u00ca\u00cb\u00cc\u00cd\u00ce\u00cf\u00d0\u00d1\u00d2\u00d3\u00d4\u00d5\u00d6\u00d7\u00d8\u00d9\u00da\u00db\u00dc\u00dd\u00de\u00df\u00e0\u00e1\u00e2\u00e3\u00e4\u00e5\u00e6\u00e7\u00e8\u00e9\u00ea\u00eb\u00ec\u00ed\u00ee\u00ef\u00f0\u00f1\u00f2\u00f3\u00f4\u00f5\u00f6\u00f7\u00f8\u00f9\u00fa\u00fb\u00fc\u00fd\u00fe\u00ff\u0152\u0153\u0160\u0161\u0178\u017d\u017e\u0192\u0b82\u0b83\u0b85\u0b86\u0b87\u0b88\u0b89\u0b8a\u0b8e\u0b8f\u0b90\u0b92\u2014\u2018\u2019\u201a\u201b\u201c\u201d\u201e\u2020\u2022\u2026\u2039\u203a\u20ac\u2122\ufb01\ufb02";

    beforeEach(module('dashboard-ui.filters'));

    beforeEach(inject(function ($injector, $filter) {
        alphanumericLcdFilter = $filter('alphanumericLcdFilter');
    }));

    it('should filter numbers properly', function () {
        expect(alphanumericLcdFilter('123')).toEqual('123');
    });

    it('should filter float numbers properly', function () {
        expect(alphanumericLcdFilter('123.0')).toEqual('123.0');
    });

    it('should cut out invalid characters in the beginning of the input', function () {
        expect(alphanumericLcdFilter('ś123.0')).toEqual('123.0');;
    });

    it('should cut out invalid characters in the middle of the input', function () {
        expect(alphanumericLcdFilter('12ś3.0')).toEqual('123.0');
    });

    it('should cut out invalid characters in the ending of the input', function () {
        expect(alphanumericLcdFilter('123.0ś')).toEqual('123.0');
    });

    it('should does not remove any of 90 supported characters', function () {
        expect(supportedCharacters.length).toEqual(229);
        expect(alphanumericLcdFilter(supportedCharacters)).toEqual(supportedCharacters);
    });
});
