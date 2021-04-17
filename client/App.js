import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import AppNavigator from "./src/AppNavigator";
import { MsgProvider } from "./src/contexts/MsgContext";

export default function App() {
  return (
    <MsgProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </MsgProvider>
  );
}
