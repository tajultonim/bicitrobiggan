import { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import {getAuth,onIdTokenChanged} from "firebase/auth"
import firebaseInit from "./client-init";
const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {
  //firebaseInit();
  const auth = getAuth()
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onIdTokenChanged(async (cuser) => {
      if (!cuser) {
        setUser(null);
        nookies.set(null, "token", "", {});
        return;
      }
      await cuser.getIdToken(true).then((token) => {
        console.log("Token:" + token);
        nookies.set(null, "token", token, {});
        setUser(cuser);
      });
    });
  }, [user]);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
