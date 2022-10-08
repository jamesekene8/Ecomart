import React, { useState } from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

//This registers the language you want to use
countries.registerLocale(enLocale);

//Returns an object and not a list
const countryObj = countries.getNames("en", { select: "official" });

const countryArr = Object.entries(countryObj).map(([key, value]) => {
  return {
    label: value,
    value: key,
  };
});

const Shipping = () => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const selectCountryHandler = (value: any) => setSelectedCountry(value);

  return (
    <div>
      <p className="text-[14px] mb-[10px]">
        Enter your destination to get a shipping estimate.
      </p>
      <form>
        <div className="flex justify-between items-center w-[100%] mb-[1rem]">
          <label
            htmlFor="Name"
            className="text-[14px] font-semibold text-[#333E48] w-[25%]"
          >
            Your Name:
          </label>
          <select
            className="w-[75%] pt-[6px] pb-[6px] pl-[12px] pr-[12px] text-[#333E48] bg-[#fff] border border-[#eaeaea] h-[40px] focus:outline-none"
            value={selectedCountry}
            onChange={(e) => selectCountryHandler(e.target.value)}
          >
            {countryArr.map(({ label, value }) => (
              <option value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-between items-center w-[100%] mb-[1rem]">
          <label
            htmlFor="Region"
            className="text-[14px] font-semibold text-[#333E48] w-[25%]"
          >
            Region/State:
          </label>
          <input
            type="text"
            className="w-[75%] pt-[6px] pb-[6px] pl-[12px] pr-[12px] text-[#333E48] bg-[#fff] border border-[#eaeaea] h-[40px] focus:outline-none"
          />
        </div>
        <div className="flex justify-between items-center w-[100%] mb-[1rem]">
          <label
            htmlFor="PostalCode"
            className="text-[14px] font-semibold text-[#333E48] w-[25%]"
          >
            Postal Code:
          </label>
          <input
            type="text"
            className="w-[75%] pt-[6px] pb-[6px] pl-[12px] pr-[12px] text-[#333E48] bg-[#fff] border border-[#eaeaea] h-[40px] focus:outline-none"
          />
        </div>
        <div className="flex items-center">
          <input
            type="submit"
            value="GET QUOTE"
            className="text-[14px] font-semibold text-center pt-[7px] pb-[7px] pl-[20px] pr-[20px] uppercase leading-[24px] bg-[#fed700] hover:text-[#fff] hover:border-[#333e48] hover:bg-[#333e48]"
          />
        </div>
      </form>
    </div>
  );
};

export default Shipping;
