// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
//       setUser(firebaseUser);
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Firebase Auth user
  const [userData, setUserData] = useState(null); // Backend user profile
  const [loading, setLoading] = useState(true);
   const [userDataLoading, setUserDataLoading] = useState(true); // Backend loading

  // ✅ Move fetchUserProfile out here
  const fetchUserProfile = async (email) => {
    try {
      const res = await axios.post(
        "https://netgenome-1.onrender.com/api/user/get-profile",
        { email }
      );
      if (res.data) {
        setUserData(res.data); // Contains role, name, etc.
      }
    } catch (err) {
      console.error("❌ Failed to fetch user profile:", err);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser?.email) {
        fetchUserProfile(firebaseUser.email);
      } else {
        setUserData(null);
        setLoading(false);
      }
      setUserDataLoading(false);
    });

    // ✅ Return only the unsubscribe cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, userDataLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
