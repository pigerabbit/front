import game369 from "./game369";

describe("game369 function", () => {
  it("return 박수 if input value includes number 3", () => {
    const num = 153;
    const expected = "박수";

    const result = game369(num);

    expect(result).toBe(expected);
  });

  it("return 박수 if input value includes number 6", () => {
    const num = 602;
    const expected = "박수";

    const result = game369(num);

    expect(result).toBe(expected);
  });

  it("return 박수 if input value includes number 9", () => {
    const num = 119;
    const expected = "박수";

    const result = game369(num);

    expect(result).toBe(expected);
  });

  it("return input value", () => {
    const num = 48;
    const expected = 48;

    const result = game369(num);

    expect(result).toBe(expected);
  });

  it("return 'type이 number인 양의 정수를 입력해주세요.'", () => {
    const case1 = Infinity;
    const case2 = 4 / 0;
    const case3 = -Infinity;
    const case4 = "3";
    const case5 = -6;
    const case6 = 2.4;
    const expected = "type이 number인 양의 정수를 입력해주세요.";

    const result1 = game369(case1);
    const result2 = game369(case2);
    const result3 = game369(case3);
    const result4 = game369(case4);
    const result5 = game369(case5);
    const result6 = game369(case6);

    expect(result1).toBe(expected);
    expect(result2).toBe(expected);
    expect(result3).toBe(expected);
    expect(result4).toBe(expected);
    expect(result5).toBe(expected);
    expect(result6).toBe(expected);
    // 인풋에 따라 리턴값이 다 같은 경우인데, 테스트를 다 나누는게 더 좋은 방법인가요?
  });
});
