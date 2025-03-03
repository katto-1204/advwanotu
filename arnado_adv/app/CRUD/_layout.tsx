import { Stack } from "expo-router";
import { createContext } from "react";

export const UserInfoContext = createContext(null);

export default function Layout() {
  const user = {
    name: "User name",
    email: "email@email.com",
  };

  return (
    <UserInfoContext.Provider value={user}>
      <Stack />
    </UserInfoContext.Provider>
  );
}
