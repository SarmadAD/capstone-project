import styled from "styled-components";
import Friend from "../Friend/Friend";
import { motion } from "framer-motion";
import { InviteStatus } from "../../utils/enum/InviteStatus";
import RequestedFriend from "../Friend/RequestedFriend";

export default function FriendsList({ status, userfriends, requestedFriends, setRemoveFriendMode, openModal, setCurrentFriendUser }) {
  const myVariants = {
    initial: {
      opacity: 0,
    },
    default: {
      y: 0,
      scale: 1,
      rotate: "0",
      opacity: 1,
      transition: { staggerChildren: 0.8 },
    },
    exit: {
      y: -100,
      opacity: 0,
      rotate: "45deg",
      transition: { staggerChildren: 0.8 },
    },
  };
  return (
    <FriendsListContainer variants={myVariants} initial="initial" animate="default" exit="exit">
      {userfriends.map((userFriend) => (
        <Friend
          key={userFriend._id}
          userFriend={userFriend}
          setRemoveFriendMode={setRemoveFriendMode}
          openModal={openModal}
          setCurrentFriendUser={setCurrentFriendUser}
        />
      ))}
      {status === "requested" &&
        requestedFriends.map((requestedFriend) => <RequestedFriend key={requestedFriend.user._id} userFriend={requestedFriend} />)}
    </FriendsListContainer>
  );
}

const FriendsListContainer = styled(motion.div)`
  transition: transform 500ms ease-in-out;
  transform-origin: 0% 0%;
  width: 100%;
`;
