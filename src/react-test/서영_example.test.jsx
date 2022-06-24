import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const Component = ({ number }) => {
  return (
    <>
      {number > 50 ? (
        <div>
          <h1 title='greater'>number가 50보다 클 때</h1>
        </div>
      ) : (
        <div>
          <h1 title='lessOrEqual'>number가 50보다 작거나 같을 때</h1>
        </div>
      )}
    </>
  );
};

describe('Sample Component', () => {
  it('when props number is greater than 50, render component titled "greater"', () => {
    const { queryByTitle } = render(<Component number={51} />);
    expect(queryByTitle('greater')).toBeInTheDocument();
  });

  it('props number is less than 50', () => {
    const { queryByTitle } = render(<Component number={30} />);
    expect(queryByTitle('lessOrEqual')).toBeInTheDocument();
  });

  it('props number is eqaul to 50', () => {
    const { queryByTitle } = render(<Component number={50} />);
    expect(queryByTitle('lessOrEqual')).toBeInTheDocument();
  });
});

//queryByTestId
