// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



// // src/context/AuthContext.jsx
// import React, { createContext, useContext, useEffect, useState } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../firebase";
// import axios from "axios";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [firebaseUser, setFirebaseUser] = useState(null);
//   const [userData, setUserData] = useState(null); // contains role
//   const [loading, setLoading] = useState(true);

//   // 👉 Fetch user data from backend
//   const fetchUserData = async (email) => {
//     try {
//       const res = await axios.post("http://localhost:5000/api/user/get-profile", { email });
//       console.log(email);
      
//       setUserData(res.data);
//     } catch (err) {
//       console.error("Failed to fetch user profile:", err);
//       setUserData(null);
//     }
//   };

//   // 🔁 Public function to refresh userData manually (e.g., after approval)
//   const refreshUserData = async () => {
//     if (firebaseUser?.email) {
//       await fetchUserData(firebaseUser.email);
//     }
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (user) => {
//       setFirebaseUser(user);
//       if (user) {
//         await fetchUserData(user.email);
//       } else {
//         setUserData(null);
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   return (
//     <AuthContext.Provider value={{ firebaseUser, userData, loading, refreshUserData }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
