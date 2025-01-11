/* eslint-disable react/prop-types */

const Die = ({ value }) => {
  return (
    <button className="h-[50px] w-[50px] shadow-md rounded-[10px] border-none bg-white font-sans text-[1.75rem] font-bold cursor-pointer">
      {value}
    </button>
  );
};

export default Die;
