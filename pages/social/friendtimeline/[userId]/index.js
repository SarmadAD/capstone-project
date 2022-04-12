import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Loading from "../../../../components/Loading/Loading";
import TimepointList from "../../../../components/TimepointList/TimepointList";

export default function FriendTimeline() {
  const router = useRouter();
  const { userId } = router.query;
  const timepoints = useSWR(`/api/timepoints/usertimepoint/${userId}`);
  const textForNoTimepoints = "Keine Timeline hier...";
  console.log(timepoints);
  return (
    <>
      {timepoints.data && timepoints.data.length > 0 ? (
        <TimepointList listOfTimepoints={timepoints.data} />
      ) : timepoints.data && timepoints.data.length === 0 ? (
        <p>{textForNoTimepoints}</p>
      ) : (
        <Loading />
      )}
    </>
  );
}
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
