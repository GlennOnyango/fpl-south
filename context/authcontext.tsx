import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
type Props = {
  children: JSX.Element;
};

const authCTX = {
  userDetails: {
    phone: "",
    teamid: 0,
    email: "",
    teamName: "",
    token: "",
    approved: false,
    admin: false,
  },
  setUserDetails: (userDetails: any) => {},
  logout: () => {},
};

const AuthContext = React.createContext(authCTX);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState({
    phone: "",
    teamid: 0,
    email: "",
    teamName: "",
    token: "",
    approved: false,
    admin: false,
  });
 
  useEffect(() => {
    if (user.token.length > 0) {
      SecureStore.setItemAsync("user", JSON.stringify(user));
    }

    if (user.token.length === 0) {
      //get user from secure store
      SecureStore.getItemAsync("user").then((user) => {
        if (user) {
          setUser(JSON.parse(user));
        }
      });
    }
  }, [user]);

  const logout = () => {
    //remove user from secure store
    SecureStore.deleteItemAsync("user");

    setUser({
      phone: "",
      teamid: 0,
      email: "",
      teamName: "",
      token: "",
      approved: false,
      admin: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        userDetails: user,
        setUserDetails: (userDetails: any) => {
          setUser(userDetails);
        },
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
