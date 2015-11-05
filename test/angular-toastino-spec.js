describe('Angular Toastino', function () {
  describe('Toastino model', function () {
    var Toastino, $timeout;
    beforeEach(module('mexassi.toastino'));

    beforeEach(inject(function(_Toastino_, _$timeout_) {
        Toastino = _Toastino_;
        $timeout = _$timeout_;
    }));

    it('should init a new toastino', function () {
      var toast = new Toastino('danger');
      toast.setMessage('I am toastino!');
      expect(toast.message).toBeDefined();
      expect(toast.message).toBe('I am toastino!');
    });

    it('should set the class value with the position when defined', function () {
      var toast = new Toastino('warning');
      toast.setMessage('');
      expect(toast.className).toContain('warning ts-top-right');
    });

    it('should clear the message value', function () {
      var toast = new Toastino('success');
      toast.setMessage('success');
      expect(toast.message).toBe('success');
      toast.clearMessage();
      expect(toast.message).toBe('');
    });

    it('should auto dismiss the toast', function () {
      var toast = new Toastino('default');
      toast.autoDismiss = true;
      toast.setMessage('default');
      expect(toast.className).toContain('default');
      $timeout.flush();
      expect(toast.className).toContain(Toastino.DISMISS);
    });

    it('should manually dismiss a toast', function () {
      var toast = new Toastino('default');
      spyOn(toast, 'close');
      toast.manualDismiss();
      toast.setMessage('default');
      expect(toast.className).toContain('default');
      expect(toast.close).toHaveBeenCalled();
      expect(toast.className).toContain('default');
      toast.dismiss();
      expect(toast.className).toContain(Toastino.DISMISS);
    });
  });

  describe('Toastino directive', function () {
    it('should test the directive', function () {

    });
  });

  describe('toastinoService', function () {
    var Toastino, toastinoService;

    beforeEach(module('mexassi.toastino'));

    beforeEach(inject(function(_toastinoService_, _Toastino_) {
        Toastino = _Toastino_;
        toastinoService = _toastinoService_;
    }));

    it('should create the tostino object if the parameter has the necessary properties', function() {
      spyOn(toastinoService, 'buildToastino');
      var object = {classValue: 'ts-default', message:'bla'};
      toastinoService.makeToast(object);
      expect(toastinoService.buildToastino).toHaveBeenCalled();
    });

    it('should build a toastino and add it to the toastinoMessages array', function () {
      expect(toastinoService.toastinoMessages.length).toBe(0);
      var object = {classValue: 'ts-default', message:'bla'};
      var toastino = toastinoService.buildToastino(object);
      toastinoService.popToast(toastino);
      expect(toastinoService.toastinoMessages.length).toBe(1);
      expect(toastinoService.toastinoMessages[0].message).toEqual(object.message);
    });

  });
});
