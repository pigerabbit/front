import game369 from "./game369";

describe("game369 function", () => {
  it('should always return "박수" if value includes 3', () => {
    const value = 153;
    const expectedValue = "박수";

    const result = game369(value);
    expect(result).toBe(expectedValue);
  });

  it('should always return "박수" if value includes 6', () => {
    const value = 61;
    const expectedValue = "박수";

    const result = game369(value);
    expect(result).toBe(expectedValue);
  });

  it('should always return "박수" if value includes 9', () => {
    const value = 98;
    const expectedValue = "박수";

    const result = game369(value);
    expect(result).toBe(expectedValue);
  });

  it("should always return value if value doesn't include 3,6,9", () => {
    const value = 24;
    const expectedValue = 24;

    const result = game369(value);
    expect(result).toBe(expectedValue);
  });

  // 함수 실행 조건에 맞지 않는 케이스들을 오류로 처리하도록 했는데, 오류를 세분화하는 게 좋은 건지 아닌지 잘 모르겠습니다. 함수 실행 조건에 맞지 않는다고 보여주는 게 더 효율적인 방법일까요?
  it("should throw error if value can't be replaced as number", () => {
    expect(() => {
      const value = "asdf00";

      game369(value);
    }).toThrow("value는 숫자여야 합니다.");
  });

  it("should throw error if value is infinite", () => {
    expect(() => {
      const value = Infinity;

      game369(value);
    }).toThrow("value는 유한한 숫자여야 합니다.");

    expect(() => {
      const value = -Infinity;

      game369(value);
    }).toThrow("value는 유한한 숫자여야 합니다.");
  });

  it("should throw error if value is less than 0", () => {
    expect(() => {
      const value = -998;

      game369(value);
    }).toThrow("value는 0보다 큰 숫자여야 합니다.");
  });

  it("should throw error if value is not integer", () => {
    expect(() => {
      const value = 12.34;

      game369(value);
    }).toThrow("value는 정수여야 합니다.");
  });
});
