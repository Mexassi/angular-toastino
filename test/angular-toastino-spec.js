describe('Angular Toastino', function () {
  describe('The first test', function () {
    var Toastino;
    beforeEach(module('mexassi.toastino'));

    beforeEach(inject(function(_Toastino_) {
        Toastino = _Toastino_;
    }));

    it('should work', function () {
      expect(true).toBe(true);
    });

    it('should run a second test', function() {
      expect('bla').toBe('bla');
    });

    it('should init a new toastino', function () {
      var toast = new Toastino();
      expect(toast.message).toBeDefined();
      expect(toast.message).toBe('I am toastino!');
    });
  });
});
