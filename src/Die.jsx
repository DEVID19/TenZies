/* eslint-disable react/prop-types */

const Die = ({ value, isHeld, hold }) => {
  const styles = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  return (
    <button
      className="h-[50px] w-[50px] shadow-md rounded-[10px] border-none bg-white font-sans text-[1.75rem] font-bold cursor-pointer"
      aria-pressed={isHeld}
      aria-label={`Die with value ${value}, 
            ${isHeld ? "held" : "not held"}`}
      style={styles}
      onClick={hold()}
    >
      {value}
    </button>
  );
};

export default Die;
