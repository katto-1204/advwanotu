import React, { createContext, useReducer } from "react";

export const UserContext = createContext(null);

const userReducer = (state, action) => {
  switch (action.type) {
    case "add":
      return [...state, action.user];
    case "update":
      return state.map((user, index) =>
        index === action.index ? action.user : user
      );
    case "delete":
      return state.filter((_, index) => index !== action.index);
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [users, dispatch] = useReducer(userReducer, []);
  return <UserContext.Provider value={{ users, dispatch }}>{children}</UserContext.Provider>;
};
