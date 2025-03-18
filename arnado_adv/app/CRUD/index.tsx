import React from "react";
import { View } from "react-native";
import UserInfo from "./components/UserInfo";
import { UserProvider } from "./useContext";

export default function Index() {
  return (
    <UserProvider>
      <View style={{ padding: 20 }}>
        <UserInfo />
      </View>
    </UserProvider>
  );
}
