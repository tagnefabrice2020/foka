import React from "react";
import "./index.css";

const Loader = (size: number) => {
   
  let style = {
    height: `${size}px!important`,
    width: `${size}px!important`,
  };
    
  if (size) {
    return <div className="loader" style={style}></div>;
  }
  return <div className="loader"></div>;
};

export default Loader;
