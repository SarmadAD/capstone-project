import { getSession, useSession } from "next-auth/react";
import { useState } from "react";
import { AppButton } from "../components/styledComponents/AppButton";
import { AppInput } from "../components/styledComponents/AppInput";
import Head from "next/head";
import Image from "next/image";
import Modal from "../components/Modal";
import styled from "styled-components";
import useSWR from "swr";
import FriendsList from "../components/FriendsList/FriendsList";
import Loading from "../components/Loading/Loading";

export default function Social() {
  const { data: session } = useSession();
  const textIfNoPersionAdded = "Füge Personen hinzu, um deren Timeline zu sehen";
  const userfriends = useSWR("/api/friendslist");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleCreateFriend() {
    openModal();
  }
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
    setEmail("");
    setError("");
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const response = await fetch(`/api/friendslist/${email}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
      });
      const getUserWithCurrentEmail = await response.json();
      if (response.ok) {
        userfriends.mutate();
        console.log(getUserWithCurrentEmail);
        closeModal();
      } else if (response.status == 404) {
        setError("User nicht gefunden");
      }
    } catch (error) {
      console.error();
    } finally {
    }
  }

  function handleChangeForm(event) {
    switch (event.target.name) {
      case "email":
        setEmail(event.target.value);
        break;
    }
  }

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
        <AddFriendContainer>
          <button onClick={handleCreateFriend}>
            <Image src="/SVG/addFriends.svg" height={50} width={50} alt="add friend button" />
          </button>
        </AddFriendContainer>
        <Modal modalIsOpen={modalIsOpen} closeModal={closeModal}>
          <ModalContent>
            <AddFriendForm onSubmit={handleSubmit}>
              <AppInput placeholder="E-Mail" name="email" value={email} type="email" onChange={handleChangeForm} required />
              <AppButton value="Hinzufügen" name="submit" type="submit">
                Hinzufügen
              </AppButton>
            </AddFriendForm>
            <ErrorContainer>{error ? <p>{error}</p> : ""}</ErrorContainer>
          </ModalContent>
        </Modal>
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

const AddFriendContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  position: fixed;
  bottom: 10vh;
  margin-bottom: 1em;
  button {
    background-color: #9e94d6;
    border-radius: 50%;
    padding: 1em;
  }
`;

const ErrorContainer = styled.div`
  text-align: center;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddFriendForm = styled.form`
  display: flex;
  flex-direction: column;
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
