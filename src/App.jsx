import { useState, useRef, useEffect } from "react";
import "./App.css";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Watch from "./Watch"; 

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const [gameRunning, setGameRunning] = useState(false);
  const [firstRollStarted, setFirstRollStarted] = useState(false); // Track first roll
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function rollDice() {
    if (!gameWon) {
      setGameRunning(true); // Start timer when rolling
      setDice((oldDice) =>
        oldDice.map((die) =>
          die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
        )
      );
    } else {
      setGameRunning(false); // Stop timer on a new game
      setDice(generateAllNewDice());
    }
  }

  function hold(id) {
    if (!firstRollStarted) {
      setFirstRollStarted(true); // Start the timer on the first interaction
      setGameRunning(true);
    }

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
    <>
    <Watch gameRunning={gameRunning} gameWon={gameWon} /> 
    <main>
      <div
        aria-live="polite"
        className="w-fit text-sm font-bold text-green-600"
      >
        {gameWon ? (
          <p>Congratulations! You won! Press New Game to start again.</p>
        ) : (
          ""
        )}
      </div>
      {gameWon && <Confetti />}
      <h1 className="text-[40px] m-0">Tenzies</h1>
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
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
    </>);
}

export default App;
