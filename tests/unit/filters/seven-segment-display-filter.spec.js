describe('Seven segment display filter', function () {
    
    var sevenSegmentDisplayFilter;
    
    beforeEach(module('dashboard-ui'));
    
    beforeEach(inject(function ($injector) {
        sevenSegmentDisplayFilter = $injector.get('sevenSegmentDisplayFilter');
    }));
    
    it('sth', function() {
        expect(sevenSegmentDisplayFilter('123')).toEqual('123');
    });
});