import React, { useState } from "react";

const Accordion = (props: { title: string; children: JSX.Element }) => {
  const [isActive, setIsActive] = useState<Boolean>(false);

  return (
    <div className="w-[100%] mb-[8px]">
      <div className="accordion-item">
        <div
          className="flex flex-row justify-between cursor-pointer bg-[#F8F8F8] hover:bg-transparent p-[1rem] hover:border hover:border-black-300"
          onClick={() => setIsActive(!isActive)}
        >
          <div>
            <h4 className="text-[#444] font-semibold p-[10px] text-[14px]">
              {props.title}
            </h4>
          </div>
          <div className="flex items-center">{isActive ? "-" : "+"}</div>
        </div>
        {isActive && (
          <div className="p-[30px] bg-transparent border border-black-300 text-[14px]">
            {props.children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Accordion;
