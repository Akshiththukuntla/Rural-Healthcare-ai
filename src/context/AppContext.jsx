import { createContext, useState } from "react";
import { doctors } from "../assets/assets"; // Ensure this is an array
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [data, setData] = useState({
    doctors // Ensure this is an array
  });

  return (
    <AppContext.Provider value={data}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
