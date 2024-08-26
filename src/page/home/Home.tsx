import React, { useEffect, useState } from "react";
import Header from "../../components/home/Header";
import CardSlider from "../../components/home/Category";
import Academy from "../../components/home/SSC&HSC/Academy";
import Jobdesk from "../../components/home/Job/Job";
import Admission from "../../components/home/admission/Admission";
import Testimonial from "../../components/home/testimonial/Testimonial";
import Popup from "../../Add/Popup";
import Coursestab from "../../components/Allcourse/Coursestab";


const Home: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000000); // 20 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  return (
    <div>
      <Header />
      <CardSlider />
      {/* <NewCourses /> */}
      <Coursestab />
      <Academy />
      <Admission />
      <Jobdesk />
      {/* <Books /> */}
      <Testimonial />
      {showPopup && <Popup onClose={handleClosePopup} />}
    </div>
  );
};

export default Home;
