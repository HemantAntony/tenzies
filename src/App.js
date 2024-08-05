import React from "react"
import Die from "./components/Die"

function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    let dice = []
    for (let i = 0; i < 10; i++) {
      dice.push(Math.floor(Math.random() * 6) + 1)
    }
    return dice
  }

  function rollDice() {
    setDice(allNewDice())
  }

  const diceElements = dice.map(die=><Die value={die}/>)
  
  return (
    <div className="App">
      <main>
        <div className="die--grid">
          {diceElements}
        </div>
        <button className="roll" onClick={rollDice}>Roll</button>
      </main>
    </div>
  );
}

export default App;
