// import Student from './student';
import * as _ from 'lodash';

// mocking = 가짜, 임의, 변조
// 클래스나 객체를 mocking 하면 그 안에 있는 함수나 요소를 undefined 로 만들어버려요.
// jest.mock('lodash');

// jest.mock 의 두 번째 인자로 함수를 넣을 수 있어요.
// 함수는 반환 값을 지정할 수 있어요.
// add 를 새로운 mocking 의 또 다른 mocking 함수로 치환한 것이에요.
jest.mock('lodash', () => {
  // requireActual 은 mocking 함수를 반환하지 않고 실제 메소드를 그대로 반환해요.
  const actual = jest.requireActual('lodash');

  // 실제 메소드의 집합인 actual 와 mocking 함수인 add 를 아래와 같이 반환하게되면
  // add 만 mocking 함수로 적용이 될 거에요.
  return {
    ...actual,
    add: jest.fn((x, y) => x + y),
  };
});

// requireActual 응용
/*
jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux');
  return {
    ...actual,
    useDispatch: jest.fn(() => {
      const dispatch = jest.fn((action) => undefined);
      return dispatch;
    }),
  };
});
*/

describe('mocking-class', () => {
  it('add returns ...', () => {
    expect(_.add(5, 6)).toBe(11);
    expect(_.add).toHaveBeenCalledTimes(1);
    expect(_.add).toHaveBeenCalledWith(5, 6);
  });

  it.only('when inputs are 5 and 6, subtract returns -1', () => {
    expect(_.subtract(5, 6)).toBe(-1);
  });
});
