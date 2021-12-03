import { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import firebaseInit from "./init";
import firebase from "firebase/app";
import "firebase/auth";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  firebaseInit();
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onIdTokenChanged(async (cuser) => {
      if (!cuser) {
        setUser(null);
        nookies.set(null, "token", "", {});
        nookies.set(null, "tocken", "", {});
        return;
      }
      await cuser.getIdToken(true).then((token) => {
        console.log("Token:" + token);
        nookies.set(null, "token", token, {});
        nookies.set(null, "tocken", token, {});
        setUser(cuser);
      });
    });
  }, [user]);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
