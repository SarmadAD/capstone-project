import { getSession, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import AuthenticationButton from "../components/auth/AuthenticationButton";
import { connectDb } from "../utils/db";

export default function Profile() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>

      <ProfileContainer>
        <ProfileContent>
          <Image src={session.user.image} width={150} height={150} alt="profile image" className="profileImage"></Image>
          <h2>{session.user.name}</h2>
          <h2>{session.user.email}</h2>
          <AuthenticationButton />
        </ProfileContent>
      </ProfileContainer>
    </>
  );
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3em;
  color: #ffffff;
  .profileImage {
    border-radius: 50%;
  }
  h2 {
    margin: 0.5em;
    font-weight: lighter;
  }
`;

const ProfileContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
