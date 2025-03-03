import { useReducer } from "react";

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

export default function useUserReducer() {
  const [users, dispatch] = useReducer(userReducer, []);
  return { users, dispatch };
}
