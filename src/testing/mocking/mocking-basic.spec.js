// mocking (모킹)
// mock => 견본을 뜨는 행위 (임시, 가짜) => mock up => 임시를 만드는 행위, 견본을 만드는 행위

describe('mocking-basic', () => {
  describe('add5', () => {
    it('mock add5', () => {
      // mocking function => 항상 정해진 값만 반환하는 함수
      const add5 = jest.fn(() => {
        return 5;
      });
      const add6 = (x) => x + 6;

      const sayName = jest.fn(({ name }) => name);

      // mocking 함수는 항상 5만 반환하므로 결과는 항상 5
      expect(add5(6)).toBe(5);
      expect(add6(6)).toBe(12);

      // mocking 함수는 몇 번 불렸는지 알 수 있어요.
      expect(add5).toBeCalledTimes(1);

      // 결과: fail, mocking 함수가 아니라 사용할 수 없음
      // expect(add6).toBeCalledTimes(1);

      // mocking 함수는 어떤 인자를 받았는지 알 수 있어요.
      expect(sayName({ name: '성님' })).toBe('성님');
      expect(sayName({ name: '나님' })).toBe('나님');
      expect(sayName({ name: '굥님' })).toBe('굥님');
      // expect(sayName).toBeCalledWith({ name: '서영' });
      expect(sayName).toHaveBeenLastCalledWith({ name: '굥님' });

      // mocking 함수는 (함수).mock 하위의 calls 를 이용해 아래와 같이 점검할 수 있어요.
      // 결과는 동일하게 나와야합니다.
      expect(sayName.mock.calls[2][0]).toStrictEqual({ name: '굥님' });
    });
  });
});
