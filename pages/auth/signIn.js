import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { AppButton } from "../../components/styledComponents/AppButton";

export default function SignIn({ providers }) {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <>
      {Object.values(providers).map((provider) => (
        <LoginContainer key={provider.name}>
          <AppButton onClick={() => signIn(provider.id)}>Sign in with {provider.name}</AppButton>
        </LoginContainer>
      ))}
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const session = await getSession();
  return {
    props: { providers },
  };
}

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
