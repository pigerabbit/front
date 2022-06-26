describe('mocking-example', () => {
  const getTotalSum = jest.fn((numberArray) => {
    const total = numberArray.reduce((acc, cur) => {
      return acc + cur;
    }, 0);

    return total;
  });

  it('return total sum', () => {
    const numArray1 = [1, 2, 3, 4];
    const numArray2 = [2, 3, 4, 5];

    expect(getTotalSum(numArray1)).toBe(10);
    expect(getTotalSum(numArray2)).toBe(14);
    expect(getTotalSum).toHaveBeenCalledWith(numArray1);
    expect(getTotalSum).toBeCalledTimes(2);
    expect(getTotalSum).toHaveBeenLastCalledWith(numArray2);

    expect(getTotalSum.mock.calls[0][1]).toStrictEqual(numArray1);
  });
});
