import add5 from './add5';

describe('add5 function', () => {
  /**
   * 테스트는 제목이 반드시 반드시 확.실.해야 합니다.
   * 테스트는 그 자체로 문서의 기능을 할 수 있어야 합니다.
   */

  // 지양해야하는 제목
  // renders well 이 정확히 "무엇이" 렌더링이 잘 되는지 알 길이 없음
  // 내부 코드를 들여다봐야지만 알 수 있는 테스트는 좋은 테스트가 아닙니다.
  // it('renders well', () => {

  // })

  // 테스트 제목은 가장 바깥 쪽에서 안 쪽으로 읽었을 때 문장형으로 완성이 되어야 합니다.
  it('always return value added by 5', () => {
    // expect(기대값).toBe(결과값)

    expect(add5(5)).toBe(10);
  });

  it('always return value added by 5 - given/when/then', () => {
    // given => 준비 단계 => 변수 초기화
    const num = 5;
    const expected = 10;

    // when => 액션 => 함수 실행
    const result = add5(num);

    // then => 결과 값 평가 => expect
    expect(result).toBe(expected);
  });
});
