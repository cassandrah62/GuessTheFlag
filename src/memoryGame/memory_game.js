import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import { Calculator } from "../practice/navigation";

export default function App() {
  const [options, setOptions] = useState(null)
  const [highScore, setHighScore] = useState(0)


  return (
    <div>
      <div className="container">
        <h1>Memory Game</h1>
        <div>High Score: {highScore}</div>

        <div>
          {options === null ? (

            <>
              <button onClick={() => setOptions(12)}>Easy</button>
              <button onClick={() => setOptions(18)}>Medium</button>
              <button onClick={() => setOptions(24)}>Hard</button>
            </>

          ) : (
            <>
              <button onClick={() => setOptions(null)}>Start Over</button>  
            </>
          )}
        </div>
      </div>

      {options ? (
        <MemoryGame
          options={options}
          setOptions={setOptions}
          highScore={highScore}
          setHighScore={setHighScore}
        />
      ) : (
        <h2>Choose a difficulty to begin!</h2>
      )}
    </div>
  )
}


function MemoryGame(props) {
  return <div>Game goes here</div>
}




