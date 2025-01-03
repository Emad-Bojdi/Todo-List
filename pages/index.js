
import { getSession } from "next-auth/react";
import HomePage from "../components/templates/HomePage";





export default function Home() {

  return <HomePage />;
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {}
  };
}


