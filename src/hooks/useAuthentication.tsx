import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "../lib/firebase";
import { useDispatch } from "react-redux";
import { clearUser, UserInitialStateProps, setUser } from "../store/userSlice";
import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface SigninDataProps {
  email: string;
  password: string;
}
interface SignupDataProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserProps {
  firstName: string;
  lastName: string;
  email: string;
  job: null | string;
  photoURL: null | string;
  uid: string;
}

type AuthData = SigninDataProps | SignupDataProps;

/**
 * A custom hook for user authentication and management with Firebase.
 *
 * This hook provides functions for signing up, signing in, logging out,
 * and handling user state changes within your React application. It leverages
 * Firebase Authentication and Firestore for user data storage.
 *
 * @template T The type of the data used for sign-in or sign-up, which can be either
 * `SigninDataProps` for signing in or `SignupDataProps` for signing up.
 * @returns An object containing methods and state variables for user authentication:
 *   - `loading`: Boolean flag indicating if an authentication operation is in progress.
 *   - `error`: Boolean flag indicating if an error occurred during authentication.
 *   - `signup`: Function to sign up a new user with email and password.
 *   - `logout`: Function to log out the current user.
 *   - `signin`: Function to sign in an existing user with email and password.
 */

export default function useAuthentication<T extends AuthData>(
  data: T
): {
  loading: boolean;
  error: boolean;
  signup: () => Promise<void>;
  logout: () => Promise<void>;
  signin: () => Promise<void>;
} {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  /**
   * Signs up a new user with email and password.
   *
   * This function attempts to create a new user account in Firebase Authentication
   * and stores the user data in db, Also sends user information to userSlice.
   *
   * @throws {Error} - Throws an error if user creation fails.
   */
  const signup = async (): Promise<void> => {
    try {
      setLoading(true);
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const newUser: UserProps = {
        firstName: (data as SignupDataProps)?.firstName,
        lastName: (data as SignupDataProps).lastName,
        email: data.email,
        job: null,
        photoURL: null,
        uid: user.uid,
      };

      dispatch(setUser(newUser));

      const userRef = doc(db, "users", newUser.uid);
      await setDoc(userRef, newUser);
    } catch (err) {
      setError(true);
      console.log("Error while Signing up", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Signs in an existing user with email and password.
   *
   * This function attempts to fetch user data from firestore and dispatch a `setUser` action to update the user state.
   *
   * @throws {Error} - Throws an error if user sign in fails or data retrieval fails
   */

  const signin = async (): Promise<void> => {
    try {
      setLoading(true);
      const { user } = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (!user.uid) {
        setError(true);
        console.error("User not found, Please check your email and password.");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      const userData = docSnap.data() as UserProps;

      if (!userData) {
        setError(true);
        console.error("Error retrieving user data. Please try again later.");
        return;
      }

      dispatch(setUser(userData));
    } catch (err) {
      console.log("Error while signing in: ", err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs out the current user.
   *
   * Signs out the user from Firebase Authentication and clears the user state.
   */
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await signOut(auth);
      dispatch(clearUser());
    } catch (err) {
      console.log("Error while logging out: ", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles user state changes.
   *
   * Listens for authentication state changes and updates the user state accordingly.
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user?.uid) {
          const userRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userRef);

          dispatch(setUser(docSnap.data() as UserInitialStateProps));
        }
      } catch (err) {
        console.log("Error while signing out: ", err);
      }
    });

    return () => unsubscribe();
  }, []);

  return { loading, error, signup, logout, signin };
}
