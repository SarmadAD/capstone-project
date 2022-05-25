import Image from "next/image";
import styled from "styled-components";
import { useSession } from "next-auth/react";

export default function RequestedFriend({ invite }) {
  const { data: session } = useSession();
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

  async function handleAcceptInvition() {
    const response = await fetch(`/api/friendslist/invite/acceptRejectInvite/accept/${invite.inviteId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
    });
    if (response.ok) {
    }
  }

  async function handleRejectInvition() {
    const response = await fetch(`/api/friendslist/invite/acceptRejectInvite/reject/${invite.inviteId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
    });
    if (response.ok) {
    }
  }
  console.log(invite);
  return (
    <RequestedFriendContainer data-testid="friend" variants={itemVariants} initial="initial" animate="default" exit="exit">
      <FriendNameContainer>
        {session.user.id === invite.requestedUser._id ? <p>{invite.requestingUser.name}</p> : <p>{invite.requestedUser.name}</p>}
      </FriendNameContainer>
      <InviteOptions>
        {session.user.id !== invite.requestingUser._id && (
          <Image src="/SVG/check.svg" height={40} width={40} alt="accept invition" onClick={handleAcceptInvition} />
        )}
        <Image src="/SVG/cross.svg" height={40} width={40} alt="reject invition" onClick={handleRejectInvition} />
      </InviteOptions>
    </RequestedFriendContainer>
  );
}

const RequestedFriendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #9e94d6;
  border-radius: 15px;
  border: 1px solid #ffffff;
  box-shadow: 0px 0px 13px 0px rgba(255, 255, 255, 0.42);
  color: #ffffff;
  margin-bottom: 0.5em;
`;
const InviteOptions = styled.div`
  display: flex;
  justify-content: space-around;
  width: 25%;
`;

const FriendNameContainer = styled.div`
  display: flex;
  width: 75%;
  align-items: flex-start;
  border-radius: 15px;
`;
