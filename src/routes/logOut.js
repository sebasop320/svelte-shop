// logout.js
import { auth } from "./firebase/firebase";
import { user, isLoggedIn } from "./firebase/stores.js";
import { goto } from "$app/navigation";

export const logout = async () => {
  try {
    await auth.signOut();
    user.set(null);
    isLoggedIn.set(false);
    goto("/"); // Redirect to the login page after logout
  } catch (error) {
    console.error(error);
  }
};
