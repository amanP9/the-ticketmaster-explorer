import React from "react";
import { BiCalendarEvent } from "react-icons/bi";
import { BsFire } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { BiHomeHeart } from "react-icons/bi";

const Navbar = () => {
  return (
    <nav className={"bg-blue-100 text-gray-800 shadow-xl"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <div className="flex items-center ml-1">
              <a href="/">
                <img
                  className="h-14 w-auto"
                  src="/images/logo.svg"
                  alt="TicketMaster Logo"
                />
              </a>
              <a
                href="/"
                className="hover:text-blue-500 text-lg font-bold ml-2"
              >
                TicketMaster API
              </a>
            </div>
          </div>
          <div className="hidden md:block ml-auto">
            <div className="ml-10 flex items-center space-x-4">
              <a
                href="/"
                className="hover:text-blue-500
                px-3 py-2 rounded-md text-sm font-bold flex items-center"
              >
                <BiHomeHeart className="mr-1 h-10" />
                Home
              </a>
              <a
                href="/events"
                className="hover:text-blue-500
                px-3 py-2 rounded-md text-sm font-bold flex items-center"
              >
                <BiCalendarEvent className="mr-1 h-10" />
                Events
              </a>
              <a
                href="/attractions"
                className={
                  "hover:text-blue-500 px-3 py-2 rounded-md text-sm font-bold flex items-center"
                }
              >
                <BsFire className="mr-1 h-10" />
                Attractions
              </a>
              <a
                href="/venues"
                className={
                  "hover:text-blue-500 px-3 py-2 rounded-md text-sm font-bold flex items-center"
                }
              >
                <ImLocation className="mr-1 h-10" />
                Venues
              </a>
            </div>
          </div>
          <div className="flex items-center"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
