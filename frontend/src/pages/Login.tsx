import React from "react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";

const Login = () => {
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
            to="/login"
            className="text-[14px] text-[#333E48] tracking-wide hover:text-yellow-500 p-[1rem]"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="w-[100%] flex justify-between">
        <div className="w-[48%] border border-black-100 p-[15px] min-h-[20px] mb-[20px]">
          <h3 className="text-[#333e48] font-medium text-[16px] mb-[15px]">
            New Customer
          </h3>
          <p className="mb-[12px]">
            <strong className="font-semibold text-[#333e48]">
              Register Account
            </strong>
          </p>
          <p className="text-[14px] text-[#333e48] leading-[26px] font-normal tracking-[0.5px] mb-[10px]">
            By creating an account you will be able to shop faster, be up to
            date on an order's status, and keep track of the orders you have
            previously made.
          </p>
          <div className="flex">
            <Link
              to="/register b"
              className="pt-[9px] pb-[9px] pl-[40px] pr-[25px] min-w-[170px] bg-[#fed700] border border-[#fed700] text-[#333e48] uppercase text-[14px] font-medium hover:bg-[#333e48] hover:text-[#fff] hover:border-[#333e48]"
            >
              Continue
            </Link>
          </div>
        </div>
        <div className="w-[48%] border border-black-100 p-[15px] min-h-[20px] mb-[20px]">
          <h3 className="text-[#333e48] font-medium text-[16px] mb-[15px]">
            Returning Customer
          </h3>
          <p className="mb-[12px]">
            <strong className="font-semibold text-[#333e48]">
              I am a returning customer
            </strong>
          </p>
          <div className="w-100">
            <form>
              <div className="flex justify-between w-[100%] mb-[1rem] flex-col">
                <label
                  htmlFor="Email"
                  className="text-[14px] font-semibold text-[#333E48] mb-[3px]"
                >
                  E-Mail Address:
                </label>
                <input
                  type="email"
                  className="w-[100%] pt-[6px] pb-[6px] pl-[12px] pr-[12px] text-[#333E48] bg-[#fff] border border-[#eaeaea] h-[40px] focus:outline-none"
                  placeholder="E-Mail"
                />
              </div>
              <div className="flex justify-between w-[100%] mb-[1rem] flex-col">
                <label
                  htmlFor="Password"
                  className="text-[14px] font-semibold text-[#333E48] mb-[3px]"
                >
                  Password:
                </label>
                <input
                  type="text"
                  className="w-[100%] pt-[6px] pb-[6px] pl-[12px] pr-[12px] text-[#333E48] bg-[#fff] border border-[#eaeaea] h-[40px] focus:outline-none"
                  placeholder="Password"
                />
              </div>

              <div className="flex justify-end items-center">
                <input
                  type="submit"
                  value="Login"
                  className="font-medium text-center pt-[7px] pb-[7px] pl-[20px] pr-[20px] uppercase leading-[24px] bg-[#fed700] hover:text-[#fff] hover:border-[#333e48] hover:bg-[#333e48]"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
