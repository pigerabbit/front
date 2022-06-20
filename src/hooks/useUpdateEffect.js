// 최초 렌더링시에는 함수를 실행하지 않음, 이후 deps가 변화시에 실행

import React, { useEffect, useRef } from "react";

const useUpdateEffect = (func, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useUpdateEffect;
