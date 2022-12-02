import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { auth } from "./FirebaseApp";
import { toast } from "react-toastify";

import RootLoading from "../Navigation/RootLoading/RootLoading";
import ErrorToast from "../Alerts/Toast/ErrorToast";

const AuthContext = React.createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState();

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return auth.signOut();
  };

  const updatePassword = (password) => {
    return currentUser.updatePassword(password);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setLoading(true);
      setCurrentUser(user);
      if (user) {
        await axios
          .get(process.env.REACT_APP_BACKEND_API_URL + "/users/getItem", {
            params: { email: user.email },
          })
          .then((response) => {
            setUserDetails(response.data[0]);
          })
          .catch((err) => {
            toast.dark(
              <ErrorToast message={err.response.data.message || err.message} />
            );
          });
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    userDetails,
    login,
    signup,
    logout,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && props.children}
      {loading && <RootLoading />}
    </AuthContext.Provider>
  );
};

export { useAuth };
export { AuthProvider };
