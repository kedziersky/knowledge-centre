import { useRouter } from "next/router";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, auth } from "./firebaseConfig";
import { getAuth } from "firebase/auth";
import { Splash } from "../components/splash";

export function withPublic(Component: any) {
  return function WithPublic(props: any) {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <Splash />;

    if (user) {
      typeof window !== "undefined" && router.replace("/");
      return <Splash />;
    }
    return <Component {...props} />;
  };
}

export function withProtected(Component: any) {
  return function WithProtected(props: any) {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    if (loading) return <Splash />;

    if (!user) {
      typeof window !== "undefined" && router.replace("/login");
      return <Splash />;
    }
    return <Component {...props} />;
  };
}
