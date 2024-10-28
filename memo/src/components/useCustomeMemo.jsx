import { useRef } from "react";


export default function useCustomeMemo(cb, dependencyArr){
 const ref = useRef({
    memoizedValue : undefined,
    lastDependecy : undefined
 });

  if(!ref.current.memoizedValue || !areArrayEqual(ref.current.memoizedValue, dependencyArr)){
    ref.current.memoizedValue=cb();
    ref.current.lastDependecy = dependencyArr;
  }
  return ref.current.memoizedValue;
}

function areArrayEqual(prev, current){
    if(!prev || !current ||prev.length !==current.length){
        return false;
    }
    for(let i=0; i<current.length; i++){
        if(prev[i]!==current[i]){
            return false;
        }
    }
    return true;
}