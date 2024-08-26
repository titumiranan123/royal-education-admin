import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface AccordionItemProps {
  title: string;
  description: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  description,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-0 border-b border-dashed last:border-none p-5">
      <button
        className="py-4 cursor-pointer w-full flex justify-between"
        onClick={toggleAccordion}
        aria-expanded={isOpen ? "true" : "false"}
      >
        <h2 className="font-medium text-base flex items-center gap-4">
          {" "}
          <span className="flex bg-white h-[2px] w-3"></span> {title}
        </h2>
        <div>{!isOpen ? <FaAngleDown /> : <FaAngleUp />}</div>
      </button>
      {isOpen && (
        <div className="px-0 pb-2 text-gray-500">
          <p className="mb-4">{description}</p>
        </div>
      )}
    </div>
  );
};

interface AccordionProps {
  items: AccordionItemProps[];
}

const Courseaccordion: React.FC<AccordionProps> = ({ items }) => {
  return (
    <div>
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          title={item.title}
          description={item.description}
        />
      ))}
    </div>
  );
};

export default Courseaccordion;
