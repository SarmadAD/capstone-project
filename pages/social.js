import { getSession } from "next-auth/react";
import Head from "next/head";

export default function Social() {
  return (
    <>
      <Head>
        <title>Social</title>
      </Head>
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
