import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import Loading from "../../../../components/Loading/Loading";
import TimepointList from "../../../../components/TimepointList/TimepointList";
import Image from "next/image";
import Link from "next/link";
import { AppAnchor } from "../../../../components/styledComponents/AppAnchor";

export default function FriendTimeline() {
  const router = useRouter();
  const { userId } = router.query;
  const timepoints = useSWR(`/api/timepoints/usertimepoint/${userId}`);
  const textForNoTimepoints = "Keine Timeline hier...";
  return (
    <FriendTimelineContainer>
      <BackButtonContainer>
        <Link href="/social/" passHref>
          <AppAnchor>
            <Image src="/SVG/arrowBack.svg" height={35} width={35} alt="back to friend list" className="backarrow" />
          </AppAnchor>
        </Link>
      </BackButtonContainer>
      {timepoints.data && timepoints.data.length > 0 ? (
        <TimepointList listOfTimepoints={timepoints.data} readOnlyMode={true} />
      ) : timepoints.data && timepoints.data.length === 0 ? (
        <p>{textForNoTimepoints}</p>
      ) : (
        <Loading />
      )}
    </FriendTimelineContainer>
  );
}
const FriendTimelineContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5em;
  p {
    text-align: center;
    font-size: 2.5em;
    color: #ffffff;
  }
  .timepointListContainer{
    width: 100%;
  }
`;

const BackButtonContainer = styled.div`
  margin-bottom: 1em;
  align-self: flex-start;
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
