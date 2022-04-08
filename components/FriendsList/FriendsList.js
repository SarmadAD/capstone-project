import styled from "styled-components";
import Friend from "../Friend/Friend";

export default function FriendsList({ userfriends }) {
  return (
    <FriendsListContainer>
      {userfriends.map((userFriend) => (
        <Friend key={userFriend._id} userFriend={userFriend} />
      ))}
    </FriendsListContainer>
  );
}

const FriendsListContainer = styled.div``;
