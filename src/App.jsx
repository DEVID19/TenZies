import { useState } from "react";
import "./App.css";
import Die from "./Die";

function App() {
  const [dice, setDice] = useState(generateAllNewDice());

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6));
  }

  function rollDice() {
    setDice(generateAllNewDice());
  }
  const diceElements = dice.map((num) => <Die value={num} />);

  return (
    <main>
      <div className="grid grid-rows-[auto_auto] grid-cols-5 gap-5">
        {diceElements}
      </div>
      <button
        onClick={rollDice}
        className="h-[50px] whitespace-nowrap w-auto px-[21px] py-[6px] border-none rounded-[6px] bg-[#5035FF] text-white text-[1.2rem]"
      >
        Roll
      </button>
    </main>
  );
}

export default App;
