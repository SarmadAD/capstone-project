import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { AppAnchor } from "../styledComponents/AppAnchor";
import { motion } from "framer-motion";

export default function Friend({ userFriend, setRemoveFriendMode, openModal, setCurrentFriendUser }) {
  const itemVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    default: {
      opacity: 1,
      y: 0,
    },
    exit: {
      y: 100,
      opacity: 0,
    },
  };
  function handleRemoveFriend() {
    setRemoveFriendMode(true);
    setCurrentFriendUser(userFriend.user);
    openModal(true);
  }

  return (
    <AcceptedFriend data-testid="friend" variants={itemVariants} initial="initial" animate="default" exit="exit">
      <FriendNameContainer>
        <Link href={`/social/friendtimeline/${userFriend._id}`} passHref>
          <AppAnchor>
            <p>{userFriend.name}</p>
          </AppAnchor>
        </Link>
      </FriendNameContainer>
      <RemoveFriendButton>
        <Image src="/SVG/removeFriend.svg" height={40} width={40} alt="remove friend button" onClick={handleRemoveFriend} />
      </RemoveFriendButton>
    </AcceptedFriend>
  );
}

const AcceptedFriend = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #9e94d6;
  border-radius: 15px;
  border: 1px solid #ffffff;
  box-shadow: 0px 0px 13px 0px rgba(255, 255, 255, 0.42);
  color: #ffffff;
  margin-bottom: 0.5em;
`;

const FriendNameContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-start;
  border-radius: 15px;
  :active {
    background-color: rgb(101, 95, 138);
  }
`;

const RemoveFriendButton = styled.button`
  background-color: #9e94d6;
  border: 1px solid #ffffff;
  border-radius: 15px;
  :active {
    background-color: rgb(101, 95, 138);
  }
`;
