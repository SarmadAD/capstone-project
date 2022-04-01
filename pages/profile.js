import { getSession } from "next-auth/react";
import Head from "next/head";
import AuthenticationButton from "../components/auth/AuthenticationButton";
import { connectDb } from "../utils/db";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <AuthenticationButton />
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signIn",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
