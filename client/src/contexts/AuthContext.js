import React, { useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMsg } from "./MsgContext";

export const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthProvider({ children }) {
  const { setAlert, setToast } = useMsg();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  const addUser = async (currentUser) => {
    try {
      const res = await fetch("http://10.0.2.2:7781/newUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      });
      const data = await res.json();
      if (data.error) {
        setAlert("Error", data.error, [{ text: "Understood" }]);
      } else if (data.user) {
        setToast(data.msg);
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
      setAlert("Error", "Server error, Please try later.", [{ text: "OK" }]);
    }
  };

  const fetchUserData = async () => {
    setLoading(true);
    const accessToken = await AsyncStorage.getItem("accessToken");
    fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: new Headers({
        Authorization: `Bearer ${accessToken}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.email) {
          let currentUser = {
            firstName: data.given_name,
            lastName: data.family_name,
            displayName: data.name,
            image: data.picture,
            googleId: data.id,
          };
          setUser(currentUser);
          addUser(currentUser);
        } else {
          setIsAuthenticated(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setAlert("Error", "Server error, Please try later.", [{ text: "OK" }]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    try {
      setLoading(true);
      AsyncStorage.getItem("accessToken").then((data) => {
        // console.log(data);
        setIsAuthenticated(data ? true : false);
      });
    } catch (error) {
      //   console.log(error);
      setAlert("Error", "Server error, Please try later.", [{ text: "OK" }]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserData();
    } else {
      setUser(null);
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{ user, loading, setIsAuthenticated, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}
