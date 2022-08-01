import React, { useState, useEffect } from 'react';
import "./App.css";
import Die from './components/Die';
import Welcome from './components/Welcome';
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { useStopwatch } from 'react-timer-hook';
import Settings from './components/Settings';

const App = () => {
  // Variables
  const [dice, setDice] = useState(addNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [buttonText, setBottonText] = useState("")
  const [isRolledGame, setIsRolledGame] = useState(false)
  const [isStartedGame, setIsStartedGame] = useState(false)
  const [isFinishedGame, setIsFinishedGame] = useState(false)
  const [isAdjusting, setIsAdjusting] = useState(false)
  const { seconds, start, pause, reset, minutes } = useStopwatch({ autoStart: false });

  // An Array of Dies 
  const diceElements = dice.map(die =>
    <Die
      heldChecker={heldChecker}
      id={die.id}
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
    />)

  // Starting The Game 
  function startGame() {
    setIsStartedGame(true)
  }

  // Winning Proccess
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld)
    const firstValue = dice[0].value
    const allValues = dice.every((die) => die.value === firstValue)

    if (allHeld && allValues) {
      setTenzies(true)
      setBottonText("Start A New Game")
      pause()
      setIsFinishedGame(true)
    } else if (!isRolledGame) {
      setBottonText("Start")
    } else {
      setBottonText("roll")
    }
  }, [dice])

  // Generate Die
  function generateDie() {
    const randomNumber = Math.ceil(Math.random() * 6)
    return {
      id: nanoid(),
      isHeld: false,
      value: randomNumber
    }
  }
  // Creating a new Array of dies
  function addNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(generateDie())
    }
    return newDice
  }

  // Checking if Die is held or not
  function heldChecker(id) {
    if (isRolledGame) {
      setDice(oldDice => oldDice.map(die => {
        return id === die.id ? { ...die, isHeld: !die.isHeld } : die
      }))
    }
  }

  // Rolling Dice
  function rollDice() {
    if (isFinishedGame) {
      reset()
      setIsFinishedGame(false)
    } else if (!isRolledGame) {
      reset()
      setIsRolledGame(true)
    }

    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? { ...die } : generateDie()
      }))
    } else {
      setTenzies(false)
      setDice(addNewDice())
    }
  }

  function restart() {
    // setIsStartedGame(false) //For returning to welcome
    setIsRolledGame(false)
    setIsFinishedGame(false)
    setTenzies(false)
    reset()
    pause()
    setDice(addNewDice())
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? {...die, isHeld: !die.isHeld} : die 
    }))
  }

  // Get Back to welcome Section
  function backToWelcome() {
    setIsAdjusting(false)
    setIsStartedGame(false) //For returning to welcome
    setIsRolledGame(false)
    setIsFinishedGame(false)
    setTenzies(false)
    reset()
    pause()
    setDice(addNewDice())
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? {...die, isHeld: !die.isHeld} : die 
    }))
  }

  // Opening Settings Section
  function openSettings() {
    setIsAdjusting(true)
  }

  return (
    <main>
      {isStartedGame ?
        <div className="main">
          {tenzies && <Confetti
            className="confetti"
            width="1100px"
            height="870px"
          />}
          <h1 className="title">Tenzies game</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <h4 className="timer">{`Timer - ${minutes}:${seconds}`} </h4>
          {/* <h4 className="best_time">{`Your Best Time - ${bestTime}`} </h4> */}
          <div className="die-container">
            {diceElements}
          </div>
          <div className="die-buttons">
            <button className="roll-dice button" onClick={rollDice}>{buttonText}</button>
            <button className="restart-button button" onClick={restart}>Restart  </button>
          </div>
          <button className="back-button" onClick={backToWelcome}>Back</button>
        </div>  
        : !isStartedGame && !isAdjusting ?
        <Welcome handleClick={startGame} openSettings={openSettings}/>
        // : isAdjusting ? 
        // <Settings backToWelcome={backToWelcome}/>
        : <div></div>
      }
    </main>
  );
}

export default App;
