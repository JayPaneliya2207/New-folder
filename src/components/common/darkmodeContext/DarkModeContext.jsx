import React, { createContext, useState } from "react";

export const DarkModeContext = createContext();

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [darkMoreMainSection, setdarkMoreMainSection] = useState(false)
  const [darkModeAllContain, setDarkModeAllContain] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    setdarkMoreMainSection((prevMode) => !prevMode);
    setDarkModeAllContain((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode,darkMoreMainSection,darkModeAllContain, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export default DarkModeProvider;
