/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./Playbutton.css";
import { useSelector } from "react-redux";
import userpic from "../../assets/userimg.png";
const Playbutton: React.FC = () => {
  const user = useSelector((state: any) => state.user);
  console.log(user.user.photoUrl);
  return (
    <div>
      <a className="video-launch video-play-button flex justify-center items-center">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 md:w-[61px] rounded-full md:h-[61px] w-[30px] h-[30px] z-50 p-[3px]  ">
          <img
            className="md:w-[55px] rounded-full md:h-[55px] w-[30px] h-[30px]"
            src={!user?.user.photoUrl ? userpic : user.user.photoUrl}
            alt=""
          />
        </div>
      </a>
    </div>
  );
};

export default Playbutton;
