// login.js
import { auth } from "./firebase/firebase";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { user, isLoggedIn } from "./firebase/stores.js";
import { goto } from "$app/navigation";

export const login = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    user.set(res.user);
    isLoggedIn.set(true);
    goto("/");
  } catch (error) {
    console.error(error);
  }
};

// Check authentication state on page load
onAuthStateChanged(auth, (firebaseUser) => {
  if (firebaseUser) {
    // User is signed in
    user.set(firebaseUser);
    isLoggedIn.set(true);
  } else {
    // User is signed out
    user.set(null);
    isLoggedIn.set(false);
  }
});
