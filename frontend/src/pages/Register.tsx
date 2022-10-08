import React from "react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div>
      <div className="flex justify-end items-center">
        <div className="flex justify-center items-center">
          <Link to="/" className="p-[1rem]">
            <AiFillHome className="hover:text-yellow-500" />
          </Link>
        </div>
        <div>|</div>
        <div className="flex justify-center items-center">
          <Link
            to="/"
            className="text-[14px] text-[#333E48] tracking-wide hover:text-yellow-500 p-[1rem]"
          >
            Account
          </Link>
        </div>
        <div>|</div>
        <div className="flex justify-center items-center">
          <Link
            to="/register"
            className="text-[14px] text-[#333E48] tracking-wide hover:text-yellow-500 p-[1rem]"
          >
            Register
          </Link>
        </div>
      </div>
      <div>
        <h1 className="uppercase font-semibold text-[#333e48] mb-[20px] pt-[10px] text-[18px]">
          register account
        </h1>
        <p className="text-[#333e48] font-normal text-[14px] leading-[26px] tracking-[0.5px]">
          If you already have an account with us, please login at the login
          page.
          <Link to="/login" className="text-blue-500 underline ">
            Click here
          </Link>
        </p>
      </div>
      <div>
        <legend className="text-[16px] font-medium mb-[20px] pt-[12px] pb-[12px] w-[100%] border-b-2 border-black-100">
          Your Personal Details
        </legend>
        <div className="w-100">
          <form>
            <div className="flex justify-between items-center w-[100%] mb-[1rem]">
              <label
                htmlFor="FirstName"
                className="text-[14px] font-semibold text-[#333E48] w-[25%]"
              >
                First Name:
              </label>
              <input
                type="text"
                className="w-[75%] pt-[6px] pb-[6px] pl-[12px] pr-[12px] text-[#333E48] bg-[#fff] border border-[#eaeaea] h-[40px] focus:outline-none"
                placeholder="First Name"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mb-[1rem]">
              <label
                htmlFor="LastName"
                className="text-[14px] font-semibold text-[#333E48] w-[25%]"
              >
                Last Name:
              </label>
              <input
                type="text"
                className="w-[75%] pt-[6px] pb-[6px] pl-[12px] pr-[12px] text-[#333E48] bg-[#fff] border border-[#eaeaea] h-[40px] focus:outline-none"
                placeholder="Last Name"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mb-[1rem]">
              <label
                htmlFor="Email"
                className="text-[14px] font-semibold text-[#333E48] w-[25%]"
              >
                E-Mail:
              </label>
              <input
                type="email"
                className="w-[75%] pt-[6px] pb-[6px] pl-[12px] pr-[12px] text-[#333E48] bg-[#fff] border border-[#eaeaea] h-[40px] focus:outline-none"
                placeholder="E-Mail"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mb-[1rem]">
              <label
                htmlFor="telephone"
                className="text-[14px] font-semibold text-[#333E48] w-[25%]"
              >
                Telephone:
              </label>
              <input
                type="text"
                className="w-[75%] pt-[6px] pb-[6px] pl-[12px] pr-[12px] text-[#333E48] bg-[#fff] border border-[#eaeaea] h-[40px] focus:outline-none"
                placeholder="Telephone"
              />
            </div>
            <legend className="text-[16px] font-medium mb-[20px] pt-[12px] pb-[12px] w-[100%] border-b-2 border-black-100">
              Your Password
            </legend>
            <div className="flex justify-between items-center w-[100%] mb-[1rem]">
              <label
                htmlFor="Password"
                className="text-[14px] font-semibold text-[#333E48] w-[25%]"
              >
                Password:
              </label>
              <input
                type="text"
                className="w-[75%] pt-[6px] pb-[6px] pl-[12px] pr-[12px] text-[#333E48] bg-[#fff] border border-[#eaeaea] h-[40px] focus:outline-none"
                placeholder="Password"
              />
            </div>
            <div className="flex justify-between items-center w-[100%] mb-[1rem]">
              <label
                htmlFor="PasswordConfirm"
                className="text-[14px] font-semibold text-[#333E48] w-[25%]"
              >
                Password Confirm:
              </label>
              <input
                type="text"
                className="w-[75%] pt-[6px] pb-[6px] pl-[12px] pr-[12px] text-[#333E48] bg-[#fff] border border-[#eaeaea] h-[40px] focus:outline-none"
                placeholder="Password Confirm"
              />
            </div>
            <div className="flex justify-end items-center">
              <input
                type="submit"
                value="Register"
                className="font-medium text-center pt-[7px] pb-[7px] pl-[20px] pr-[20px] uppercase leading-[24px] bg-[#fed700] hover:text-[#fff] hover:border-[#333e48] hover:bg-[#333e48]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
