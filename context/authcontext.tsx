import React, { useState } from "react";

type Props = {
  children: JSX.Element;
};

const authCTX = {
  userDetails: {
    phone: "",
    teamid: 0,
    email: "",
    teamName: "",
  },
  setUserDetails: (userDetails: any) => {},
};

const AuthContext = React.createContext(authCTX);

export const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState({
    phone: "",
    teamid: 0,
    email: "",
    teamName: "",
  });
  const [steps, setSteps] = useState(1);

  return (
    <AuthContext.Provider
      value={{
        userDetails: user,
        setUserDetails: (userDetails: any) => {
          setUser(userDetails);
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
