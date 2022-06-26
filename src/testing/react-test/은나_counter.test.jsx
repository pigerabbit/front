import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const Counter = () => {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <button data-testid='sub' onClick={() => setNumber(number - 1)}>
        -
      </button>
      <span data-testid='number'>{number}</span>
      <button data-testid='add' onClick={() => setNumber(number + 1)}>
        +
      </button>
    </div>
  );
};

describe('Counter', () => {
  it("when '+' button is clicked, 1 is added to number", () => {
    const { queryByTestId } = render(<Counter />);
    const prevNumber = Number(queryByTestId('number').innerText);

    fireEvent.click(queryByTestId('add'));

    const curNumber = Number(queryByTestId('number').innerText);
    expect(curNumber).toBe(prevNumber + 1);
  });

  it("when '-' button is clicked, 1 is subtracted to number", () => {
    const { queryByTestId } = render(<Counter />);
    const prevNumber = Number(queryByTestId('number').innerText);

    fireEvent.click(queryByTestId('sub'));

    const curNumber = Number(queryByTestId('number').innerText);
    expect(curNumber).toBe(prevNumber - 1);
  });
});

// https://testing-library.com/docs/vue-testing-library/cheatsheet/#firing-events
// queryBy... 로 DOM 요소를 잡은 후 .click() 을 실행하시면 됩니다.
