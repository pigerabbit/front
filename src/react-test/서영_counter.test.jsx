import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <span data-testid='count'>{count}</span>
      <button onClick={() => setCount((cur) => cur - 1)} data-testid='minus'>
        -
      </button>
      <button onClick={() => setCount((cur) => cur + 1)} data-testid='plus'>
        +
      </button>
    </div>
  );
};

describe('Counter Component', () => {
  it('when plus button is clicked, render count+1', () => {
    const { queryByTestId } = render(<Counter />);
    const previousCount = Number(queryByTestId('count').textContent);

    fireEvent.click(queryByTestId('plus'));

    const currentCount = Number(queryByTestId('count').textContent);
    expect(previousCount + 1).toBe(currentCount);
  });
});

// https://testing-library.com/docs/vue-testing-library/cheatsheet/#firing-events
// queryBy... 로 DOM 요소를 잡은 후 .click() 을 실행하시면 됩니다.
