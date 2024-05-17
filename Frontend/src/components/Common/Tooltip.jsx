import React, { useState } from "react";

const Tooltip = ({ children, content }) => {
  const [show, setShow] = useState(false);
  const [timeoutId, setTimeoutId] = useState(false);

  return (
    <div className="relative flex items-center z-30">
      <div
        onMouseEnter={() => {setTimeoutId(setTimeout(() => {
          setShow(true)
        }, 750))}}
        onMouseLeave={() => {
          clearTimeout(timeoutId); 
          setShow(false)
        }}
      >
        {children}
        <>
          {show && (
            <div className={`tooltip ${show ? 'show' : 'hide'} absolute bottom-full mb-1 backdrop-blur-md text-white text-sm rounded-md shadow-lg `}>
              
              {content}
            </div>
          )}
        </>
      </div>
    </div>
  );
};

export default Tooltip;
