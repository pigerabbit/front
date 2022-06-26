describe('mocking-test', () => {
  describe('say hi', () => {
    it('mock say hi', () => {
      const sayHi = jest.fn(() => {
        return 'hi';
      });

      expect(sayHi()).toBe('hi');
    });
  });

  describe('calculator', () => {
    it('mock calculator', () => {
      const calculator = jest.fn(({ numbers: [a, b], operator: oper }) => {
        switch (oper) {
          case '+':
            return a + b;
          case '-':
            return a - b;
          case '*':
            return a * b;
          case '/':
            return a / b;
          default:
            return;
        }
      });

      expect(calculator({ numbers: [12, 5], operator: '+' })).toBe(17);
      expect(calculator({ numbers: [12, 5], operator: '-' })).toBe(7);
      expect(calculator({ numbers: [12, 5], operator: '*' })).toBe(60);
      expect(calculator({ numbers: [12, 5], operator: '/' })).toBe(2.4);

      expect(calculator).toBeCalledTimes(4);
      expect(calculator).toBeCalledWith({ numbers: [12, 5], operator: '*' });
      expect(calculator).toHaveBeenCalledWith({
        numbers: [12, 5],
        operator: '*',
      });

      expect(calculator).toHaveBeenLastCalledWith({
        numbers: [12, 5],
        operator: '/',
      });
    });
  });
});
