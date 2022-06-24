import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

const Component = ({ number }) => {
  return (
    <>
      {number > 50 ? (
        <div data-testid='big'>50보다 큰 무언가</div>
      ) : (
        <div data-testid='small'>50보다 작은 무언가</div>
      )}
    </>
  );
};

describe('Component', () => {
  test('when number > 50, render something big', () => {
    const { queryByTestId } = render(<Component number={51} />);

    expect(queryByTestId('big')).toBeInTheDocument();
  });

  test('when number <= 50, render small', () => {
    const { queryByTestId } = render(<Component number={49} />);

    expect(queryByTestId('small')).toBeInTheDocument();
  });
});

//queryByTestId
