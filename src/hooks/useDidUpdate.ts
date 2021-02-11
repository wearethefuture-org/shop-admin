/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react';


const useDidUpdateEffect = (cb: () => void, deps: Array<any>) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) cb();
    else didMount.current = true;
  }, deps);
}

export default useDidUpdateEffect;