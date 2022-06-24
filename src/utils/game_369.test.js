import game_369 from "./game_369";

describe("game_369 function", () => {
  describe("with a positive integer", () => {
    it("when it is Number and includes 3, return 박수", () => {
      const num = 134;
      const expected = "박수";

      const result = game_369(num);

      expect(result).toBe(expected);
    });

    it("when it is Number and includes 6, return 박수", () => {
      const num = 66;
      const expected = "박수";

      const result = game_369(num);

      expect(result).toBe(expected);
    });

    it("when it is Number and includes 9, return 박수", () => {
      const num = 10009;
      const expected = "박수";

      const result = game_369(num);

      expect(result).toBe(expected);
    });

    it("when it is String that can be converted to a Number and includes 3 or 6 or 9, return 박수", () => {
      const num = "123";
      const expected = "박수";

      const result = game_369(num);

      expect(result).toBe(expected);
    });

    it("when it is Number and not includes 3 or 6 or 9, return input value", () => {
      const num = 112;
      const expected = 112;

      const result = game_369(num);

      expect(result).toBe(expected);
    });

    it("when it is String that can be converted to a Number and not includes 3 or 6 or 9, return input value", () => {
      const num = "1211";
      const expected = "1211";

      const result = game_369(num);

      expect(result).toBe(expected);
    });
  });
  describe("with a non positive integer", () => {
    it("when it is Infinity, return 게임을 진행할 수 없습니다", () => {
      const num = Infinity;
      const expected = "게임을 진행할 수 없습니다";

      const result = game_369(num);

      expect(result).toBe(expected);
    });

    it("when it is -Infinity, return 게임을 진행할 수 없습니다", () => {
      const num = -Infinity;
      const expected = "게임을 진행할 수 없습니다";

      const result = game_369(num);

      expect(result).toBe(expected);
    });
    it("when it is not positive number, return 게임을 진행할 수 없습니다", () => {
      const num = -123;
      const expected = "게임을 진행할 수 없습니다";

      const result = game_369(num);

      expect(result).toBe(expected);
    });

    it("when it is not integer, return 게임을 진행할 수 없습니다", () => {
      const num = 1.9;
      const expected = "게임을 진행할 수 없습니다";

      const result = game_369(num);

      expect(result).toBe(expected);
    });
  });
});
