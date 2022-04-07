import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import styled from "styled-components";
import useSWR from "swr";
import FriendsList from "../components/FriendsList/FriendsList";
import Loading from "../components/Loading/Loading";

export default function Social() {
  const { data: session } = useSession();
  const textIfNoPersionAdded = "Füge Personen hinzu, um deren Timeline zu sehen";
  const userfriends = useSWR("/api/friendslist");
  return (
    <>
      <Head>
        <title>Social</title>
      </Head>
      <SocialContainer>
        {userfriends.data && userfriends.data.length > 0 ? (
          <FriendsList userfriends={userfriends.data} />
        ) : userfriends.data && userfriends.data.length === 0 ? (
          <p>{textIfNoPersionAdded}</p>
        ) : (
          <Loading />
        )}
      </SocialContainer>
    </>
  );
}

const SocialContainer = styled.div`
  text-align: center;
  p {
    text-align: center;
    font-size: 2.5em;
    color: #ffffff;
    margin: 0.5em;
  }
`;

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
