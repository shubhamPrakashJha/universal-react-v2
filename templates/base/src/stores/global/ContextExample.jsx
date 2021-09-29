import React, { useContext } from "react";
import { getContext } from "smart-context";

const ContextExample = () => {
  // context name is required to access context
  const {
    state: { counter, steps },
    actions: { setCounter, setSteps, reset },
  } = useContext(getContext("globalContext"));

  const incrementCounter = () => {
    // custom handler
    setCounter(counter+ parseInt(steps));
  };

  const decrementCounter = () => {
    // custom handler
    setCounter(counter-parseInt(steps));
  };

  const resetHandler = () => {
    // reset action is auto-generated (if not provided) that restores initial state
    reset();
  };

  const updateSteps = (e) => {
    // default action handler (pass object with exact key names declared in action config)
    setSteps({steps: e.target.value})
  }

  return (
    <>
      <div>
        Counter: {counter}
      </div> 
      <input type="text" name="steps" value={steps} onChange={updateSteps} /> <br />
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
      <button onClick={resetHandler}>Reset</button>
    </>
  );
};

export default ContextExample;