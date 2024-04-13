import React from "react";
import Smeb from "../../assets/images/smeb.jpeg"

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <marquee className="text-xl font-bold">Registration Are Opened on SMEB</marquee>
      <h1 >Welcome To</h1>
      <div className="img-align">
        <img src={Smeb} alt="smeb" className="rounded " title="Society of Marine Engineers, Bangladesh"/>
      </div>
      <h1 className="text-xl">সোসাইটি অব মেরিন ইন্জিনিয়ার্স, বাংলাদেশ।</h1>
      <h1 className="text-xl animate-bounce ">Society of Marine Engineers, Bangladesh</h1>      
    </div>
  );
};

export default Home;
