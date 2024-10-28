import React,{useEffect, useMemo, useState} from 'react'
import useCustomeMemo from './useCustomeMemo';


function expensiveCalc(num){
// console.log("running expensive calc......")
return num*2
}
function CustomUseMemo() {
    console.log("custome memo called function");
    const [counter, setCounter]= useState(0);
    const [input, setInput]= useState("");
    const doubleCalc = useCustomeMemo(()=> expensiveCalc(counter),[]);
    useEffect(()=>{
        console.log("useeffect called")
    },[counter])
  return (
    <div>
        <h1>Counter: {counter}</h1>
        <h1>Double Counter : {doubleCalc}</h1>
        <button onClick={()=>setCounter(counter + 1)}>Increment</button>
        <input type="text"
        value={input}
        onChange={(e)=>setInput(e.target.value)}
        placeholder="Type something....." />
    </div>
  )
}

export default CustomUseMemo