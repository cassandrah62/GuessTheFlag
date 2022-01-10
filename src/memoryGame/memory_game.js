import React, { useState, useEffect } from "react";
import { useSpring, animated as a } from "react-spring";
import swal from '@sweetalert/with-react';
import './memory_game.css';

export default function App()
{
  const [options, setOptions] = useState(null)
  const [easyScore, setEasyScore] = useState(0)
  const [medScore, setMedScore] = useState(0)
  const [hardScore, setHardScore] = useState(0)
  const [extremeScore, setExtremeScore] = useState(0)
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [gameFinished, setGameFinished] = useState(false)
  const [flips, setFlips] =  useState(0);
  const [firstScore, setFirstScore] = useState(true);

  useEffect(() => 
  {
    const easy = localStorage.getItem('easyhighscore')
    const savedEasyScore = JSON.parse(easy)

    if (savedEasyScore) 
    {
      setEasyScore(savedEasyScore)
    }

    const medium = localStorage.getItem('mediumhighscore')
    const savedMediumScore = JSON.parse(medium)

    if (savedMediumScore) 
    {
      setMedScore(savedMediumScore)
    }

    const hard = localStorage.getItem('hardhighscore')
    const savedHardScore = JSON.parse(hard)

    if (savedHardScore) 
    {
      setHardScore(savedHardScore)
    }

    const extreme = localStorage.getItem('extremehighscore')
    const savedExtremeScore = JSON.parse(extreme)

    if (savedExtremeScore) 
    {
      setExtremeScore(savedExtremeScore)
    }

  }, [])

  function resetScore() 
  {
    setEasyScore(0);
    setMedScore(0);
    setHardScore(0);
    setExtremeScore(0);
    localStorage.setItem('memorygamehighscore', 0);
    setFirstScore(true);
  }

  if (gameFinished == true) 
  {
    reset();
    setGameFinished(false);
    console.log(gameFinished);
  }

  function reset() 
  {
    setSeconds(0);
    setIsActive(false);
  }

  useEffect(() => 
  {
    let interval = null;

    if (isActive) 
    {
      interval = setInterval(() => 
      {
        setSeconds(seconds => seconds + 10);
      }, 10);
    } 
    else 
    {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive]);


  function startA()
  {
    setIsActive(!isActive);
    setOptions(12);
  }

  function startB() 
  {
    setIsActive(!isActive);
    setOptions(18);
  }

  function startC() 
  {
    setIsActive(!isActive);
    setOptions(24);
  }

  function startD() 
  {
    setIsActive(!isActive);
    setOptions(30);
  }

  function restart()
  {
    reset();
    setOptions(null);
  }

  function displayScores() 
  {
    swal("Easy: " + easyScore +"\n" + "Medium: " + medScore
    +"\n" + "Hard: " + hardScore + "\n" + "Extreme: " + extremeScore
    )
  }
 
  return (
     
    <div>
      <div>
        <button 
          className="resetScore"
          onClick= {() => resetScore()}>
          Reset Score
        </button>

        <button 
          className="score"
          onClick={() => displayScores()}>
          High Scores
        </button> 
      </div>

      <div 
        className="title2">
        <h1>
          Memory Game
        </h1>
      <div> 
  
        
      <div 
        className="app">
        <div 
          className="timer">

          <span 
            className="digits">
            {("0" + Math.floor((seconds / 60000) % 60)).slice(-2)}:
          </span>

          <span 
            className="digits">
            {("0" + Math.floor((seconds / 1000) % 60)).slice(-2)}.
          </span>

          <span 
            className="digits mili-sec">
            {("0" + ((seconds / 10) % 100)).slice(-2)}
          </span>
        </div>
      </div>

      </div>
        <div>
          {(options === null && isActive == false) ? 
          (
            <>
              <button 
                className="Options" 
                onClick={() => startA()}>
                Easy
              </button>

              <button 
                className="Options" 
                onClick={() => startB()}>
                Medium
              </button>

              <button 
                className="Options" 
                onClick={() => startC()}>
                Hard
              </button>

              <button 
                className="Options" 
                onClick={() => startD()}>
                Extreme
              </button>
            </>
          ) : (
            <>
                <button 
                  className="Options" 
                  onClick={() => restart()}>
                  Start Over
                </button>  
            </>
          )}
        </div>
      </div>

      {options ? (
        <MemoryGame
          isActive={isActive}
          setIsActive={setIsActive}
          seconds={seconds}
          setSeconds={setSeconds}
          gameFinished={gameFinished}
          setGameFinished={setGameFinished}
          options={options}
          setOptions={setOptions}
          easyScore={easyScore}
          medScore={medScore}
          hardScore={hardScore}
          extremeScore={extremeScore}
          setEasyScore={setEasyScore}
          setMedScore={setMedScore}
          setHardScore={setHardScore}
          setExtremeScore={setExtremeScore}
          firstScore = {firstScore}
          setFirstScore={setFirstScore}
        />
      ) : (
        <h2 
          className= "message ">
          Choose a difficulty to begin!
        </h2>
      )}
    </div>
  )
}

function MemoryGame({setSeconds, setIsActive, isActive, seconds, options, setOptions, easyScore, setEasyScore, 
  medScore, setMedScore, hardScore, setHardScore, extremeScore, setExtremeScore, firstScore, setFirstScore
 }) 
{
  const [game, setGame] = useState([])
  const [flippedCount, setFlippedCount] = useState(0)
  const [flippedIndexes, setFlippedIndexes] = useState([])
  const [gameFinished, setGameFinished] = useState(false)
  
  const colour = 
  [
    '#FF6E33',
    '#FFF233',
    '#72FF33',
    '#337CFF',
    '#33F4FF',
    '#BC33FF',
    '#FF33EC',
    '#FF3380',
    '#FF3345',
    '#8D575C',
    '#5C1C94',
    '#1C9435',
  ]

  const colourHard = 
  [
    '#d5c1e0',
    '#e6dfeb',
    '#ca92e8',
    '#a947de',
    '#9812e0',
    '#6d00a8',
    '#79389c',
    '#805e91',
    '#7d6e85',
    '#463d4a',
    '#6423a6',
    '#801fe0',
    '#a600ff',
    '#30004a',
    '#785da3',
  ]

  useEffect(() => 
  {
    const newGame = []

    if (options == 30) 
    {
      for (let index = 0; index < options/2; index++) 
      {
        const firstOption = 
        {
          id: 2 * index,
          colourId: index,
          colour: colourHard[index],
          flipped: false,
        }

        const secondOption = 
        {
          id: 2 * index + 1,
          colourId: index,
          colour: colourHard[index],
          flipped: false,
        }

        newGame.push(firstOption)
        newGame.push(secondOption)
      }

      const shuffleGame = newGame.sort(() => Math.random() - 0.5)
      setGame(shuffleGame)
    }

    else 
    {
      for (let i = 0; i < options/2; i++) 
      {
        const firstOption = 
        {
          id: 2 * i,
          colourId: i,
          colour: colour[i],
          flipped: false,
        }

        const secondOption = 
        {
          id: 2 * i + 1,
          colourId: i,
          colour: colour[i],
          flipped: false,
        }

        newGame.push(firstOption)
        newGame.push(secondOption)
      }

      const shuffleGame = newGame.sort(() => Math.random() - 0.5 )
      setGame(shuffleGame)
    }

  }, [])

  useEffect(() => 
  {
    // Loads when game variable changes
    const finished = !game.some(card => !card.flipped)

    function reset() 
    {
      setSeconds(0);
      setIsActive(false);
    }

    if (finished && game.length > 0) 
    {
      setTimeout(() => 
      {
        if(firstScore == true)
        {
          if (options == 12)
          {
            setEasyScore(Math.round(flippedCount))
            const json = JSON.stringify(Math.round(flippedCount))
            localStorage.setItem('easyhighscore', json)
            setFirstScore(false)
          } 
          
          else if (options == 18) 
          {
            setMedScore(Math.round(flippedCount))
            const json = JSON.stringify(Math.round(flippedCount))
            localStorage.setItem('mediumhighscore', json)
            setFirstScore(false)
          } 
          
          else if (options == 24) 
          {
            setHardScore(Math.round(flippedCount))
            const json = JSON.stringify(Math.round(flippedCount))
            localStorage.setItem('hardhighscore', json)
            setFirstScore(false)
          } 

          else if (options == 30) 
          {
            setExtremeScore(Math.round(flippedCount))
            const json = JSON.stringify(Math.round(flippedCount))
            localStorage.setItem('extremehighscore', json)
            setFirstScore(false)
          }
        }

        else 
        {
          if (options == 12)
          {
            if (flippedCount < easyScore) 
            {
              setEasyScore(Math.round(flippedCount))
              const json = JSON.stringify(Math.round(flippedCount))
              localStorage.setItem('easyhighscore', json)
            }
          } 
          
          else if (options == 18) 
          {
            if (flippedCount < medScore)
            {
              setMedScore(Math.round(flippedCount))
              const json = JSON.stringify(Math.round(flippedCount))
              localStorage.setItem('mediumhighscore', json)
            }
          } 
          
          else if (options == 24) 
          {
            if (flippedCount < hardScore) 
            {
              setHardScore(Math.round(flippedCount))
              const json = JSON.stringify(Math.round(flippedCount))
              localStorage.setItem('hardhighscore', json)
            }
          } 
  
          else if (options == 30) 
          {
            if (flippedCount < extremeScore)
            {
              setExtremeScore(Math.round(flippedCount))
              const json = JSON.stringify(Math.round(flippedCount))
              localStorage.setItem('extremehighscore', json)
            }
          }
        }
       
        reset();
        swal('You Win! Moves: ' + flippedCount)
   
      }, 500)
    }
  }, [game])


  if (flippedIndexes.length === 2) 
  {
    setFlippedCount(flippedCount + 1)
    localStorage.setItem('moves', flippedCount)

    // Runs if two cards have been flipped

    console.log("flipped count:" + flippedCount)

    const match = game[flippedIndexes[0]].colourId === game[flippedIndexes[1]].colourId

    if (match) 
    {
      const newGame = [...game]
      newGame[flippedIndexes[0]].flipped = true
      newGame[flippedIndexes[1]].flipped = true
      setGame(newGame)

      const newIndexes = [...flippedIndexes]
      newIndexes.push(false)
      setFlippedIndexes(newIndexes)

    } 
    
    else 
    {
      const newIndexes = [...flippedIndexes]
      newIndexes.push(true)
      setFlippedIndexes(newIndexes)
    }
  }

  if (game.length === 0) 
  {
    return (
      <div>
        loading ...
      </div>
    )
  }

  else 
  {
    return (

      <div>
        <div 
          id="cards">
          {game.map((card, index) => (

            <div 
              className= "card" key={index}>
              <Card 
                options={options}
                id={index}
                colour={card.colour}
                game={game}
                flippedCount={flippedCount}
                setFlippedCount={setFlippedCount}
                flippedIndexes= {flippedIndexes}
                setFlippedIndexes={setFlippedIndexes}/>
            </div>
          ))}
        </div>
        
        <div 
          className= "Flips">
          Moves: {flippedCount} 
        </div> 
      </div> 
    )
  }
}
  
function Card({
  options,
  id,
  colour,
  colourHard,
  game, 
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes,
}) 
{
  const [flipped, set] = useState(false)

  const {transform, opacity} = useSpring(
  {
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0} deg)`,
    config: {mass: 5, tension: 500, friction: 80},
    
  })

  useEffect(() => 
  {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) 
    {
      setTimeout(() => {
        set(state => !state)
 
        setFlippedIndexes([])
      }, 1000)

    } 
    
    else if (flippedIndexes[2] === false && id === 0)
    {
      setFlippedIndexes([])
    }

  }, [flippedIndexes])

  const onCardClick = () => 
  {
    set(state => !state)
    const newIndexes = [...flippedIndexes]
    newIndexes.push(id)
    setFlippedIndexes(newIndexes)

  }

  return (
    <div 
      onClick={onCardClick}>
      <a.div
        className= "c back"
        style = 
        {{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
        }}
      />

      <a.div
        className= "c front"
        style = 
        {{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          background: colour,
        }}
      />
    </div>
  )
} 



