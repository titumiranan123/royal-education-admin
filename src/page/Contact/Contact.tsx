/* eslint-disable @typescript-eslint/no-explicit-any */
import ReCAPTCHA from "react-google-recaptcha";
import facebook from "../../assets/socialicon/facebook.png";
import instragram from "../../assets/socialicon/insta.png";
import linkdin from "../../assets/socialicon/linkdin.png";
import youtube from "../../assets/socialicon/youtube.png";
import { useEffect, useState } from "react";
import location from "../../assets/socialicon/Location.png";
import call from "../../assets/socialicon/call.png";
import email from "../../assets/socialicon/email.png";
const ContactForm = () => {
  const [valid, setData] = useState<string | null>(null);
  function onChange(value: string | null) {
    console.log("Captcha value:", value);
    setData(value);
  }
  const handalSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="relative">
      <div className="lg:w-[400px] z-10 bg-opacity-50 h-[400px] bg-[#5C53FE] blur-[106px] -top-20 absolute"></div>
      <div className=" flex mt-[160px] flex-col items-center">
        <div className="max-w-[1240px] flex flex-col justify-center items-center z-20 mx-auto">
          <h1 className="z-50 text-[48px] flex justify-center items-center text-center text-white montserrat font-bold">
            যোগাযোগ করুন
          </h1>
          <p className=" w-[70%] mb-6 text-white text-center">
            কোর্স সম্পর্কিত যেকোনো তথ্যের জন্য যোগাযোগ করতে নীচের ফর্মটি পূরণ
            করুন | আপনি হটলাইন নম্বর বা মেসেঞ্জারের মাধ্যমেও আমাদের সাথে যোগাযোগ
            করতে পারেন। আমরা সম্ভবতঃ ২৪ ঘণ্টার মধ্যে আপনার প্রতিক্রিয়া দেব।
            আপনার সহযোগিতার জন্য ধন্যবাদ!
          </p>
        </div>
        <div className="serviceBg lg:w-[90%] opacity-60 w-full lg:h-[360px]  md:h-[180px] h-[180px] absolute top-[30%]  left-[0%] z-10  translate-x-[5%] translate-y-[-55%] blur-[95px]"></div>
        <div className="grid z-50 mt-[100px] grid-cols-1 md:grid-cols-2">
          <div className="flex  flex-col gap-2 me-auto">
            <div className="flex   flex-col">
              <h1 className="text-[32px] montserrat font-[600] text-white ">
                Lets connect with us
              </h1>
              <p className="text-[#E4E8F7] text-[16px]  mt-2 font-[400]">
                Get attractive offers, let&apos;s create stuning works <br />{" "}
                together . fill in your data and we will contact
              </p>
            </div>
            <div>
              <div className="flex gap-4 mt-4 items-center">
                <img src={location} alt="" />
                <p className="cardtitle text-lg text-white">Mohumadpur</p>
              </div>
              <a
                href="tel:+8801960807711"
                className="flex gap-4 mt-4 items-center"
              >
                <img src={call} alt="" />
                <p className="cardtitle text-lg text-white">+8801960807711</p>
              </a>
              <a
                href="mailto:royaleducation711@gmail.com"
                className="flex gap-4 mt-4 items-center"
              >
                <img src={email} alt="" />
                <p className="cardtitle text-lg text-white">
                  royaleducation711@gmail.com
                </p>
              </a>
            </div>
            <div className="flex  gap-3 mt-[37px] items-center">
              <img
                // className="bg-white rounded-xl w-[38px] h-[38px]"
                src={facebook}
              />
              <img src={instragram} />
              <img src={linkdin} />
              <img src={youtube} />
            </div>
          </div>
          <div className="relative">
            <form action="" className="z-20 relative" onSubmit={handalSubmit}>
              <div className="z-20">
                <input
                  type="text"
                  className="px-[32px] text-white bg-[#1D1F20] rounded-[8px] backdrop-blur-[160px] opacity-60 md:w-[530px] h-[70px] py-4 focus:outline-none outline-none"
                  placeholder="Name"
                />
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  className="px-[32px] text-white bg-[#1D1F20] rounded-[8px] backdrop-blur-[160px] opacity-60 md:w-[530px] h-[70px] py-4 focus:outline-none outline-none"
                  placeholder="Email"
                />
              </div>
              <div className="mt-4">
                <textarea
                  className="px-[32px] bg-[#1D1F20] rounded-[8px] backdrop-blur-[160px] opacity-60 text-white md:w-[530px] h-[210px] py-4 focus:outline-none outline-none"
                  placeholder="Type your message here"
                />
              </div>
              <div className="flex justify-between items-center  mt-4">
                <div>
                  <ReCAPTCHA
                    sitekey="6LdzUIspAAAAAJf94NhiINFgYhq1NcEOr5zuscmr"
                    onChange={onChange}
                  />
                </div>
                <div
                  className={` ${!valid ? "cursor-no-drop" : "cursor-pointer"}`}
                >
                  <button
                    className={`btn subscribe  px-6 py-2 rounded-[33px] text-white border-none transition duration-300 ${
                      !valid
                        ? "cursor-not-allowed pointer-events-none"
                        : "cursor-pointer"
                    }`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
            <div className="lg:w-[400px] z-10 bg-opacity-50 h-[400px] bg-[#5C53FE] blur-[106px] top-20 absolute"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
