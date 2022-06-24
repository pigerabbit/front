import game369 from "./game369";

describe("game369 function", () => {
  describe("with a positive integer", () => {
    it("when it includes a 3, return '짝'", () => {
      const num = 153;
      const expected = "짝";

      const result = game369(num);

      expect(result).toBe(expected);
    });

    it("when it includes two 3, return '짝짝'", () => {
      const num = 1234543;
      const expected = "짝짝";

      const result = game369(num);

      expect(result).toBe(expected);
    });

    it("when it includes a 6, return '짝'", () => {
      const num = 602;
      const expected = "짝";

      const result = game369(num);

      expect(result).toBe(expected);
    });

    it("when it includes a 9, return '짝'", () => {
      const num = 119;
      const expected = "짝";

      const result = game369(num);

      expect(result).toBe(expected);
    });

    it("when it doesn't include 3 or 6 or 9, return input value", () => {
      const num = 48;
      const expected = 48;

      const result = game369(num);

      expect(result).toBe(expected);
    });
  });

  describe("with a non positive integer", () => {
    it("when it is infinity, return null", () => {
      const num = 4 / 0;
      const expected = null;

      const result = game369(num);

      expect(result).toBe(expected);
    });

    it("when it is -infinity, return null", () => {
      const num = -Infinity;
      const expected = null;

      const result = game369(num);

      expect(result).toBe(expected);
    });

    it("when it is string, return null", () => {
      const num = "안녕하세요";
      const expected = null;

      const result = game369(num);

      expect(result).toBe(expected);
    });

    it("when it is negative, return null", () => {
      const num = -345;
      const expected = null;

      const result = game369(num);

      expect(result).toBe(expected);
    });

    it("when it is float, return null", () => {
      const num = 2.54;
      const expected = null;

      const result = game369(num);

      expect(result).toBe(expected);
    });
  });
});
