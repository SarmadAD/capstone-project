import styled from "styled-components";
import Friend from "../Friend/Friend";

export default function FriendsList({ userfriends, setRemoveFriendMode, openModal, setCurrentFriendUser }) {
  return (
    <FriendsListContainer>
      {userfriends.map((userFriend) => (
        <Friend
          key={userFriend._id}
          userFriend={userFriend}
          setRemoveFriendMode={setRemoveFriendMode}
          openModal={openModal}
          setCurrentFriendUser={setCurrentFriendUser}
        />
      ))}
    </FriendsListContainer>
  );
}

const FriendsListContainer = styled.div``;
