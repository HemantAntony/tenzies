import React from "react"
import Die from "./components/Die"
import Confetti from "react-confetti"

function App() {
  const [tenzies, setTenzies] = React.useState(false)
  const [dice, setDice] = React.useState(allNewDice())
  const [rolls, setRolls] = React.useState(0)
  const [time, setTime] = React.useState(0)
  const [bestTime, setBestTime] = React.useState(0)

  // localStorage.setItem("bestTime", 2000)

  React.useEffect(() => {
    const firstValue = dice[0].value
    const isTenzies = dice.every(die => die.isHeld && die.value === firstValue)
    if (isTenzies) {
      setTenzies(true)
      if (time < bestTime) {
        localStorage.setItem("bestTime", time)
        setBestTime(time)
      }
    }
  }, [dice])

  React.useEffect(() => {
    setBestTime(localStorage.getItem("bestTime"))
  }, [])

  function allNewDice() {
    let dice = []
    for (let i = 0; i < 10; i++) {
      dice.push(generateNewDie(i))
    }
    return dice
  }

  function generateNewDie(index) {
    return {
      id: index,
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    }
  }

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice())
      setTenzies(false)
      setRolls(0)
      setTime(0)
      return
    }

    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie(die.id)
    }))
    setRolls(rolls => rolls + 1)
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }

  React.useEffect(() => {
    console.log(tenzies)
    if (tenzies)
      return

    const interval = setInterval(() => {
      setTime(oldTime => oldTime + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [time, tenzies])

  function formatTime(time) {
    if (time >= 3600) {
      const hours = Math.floor(time / 3600)
      let minutes = Math.floor((time / 60) % 60)
      minutes = minutes < 10 ? "0" + minutes : minutes
      let seconds = time % 60
      seconds = seconds < 10 ? "0" + seconds : seconds
      return `${hours}:${minutes}:${seconds}`
    } else if (time >= 60) {
      const minutes = Math.floor(time / 60)
      let seconds = time % 60
      seconds = seconds < 10 ? "0" + seconds : seconds
      return `${minutes}:${seconds}`
    } else {
      return time
    }
  }
  
  const diceElements = dice.map(dieObject=><Die key={dieObject.id} isHeld={dieObject.isHeld} value={dieObject.value} onHold={()=>holdDice(dieObject.id)}/>)
  
  return (
    <div className="App">
      <main>
        {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
        <h2 className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h2>
        <div className="die--stats">
          <h3>{`Number of rolls: ${rolls}`}</h3>
          <h3>{`Time: ${formatTime(time)}`}</h3>
          <h3>{`Best time: ${formatTime(bestTime)}`}</h3>
        </div>
        <div className="die--grid">
          {diceElements}
        </div>
        <button className="roll" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    </div>
  );
}

export default App;
