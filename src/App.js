import Die from "./components/Die"

function App() {
  return (
    <div className="App">
      <main>
        <div className="die--grid">
          <Die />
          <Die className="green"/>
          <Die />
          <Die />
          <Die />
          <Die />
          <Die />
          <Die />
          <Die />
          <Die />
        </div>
      </main>
    </div>
  );
}

export default App;
