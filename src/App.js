import React from "react"
import Die from "./components/Die"

function App() {
  const [dice, setDice] = React.useState(allNewDice());

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
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDie(die.id)
    }))
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }

  const diceElements = dice.map(dieObject=><Die key={dieObject.id} isHeld={dieObject.isHeld} value={dieObject.value} onHold={()=>holdDice(dieObject.id)}/>)
  
  return (
    <div className="App">
      <main>
        <h1 className="title">Tenzies</h1>
        <h2 className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h2>
        <div className="die--grid">
          {diceElements}
        </div>
        <button className="roll" onClick={rollDice}>Roll</button>
      </main>
    </div>
  );
}

export default App;
