import game_369 from "./game_369";

describe("369game function", () => {
  it("return 박수 if input includes 3,6,9", () => {
    const num = 13;
    const expected = "박수";

    const result = game_369(num);

    expect(result).toBe(expected);
  });

  it("return input if not include 3,6,9", () => {
    const num = 10;
    const expected = 10;

    const result = game_369(num);

    expect(result).toBe(expected);
  });

  it("return else if input is string not to be replaced by Number", () => {
    const num = "abc";
    const expected = "숫자가 아니거나 무한대입니다.";

    const result = game_369(num);

    expect(result).toBe(expected);
  });

  it("return else if input is string that can be replaced by Number", () => {
    const num = "123";
    const expected = "박수";

    const result = game_369(num);
    expect(result).toBe(expected);
  });

  // 1) 테스트 문장을 최대한 나누어서 두개의 문장으로 작성하는것 2) 하나의 문장에 두 개의 테스트 예시를 넣는 것
  // 두 방법 모두 테스트 기능 상에는 문제가 없는 것 같아서 어느 방법이 더 나은 테스트인지 궁금합니다
  it("return else if input is Infinity or -Infinity", () => {
    expect(game_369(Infinity)).toBe("숫자가 아니거나 무한대입니다.");
    expect(game_369(-Infinity)).toBe("숫자가 아니거나 무한대입니다.");
  });
});
