import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function AuthenticationButton() {
  const { data: session } = useSession();
  const router = useRouter();
  function handleOnClick() {
    signOut();
    router.push("/");
  }
  if (session) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <span>Signed in as {session.user.name}</span>
        <button onClick={handleOnClick} style={{ backgroundColor: "lightgray" }}>
          Sign out
        </button>
      </div>
    );
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
