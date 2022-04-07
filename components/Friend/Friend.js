import Image from "next/image";
import styled from "styled-components";

export default function Friend({ userFriend }) {
  return (
    <FriendContainer>
      <FriendNameContainer>
        <p>{userFriend.name}</p>
      </FriendNameContainer>
      <RemoveFriendButton>
        <Image src="/SVG/removeFriend.svg" height={40} width={40} alt="remove friend button" />
      </RemoveFriendButton>
    </FriendContainer>
  );
}

const FriendNameContainer = styled.div`
  display: flex;
  width: 100%;
  border-radius: 15px;
  :active {
    background-color: rgb(101, 95, 138);
  }
`;

const FriendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #9e94d6;
  border-radius: 15px;
  border: 1px solid #ffffff;
  box-shadow: 0px 0px 13px 0px rgba(255, 255, 255, 0.42);
  color: #ffffff;
  margin-bottom: 0.5em;
`;

const RemoveFriendButton = styled.button`
  background-color: #9e94d6;
  border: 1px solid #ffffff;
  border-radius: 15px;
  :active {
    background-color: rgb(101, 95, 138);
  }
`;
