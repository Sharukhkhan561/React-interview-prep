/*In React, the useCallback hook is used to memoize a function,
 ensuring that it only gets recreated when its dependencies change.
  This is useful when passing functions as props to child components,
   as it can prevent unnecessary re-renders.*/

   /*Key Points:
   useCallback returns a memoized version of the function,
    which will only change if the dependencies (in this case, an empty array or certain values) change.
   This is useful to optimize child components that rely on reference equality to avoid unnecessary renders.
   React.memo is used to ensure the child component doesn't re-render unless its props have changed.*/

   /*In the example, the handleClick function is memoized using useCallback,
    so it doesn't get recreated on every render unless its dependencies change.
     As a result, ChildComponent will only re-render when necessary, like when the onClick prop changes.*/
     
import { useCallback, useState } from "react";
import "./App.css";
import Child from "./components/Child";

function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const handleClick = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, [count]);

  return (
    <>
      <h1>Count : {count}</h1>
      <Child onClick={handleClick} />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something......"
      />
    </>
  );
}

export default App;
