import React from "react";

const Gift = () => {
  return (
    <div>
      <form className="flex justify-between items-center">
        <label htmlFor="" className="w-[17%] font-semibold">
          Enter your gift certificate code here
        </label>
        <input
          type="text"
          className="w-[60%] pt-[6px] pb-[6px] pl-[12px] pr-[12px] text-[#333E48] bg-[#fff] border border-[#eaeaea] h-[40px] focus:outline-none"
          placeholder="Enter your gift certificate code here"
        />
        <input
          type="submit"
          value="apply voucher"
          className="w-[17%] font-semibold text-center pt-[7px] pb-[7px] pl-[20px] pr-[20px] uppercase leading-[24px] bg-[#fed700] hover:text-[#fff] hover:border-[#333e48] hover:bg-[#333e48]"
        />
      </form>
    </div>
  );
};

export default Gift;
