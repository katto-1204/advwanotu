import { createContext } from "react";
import useUserReducer from "./useReducer";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { users, dispatch } = useUserReducer();
  
  return (
    <UserContext.Provider value={{ users, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
