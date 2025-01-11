/* eslint-disable react/no-unknown-property */
import { useState, useRef, useEffect } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);
  const gamewon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => dice.value === die[0].value);
  useEffect(() => {
    if (gamewon) {
      buttonRef.current.focus();
    }
  }, [gamewon]);
  
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (!gamewon) {
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setDice(generateAllNewDice());
    }
  }
  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  return (
    <main>
      {gamewon && <Confetti />}
      <div aria-live="polite" className="sr-only">
        {gamewon && (
          <p>Congratulations! You won! Press New Game to start again.</p>
        )}
      </div>
      <h1
        className="font-size: 40px;
    margin: 0;"
      >
        Tenzies
      </h1>
      <p className="font-sans font-normal mt-0 text-center">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="grid grid-rows-[auto_auto] grid-cols-5 gap-5">
        {diceElements}
      </div>
      <button
        onClick={rollDice}
        ref={buttonRef}
        className="h-[50px] whitespace-nowrap w-auto px-[21px] py-[6px] border-none rounded-[6px] bg-[#5035FF] text-white text-[1.2rem]"
      >
        {gamewon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
