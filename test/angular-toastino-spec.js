describe('Angular Toastino', function () {
  describe('Toastino model', function () {
    var Toastino, $timeout;
    beforeEach(module('mexassi.toastino'));

    beforeEach(inject(function(_Toastino_, _$timeout_) {
        Toastino = _Toastino_;
        $timeout = _$timeout_;
    }));

    it('should init a new toastino with an undefined position', function () {
      var toast = new Toastino('danger');
      toast.setMessage('I am toastino!');
      expect(toast.message).toBeDefined();
      expect(toast.position).toBe(undefined);
      expect(toast.message).toBe('I am toastino!');
    });

    it('should set the class value with the position when defined', function () {
      var toast = new Toastino('warning', 'ts-top-right');
      expect(toast.classValue).toBe('warning ts-top-right');
    });

    it('should clear the message value', function () {
      var toast = new Toastino('success', 'ts-bottom-left');
      toast.setMessage('success');
      expect(toast.message).toBe('success');
      toast.clearMessage();
      expect(toast.message).toBe('');
    });

    it('should auto dismiss the toast', function () {
      var toast = new Toastino('default', 'ts-center');
      toast.setMessage('default');
      expect(toast.classValue).toBe('default ts-center');
      $timeout.flush();
      expect(toast.classValue).toContain(Toastino.DISMISS);
    });

    it('should manually dismiss a toast', function () {
      var toast = new Toastino('default', 'ts-top-right');
      spyOn(toast, 'close');
      toast.manualDismiss();
      toast.setMessage('default');
      expect(toast.classValue).toBe('default ts-top-right');
      expect(toast.close).toHaveBeenCalled();
      expect(toast.classValue).toBe('default ts-top-right');
      toast.dismiss();
      expect(toast.classValue).toContain(Toastino.DISMISS);
    });
  });

  describe('Toastino directive', function () {
    it('should test the directive', function () {

    });
  });
});
