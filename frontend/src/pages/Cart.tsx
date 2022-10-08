import React from "react";
import { AiFillHome } from "react-icons/ai";
import { BiRefresh } from "react-icons/bi";
import { MdCancel } from "react-icons/md";
import { Link } from "react-router-dom";
import Accordion from "../components/Accordion/Accordion";
import Coupon from "../components/Accordion/Coupon";
import Gift from "../components/Accordion/Gift";
import Shipping from "../components/Accordion/Shipping";

const Cart = () => {
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
            to="/cart"
            className="text-[14px] text-[#333E48] tracking-wide hover:text-yellow-500 p-[1rem]"
          >
            My Cart
          </Link>
        </div>
      </div>
      <div>
        <h1 className="uppercase font-semibold text-[#333e48] mb-[20px] pt-[10px] text-[18px]">
          MY CART
        </h1>

        <div className="text-[#262626]">
          <table className="w-full border border-black-100 text-left  text-[14px] bg-transparent">
            <thead className="uppercase bg-[#f8f8f8] font-semibold">
              <tr>
                <th
                  scope="col"
                  className="py-3 px-6 border-r-2 border-black-100 w-[118px]"
                >
                  Image
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 w-[289px] border-r-2 border-black-100"
                >
                  Product Name
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 border-r-2 border-black-100 w-[106px]"
                >
                  Model
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 border-r-2 border-black-100 w-[198px]"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="py-3 px-6 w-[99px] border-r-2 border-black-100"
                >
                  Unit Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-transparent border-b-2 border-black-100">
                <td
                  scope="row"
                  className="py-4 px-6 border-r-2 border-black-100 flex justify-center w-[118px]"
                >
                  <img
                    src="https://capricathemes.com/opencart/OPC09/OPC090216/OPC1/image/cache/catalog/01-85x93.jpg"
                    alt=""
                  />
                </td>
                <td className="py-4 px-6 border-r-2 border-black-100 w-[289px]">
                  Itaque earum rerum hic tenetur alias
                </td>
                <td className="py-4 px-6 border-r-2 border-black-100">
                  Laptop
                </td>
                <td className="py-4 px-6 border-r-2 border-black-100 w-[198px]">
                  <div className="flex justify-between items-center w-[100%]">
                    <div>
                      <input
                        type="text"
                        className="h-[40px] text-center border border-black-100 focus:outline-none w-[45px]"
                        value={1}
                        disabled
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="pt-[9px] pb-[9px] pl-[15px] pr-[15px]  bg-[#fed700] border border-[#fed700] text-[#333e48] uppercase text-[14px] font-medium hover:bg-[#333e48] hover:text-[#fff] hover:border-[#333e48] h-[40px]"
                      >
                        <BiRefresh />
                      </button>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="pt-[9px] pb-[9px] pl-[15px] pr-[15px]  bg-[#D9534F] border border-[#D9534F] text-gray-50 uppercase text-[14px] font-medium hover:bg-[#d43f3a] hover:text-[#fff] hover:border-[#d43f3a] h-[40px]"
                      >
                        <MdCancel />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 border-r-2 border-black-100 w-[99px] border-r-2 border-black-100">
                  $90.00
                </td>
                <td className="py-4 px-6 border-r-2 border-black-100">
                  $85.00
                </td>
              </tr>
              <tr className="bg-transparent border-b-2 border-black-100">
                <td
                  scope="row"
                  className="py-4 px-6 border-r-2 border-black-100 flex justify-center w-[118px]"
                >
                  <img
                    src="https://capricathemes.com/opencart/OPC09/OPC090216/OPC1/image/cache/catalog/01-85x93.jpg"
                    alt=""
                  />
                </td>
                <td className="py-4 px-6 border-r-2 border-black-100 w-[289px]">
                  Itaque earum rerum hic tenetur alias
                </td>
                <td className="py-4 px-6 border-r-2 border-black-100">
                  Laptop
                </td>
                <td className="py-4 px-6 border-r-2 border-black-100 w-[198px]">
                  <div className="flex justify-between items-center w-[100%]">
                    <div>
                      <input
                        type="text"
                        className="h-[40px] text-center border border-black-100 focus:outline-none w-[45px]"
                        value={1}
                        disabled
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="pt-[9px] pb-[9px] pl-[15px] pr-[15px]  bg-[#fed700] border border-[#fed700] text-[#333e48] uppercase text-[14px] font-medium hover:bg-[#333e48] hover:text-[#fff] hover:border-[#333e48] h-[40px]"
                      >
                        <BiRefresh />
                      </button>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="pt-[9px] pb-[9px] pl-[15px] pr-[15px]  bg-[#D9534F] border border-[#D9534F] text-gray-50 uppercase text-[14px] font-medium hover:bg-[#d43f3a] hover:text-[#fff] hover:border-[#d43f3a] h-[40px]"
                      >
                        <MdCancel />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 border-r-2 border-black-100 w-[99px] border-r-2 border-black-100">
                  $90.00
                </td>
                <td className="py-4 px-6 border-r-2 border-black-100">
                  $85.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="font-bold text-[#333E48] mb-[15px] text-[16px] mt-[15px]">
            What would you like to do next?
          </h3>
          <p className="text-[14px] mb-[10px]">
            Choose if you have a discount code or reward points you want to use
            or would like to estimate your delivery cost.
          </p>
          <div className="w-[100%] mb-[20px]">
            <Accordion title="Use Coupon Code">
              <Coupon />
            </Accordion>
            <Accordion title="Estimate Shipping & Taxes">
              <Shipping />
            </Accordion>
            <Accordion title="Use Gift Certificate">
              <Gift />
            </Accordion>
          </div>
        </div>

        <div className="w-[100%] flex justify-end items-center mb-[30px]">
          <table className="w-full border border-black-100 text-left  text-[14px] bg-transparent w-[40%]">
            <tbody>
              <tr className="bg-transparent border-b-2 border-black-100">
                <td className="py-4 px-6 border-r-2 border-black-100 font-semibold">
                  Sub-Total:
                </td>
                <td className="py-4 px-6 border-r-2 border-black-100">
                  $85.00
                </td>
              </tr>
              <tr className="bg-transparent border-b-2 border-black-100">
                <td className="py-4 px-6 border-r-2 border-black-100 font-semibold">
                  Total:
                </td>
                <td className="py-4 px-6 border-r-2 border-black-100">
                  $85.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="w-[100%] flex justify-between items-center">
          <button className="font-semibold text-[14px] text-center pt-[7px] text-[#fff] pb-[7px] pl-[20px] pr-[20px] uppercase leading-[24px] bg-[#333e48] hover:text-[#000] hover:border-[#333e48] hover:bg-[#fed700]">
            continue shopping
          </button>
          <button className="font-semibold text-[14px] text-center pt-[7px] pb-[7px] pl-[20px] pr-[20px] uppercase leading-[24px] bg-[#fed700] hover:text-[#fff] hover:border-[#333e48] hover:bg-[#333e48]">
            checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
