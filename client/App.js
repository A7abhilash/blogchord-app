import React from "react";
import { AuthProvider } from "./src/contexts/AuthContext";
import AppNavigator from "./src/AppNavigator";
import { MsgProvider } from "./src/contexts/MsgContext";
import { DBProvider } from "./src/contexts/DBContext";

export default function App() {
  return (
    <MsgProvider>
      <AuthProvider>
        <DBProvider>
          <AppNavigator />
        </DBProvider>
      </AuthProvider>
    </MsgProvider>
  );
}
