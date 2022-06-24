import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const Component = () => {
  return (
    <div>
      <h1 data-testid='title'>AI 4기 해커톤 팀 여러분 ^-^</h1>
      <ul>
        <li>서영님</li>
        <li>은아님</li>
        <li>민경님</li>
      </ul>
    </div>
  );
};

describe('Sample Component', () => {
  it('renders well', () => {
    const { queryByTestId } = render(<Component />);

    // Matcher
    expect(queryByTestId('title')).toBeInTheDocument();
  });
});
