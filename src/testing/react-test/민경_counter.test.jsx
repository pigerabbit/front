import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handlePlus = () => {
    setCount((cur) => cur + 1);
  };

  const handleMinus = () => {
    setCount((cur) => cur - 1);
  };

  return (
    <div>
      <span data-testid='count'>{count}</span>
      <button onClick={handlePlus} data-testid='plus'>
        +
      </button>
      <button onClick={handleMinus} data-testid='minus'>
        -
      </button>
    </div>
  );
};

describe('Counter', () => {
  it('when plus button is clicked, count is added by 1', () => {
    const { queryByTestId } = render(<Counter />);

    const count = Number(queryByTestId('count').textContent);
    fireEvent.click(queryByTestId('plus'));
    const addedCount = Number(queryByTestId('count').textContent);

    expect(addedCount).toBe(count + 1);
  });

  it('when minus button is clicked, count is subtracted by 1', () => {
    const { queryByTestId } = render(<Counter />);

    const count = Number(queryByTestId('count').textContent);
    fireEvent.click(queryByTestId('minus'));
    const addedCount = Number(queryByTestId('count').textContent);

    expect(addedCount).toBe(count - 1);
  });
});

// https://testing-library.com/docs/vue-testing-library/cheatsheet/#firing-events
// queryBy... 로 DOM 요소를 잡은 후 .click() 을 실행하시면 됩니다.
