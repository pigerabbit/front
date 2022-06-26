describe('mocking function', () => {
  it('mock add10', () => {
    const add10 = jest.fn((x) => x + 10);

    expect(add10(10)).toBe(20);
    expect(add10(3)).toBe(13);
    expect(add10(5)).toBe(15);

    expect(add10).toBeCalledTimes(3);
    expect(add10).toBeCalledWith(10);
    expect(add10).toHaveBeenLastCalledWith(5);

    expect(add10.mock.calls[1][0]).toBe(3);
    expect(add10.mock.results[1].value).toBe(13);
  });
});
