import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const SampleComponent = ({ number }) => {
  return (
    <>
      {number > 50 ? (
        <div data-testid='bigger50'>
          <h1>number {'>'} 50</h1>
          <p>
            코치님 저는 은아가 아니라 은나입니당 ^_^ ,, 어익후 ㅎ;; ㅈㅅ욥..
          </p>
          <h2>신입 개발자 이건 해보면 좋다!</h2>
          <ol>
            <li>테스트 경험의 중요성</li>
            <li>git 사용 경험의 중요성</li>
            <li>React 사용 경험의 중요성</li>
          </ol>
        </div>
      ) : (
        <div data-testid='less50'>
          <h1>number {'<='} 50</h1>
          <p>number가 50보다 작아요.</p>
        </div>
      )}
    </>
  );
};

describe('Sample Component', () => {
  it('with number greater than 50, render bigger50', () => {
    const testNumber = 100;
    const { queryByTestId } = render(<SampleComponent number={testNumber} />);

    // queryAllByTestId('myNameIs').forEach((element) => {
    //   expect(element).toBeInTheDocument();
    // });
    // expect(queryAllByTestId('myNameIs')).toBeInTheDocument();
    // expect(queryAllByTestId('junior')).toBeInTheDocument();

    // 너무 헷갈려요... 허ㅓㅇㅇ어엉엉....👍

    expect(queryByTestId('bigger50')).toBeGreaterThan(50);
  });
});

//queryByTestId
