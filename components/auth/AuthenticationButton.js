import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import { AppButton } from "../styledComponents/AppButton";

export default function AuthenticationButton() {
  const { data: session } = useSession();
  const router = useRouter();
  function handleOnClick() {
    signOut();
    router.push("/");
  }
  if (session) {
    return <AppButton onClick={handleOnClick}>Sign out</AppButton>;
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
      }}
    >
      <span>Not signed in</span>
      <button onClick={() => signIn()} style={{ backgroundColor: "lightgray" }}>
        Sign in
      </button>
    </div>
  );
}
