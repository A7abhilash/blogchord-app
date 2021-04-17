import React, { useContext, useEffect, useState } from "react";
import { Alert, ToastAndroid } from "react-native";

export const MsgContext = React.createContext();

export const useMsg = () => {
  return useContext(MsgContext);
};

export function MsgProvider({ children }) {
  const [alert, setAlert] = useState(null);
  const [toast, setToast] = useState(null);

  const toastUser = () => {
    ToastAndroid.showWithGravityAndOffset(
      toast,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      150
    );
    setToast(null);
  };
  useEffect(() => {
    if (toast) {
      toastUser();
    }
  }, [toast]);

  const alertUser = () => {
    Alert.alert(alert.title, alert.msg, [{ text: alert.text }]);
    setAlert(null);
  };
  useEffect(() => {
    if (alert) {
      alertUser();
    }
  }, [alert]);

  return (
    <MsgContext.Provider value={{ setAlert, setToast }}>
      {children}
    </MsgContext.Provider>
  );
}
