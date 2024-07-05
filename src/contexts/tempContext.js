import React, { createContext, useState, useContext } from "react";

const TempContext = createContext();

export const TempProvider = ({ children }) => {
  const [tempDegree, setTempDegree] = useState("C");

  const toggleTemp = () => {
    setTempDegree((prev) => (prev === "C" ? "F" : "C"));
  };

  return (
    <TempContext.Provider value={{ tempDegree, toggleTemp }}>
      {children}
    </TempContext.Provider>
  );
};

export const useTemp = () => useContext(TempContext);
